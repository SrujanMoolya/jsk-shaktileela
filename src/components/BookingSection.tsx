import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const eventTypes = [
  'Temple Festival / Utsav',
  'Cultural Program',
  'School / College Event',
  'Corporate Event',
  'Private / Community Event',
  'Other',
];

export default function BookingSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', organization: '', location: '', eventType: eventTypes[0], date: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="booking" className="py-24 md:py-32">
      <div className="container max-w-xl mx-auto px-4 relative">
        <motion.p
          className="text-primary font-body text-sm tracking-[0.3em] uppercase text-center mb-3"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          Hire Our Team
        </motion.p>
        <motion.h2
          className="font-heading text-3xl md:text-5xl text-center text-saffron-gradient mb-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          Book Us for Your Event
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-center text-sm mb-10 max-w-md mx-auto"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          Want Shakti Leela to perform at your event? Fill out the form below and our team will get in touch with you.
        </motion.p>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              className="warm-card p-10 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="text-6xl mb-4">🙏</div>
              <h3 className="font-heading text-2xl text-primary mb-2">Request Received!</h3>
              <p className="text-muted-foreground">Our team will contact you shortly to discuss your event.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              className="warm-card p-8 space-y-5"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {[
                { label: 'Your Name', type: 'text', key: 'name', placeholder: 'Enter your name' },
                { label: 'Phone Number', type: 'tel', key: 'phone', placeholder: '+91 XXXXX XXXXX' },
                { label: 'Organization / Temple Name', type: 'text', key: 'organization', placeholder: 'e.g. Shri Ganapati Mandir Trust' },
                { label: 'Event Location', type: 'text', key: 'location', placeholder: 'City, Venue name' },
              ].map(({ label, type, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-body text-foreground/70 mb-1.5">{label}</label>
                  <input
                    type={type}
                    required
                    placeholder={placeholder}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-body text-foreground/70 mb-1.5">Event Type</label>
                  <select
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    value={form.eventType}
                    onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                  >
                    {eventTypes.map(ev => (
                      <option key={ev} value={ev}>{ev}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-body text-foreground/70 mb-1.5">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-body text-foreground/70 mb-1.5">Additional Message (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your event..."
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-heading text-sm tracking-wider uppercase transition-all hover:scale-[1.02] hover:shadow-md"
              >
                Submit Booking Request
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
