import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jskLogo from '@/assets/jsk-logo.png';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Shows', href: '#shows' },
  { label: 'Characters', href: '#characters' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Book Us', href: '#booking' },
  { label: 'Invite', href: '#invite' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm py-2' : 'py-4'}`}>
      <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img src={jskLogo} alt="Jnana Shiksha Kendra" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-heading text-primary text-lg tracking-wider">Shakti Leela</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-foreground/70 hover:text-primary text-sm font-body transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-primary text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden bg-card border border-border mt-2 mx-4 rounded-xl p-4 space-y-3 shadow-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block text-foreground/70 hover:text-primary text-sm font-body py-2 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
