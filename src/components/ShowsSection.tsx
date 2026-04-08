import { motion } from 'framer-motion';

const shows = [
  { id: 1, name: 'Shakti Leela – Chapter I', date: 'May 15, 2026', location: 'Vashi Auditorium, Navi Mumbai', status: 'Booking Open' },
  { id: 2, name: 'Shakti Leela – Chapter II', date: 'June 22, 2026', location: 'Ravindra Natya Mandir, Mumbai', status: 'Coming Soon' },
  { id: 3, name: 'Shakti Leela – Grand Finale', date: 'August 10, 2026', location: 'Shanmukhananda Hall, Mumbai', status: 'Booking Open' },
];

export default function ShowsSection() {
  return (
    <section id="shows" className="py-24 md:py-32 bg-secondary/40">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.p
          className="text-primary font-body text-sm tracking-[0.3em] uppercase text-center mb-3"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          Upcoming Performances
        </motion.p>
        <motion.h2
          className="font-heading text-3xl md:text-5xl text-center text-saffron-gradient mb-12"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          Shows & Events
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {shows.map((show, i) => (
            <motion.div
              key={show.id}
              className="warm-card p-6 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-body px-3 py-1 rounded-full ${show.status === 'Booking Open' ? 'bg-primary/15 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                  {show.status}
                </span>
                <span className="text-muted-foreground text-sm">🪔</span>
              </div>
              <h3 className="font-heading text-xl text-foreground mb-3">{show.name}</h3>
              <p className="text-primary text-sm font-body mb-1">📅 {show.date}</p>
              <p className="text-muted-foreground text-sm font-body mb-5">📍 {show.location}</p>
              <a
                href="#booking"
                className={`block text-center py-3 rounded-lg text-sm font-heading tracking-wider uppercase transition-all ${
                  show.status === 'Booking Open'
                    ? 'bg-primary text-primary-foreground hover:shadow-md'
                    : 'bg-secondary text-muted-foreground cursor-not-allowed'
                }`}
              >
                {show.status === 'Booking Open' ? 'Book Now' : 'Notify Me'}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
