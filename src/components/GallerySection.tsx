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
    <section id="gallery" className="py-24 md:py-32 bg-secondary/40">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.h2 className="font-heading text-3xl md:text-5xl text-center text-saffron-gradient mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Gallery
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((img, i) => (
            <motion.div
              key={i}
              className={`warm-card overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow rounded-xl ${i === 0 || i === 5 ? 'row-span-2' : ''}`}
              style={{ minHeight: i === 0 || i === 5 ? '320px' : '200px' }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelected(i)}
              whileHover={{ scale: 1.02 }}
            >
              {img.image_url ? (
                <img src={img.image_url} alt={img.alt_text || img.label} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-secondary/50 to-muted/50 p-4">
                  <span className="text-5xl md:text-6xl group-hover:scale-110 transition-transform">{'emoji' in img ? img.emoji : '🖼️'}</span>
                  <p className="text-foreground/60 font-heading text-sm mt-3">{img.label}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.div className="warm-card p-8 text-center max-w-lg shadow-xl mx-4" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} onClick={e => e.stopPropagation()}>
              {items[selected].image_url ? (
                <img src={items[selected].image_url!} alt={items[selected].alt_text || ''} className="w-full max-h-96 object-contain rounded-lg mb-4" />
              ) : (
                <span className="text-8xl block mb-4">{'emoji' in items[selected] ? (items[selected] as any).emoji : '🖼️'}</span>
              )}
              <h3 className="font-heading text-2xl text-primary mb-2">{items[selected].label}</h3>
              <button className="mt-4 px-6 py-2 rounded-lg bg-secondary text-foreground font-body text-sm hover:bg-secondary/80 transition-colors" onClick={() => setSelected(null)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
