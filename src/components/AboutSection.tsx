import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: i * 0.15 }
  }),
};

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container max-w-4xl mx-auto px-4 relative">
        <motion.p
          className="text-primary font-body text-sm tracking-[0.3em] uppercase text-center mb-3"
          variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          About the Production
        </motion.p>
        <motion.h2
          className="font-heading text-3xl md:text-5xl text-center text-saffron-gradient mb-8"
          variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          The Story of Shakti Leela
        </motion.h2>
        <motion.p
          className="text-foreground/80 text-center text-lg leading-relaxed mb-12"
          variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          Shakti Leela – Shri Sampurna Devi Mahatme is a grand mythological dance drama 
          inspired by the sacred text <span className="text-primary font-medium">Devi Mahatme</span>. 
          It brings to life the divine stories of the Mother Goddess through classical dance, 
          music, and theatrical performance, celebrating the eternal power of Shakti.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '📜', title: 'Inspired by Devi Mahatme', desc: 'Rooted in the ancient scripture celebrating the Divine Mother\'s glory and power.' },
            { icon: '🙏', title: 'Founded by Anvith Poojary', desc: 'A visionary initiative to preserve and propagate Sanatana Dharma through art.' },
            { icon: '🪔', title: 'Dharmaprachar Initiative', desc: 'Dedicated to spreading dharmic values through performing arts and cultural events.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="warm-card p-6 text-center hover:shadow-md transition-shadow"
              variants={fadeUp} custom={i + 3} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-heading text-primary text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
