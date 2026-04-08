import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';

const CosmicScene = lazy(() => import('./CosmicScene'));

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <CosmicScene />
      </Suspense>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background z-[1]" />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/4 left-[10%] text-5xl animate-float opacity-40">🪷</div>
        <div className="absolute top-1/3 right-[12%] text-4xl animate-float-delayed opacity-30">🔱</div>
        <div className="absolute bottom-1/3 left-[20%] text-3xl animate-float opacity-25">🪔</div>
      </div>

      {/* Content */}
      <div className="relative z-[2] text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-gold font-body text-sm md:text-base tracking-[0.3em] uppercase mb-6">
            Jnana Shiksha Kendra Presents
          </p>
        </motion.div>

        <motion.h1
          className="font-heading text-4xl md:text-6xl lg:text-8xl font-bold text-gold-gradient glow-text leading-tight mb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          Shakti Leela
        </motion.h1>

        <motion.p
          className="font-heading text-xl md:text-2xl lg:text-3xl text-foreground/80 mb-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Shri Sampurna Devi Mahatme
        </motion.p>

        <motion.p
          className="text-muted-foreground text-base md:text-lg mb-10 font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          A Divine Dance Drama Experience
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <a
            href="#booking"
            className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-heading text-sm tracking-wider uppercase glow-gold transition-all hover:scale-105 hover:shadow-[0_0_40px_hsl(43_80%_55%/0.4)]"
          >
            Book Tickets
          </a>
          <a
            href="#invite"
            className="px-8 py-4 rounded-lg glass border-gold/30 text-gold font-heading text-sm tracking-wider uppercase transition-all hover:scale-105 hover:border-gold/60"
          >
            Invite Us to Perform
          </a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[2]" />
    </section>
  );
}
