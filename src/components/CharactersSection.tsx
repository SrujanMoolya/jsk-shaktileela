import { motion } from 'framer-motion';

const characters = [
  {
    name: 'Devi Durga',
    emoji: '🔱',
    role: 'The Supreme Goddess',
    description: 'The fierce and compassionate Mother Goddess who vanquishes evil and protects dharma. She is the central force of Shakti Leela.',
  },
  {
    name: 'Mahishasura',
    emoji: '🦬',
    role: 'The Demon King',
    description: 'The powerful buffalo-demon who obtained a boon of near-invincibility, defeated only by the divine feminine power of Devi.',
  },
  {
    name: 'Devi Lakshmi',
    emoji: '🪷',
    role: 'Goddess of Prosperity',
    description: 'The embodiment of wealth, fortune, and grace. She represents the nurturing and sustaining power of the divine.',
  },
  {
    name: 'Devi Saraswati',
    emoji: '📿',
    role: 'Goddess of Knowledge',
    description: 'The patron of arts, music, and learning. Her presence in the drama highlights the power of wisdom and creativity.',
  },
  {
    name: 'Lord Brahma',
    emoji: '🙏',
    role: 'The Creator',
    description: 'The creator of the universe who, along with Vishnu and Shiva, bestows divine energy to create Devi Durga.',
  },
  {
    name: 'Lord Vishnu',
    emoji: '🪈',
    role: 'The Preserver',
    description: 'The sustainer of the cosmos who contributes his divine weapons and power to the creation of Devi.',
  },
  {
    name: 'Lord Shiva',
    emoji: '🔱',
    role: 'The Destroyer',
    description: 'The ascetic god of transformation whose trident and energy are central to the birth of Devi Durga.',
  },
  {
    name: 'Raktabeeja',
    emoji: '🩸',
    role: 'The Demon General',
    description: 'A fearsome demon who could multiply from every drop of his blood — defeated by Devi Kali\'s ferocity.',
  },
];

export default function CharactersSection() {
  return (
    <section id="characters" className="py-24 md:py-32">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.p
          className="text-primary font-body text-sm tracking-[0.3em] uppercase text-center mb-3"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          The Divine Cast
        </motion.p>
        <motion.h2
          className="font-heading text-3xl md:text-5xl text-center text-saffron-gradient mb-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          Characters of Shakti Leela
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-center text-sm mb-12 max-w-lg mx-auto"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          Meet the divine and mythological figures brought to life through our dance drama.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {characters.map((char, i) => (
            <motion.div
              key={char.name}
              className="warm-card p-5 text-center hover:shadow-lg transition-shadow group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary/60 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                {char.emoji}
              </div>
              <h3 className="font-heading text-base md:text-lg text-foreground mb-1">{char.name}</h3>
              <p className="text-primary text-xs font-body mb-2">{char.role}</p>
              <p className="text-muted-foreground text-xs leading-relaxed">{char.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
