export default function FooterSection() {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-heading text-gold text-lg mb-3">Jnana Shiksha Kendra</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A cultural and spiritual initiative dedicated to preserving Sanatana Dharma through performing arts, education, and community engagement.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-gold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {['About', 'Shows', 'Gallery', 'Booking', 'Invite'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-muted-foreground hover:text-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-gold text-lg mb-3">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📍 Navi Mumbai, Maharashtra, India</p>
              <p>📧 contact@shaktileela.in</p>
              <p>📞 +91 XXXXX XXXXX</p>
            </div>
            <div className="flex gap-4 mt-4">
              {['Instagram', 'YouTube', 'Facebook'].map(social => (
                <a key={social} href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border/30 pt-6 text-center">
          <p className="text-muted-foreground/60 text-xs font-body">
            © 2026 Shakti Leela – Jnana Shiksha Kendra. All rights reserved. 🙏
          </p>
        </div>
      </div>
    </footer>
  );
}
