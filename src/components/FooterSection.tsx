import jskLogo from '@/assets/jsk-logo.png';

export default function FooterSection() {
  return (
    <footer className="border-t border-border py-12 bg-card">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src={jskLogo} alt="Jnana Shiksha Kendra Logo" loading="lazy" className="h-12 w-12 rounded-full object-cover" />
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
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '-')}`} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                    title={`Learn more about ${link}`}
                    aria-label={`Navigate to ${link} section`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-primary text-lg mb-3">Contact Us</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📍 Navi Mumbai, Maharashtra, India</p>
              <p>📧 <a href="mailto:contact@shaktileela.in" className="hover:text-primary transition-colors" aria-label="Email us at contact@shaktileela.in">contact@shaktileela.in</a></p>
              <p>📞 <a href="tel:+919029443349" className="hover:text-primary transition-colors" aria-label="Call us at +91 9029443349">+91 9029443349</a></p>
            </div>
            <div className="flex gap-4 mt-4">
              {['Instagram', 'YouTube', 'Facebook'].map(social => (
                <a 
                  key={social} 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  title={`Follow Shakti Leela on ${social}`}
                  aria-label={`Visit our ${social} page`}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center space-y-2">
          <p className="text-muted-foreground/60 text-xs font-body">
            © 2026 Shakti Leela – Jnana Shiksha Kendra. All rights reserved. 🙏
          </p>
          <p className="text-muted-foreground/40 text-[10px] tracking-widest uppercase font-body">
            Developed by <a href="https://21xengineers.svvaap.in" target="_blank" rel="noopener noreferrer" title="Professional Web Development - 21xengineers" className="text-primary/60 hover:text-primary underline-offset-4 hover:underline transition-all duration-300">21xengineers</a> – <a href="https://svvaap.in" target="_blank" rel="noopener noreferrer" title="Svvaap Innovation - Tech Solutions" className="text-primary/60 hover:text-primary underline-offset-4 hover:underline transition-all duration-300">svvaap innovation</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
