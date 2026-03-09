import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "www.facebook.com", label: "Facebook" },
    { icon: Twitter, href: "www.twitter.com", label: "Twitter" },
    { icon: Instagram, href: "www.instragram.com", label: "Instagram" },
    { icon: Youtube, href: "www.youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="footer">
      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="footer-copy">
            © 2025 Cookify. All rights reserved.
          </div>

          <div className="footer-social">
            {socialLinks.map((item, i) => (
              <a key={i} href={item.href} aria-label={item.label}>
                <item.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
