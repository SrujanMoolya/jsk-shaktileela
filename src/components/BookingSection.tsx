import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const events = [
  'Shakti Leela – Chapter I (May 15)',
  'Shakti Leela – Grand Finale (Aug 10)',
];

export default function BookingSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', tickets: '1', event: events[0] });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="booking" className="py-24 md:py-32 relative">
      <div className="section-gradient absolute inset-0" />
      <div className="container max-w-xl mx-auto px-4 relative">
        <motion.p
          className="text-gold font-body text-sm tracking-[0.3em] uppercase text-center mb-3"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          Reserve Your Seat
        </motion.p>
        <motion.h2
          className="font-heading text-3xl md:text-5xl text-center text-gold-gradient mb-10"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          Book Tickets
        </motion.h2>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              className="glass-card p-10 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="text-6xl mb-4">✨</div>
              <h3 className="font-heading text-2xl text-gold mb-2">Booking Confirmed!</h3>
              <p className="text-muted-foreground">We'll send you a confirmation shortly.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              className="glass-card p-8 space-y-5"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {[
                { label: 'Full Name', type: 'text', key: 'name', placeholder: 'Enter your name' },
                { label: 'Phone Number', type: 'tel', key: 'phone', placeholder: '+91 XXXXX XXXXX' },
              ].map(({ label, type, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-body text-foreground/70 mb-1.5">{label}</label>
                  <input
                    type={type}
                    required
                    placeholder={placeholder}
                    className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors"
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-body text-foreground/70 mb-1.5">Number of Tickets</label>
                <select
                  className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-gold/50 transition-colors"
                  value={form.tickets}
                  onChange={(e) => setForm({ ...form, tickets: e.target.value })}
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Ticket' : 'Tickets'}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-body text-foreground/70 mb-1.5">Select Event</label>
                <select
                  className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-gold/50 transition-colors"
                  value={form.event}
                  onChange={(e) => setForm({ ...form, event: e.target.value })}
                >
                  {events.map(ev => (
                    <option key={ev} value={ev}>{ev}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-heading text-sm tracking-wider uppercase glow-gold transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_hsl(43_80%_55%/0.4)]"
              >
                Confirm Booking
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
