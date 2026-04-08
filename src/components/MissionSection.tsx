import { motion } from 'framer-motion';

export default function MissionSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="section-gradient absolute inset-0" />
      
      {/* Divine light rays */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] animate-rays opacity-[0.03]"
          style={{
            background: 'conic-gradient(from 0deg, transparent, hsl(43 80% 55%), transparent, hsl(43 80% 55%), transparent)',
          }}
        />
      </div>

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
          className="font-heading text-3xl md:text-5xl text-gold-gradient mb-6"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          Our Mission
        </motion.h2>
        <motion.p
          className="text-foreground/80 text-lg leading-relaxed mb-6"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
        >
          Shakti Leela is <span className="text-gold font-medium">not a commercial production</span>. 
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
