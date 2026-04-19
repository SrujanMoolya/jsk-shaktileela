import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { deleteFileFromStorage } from '@/utils/storage-utils';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';
import ImageUpload from './ImageUpload';
import { Play, Trash2, Edit2, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type GalleryItem = Tables<'gallery'> & { video_url?: string | null };

const emptyForm: Partial<TablesInsert<'gallery'>> = { image_url: '', video_url: '' } as any;

const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const getThumbnail = (item: any) => {
  if (item.image_url) return item.image_url;
  if (item.video_url) {
    const ytId = getYoutubeId(item.video_url);
    if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  }
  return null;
};

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [contentType, setContentType] = useState<'photo' | 'video'>('photo');

  const fetchItems = async () => {
    const { data } = await supabase.from('gallery').select('*').order('display_order');
    if (data) setItems(data as GalleryItem[]);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSave = async () => {
    // Clean form based on type
    const finalData = {
      ...form,
      label: `Gallery Item ${Date.now()}`,
      alt_text: 'Shakti Leela Gallery',
      image_url: contentType === 'photo' ? form.image_url : '', // Video might not have manual thumb
      video_url: contentType === 'video' ? form.video_url : '',
    };
    
    setLoading(true);
    if (editingId) {
      const { error } = await supabase.from('gallery').update(finalData).eq('id', editingId);
      if (error) toast.error(error.message); else toast.success('Updated');
    } else {
      const { error } = await supabase.from('gallery').insert(finalData as TablesInsert<'gallery'>);
      if (error) toast.error(error.message); else toast.success('Added');
    }
    setForm(emptyForm); setEditingId(null); setLoading(false); fetchItems();
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setContentType(item.video_url ? 'video' : 'photo');
    setForm({ 
      image_url: item.image_url || '',
      video_url: item.video_url || ''
    } as any);
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm('Delete this gallery item?')) return;
    
    if (item.image_url) {
      await deleteFileFromStorage(item.image_url);
    }

    const { error } = await supabase.from('gallery').delete().eq('id', item.id);
    if (error) toast.error(error.message); else { toast.success('Deleted'); fetchItems(); }
  };

  const handleNext = () => {
    if (previewIndex !== null) setPreviewIndex((previewIndex + 1) % items.length);
  };

  const handlePrev = () => {
    if (previewIndex !== null) setPreviewIndex((previewIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="space-y-8">
      {/* Editor Panel */}
      <div className="warm-card p-6 md:p-8 space-y-6 border border-primary/10 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="font-heading text-xl flex items-center gap-2">
            {editingId ? <Edit2 className="w-5 h-5 text-primary" /> : <Play className="w-5 h-5 text-primary" />}
            {editingId ? 'Edit Gallery Item' : 'Add New Content'}
          </h2>

          <div className="flex bg-secondary/30 p-1 rounded-lg self-start">
            <button 
              onClick={() => setContentType('photo')}
              className={`px-4 py-1.5 text-xs font-heading tracking-widest uppercase rounded-md transition-all ${contentType === 'photo' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Photo
            </button>
            <button 
              onClick={() => setContentType('video')}
              className={`px-4 py-1.5 text-xs font-heading tracking-widest uppercase rounded-md transition-all ${contentType === 'video' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Video
            </button>
          </div>
        </div>
        
        <div className="min-h-[120px] flex items-center">
          {contentType === 'video' ? (
            <div className="w-full space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Video URL</label>
              <Input 
                placeholder="YouTube link (e.g. https://youtu.be/...) or direct link" 
                value={(form as any).video_url || ''} 
                onChange={e => setForm(p => ({ ...p, video_url: e.target.value }))} 
                className="bg-background/50 text-lg py-6" 
              />
              <p className="text-[10px] text-muted-foreground italic">Thumbnails will be automatically generated for YouTube videos.</p>
            </div>
          ) : (
            <div className="w-full flex items-center gap-6">
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Upload Photo</p>
                <ImageUpload onUpload={(url) => setForm(p => ({ ...p, image_url: url }))} folder="gallery" />
              </div>
              {form.image_url && (
                <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-primary/20 shadow-lg flex-shrink-0 animate-in zoom-in-50 duration-300">
                  <img src={form.image_url} alt="" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-6 border-t border-border/20">
          <Button 
            onClick={handleSave} 
            disabled={loading || (contentType === 'video' ? !form.video_url : !form.image_url)} 
            className="px-8 bg-primary hover:bg-primary/90"
          >
            {editingId ? 'Update Item' : 'Add to Gallery'}
          </Button>
          {editingId && (
            <Button variant="outline" onClick={() => { setForm(emptyForm); setEditingId(null); }}>
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* Visual Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item, idx) => (
          <div 
            key={item.id} 
            className="group relative aspect-square rounded-2xl overflow-hidden bg-secondary/20 border border-border/40 shadow-sm hover:shadow-xl transition-all duration-500"
          >
            {/* Visual Preview */}
            {getThumbnail(item) ? (
              <img src={getThumbnail(item)!} alt={item.alt_text || ''} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-4xl opacity-40">🖼️</span>
              </div>
            )}

            {/* Video Indicator */}
            {item.video_url && (
              <div className="absolute top-3 left-3 z-10 p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                <Play className="w-3 h-3 fill-current" />
              </div>
            )}

            {/* Hover Actions Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-20">
              <button 
                onClick={() => setPreviewIndex(idx)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
                title="Preview"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleEdit(item)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
                title="Edit"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleDelete(item)}
                className="p-2.5 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-200 transition-all hover:scale-110"
                title="Delete"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="col-span-full text-muted-foreground text-sm text-center py-20 italic">The gallery is currently empty.</p>}
      </div>

      {/* Admin Preview Slider */}
      <AnimatePresence>
        {previewIndex !== null && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setPreviewIndex(null)}
          >
            <button className="fixed top-8 right-8 z-50 p-4 text-white/50 hover:text-white" onClick={() => setPreviewIndex(null)}>
              <X size={32} />
            </button>

            <button className="fixed left-8 top-1/2 -translate-y-1/2 z-50 p-4 text-white/50 hover:text-white hidden md:block" onClick={(e) => { e.stopPropagation(); handlePrev(); }}>
              <ChevronLeft size={48} strokeWidth={1} />
            </button>
            <button className="fixed right-8 top-1/2 -translate-y-1/2 z-50 p-4 text-white/50 hover:text-white hidden md:block" onClick={(e) => { e.stopPropagation(); handleNext(); }}>
              <ChevronRight size={48} strokeWidth={1} />
            </button>

            <motion.div 
              key={previewIndex} className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="w-full bg-black/40 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                {items[previewIndex].video_url ? (
                  <div className="aspect-video w-full flex items-center justify-center bg-black">
                    {items[previewIndex].video_url!.includes('youtube.com') || items[previewIndex].video_url!.includes('youtu.be') ? (
                      <iframe 
                        src={`https://www.youtube.com/embed/${items[previewIndex].video_url!.split('v=')[1] || items[previewIndex].video_url!.split('/').pop()}`}
                        className="w-full h-full" allowFullScreen 
                      />
                    ) : (
                      <video src={items[previewIndex].video_url!} controls className="w-full h-full" autoPlay />
                    )}
                  </div>
                ) : (
                  <img src={items[previewIndex].image_url!} alt="" className="w-full h-auto max-h-[80vh] object-contain" />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
