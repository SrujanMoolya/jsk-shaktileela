import jskLogo from '@/assets/jsk-logo.png';

export default function FooterSection() {
  return (
    <footer className="border-t border-border py-12 bg-card">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src={jskLogo} alt="Jnana Shiksha Kendra" className="h-12 w-12 rounded-full object-cover" />
              <h3 className="font-heading text-primary text-lg">Jnana Shiksha Kendra</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Education Center of Supreme Knowledge — A cultural and spiritual initiative dedicated to preserving Sanatana Dharma through performing arts, education, and community engagement.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-primary text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {['About', 'Shows', 'Characters', 'Gallery', 'Book Us', 'Invite'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-primary text-lg mb-3">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📍 Navi Mumbai, Maharashtra, India</p>
              <p>📧 contact@shaktileela.in</p>
              <p>📞 +91 XXXXX XXXXX</p>
            </div>
            <div className="flex gap-4 mt-4">
              {['Instagram', 'YouTube', 'Facebook'].map(social => (
                <a key={social} href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center">
          <p className="text-muted-foreground/60 text-xs font-body">
            © 2026 Shakti Leela – Jnana Shiksha Kendra. All rights reserved. 🙏
          </p>
        </div>
      </div>
    </footer>
  );
}
