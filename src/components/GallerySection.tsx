import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type GalleryItem = Tables<'gallery'>;

const fallbackImages = [
  { label: 'Performance', alt_text: 'Divine dance performance', emoji: '🎭', image_url: null },
  { label: 'Costumes', alt_text: 'Traditional costumes', emoji: '👗', image_url: null },
  { label: 'Stage Design', alt_text: 'Stage setup', emoji: '🪔', image_url: null },
  { label: 'Young Artists', alt_text: 'Young artists', emoji: '🌟', image_url: null },
  { label: 'Devi Leela', alt_text: 'Devi depiction', emoji: '🙏', image_url: null },
  { label: 'Live Music', alt_text: 'Audience', emoji: '🎶', image_url: null },
];

export default function GallerySection() {
  const [items, setItems] = useState<(GalleryItem | typeof fallbackImages[0])[]>(fallbackImages);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    supabase.from('gallery').select('*').order('display_order').then(({ data }) => {
      if (data && data.length > 0) setItems(data);
    });
  }, []);

  return (
    <section id="gallery" className="py-32 md:py-48 bg-secondary/20">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-body text-sm tracking-[0.4em] uppercase mb-4 font-bold">Visual Splendor</p>
          <h2 className="font-heading text-4xl md:text-6xl text-saffron-gradient">Our Highlights</h2>
        </motion.div>

        <div className="columns-2 md:columns-3 gap-6 space-y-6">
          {items.map((img, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden cursor-pointer group rounded-2xl break-inside-avoid"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(i)}
            >
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              
              {img.image_url ? (
                <img 
                  src={img.image_url} 
                  alt={img.alt_text || img.label} 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              ) : (
                <div className="aspect-[3/4] flex flex-col items-center justify-center bg-card border border-border/40 p-4">
                  <span className="text-5xl group-hover:scale-110 transition-transform">{'emoji' in img ? img.emoji : '🖼️'}</span>
                  <p className="text-foreground/60 font-heading text-xs mt-3 text-center">{img.label}</p>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <p className="text-white font-heading text-sm tracking-widest uppercase">{img.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md p-4 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div 
              className="relative max-w-5xl w-full max-h-full flex flex-col items-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="absolute -top-12 right-0 text-white hover:text-primary transition-colors text-xl font-heading"
                onClick={() => setSelected(null)}
              >
                Close ✕
              </button>

              <div className="w-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black/20">
                {items[selected].image_url ? (
                  <img src={items[selected].image_url!} alt={items[selected].alt_text || ''} className="w-full h-full max-h-[70vh] object-contain" />
                ) : (
                  <div className="h-96 flex items-center justify-center">
                    <span className="text-8xl">{'emoji' in items[selected] ? (items[selected] as any).emoji : '🖼️'}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-8 text-center text-white">
                <h3 className="font-heading text-3xl md:text-4xl text-saffron-gradient mb-2">{items[selected].label}</h3>
                <p className="text-muted-foreground font-body max-w-lg mx-auto italic">{items[selected].alt_text || 'Capture from the divine performance of Shakti Leela.'}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
