
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Instagram, Facebook, Twitter, Youtube, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brand-beige-dark text-primary mt-auto">
      <div className="premium-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          {/* Column 1: About Us */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-semibold text-brand-brown-dark">SpiceNut</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium dry fruits and spices sourced from the finest regions across the world. Serving quality since 2023.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-brand-brown transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-brand-brown transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-brand-brown transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="YouTube" className="text-muted-foreground hover:text-brand-brown transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", path: "/about" },
                { name: "Shop All", path: "/shop" },
                { name: "Corporate Gifting", path: "/corporate-gifting" },
                { name: "Blog", path: "/blog" },
                { name: "Contact Us", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-muted-foreground hover:text-brand-brown text-sm underline-animation"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Categories</h3>
            <ul className="space-y-3">
              {[
                { name: "Dry Fruits", path: "/shop/category/dry-fruits" },
                { name: "Spices", path: "/shop/category/spices" },
                { name: "Gift Boxes", path: "/shop/category/gift-boxes" },
                { name: "Bulk Orders", path: "/bulk-orders" },
                { name: "New Arrivals", path: "/shop?sort=new" },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-muted-foreground hover:text-brand-brown text-sm underline-animation"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm">
                <MapPin className="h-5 w-5 text-brand-brown-light flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  1234 Premium Avenue, <br />
                  Natureville, CA 90210
                </span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Phone className="h-5 w-5 text-brand-brown-light flex-shrink-0" />
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-brand-brown underline-animation">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Mail className="h-5 w-5 text-brand-brown-light flex-shrink-0" />
                <a href="mailto:hello@spicenut.com" className="text-muted-foreground hover:text-brand-brown underline-animation">
                  hello@spicenut.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-brand-beige py-6 flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-muted-foreground">
            © 2023 SpiceNut. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-xs text-muted-foreground hover:text-brand-brown underline-animation">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-xs text-muted-foreground hover:text-brand-brown underline-animation">
              Terms of Service
            </Link>
            <Link to="/shipping-policy" className="text-xs text-muted-foreground hover:text-brand-brown underline-animation">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
