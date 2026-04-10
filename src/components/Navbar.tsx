import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jskLogo from '@/assets/jsk-logo.png';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Shows', href: '#shows' },
  { label: 'Characters', href: '#characters' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Invite', href: '#booking' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm py-2'
          : 'bg-background/90 backdrop-blur-sm border-b border-border/20 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between gap-4">

        {/* Logo */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <img
            src={jskLogo}
            alt="JSK Logo"
            className="h-9 w-9 rounded-full object-cover border border-primary/30 group-hover:border-primary transition-colors duration-300"
          />
          <div>
            <div className="font-heading text-base text-saffron-gradient font-bold tracking-wider leading-none">
              Shakti Leela
            </div>
            <div className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground font-body leading-tight">
              Jnana Shiksha Kendra
            </div>
          </div>
        </a>

        {/* Desktop Nav Links — centered */}
        <div className="hidden md:flex items-center gap-7 mx-auto">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-foreground/75 hover:text-primary text-[11px] font-heading font-semibold tracking-[0.15em] uppercase transition-colors duration-200 group"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-primary rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#booking"
            className="hidden sm:inline-flex items-center px-6 py-2 rounded-full bg-primary text-primary-foreground font-heading text-[11px] tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_20px_hsl(var(--primary)/0.4)]"
          >
            Book Now
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg border border-border/60 hover:border-primary/40 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-5 h-[1.5px] bg-foreground rounded-full origin-center"
              animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-foreground rounded-full"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-foreground rounded-full origin-center"
              animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden md:hidden border-t border-border/30 bg-background/98 backdrop-blur-md"
          >
            <div className="px-6 py-4 space-y-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-foreground/75 hover:text-primary text-sm font-body py-3 border-b border-border/30 last:border-0 transition-colors"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  {l.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center mt-3 px-6 py-3 rounded-full bg-primary text-primary-foreground font-heading text-xs tracking-widest uppercase"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
