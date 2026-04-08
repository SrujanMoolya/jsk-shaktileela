import { motion } from 'framer-motion';

const pastShows = [
  {
    id: 1,
    name: 'Shakti Leela – Chapter I',
    date: 'January 2025',
    location: 'Vashi Auditorium, Navi Mumbai',
    description: 'The inaugural performance depicting the divine origin of Devi Shakti and the defeat of Mahishasura.',
    photos: ['🎭', '🪔', '💃'],
    videoLink: '#',
  },
  {
    id: 2,
    name: 'Shakti Leela – Chapter II',
    date: 'March 2025',
    location: 'Ravindra Natya Mandir, Mumbai',
    description: 'The second chapter portraying the divine battles of Devi and the grace bestowed upon devotees.',
    photos: ['🙏', '🎶', '🌸'],
    videoLink: '#',
  },
  {
    id: 3,
    name: 'Shakti Leela – Grand Finale',
    date: 'June 2025',
    location: 'Shanmukhananda Hall, Mumbai',
    description: 'The grand conclusion showcasing the complete Devi Mahatme with all nine forms of Durga.',
    photos: ['✨', '🔱', '🪷'],
    videoLink: '#',
  },
];

export default function ShowsSection() {
  return (
    <section id="shows" className="py-24 md:py-32 bg-secondary/40">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.p
          className="text-primary font-body text-sm tracking-[0.3em] uppercase text-center mb-3"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          Our Journey
        </motion.p>
        <motion.h2
          className="font-heading text-3xl md:text-5xl text-center text-saffron-gradient mb-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          Past Performances
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-center text-sm mb-12 max-w-lg mx-auto"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          Relive the divine moments from our past shows. Each performance is a step towards spreading the message of Dharma.
        </motion.p>

        <div className="space-y-8">
          {pastShows.map((show, i) => (
            <motion.div
              key={show.id}
              className="warm-card p-6 md:p-8 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Show Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-body px-3 py-1 rounded-full bg-primary/15 text-primary">
                      Completed
                    </span>
                    <span className="text-muted-foreground text-sm">📅 {show.date}</span>
                  </div>
                  <h3 className="font-heading text-xl md:text-2xl text-foreground mb-2">{show.name}</h3>
                  <p className="text-muted-foreground text-sm font-body mb-2">📍 {show.location}</p>
                  <p className="text-foreground/70 text-sm leading-relaxed">{show.description}</p>
                </div>

                {/* Photos & Video Preview */}
                <div className="flex flex-col items-center gap-3">
                  <div className="flex gap-2">
                    {show.photos.map((emoji, j) => (
                      <div
                        key={j}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-secondary/60 flex items-center justify-center text-2xl md:text-3xl"
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <a
                    href={show.videoLink}
                    className="text-primary text-sm font-body hover:underline flex items-center gap-1"
                  >
                    ▶ Watch Highlights
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
