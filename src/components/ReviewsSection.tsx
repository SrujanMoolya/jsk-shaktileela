import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Star, Quote, MessageSquare, Send } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

export default function ReviewsSection() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', content: '', rating: 5, designation: '' });

  const { data: reviews, isLoading } = useQuery({
    queryKey: ['visible_reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_visible', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    console.log("Submitting review:", form);

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert({ 
          name: form.name, 
          content: form.content, 
          rating: form.rating, 
          designation: form.designation,
          is_visible: true 
        })
        .select();

      console.log("Review response:", { data, error });

      if (error) throw error;

      toast.success("Review submitted successfully! Thank you for sharing your experience.");
      setForm({ name: '', content: '', rating: 5, designation: '' });
      setShowForm(false);
    } catch (err: any) {
      console.error("Review submission error:", err);
      toast.error(err.message || "Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-24 md:py-32 bg-secondary/10 relative overflow-hidden">
      {/* Decorative quotes icons in background */}
      <Quote className="absolute top-10 left-10 w-32 h-32 text-primary/5 -rotate-12" />
      <Quote className="absolute bottom-10 right-10 w-32 h-32 text-primary/5 rotate-12" />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3">Testimonials</p>
          <h2 className="font-heading text-4xl md:text-5xl text-saffron-gradient mb-6">Words from our Devotees</h2>
          <div className="w-24 h-[1px] bg-primary/40 mx-auto mb-8" />
          
          <Button 
            onClick={() => setShowForm(!showForm)}
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/5 rounded-full px-8 py-6 h-auto font-heading tracking-widest uppercase text-xs"
          >
            {showForm ? 'Cancel Review' : 'Share Your Experience'}
          </Button>
        </motion.div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-xl mx-auto mb-20 overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="warm-card p-8 space-y-5 border-primary/20 bg-white/50 backdrop-blur-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-heading tracking-widest uppercase text-muted-foreground mb-1.5">Your Name</label>
                    <input
                      required
                      className="w-full bg-white border border-border rounded-lg px-4 py-2.5 outline-none focus:border-primary/50 transition-colors"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-heading tracking-widest uppercase text-muted-foreground mb-1.5">Designation (Optional)</label>
                    <input
                      className="w-full bg-white border border-border rounded-lg px-4 py-2.5 outline-none focus:border-primary/50 transition-colors"
                      value={form.designation}
                      onChange={e => setForm({...form, designation: e.target.value})}
                      placeholder="e.g. Devotee / Artist"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-heading tracking-widest uppercase text-muted-foreground mb-1.5">Your Thoughts</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full bg-white border border-border rounded-lg px-4 py-3 outline-none focus:border-primary/50 transition-colors resize-none"
                    value={form.content}
                    onChange={e => setForm({...form, content: e.target.value})}
                    placeholder="Describe your experience watching Shakti Leela..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-heading tracking-widest uppercase text-muted-foreground">Rating:</span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setForm({...form, rating: star})}
                          className="focus:outline-none"
                        >
                          <Star size={18} className={star <= form.rating ? 'fill-primary text-primary' : 'text-muted-foreground/30'} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2.5"
                  >
                    {isSubmitting ? 'Submitting...' : 'Post Review'}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews?.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="warm-card p-8 border-primary/5 flex flex-col justify-between hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-secondary/5"
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground/80 font-body italic leading-relaxed mb-6">
                    "{review.content}"
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-6 border-t border-primary/10">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-lg">
                    {review.name[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-heading font-bold text-foreground">{review.name}</h4>
                    {review.designation && <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{review.designation}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && (!reviews || reviews.length === 0) && (
          <div className="text-center p-12 warm-card border-dashed border-primary/20">
            <MessageSquare className="w-12 h-12 text-primary/20 mx-auto mb-4" />
            <p className="text-muted-foreground font-body">Be the first to share your experience!</p>
          </div>
        )}
      </div>
    </section>
  );
}
