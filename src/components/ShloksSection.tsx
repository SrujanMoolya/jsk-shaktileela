import { motion } from 'framer-motion';

const shloks = [
  {
    sanskrit: "सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके । शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते ॥",
    translation: "Auspiciousness of all auspiciousness, Shiva, the fulfiller of all objectives, the Giver of Refuge, the Three-eyed Gauri, Narayani, we bow to you.",
  },
  {
    sanskrit: "या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता । नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः ॥",
    translation: "To that Devi who in all beings is established in the form of power, salutations to Her, salutations to Her, salutations to Her, salutations, salutations.",
  },
  {
    sanskrit: "नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते । शङ्खचक्रगदाहस्ते महालक्ष्मि नमोऽस्तु ते ॥",
    translation: "Salutations to You, O Mahamaya, who is worshipped by the gods at the Sri Pitha, and who holds a conch, a discus and a mace in Her hands; salutations to You, O Mahalakshmi.",
  }
];

export default function ShloksSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-[#1a1512] text-white">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="container max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-body text-xs tracking-[0.4em] uppercase mb-4 block">Divine Shlokas</span>
          <h2 className="font-heading text-3xl md:text-5xl mb-6 text-saffron-gradient">Blessings of the Mother</h2>
          <div className="w-20 h-px bg-primary/40 mx-auto" />
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {shloks.map((shlok, i) => (
            <motion.div
              key={i}
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <p className="font-heading text-xl md:text-3xl mb-6 leading-relaxed text-primary/90">
                {shlok.sanskrit}
              </p>
              <p className="text-white/80 font-body text-base md:text-xl font-medium italic leading-relaxed">
                "{shlok.translation}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Feature Quote from User's Screenshot */}
        <motion.div
          className="mt-24 md:mt-32 pt-16 border-t border-white/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
           <div className="inline-block p-1 rounded-full bg-primary/20 mb-6">
              <div className="px-6 py-2 rounded-full border border-primary/40 bg-[#251d18]">
                <span className="text-primary text-xs tracking-[0.2em] font-heading font-bold uppercase">Experience Shakti Leela</span>
              </div>
           </div>
           <h3 className="font-heading text-2xl md:text-4xl text-white/90 leading-tight italic">
            "Once we are here after watching we can't go back."
           </h3>
           <p className="mt-4 text-primary font-body text-sm tracking-widest uppercase font-bold">
             — A Divine Transformation
           </p>
        </motion.div>
      </div>
    </section>
  );
}
