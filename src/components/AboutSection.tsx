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
    <section id="about" className="relative py-32 md:py-48 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 z-0" />
      
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10 rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl border-8 border-white">
              <img 
                src="https://yjskoofqxnnvuuapclfg.supabase.co/storage/v1/object/public/media/img/WhatsApp-Image-2026-04-07-at-7.50.11-PM.jpeg" 
                alt="Shakti Leela Story" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Ornate back decorations */}
            <div className="absolute -top-10 -left-10 w-40 h-40 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl z-0" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border-b-2 border-r-2 border-primary/30 rounded-br-3xl z-0" />
          </motion.div>

          {/* Text Side */}
          <div className="space-y-8">
            <motion.div
              variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <p className="text-primary font-body text-sm tracking-[0.4em] uppercase mb-4 font-bold">
                The Divine Narrative
              </p>
              <h2 className="font-heading text-4xl md:text-6xl text-devi-gradient leading-[1.1] mb-6 uppercase tracking-tighter">
                The Story of <br /> Shakti Leela
              </h2>
              <div className="w-20 h-1 bg-primary mb-8" />
            </motion.div>

            <motion.div
              className="space-y-6 text-primary font-body font-semibold italic text-lg leading-relaxed"
              variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <p>
                Shakti Leela – Shri Sampurna Devi Mahatme is a grand mythological dance drama 
                inspired by the sacred text <span className="text-primary font-bold italic">Devi Mahatme</span>. 
              </p>
              <p>
                It brings to life the divine stories of the Mother Goddess through a meticulously 
                choreographed blend of classical dance, soul-stirring music, and cinematic theatrical performance, 
                celebrating the eternal and omnipresent power of Shakti.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-6 pt-8">
              {[
                { icon: '📜', title: 'Scriptural Roots', desc: 'Inspired by Devi Mahatme' },
                { icon: '🙏', title: 'Faith & Art', desc: 'Dharmaprachar Initiative' },
                { icon: '🪔', title: 'Cultural Legacy', desc: 'Preserving Sanatana Dharma' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="space-y-2"
                  variants={fadeUp} custom={i + 2} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-heading text-primary text-sm font-bold tracking-wider">{item.title}</h3>
                  <p className="text-muted-foreground text-xs leading-tight">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
