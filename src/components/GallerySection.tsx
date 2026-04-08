import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const galleryImages = [
  { src: '', alt: 'Divine dance performance', emoji: '🎭', label: 'Performance' },
  { src: '', alt: 'Traditional costumes', emoji: '👗', label: 'Costumes' },
  { src: '', alt: 'Stage setup', emoji: '🪔', label: 'Stage Design' },
  { src: '', alt: 'Young artists', emoji: '🌟', label: 'Young Artists' },
  { src: '', alt: 'Devi depiction', emoji: '🙏', label: 'Devi Leela' },
  { src: '', alt: 'Audience', emoji: '🎶', label: 'Live Music' },
];

export default function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-secondary/40">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.h2
          className="font-heading text-3xl md:text-5xl text-center text-saffron-gradient mb-12"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          Gallery
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              className={`warm-card overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow rounded-xl ${i === 0 || i === 5 ? 'row-span-2' : ''}`}
              style={{ minHeight: i === 0 || i === 5 ? '320px' : '200px' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelected(i)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-secondary/50 to-muted/50 p-4">
                <span className="text-5xl md:text-6xl group-hover:scale-110 transition-transform">{img.emoji}</span>
                <p className="text-foreground/60 font-heading text-sm mt-3">{img.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="warm-card p-12 text-center max-w-md shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-8xl block mb-4">{galleryImages[selected].emoji}</span>
              <h3 className="font-heading text-2xl text-primary mb-2">{galleryImages[selected].label}</h3>
              <p className="text-muted-foreground text-sm">{galleryImages[selected].alt}</p>
              <button
                className="mt-6 px-6 py-2 rounded-lg bg-secondary text-foreground font-body text-sm hover:bg-secondary/80 transition-colors"
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
