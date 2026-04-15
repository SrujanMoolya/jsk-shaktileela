import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Character = Tables<'characters'>;

const fallbackCharacters = [
  { name: 'Devi Durga', image_url: 'https://yjskoofqxnnvuuapclfg.supabase.co/storage/v1/object/public/media/img/7.jpeg' },
  { name: 'Mahishasura', image_url: 'https://yjskoofqxnnvuuapclfg.supabase.co/storage/v1/object/public/media/img/20.jpeg' },
  { name: 'Devi Lakshmi', image_url: 'https://yjskoofqxnnvuuapclfg.supabase.co/storage/v1/object/public/media/img/21.jpeg' },
  { name: 'Devi Saraswati', image_url: 'https://yjskoofqxnnvuuapclfg.supabase.co/storage/v1/object/public/media/img/3.jpeg' },
  { name: 'Lord Brahma', image_url: 'https://yjskoofqxnnvuuapclfg.supabase.co/storage/v1/object/public/media/img/WhatsApp-Image-2026-04-07-at-7.50.11-PM.jpeg' },
  { name: 'Lord Vishnu', image_url: 'https://yjskoofqxnnvuuapclfg.supabase.co/storage/v1/object/public/media/img/WhatsApp-Image-2026-04-07-at-7.59.30-PM.jpeg' },
];

export default function CharactersSection() {
  const [characters, setCharacters] = useState<(Partial<Character>)[]>(fallbackCharacters);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'center',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });

  useEffect(() => {
    supabase.from('characters').select('*').order('display_order').then(({ data }) => {
      if (data && data.length > 0) {
        const filteredData = data.filter(c => c.image_url);
        if (filteredData.length > 0) setCharacters(filteredData);
      }
    });
  }, []);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section id="characters" className="py-24 md:py-32 relative overflow-hidden bg-secondary/5">
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-body text-xs tracking-[0.45em] uppercase mb-4 font-bold">
            The Divine Presence
          </p>
          <h2 className="font-heading text-saffron-gradient mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Characters of Shakti Leela
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        <div className="relative group">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {characters.map((char, i) => (
                <div key={i} className="flex-[0_0_85%] min-w-0 pl-4 sm:flex-[0_0_45%] lg:flex-[0_0_31%]">
                  <motion.div
                    className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl gold-glow-hover group/card cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    {char.image_url ? (
                      <img
                        src={char.image_url}
                        alt={char.name || `Character ${i}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-secondary/20">
                        <span className="text-muted-foreground uppercase tracking-widest text-xs">No Image</span>
                      </div>
                    )}
                    
                    {/* Rich Dark Gradient Overlay for optimal text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover/card:opacity-95" />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end transform transition-transform duration-500 translate-y-8 group-hover/card:translate-y-0">
                      <h3 className="text-white font-heading text-2xl lg:text-3xl uppercase tracking-widest drop-shadow-lg mb-1">
                        {char.name}
                      </h3>
                      
                      {char.role && (
                        <p className="text-primary font-body text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-3 drop-shadow-md">
                          {char.role}
                        </p>
                      )}
                      
                      <div className="overflow-hidden">
                        <p className="text-white/80 font-body text-sm line-clamp-3 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-100 translate-y-4 group-hover/card:translate-y-0 leading-relaxed">
                          {char.description || 'Experience the divine presence in the grand theatrical presentation of Shakti Leela.'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-primary/20 text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-white"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-primary/20 text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-white"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <p className="text-center text-muted-foreground/60 text-xs mt-12 italic uppercase tracking-widest">
          Slide to view more characters
        </p>
      </div>
    </section>
  );
}
