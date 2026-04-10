import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Character = Tables<'characters'>;

const fallbackCharacters = [
  { name: 'Devi Durga', emoji: '🔱', role: 'The Supreme Goddess', description: 'The fierce and compassionate Mother Goddess who vanquishes evil and protects dharma.', image_url: null },
  { name: 'Mahishasura', emoji: '🦬', role: 'The Demon King', description: 'The powerful buffalo-demon who obtained a boon of near-invincibility.', image_url: null },
  { name: 'Devi Lakshmi', emoji: '🪷', role: 'Goddess of Prosperity', description: 'The embodiment of wealth, fortune, and grace.', image_url: null },
  { name: 'Devi Saraswati', emoji: '📿', role: 'Goddess of Knowledge', description: 'The patron of arts, music, and learning.', image_url: null },
  { name: 'Lord Brahma', emoji: '🙏', role: 'The Creator', description: 'The creator of the universe.', image_url: null },
  { name: 'Lord Vishnu', emoji: '🪈', role: 'The Preserver', description: 'The sustainer of the cosmos.', image_url: null },
  { name: 'Lord Shiva', emoji: '🔱', role: 'The Destroyer', description: 'The ascetic god of transformation.', image_url: null },
  { name: 'Raktabeeja', emoji: '🩸', role: 'The Demon General', description: 'A fearsome demon who could multiply from every drop of his blood.', image_url: null },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function CharactersSection() {
  const [characters, setCharacters] = useState<(Character | typeof fallbackCharacters[0])[]>(fallbackCharacters);

  useEffect(() => {
    supabase.from('characters').select('*').order('display_order').then(({ data }) => {
      if (data && data.length > 0) setCharacters(data);
    });
  }, []);

  return (
    <section id="characters" className="py-32 md:py-48 relative overflow-hidden">
      {/* Subtle diagonal background strip */}
      <div className="absolute -left-24 top-0 h-full w-[40%] bg-secondary/25 -skew-x-6 z-0" />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-body text-xs tracking-[0.45em] uppercase mb-4 font-bold">
            Meet the Cast
          </p>
          <h2 className="font-heading text-saffron-gradient mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Characters of Shakti Leela
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-5" />
          <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
            The divine and mythological figures brought to life through classical dance and dramatic storytelling.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {characters.map((char, i) => (
            <motion.div
              key={char.name}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="warm-card overflow-hidden group cursor-pointer relative"
            >
              {/* Shimmer on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none z-10" />

              {/* Image Container */}
              <div className="w-full aspect-square bg-muted/30 flex items-center justify-center overflow-hidden relative">
                {char.image_url ? (
                  <motion.img
                    src={char.image_url}
                    alt={char.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-secondary/10 text-[10px] uppercase tracking-widest">
                    No Image
                  </div>
                )}
                {/* Golden border on hover */}
                <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/30 transition-all duration-300 pointer-events-none" />
              </div>

              {/* Text */}
              <div className="p-4 text-center">
                <h3 className="font-heading text-sm md:text-base text-foreground mb-1 leading-tight">{char.name}</h3>
                <p className="text-primary text-[10px] font-body font-bold uppercase tracking-wider mb-2">{char.role}</p>
                <p className="text-muted-foreground text-xs leading-relaxed opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-500">
                  {char.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
