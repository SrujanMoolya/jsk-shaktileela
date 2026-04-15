import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';
import ImageUpload from './ImageUpload';
import { deleteFileFromStorage } from '@/utils/storage-utils';

type Character = Tables<'characters'>;

const emptyForm: Partial<TablesInsert<'characters'>> = {
  name: '', role: '', description: '', emoji: '🎭', image_url: '',
};

export default function CharactersManager() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    const { data } = await supabase.from('characters').select('*').order('display_order');
    if (data) setCharacters(data);
  };

  useEffect(() => { fetch(); }, []);

  const handleSave = async () => {
    if (!form.name || !form.role) { toast.error('Name and role are required'); return; }
    setLoading(true);
    if (editingId) {
      const { error } = await supabase.from('characters').update(form).eq('id', editingId);
      if (error) toast.error(error.message); else toast.success('Character updated');
    } else {
      const { error } = await supabase.from('characters').insert(form as TablesInsert<'characters'>);
      if (error) toast.error(error.message); else toast.success('Character created');
    }
    setForm(emptyForm); setEditingId(null); setLoading(false); fetch();
  };

  const handleEdit = (c: Character) => {
    setEditingId(c.id);
    setForm({ name: c.name, role: c.role, description: c.description, emoji: c.emoji, image_url: c.image_url });
  };

  const handleDelete = async (character: Character) => {
    if (!confirm('Delete this character?')) return;
    
    // 1. Delete associated image from storage
    if (character.image_url) {
      await deleteFileFromStorage(character.image_url);
    }

    // 2. Delete the database record
    const { error } = await supabase.from('characters').delete().eq('id', character.id);
    if (error) toast.error(error.message); 
    else { toast.success('Deleted'); fetch(); }
  };

  return (
    <div className="space-y-6">
      <div className="warm-card p-4 md:p-6 space-y-4">
        <h2 className="font-heading text-lg">{editingId ? 'Edit Character' : 'Add Character'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Character Name" value={form.name || ''} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
          <Input placeholder="Role (e.g. The Supreme Goddess)" value={form.role || ''} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} />
        </div>
        <Textarea placeholder="Description" value={form.description || ''} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
        <div>
          <p className="text-sm font-medium mb-2">Character Image</p>
          {form.image_url && (
            <div className="w-24 h-24 rounded-lg overflow-hidden border border-border mb-2">
              <img src={form.image_url} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <ImageUpload onUpload={(url) => setForm(p => ({ ...p, image_url: url }))} folder="characters" />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={loading}>{editingId ? 'Update' : 'Create'}</Button>
          {editingId && <Button variant="outline" onClick={() => { setForm(emptyForm); setEditingId(null); }}>Cancel</Button>}
        </div>
      </div>

      <div className="space-y-3">
        {characters.map(c => (
          <div key={c.id} className="warm-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-muted flex-shrink-0 border-2 border-primary/10">
                {c.image_url ? (
                  <img src={c.image_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px] uppercase">No Img</div>
                )}
              </div>
              <div className="flex flex-col">
                <strong className="font-heading text-lg leading-tight">{c.name}</strong>
                <span className="text-primary/70 text-sm font-medium">{c.role}</span>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button size="sm" variant="outline" className="flex-1 sm:flex-none h-9" onClick={() => handleEdit(c)}>Edit</Button>
              <Button size="sm" variant="destructive" className="flex-1 sm:flex-none h-9" onClick={() => handleDelete(c)}>Delete</Button>
            </div>
          </div>
        ))}
        {characters.length === 0 && <p className="text-muted-foreground text-sm text-center py-8">No characters yet.</p>}
      </div>
    </div>
  );
}
