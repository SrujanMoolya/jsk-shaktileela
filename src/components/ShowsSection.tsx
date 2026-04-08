import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

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
    <section id="shows" className="py-24 md:py-32 bg-secondary/40">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.p className="text-primary font-body text-sm tracking-[0.3em] uppercase text-center mb-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Our Journey
        </motion.p>
        <motion.h2 className="font-heading text-3xl md:text-5xl text-center text-saffron-gradient mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Performances
        </motion.h2>

        {upcomingShows.length > 0 && (
          <>
            <h3 className="font-heading text-xl text-primary text-center mb-6 mt-8">Upcoming Shows</h3>
            <div className="space-y-6 mb-12">
              {upcomingShows.map((show, i) => (
                <ShowCard key={show.id} show={show} index={i} upcoming />
              ))}
            </div>
          </>
        )}

        {pastShows.length > 0 && (
          <>
            <h3 className="font-heading text-xl text-muted-foreground text-center mb-6">Past Performances</h3>
            <div className="space-y-6">
              {pastShows.map((show, i) => (
                <ShowCard key={show.id} show={show} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function ShowCard({ show, index, upcoming }: { show: any; index: number; upcoming?: boolean }) {
  return (
    <motion.div
      className="warm-card p-6 md:p-8 hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-xs font-body px-3 py-1 rounded-full ${upcoming ? 'bg-primary/20 text-primary font-semibold' : 'bg-primary/15 text-primary'}`}>
              {upcoming ? 'Upcoming' : 'Completed'}
            </span>
            <span className="text-muted-foreground text-sm">📅 {show.date}</span>
          </div>
          <h3 className="font-heading text-xl md:text-2xl text-foreground mb-2">{show.name}</h3>
          <p className="text-muted-foreground text-sm font-body mb-2">📍 {show.location}</p>
          <p className="text-foreground/70 text-sm leading-relaxed">{show.description}</p>
        </div>
        <div className="flex flex-col items-center gap-3">
          {show.photos && show.photos.length > 0 ? (
            <div className="flex gap-2">
              {show.photos.slice(0, 3).map((url: string, j: number) => (
                <div key={j} className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border border-border">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-2">
              {['🎭', '🪔', '💃'].map((emoji, j) => (
                <div key={j} className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-secondary/60 flex items-center justify-center text-2xl md:text-3xl">{emoji}</div>
              ))}
            </div>
          )}
          {show.video_link && show.video_link !== '#' && (
            <a href={show.video_link} target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-body hover:underline flex items-center gap-1">
              ▶ Watch Highlights
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
