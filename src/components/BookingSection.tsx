import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', organization: '', location: '', eventType: eventTypes[0], date: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    console.log("Submitting booking request:", form);
    
    try {
      // 1. Save to Supabase Admin Panel
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          name: form.name,
          phone: form.phone,
          organization: form.organization,
          location: form.location,
          event_type: form.eventType,
          preferred_date: form.date || null,
          message: form.message
        })
        .select();

      console.log("Booking database response:", { data, error });

      if (error) {
        console.error("Supabase Error:", error);
        throw new Error(error.message || "Could not save to database");
      }

      // 2. Send email to jnanashikshakendra@gmail.com
      // Using FormSubmit API which doesn't require backend setup
      await fetch('https://formsubmit.co/ajax/jnanashikshakendra@gmail.com', {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Booking Request: ${form.organization || form.name}`,
          Name: form.name,
          Phone: form.phone,
          Organization: form.organization,
          Location: form.location,
          "Event Type": form.eventType,
          "Preferred Date": form.date || "Not specified",
          Message: form.message || "None",
          _replyto: "jnanashikshakendra@gmail.com"
        })
      }).catch(err => console.error("Email API Warning:", err));

      // 3. Generate WhatsApp text and redirect
      const whatsappText = `*New Booking Request - Shakti Leela*\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Organization:* ${form.organization}\n*Event Type:* ${form.eventType}\n*Location:* ${form.location}\n*Preferred Date:* ${form.date || 'Not specified'}\n\n*Message:* ${form.message}`;
      const whatsappUrl = `https://wa.me/919029443349?text=${encodeURIComponent(whatsappText)}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: '', phone: '', organization: '', location: '', eventType: eventTypes[0], date: '', message: '' });
      }, 5000);

    } catch (err) {
      console.error(err);
      alert("Failed to submit request. Please try again or contact us directly on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
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
          className="font-heading text-4xl md:text-6xl text-center text-saffron-gradient mb-6"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          Book Us for Your Event
        </motion.h2>

        {/* Worthy Features */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {[
            { label: '100+ Artists', icon: '🎭' },
            { label: 'Divine Themes', icon: '✨' },
            { label: 'Live Music', icon: '🎶' },
            { label: 'Grand Stage', icon: '🏛️' },
          ].map((item) => (
            <div key={item.label} className="text-center p-3 rounded-xl bg-secondary/20 border border-primary/10">
              <div className="text-xl mb-1">{item.icon}</div>
              <div className="text-[10px] font-heading font-bold uppercase tracking-widest text-primary">{item.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.p
          className="text-foreground/70 text-center text-sm mb-12 max-w-md mx-auto leading-relaxed border-b border-primary/20 pb-8 font-medium"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          Bring the divine energy of Shakti Leela to your temple, community, or corporate event. Our troupe of 100+ artists delivers a world-class mythological experience.
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
                { label: 'Phone Number', type: 'tel', key: 'phone', placeholder: '+91 9029443349' },
                { label: 'Organization / Temple Name', type: 'text', key: 'organization', placeholder: 'e.g. Shri Ganapati Mandir Trust' },
                { label: 'Event Location', type: 'text', key: 'location', placeholder: 'City, Venue name' },
              ].map(({ label, type, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-body text-foreground/90 mb-1.5 font-semibold">{label}</label>
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
                  <label className="block text-sm font-body text-foreground/90 mb-1.5 font-semibold">Event Type</label>
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
                  <label className="block text-sm font-body text-foreground/90 mb-1.5 font-semibold">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-body text-foreground/90 mb-1.5 font-semibold">Additional Message (Optional)</label>
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
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg bg-primary text-primary-foreground font-heading text-sm tracking-wider uppercase transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-md'}`}
              >
                {isSubmitting ? 'Processing...' : 'Submit Booking Request'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
