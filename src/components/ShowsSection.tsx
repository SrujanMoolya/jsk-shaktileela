import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { Calendar, MapPin, Play, CheckCircle2, Star } from 'lucide-react';

type Event = Tables<'events'>;

const fallbackShows = [
  { id: '1', name: 'Shakti Leela – Chapter I', date: 'January 2025', location: 'Vashi Auditorium, Navi Mumbai', description: 'The inaugural performance depicting the divine origin of Devi Shakti and the defeat of Mahishasura.', photos: [] as string[], video_link: '#', status: 'past' },
  { id: '2', name: 'Shakti Leela – Chapter II', date: 'March 2025', location: 'Ravindra Natya Mandir, Mumbai', description: 'The second chapter portraying the divine battles of Devi and the grace bestowed upon devotees.', photos: [] as string[], video_link: '#', status: 'past' },
  { id: '3', name: 'Shakti Leela – Grand Finale', date: 'June 2025', location: 'Shanmukhananda Hall, Mumbai', description: 'The grand conclusion showcasing the complete Devi Mahatme with all nine forms of Durga.', photos: [] as string[], video_link: '#', status: 'past' },
];

export default function ShowsSection() {
  const [shows, setShows] = useState<(Event | typeof fallbackShows[0])[]>(fallbackShows);

  useEffect(() => {
    supabase.from('events').select('*').order('display_order').then(({ data }) => {
      if (data && data.length > 0) setShows(data);
    });
  }, []);

  const pastShows = shows.filter(s => s.status === 'past');
  const upcomingShows = shows.filter(s => s.status === 'upcoming');

  return (
    <section id="shows" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-secondary/30 to-transparent" />
      <div className="absolute -left-20 top-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -right-20 bottom-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="mb-16">
          <motion.div 
            className="flex flex-col items-center justify-center text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-primary/40" />
              <p className="text-primary font-body text-xs md:text-sm tracking-[0.4em] uppercase font-semibold">
                Divine Timeline
              </p>
              <div className="h-px w-8 bg-primary/40" />
            </div>
            <h2 className="font-heading text-4xl md:text-6xl text-saffron-gradient py-2">
              Our Journey
            </h2>
            <p className="text-muted-foreground max-w-lg font-body text-sm md:text-base">
              A chronicle of sacred performances bringing the legends of Devi Shakti to life across prestigious stages.
            </p>
          </motion.div>
        </div>

        {upcomingShows.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="font-heading text-xl md:text-2xl text-foreground flex items-center gap-2">
                <Star className="w-5 h-5 text-primary fill-primary/20" />
                Upcoming Appearances
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-border/60 to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingShows.map((show, i) => (
                <ShowCard key={show.id} show={show} index={i} upcoming />
              ))}
            </div>
          </div>
        )}

        {pastShows.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="font-heading text-xl md:text-2xl text-muted-foreground/80 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-muted-foreground/50" />
                Past Milestones
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-border/60 to-transparent" />
            </div>
            <div className="space-y-8">
              {pastShows.map((show, i) => (
                <LongShowCard key={show.id} show={show} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ShowCard({ show, index, upcoming }: { show: any; index: number; upcoming?: boolean }) {
  return (
    <motion.div
      className="group relative bg-card/50 backdrop-blur-sm border border-border/60 rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="p-8 space-y-5">
        <div className="flex items-center justify-between">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="text-[10px] md:text-xs font-heading tracking-[0.15em] uppercase text-primary font-bold px-3 py-1 rounded-full bg-primary/5">
            {upcoming ? 'En Route' : 'Fulfilled'}
          </span>
        </div>
        
        <div>
          <span className="text-[11px] font-body text-muted-foreground uppercase tracking-widest">{show.date}</span>
          <h3 className="font-heading text-xl md:text-2xl text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">
            {show.name}
          </h3>
          <div className="flex items-start gap-2 text-muted-foreground/80 text-sm font-body">
            <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary/60" />
            <span>{show.location}</span>
          </div>
        </div>

        <p className="text-foreground/70 text-sm leading-relaxed line-clamp-3 font-body">
          {show.description}
        </p>
      </div>
    </motion.div>
  );
}

function LongShowCard({ show, index }: { show: any; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className="group relative bg-card/40 backdrop-blur-[2px] border border-border/40 rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-500"
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
        {/* Visual Content */}
        <div className="lg:w-2/5 relative min-h-[250px] md:min-h-[300px] lg:min-h-[auto] bg-secondary/20 overflow-hidden">
          {show.photos && show.photos.length > 0 ? (
            <div className="absolute inset-0 grid grid-cols-2 gap-1.5 p-4">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 group-hover:scale-[1.02] transition-transform duration-700">
                <img src={show.photos[0]} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-rows-2 gap-1.5">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 group-hover:scale-[1.02] transition-transform duration-700 delay-75">
                  <img src={show.photos[1] || show.photos[0]} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="relative overflow-hidden rounded-2xl border border-white/10 group-hover:scale-[1.02] transition-transform duration-700 delay-150">
                  <img src={show.photos[2] || show.photos[0]} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary/40 to-muted/40">
              <div className="text-5xl filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-700 scale-125 group-hover:scale-150 transform">
                {['🎭', '🪔', '💃'][index % 3]}
              </div>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {show.video_link && show.video_link !== '#' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]">
              <a 
                href={show.video_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-all duration-500 hover:bg-primary/90"
              >
                <Play className="w-7 h-7 fill-current ml-1" />
              </a>
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className={`lg:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center ${!isEven ? 'lg:text-right' : ''}`}>
          <div className={`flex flex-wrap items-center gap-4 mb-6 ${!isEven ? 'lg:justify-end' : ''}`}>
            <span className="text-[12px] font-body font-medium bg-secondary/80 text-muted-foreground px-4 py-1.5 rounded-full uppercase tracking-widest border border-border/50 backdrop-blur-sm">
              {show.date}
            </span>
            <div className="flex items-center gap-2 text-primary text-[11px] font-heading font-bold uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-4 h-4" />
              Completed Show
            </div>
          </div>

          <h3 className="font-heading text-3xl md:text-4xl text-foreground mb-6 group-hover:text-primary transition-colors duration-300 leading-tight">
            {show.name}
          </h3>

          <div className={`flex items-start gap-2.5 text-muted-foreground/90 mb-8 font-body text-sm md:text-base ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
            <MapPin className="w-5 h-5 mt-0.5 text-primary/60 shrink-0" />
            <span className="font-medium">{show.location}</span>
          </div>

          <p className={`text-foreground/80 leading-relaxed font-body text-base md:text-lg mb-8 ${isEven ? 'border-l-2 border-primary/20 pl-6' : 'border-r-2 border-primary/20 pr-6'}`}>
            {show.description}
          </p>

          {show.video_link && show.video_link !== '#' && (
            <div className={`mt-auto ${!isEven ? 'lg:justify-end' : ''} flex`}>
              <a 
                href={show.video_link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group/btn inline-flex items-center gap-3 text-primary text-xs font-heading font-bold uppercase tracking-[0.25em] bg-transparent hover:bg-primary/5 px-6 py-3 rounded-full border border-primary/20 transition-all"
              >
                Watch Highlights <Play className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
