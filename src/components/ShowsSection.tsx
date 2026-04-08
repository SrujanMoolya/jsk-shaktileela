import { motion } from 'framer-motion';
import { useState } from 'react';

const shows = [
  { id: 1, name: 'Shakti Leela – Chapter I', date: 'May 15, 2026', location: 'Vashi Auditorium, Navi Mumbai', status: 'Booking Open' },
  { id: 2, name: 'Shakti Leela – Chapter II', date: 'June 22, 2026', location: 'Ravindra Natya Mandir, Mumbai', status: 'Coming Soon' },
  { id: 3, name: 'Shakti Leela – Grand Finale', date: 'August 10, 2026', location: 'Shanmukhananda Hall, Mumbai', status: 'Booking Open' },
];

function ShowCard({ show, index }: { show: typeof shows[0]; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  return (
    <motion.div
      className="glass-card p-6 hover:border-gold/50 transition-all cursor-pointer"
      style={{ transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className={`text-xs font-body px-3 py-1 rounded-full ${show.status === 'Booking Open' ? 'bg-primary/20 text-gold' : 'bg-secondary text-muted-foreground'}`}>
          {show.status}
        </span>
        <span className="text-muted-foreground text-sm">🪔</span>
      </div>
      <h3 className="font-heading text-xl text-foreground mb-3">{show.name}</h3>
      <p className="text-gold text-sm font-body mb-1">📅 {show.date}</p>
      <p className="text-muted-foreground text-sm font-body mb-5">📍 {show.location}</p>
      <a
        href="#booking"
        className={`block text-center py-3 rounded-lg text-sm font-heading tracking-wider uppercase transition-all ${
          show.status === 'Booking Open'
            ? 'bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(43_80%_55%/0.3)]'
            : 'bg-secondary text-muted-foreground cursor-not-allowed'
        }`}
      >
        {show.status === 'Booking Open' ? 'Book Now' : 'Notify Me'}
      </a>
    </motion.div>
  );
}

export default function ShowsSection() {
  return (
    <section id="shows" className="py-24 md:py-32">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.p
          className="text-gold font-body text-sm tracking-[0.3em] uppercase text-center mb-3"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          Upcoming Performances
        </motion.p>
        <motion.h2
          className="font-heading text-3xl md:text-5xl text-center text-gold-gradient mb-12"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          Shows & Events
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {shows.map((show, i) => (
            <ShowCard key={show.id} show={show} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
