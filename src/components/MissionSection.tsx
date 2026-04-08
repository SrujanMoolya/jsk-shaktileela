import { motion } from 'framer-motion';

export default function MissionSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-secondary/40">
      <div className="container max-w-3xl mx-auto px-4 text-center relative">
        <motion.div
          className="text-5xl mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          🙏
        </motion.div>
        <motion.h2
          className="font-heading text-3xl md:text-5xl text-saffron-gradient mb-6"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          Our Mission
        </motion.h2>
        <motion.p
          className="text-foreground/80 text-lg leading-relaxed mb-6"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
        >
          Shakti Leela is <span className="text-primary font-medium">not a commercial production</span>. 
          It is a sacred offering — a Dharmaprachar initiative dedicated to reviving the art of 
          mythological storytelling and nurturing the next generation of dharmic artists.
        </motion.p>
        <motion.p
          className="text-muted-foreground text-base leading-relaxed"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
        >
          Every performance is an act of devotion — bridging ancient wisdom with modern art, 
          inspiring hearts to reconnect with Sanatana Dharma's timeless values.
        </motion.p>
      </div>
    </section>
  );
}
