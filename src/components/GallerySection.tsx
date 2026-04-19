import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { ChevronLeft, ChevronRight, X, Play } from 'lucide-react';

type GalleryItem = Tables<'gallery'> & { video_url?: string | null };

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

const fallbackImages = [
  { label: 'Performance', alt_text: 'Divine dance performance', emoji: '🎭', image_url: null, video_url: null },
  { label: 'Costumes', alt_text: 'Traditional costumes', emoji: '👗', image_url: null, video_url: null },
  { label: 'Stage Design', alt_text: 'Stage setup', emoji: '🪔', image_url: null, video_url: null },
  { label: 'Young Artists', alt_text: 'Young artists', emoji: '🌟', image_url: null, video_url: null },
  { label: 'Devi Leela', alt_text: 'Devi depiction', emoji: '🙏', image_url: null, video_url: null },
  { label: 'Live Music', alt_text: 'Audience', emoji: '🎶', image_url: null, video_url: null },
];

export default function GallerySection() {
  const [items, setItems] = useState<(GalleryItem | typeof fallbackImages[0])[]>(fallbackImages);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    supabase.from('gallery').select('*').order('display_order').then(({ data }) => {
      if (data && data.length > 0) setItems(data as GalleryItem[]);
    });
  }, []);

  const handleNext = () => {
    if (selected !== null) {
      setSelected((selected + 1) % items.length);
    }
  };

  const handlePrev = () => {
    if (selected !== null) {
      setSelected((selected - 1 + items.length) % items.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selected === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected, items.length]);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-secondary/5">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-body text-sm tracking-[0.4em] uppercase mb-4 font-bold">Visual Splendor</p>
          <h2 className="font-heading text-4xl md:text-5xl text-saffron-gradient">Our Highlights</h2>
        </motion.div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {items.map((img, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden cursor-pointer group rounded-xl break-inside-avoid bg-card border border-border/10 shadow-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(i)}
            >
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              
              {/* Play Button Overlay for Videos */}
              {img.video_url && (
                <div className="absolute top-4 left-4 z-20 p-2 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 group-hover:bg-primary transition-colors">
                  <Play size={12} fill="currentColor" />
                </div>
              )}

              {getThumbnail(img) ? (
                <img 
                  src={getThumbnail(img)!} 
                  alt={img.alt_text || 'Shakti Leela Gallery'} 
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
              ) : (
                <div className="aspect-[3/4] flex flex-col items-center justify-center border border-border/20 p-4">
                  <span className="text-4xl group-hover:scale-110 transition-transform">{'emoji' in img ? img.emoji : '🖼️'}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selected !== null && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            {/* Close Button */}
            <button 
              className="fixed top-6 right-6 z-[110] p-3 text-white/50 hover:text-white transition-all hover:scale-110 active:scale-95 bg-white/5 rounded-full backdrop-blur-md"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons - Desktop */}
            <button 
              className="fixed left-6 top-1/2 -translate-y-1/2 z-[110] p-4 text-white/50 hover:text-white transition-all hover:scale-110 active:scale-95 bg-white/5 rounded-full backdrop-blur-md hidden md:flex"
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              aria-label="Previous"
            >
              <ChevronLeft size={32} strokeWidth={1} />
            </button>

            <button 
              className="fixed right-6 top-1/2 -translate-y-1/2 z-[110] p-4 text-white/50 hover:text-white transition-all hover:scale-110 active:scale-95 bg-white/5 rounded-full backdrop-blur-md hidden md:flex"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              aria-label="Next"
            >
              <ChevronRight size={32} strokeWidth={1} />
            </button>

            {/* Counter */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] bg-white/5 px-4 py-1.5 rounded-full backdrop-blur-md text-white/40 font-body text-xs tracking-widest">
              {selected + 1} / {items.length}
            </div>

            <motion.div 
              key={selected}
              className="relative w-full h-full flex items-center justify-center p-4 md:p-20 pointer-events-none"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="relative max-w-6xl w-full max-h-full flex items-center justify-center overflow-hidden pointer-events-auto shadow-[0_0_100px_rgba(0,0,0,0.8)] rounded-lg">
                {items[selected].video_url ? (
                  <div className="aspect-video w-full bg-black">
                    {items[selected].video_url!.includes('youtube.com') || items[selected].video_url!.includes('youtu.be') ? (
                      <iframe 
                        src={`https://www.youtube.com/embed/${items[selected].video_url!.split('v=')[1] || items[selected].video_url!.split('/').pop()}?autoplay=1`}
                        className="w-full h-full" allow="autoplay; fullscreen" allowFullScreen 
                      />
                    ) : (
                      <video src={items[selected].video_url!} controls className="w-full h-full" autoPlay />
                    )}
                  </div>
                ) : getThumbnail(items[selected]) ? (
                  <img 
                    src={getThumbnail(items[selected])!} 
                    alt={items[selected].alt_text || ''} 
                    className="max-w-full max-h-[80vh] object-contain select-none rounded-sm"
                    onContextMenu={e => e.preventDefault()}
                  />
                ) : (
                  <div className="h-96 w-96 flex items-center justify-center bg-card/10 rounded-3xl border border-white/5">
                    <span className="text-9xl">{'emoji' in items[selected] ? (items[selected] as any).emoji : '🖼️'}</span>
                  </div>
                )}
              </div>

              {/* Mobile Interaction areas */}
              <div className="absolute inset-0 flex md:hidden pointer-events-auto">
                <div className="w-1/3 h-full cursor-w-resize" onClick={handlePrev} aria-label="Previous image" />
                <div className="w-1/3 h-full cursor-pointer" onClick={() => setSelected(null)} aria-label="Close" />
                <div className="w-1/3 h-full cursor-e-resize" onClick={handleNext} aria-label="Next image" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
