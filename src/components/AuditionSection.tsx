import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Video, User, MapPin, Send, Stars } from 'lucide-react';

const AuditionSection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    details: '',
    location: '',
    video_url: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('auditions')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your audition proposal has been submitted. We will contact you soon.",
      });

      setFormData({
        name: '',
        details: '',
        location: '',
        video_url: '',
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: error.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="auditions" className="py-24 relative overflow-hidden bg-background">
      {/* Divine Aura Backgrounds */}
      <div className="divine-aura w-96 h-96 -top-20 -left-20" />
      <div className="divine-aura w-80 h-80 bottom-0 -right-20" style={{ background: 'radial-gradient(circle, hsl(var(--gold)), transparent)' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase mb-4 border border-primary/20">
              <Stars className="w-4 h-4" />
              Join the Divine Play
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-devi-gradient uppercase tracking-tighter">
              Audition for Shakti Leela
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
            <p className="text-xl text-primary font-medium max-w-2xl mx-auto italic">
              "We are seeking devotees of the arts to portray the facets of the Goddess. Share your performance and become part of the legend."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="devi-card p-8 md:p-12 mb-12 shadow-2xl shadow-primary/5"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-primary">
                    <User className="w-4 h-4" /> Name
                  </label>
                  <Input
                    required
                    placeholder="Enter your full name"
                    className="bg-ivory/50 border-primary/20 focus:border-primary focus:ring-primary/20 transition-all text-primary placeholder:text-primary/40"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-primary">
                    <MapPin className="w-4 h-4" /> Location
                  </label>
                  <Input
                    required
                    placeholder="City, State"
                    className="bg-ivory/50 border-primary/20 focus:border-primary focus:ring-primary/20 transition-all text-primary placeholder:text-primary/40"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-primary">
                  <Video className="w-4 h-4" /> Performance Video Link
                </label>
                <Input
                  required
                  type="url"
                  placeholder="YouTube, Google Drive, or Social Media video link"
                  className="bg-ivory/50 border-primary/20 focus:border-primary focus:ring-primary/20 transition-all font-mono text-sm text-primary placeholder:text-primary/40"
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                />
                <p className="text-xs text-primary/60 italic font-medium">Please ensure the link is public or accessible.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-primary">
                  Experience & Role Interest
                </label>
                <Textarea
                  required
                  placeholder="Tell us about your background and which aspect of Shakti Leela you're passionate about..."
                  className="min-h-[150px] bg-ivory/50 border-primary/20 focus:border-primary focus:ring-primary/20 transition-all text-primary placeholder:text-primary/40"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-black py-8 text-xl uppercase tracking-widest shadow-2xl shadow-primary/30 group transition-all duration-500 overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {loading ? 'Submitting...' : 'Submit Audition Proposal'}
                  <Send className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </span>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gold opacity-30 animate-pulse" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AuditionSection;
