import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { deleteFileFromStorage } from '@/utils/storage-utils';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';
import ImageUpload from './ImageUpload';

type GalleryItem = Tables<'gallery'>;

const emptyForm: Partial<TablesInsert<'gallery'>> = { label: '', alt_text: '', image_url: '' };

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    const { data } = await supabase.from('gallery').select('*').order('display_order');
    if (data) setItems(data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSave = async () => {
    if (!form.label) { toast.error('Label is required'); return; }
    setLoading(true);
    if (editingId) {
      const { error } = await supabase.from('gallery').update(form).eq('id', editingId);
      if (error) toast.error(error.message); else toast.success('Updated');
    } else {
      const { error } = await supabase.from('gallery').insert(form as TablesInsert<'gallery'>);
      if (error) toast.error(error.message); else toast.success('Added');
    }
    setForm(emptyForm); setEditingId(null); setLoading(false); fetchItems();
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setForm({ label: item.label, alt_text: item.alt_text, image_url: item.image_url });
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm('Delete this gallery item?')) return;
    
    // Delete from storage
    if (item.image_url) {
      await deleteFileFromStorage(item.image_url);
    }

    const { error } = await supabase.from('gallery').delete().eq('id', item.id);
    if (error) toast.error(error.message); else { toast.success('Deleted'); fetchItems(); }
  };

  return (
    <div className="space-y-6">
      <div className="warm-card p-4 md:p-6 space-y-4">
        <h2 className="font-heading text-lg">{editingId ? 'Edit Gallery Item' : 'Add Gallery Item'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Label" value={form.label || ''} onChange={e => setForm(p => ({ ...p, label: e.target.value }))} />
          <Input placeholder="Alt Text" value={form.alt_text || ''} onChange={e => setForm(p => ({ ...p, alt_text: e.target.value }))} />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Image</p>
          {form.image_url && (
            <div className="w-24 h-24 rounded-lg overflow-hidden border border-border mb-2">
              <img src={form.image_url} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <ImageUpload onUpload={(url) => setForm(p => ({ ...p, image_url: url }))} folder="gallery" />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={loading}>{editingId ? 'Update' : 'Create'}</Button>
          {editingId && <Button variant="outline" onClick={() => { setForm(emptyForm); setEditingId(null); }}>Cancel</Button>}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map(item => (
          <div key={item.id} className="warm-card overflow-hidden">
            <div className="w-full h-32 bg-secondary/50 flex items-center justify-center">
              {item.image_url ? <img src={item.image_url} alt={item.alt_text || ''} className="w-full h-full object-cover" /> : <span className="text-3xl">🖼️</span>}
            </div>
            <div className="p-3">
              <p className="font-heading text-sm">{item.label}</p>
              <div className="flex gap-1 mt-2">
                <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => handleEdit(item)}>Edit</Button>
                <Button size="sm" variant="destructive" className="text-xs h-7" onClick={() => handleDelete(item)}>Del</Button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="col-span-full text-muted-foreground text-sm text-center py-8">No gallery items yet.</p>}
      </div>
    </div>
  );
}
