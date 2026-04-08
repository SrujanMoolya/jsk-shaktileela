import { motion } from 'framer-motion';

const highlights = [
  { icon: '🎭', title: 'Live Dance Drama', desc: 'Classical and folk dance fusion bringing divine stories to life on stage.' },
  { icon: '👗', title: 'Handcrafted Costumes', desc: 'Exquisite traditional costumes designed to honor each divine character.' },
  { icon: '📖', title: 'Spiritual Storytelling', desc: 'Ancient narratives woven with devotion, drama, and dance.' },
  { icon: '🌟', title: 'Youth Artists', desc: 'Talented young performers trained in dharmic arts and classical traditions.' },
];

export default function HighlightsSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.h2
          className="font-heading text-3xl md:text-5xl text-center text-saffron-gradient mb-14"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          What Makes It Special
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              className="text-center p-6 warm-card hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="text-5xl mb-4">{h.icon}</div>
              <h3 className="font-heading text-primary text-lg mb-2">{h.title}</h3>
              <p className="text-muted-foreground text-sm">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
