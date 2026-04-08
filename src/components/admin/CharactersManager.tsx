import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';
import ImageUpload from './ImageUpload';

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

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this character?')) return;
    const { error } = await supabase.from('characters').delete().eq('id', id);
    if (error) toast.error(error.message); else { toast.success('Deleted'); fetch(); }
  };

  return (
    <div className="space-y-6">
      <div className="warm-card p-6 space-y-4">
        <h2 className="font-heading text-lg">{editingId ? 'Edit Character' : 'Add Character'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Character Name" value={form.name || ''} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
          <Input placeholder="Role (e.g. The Supreme Goddess)" value={form.role || ''} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} />
          <Input placeholder="Emoji" value={form.emoji || ''} onChange={e => setForm(p => ({ ...p, emoji: e.target.value }))} />
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
          <div key={c.id} className="warm-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{c.emoji}</span>
              <div>
                <strong className="font-heading">{c.name}</strong>
                <span className="text-muted-foreground text-sm ml-2">— {c.role}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleEdit(c)}>Edit</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(c.id)}>Delete</Button>
            </div>
          </div>
        ))}
        {characters.length === 0 && <p className="text-muted-foreground text-sm text-center py-8">No characters yet.</p>}
      </div>
    </div>
  );
}
