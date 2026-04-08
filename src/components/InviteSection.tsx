import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function InviteSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="invite" className="py-24 md:py-32 relative">
      <div className="section-gradient absolute inset-0" />
      <div className="container max-w-xl mx-auto px-4 relative">
        <motion.h2
          className="font-heading text-3xl md:text-5xl text-center text-gold-gradient mb-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          Invite Shakti Leela
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-center mb-10"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          Want us to perform at your event? Fill in the details below.
        </motion.p>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="done" className="glass-card p-10 text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <div className="text-6xl mb-4">🙏</div>
              <h3 className="font-heading text-2xl text-gold mb-2">Thank You!</h3>
              <p className="text-muted-foreground">We'll get back to you soon.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              className="glass-card p-8 space-y-5"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              {[
                { label: 'Your Name', key: 'name', type: 'text', placeholder: 'Full name' },
                { label: 'Organization', key: 'org', type: 'text', placeholder: 'Organization or temple name' },
                { label: 'Location', key: 'location', type: 'text', placeholder: 'City, State' },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-body text-foreground/70 mb-1.5">{label}</label>
                  <input
                    type={type}
                    required
                    placeholder={placeholder}
                    className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-body text-foreground/70 mb-1.5">Message</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your event..."
                  className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-heading text-sm tracking-wider uppercase glow-gold transition-all hover:scale-[1.02]"
              >
                Invite Shakti Leela
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
