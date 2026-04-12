import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const BASE = 'https://yjskoofqxnnvuuapclfg.supabase.co/storage/v1/object/public/media/img';

const heroImages = [
  `${BASE}/7.jpeg`,
  `${BASE}/WhatsApp-Image-2026-04-07-at-7.50.11-PM.jpeg`,
  `${BASE}/WhatsApp-Image-2026-04-07-at-7.59.30-PM.jpeg`,
  `${BASE}/20.jpeg`,
  `${BASE}/21.jpeg`,
  `${BASE}/3.jpeg`,
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.04,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.6, ease: 'easeIn' },
    }),
  };

  return (
    <section className="relative min-h-screen bg-background flex flex-col md:flex-row overflow-hidden pt-[56px]">

      {/* ===== LEFT: IMAGE CAROUSEL ===== */}
      <div className="relative w-full md:w-[55%] h-[50vh] md:h-screen overflow-hidden flex-shrink-0">
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <img
              src={heroImages[current]}
              alt={`Shakti Leela performance ${current + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Subtle right-side fade to blend with text panel */}
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-background hidden md:block" />
            {/* Bottom fade for mobile */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent md:hidden" />
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-6 h-2 bg-primary'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={() => { setDirection(-1); setCurrent((prev) => (prev - 1 + heroImages.length) % heroImages.length); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-background/60 backdrop-blur-sm border border-primary/20 text-primary text-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
        >
          ‹
        </button>
        <button
          onClick={() => { setDirection(1); setCurrent((prev) => (prev + 1) % heroImages.length); }}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-background/60 backdrop-blur-sm border border-primary/20 text-primary text-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
        >
          ›
        </button>

        {/* Image counter — bottom-left, away from navbar */}
        <div className="absolute bottom-5 left-5 z-10 font-heading text-xs tracking-widest text-white/60">
          <span className="text-primary font-bold text-base">{String(current + 1).padStart(2, '0')}</span>
          <span className="mx-1 opacity-50">/</span>
          {String(heroImages.length).padStart(2, '0')}
        </div>
      </div>

      {/* ===== RIGHT: TEXT CONTENT ===== */}
      <div className="relative z-10 w-full md:w-[45%] flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16 md:py-0">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-primary/30 rounded-full
                           text-primary font-body text-[10px] tracking-[0.3em] uppercase bg-primary/5 mb-6">
            🎭 &nbsp;Jnana Shiksha Kendra Presents
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-heading font-black text-saffron-gradient mb-3 leading-[1.05]"
          style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)' }}
          initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Shakti<br />Leela
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          className="h-[2px] bg-gradient-to-r from-primary via-primary/50 to-transparent mb-5"
          initial={{ width: 0 }}
          animate={{ width: '70%' }}
          transition={{ duration: 1, delay: 1.1 }}
        />

        {/* Subtitle */}
        <motion.p
          className="font-heading italic text-foreground/80 mb-4"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          Shri Sampurna Devi Mahatme
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-foreground font-body font-semibold leading-relaxed mb-10 max-w-sm"
          style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          A majestic mythological dance drama celebrating the eternal power of 
          the Divine Mother — through classical dance, music, and live theatre.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <a
            href="#booking"
            className="group relative px-10 py-5 overflow-hidden rounded-full bg-[#1a1512] text-white
                       font-heading text-sm tracking-[0.25em] uppercase transition-all duration-500
                       hover:shadow-[0_15px_40px_-10px_rgba(212,135,32,0.4)] hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-3">
              ✦ Book Our Team
              <span className="w-12 h-px bg-primary/80 group-hover:w-16 transition-all duration-500" />
            </span>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
          
          <a
            href="#shows"
            className="px-8 py-3.5 rounded-full border border-primary/30 text-primary/80
                       font-heading text-xs tracking-[0.2em] uppercase
                       transition-all duration-300 hover:bg-primary/5 hover:text-primary hover:border-primary"
          >
            View Shows →
          </a>
        </motion.div>

        {/* Shlok Quote */}
        <motion.div
          className="mb-8 border-l-2 border-primary/30 pl-5 italic"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <p className="text-primary font-heading text-base mb-1 font-bold">
            "या देवी सर्वभूतेषु शक्ति-रूपेण संस्थिता।"
          </p>
          <p className="text-foreground/80 text-[11px] uppercase tracking-widest font-body font-semibold">
            To that Goddess who resides in all beings as Power — Salutations!
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex gap-8 pt-8 border-t border-border/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          {[
            { num: '3+', label: 'Grand Shows' },
            { num: '20+', label: 'Artists' },
            { num: '5,000+', label: 'Audience' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-heading font-black text-saffron-gradient text-2xl md:text-3xl">{stat.num}</div>
              <div className="text-muted-foreground font-body text-[10px] uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
