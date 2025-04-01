
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ShoppingCart, User, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dry Fruits", path: "/shop?category=dry-fruits" },
    { name: "Spices", path: "/shop?category=spices" },
    { name: "Gift Boxes", path: "/shop?category=gift-boxes" },
    { name: "Corporate Gifting", path: "/corporate-gifting" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "py-2 bg-gradient-to-r from-brand-beige-light to-brand-gold-light/80 backdrop-blur-md shadow-premium-sm"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="premium-container">
        <div className="flex items-center justify-between">
          {/* Logo with animation */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-brand-brown-dark group"
          >
            <Sun className="h-6 w-6 text-brand-brown transition-all duration-700 group-hover:rotate-45 group-hover:text-brand-gold-dark" />
            <span className="text-2xl font-semibold relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-brand-brown after:transition-all after:duration-500 group-hover:after:w-full">
              SpiceNut
            </span>
          </Link>

          {/* Desktop Navigation with hover animations */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-all duration-300 underline-animation ${
                  location.pathname === item.path || 
                  (location.pathname === "/shop" && location.search.includes(item.path.split("?")[1] || ""))
                    ? "text-brand-brown font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons with hover effects */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground hover:bg-brand-beige transition-all duration-300"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/cart">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground hover:bg-brand-beige transition-all duration-300 relative"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 text-xs flex items-center justify-center bg-brand-brown text-white rounded-full animate-fade-in">
                  0
                </span>
              </Button>
            </Link>
            <Link to="/account">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground hover:bg-brand-beige transition-all duration-300"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/cart">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground relative"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 text-xs flex items-center justify-center bg-brand-brown text-white rounded-full">
                  0
                </span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu with animation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-6 px-2 mt-2 bg-gradient-to-b from-brand-beige-light to-white backdrop-blur-md rounded-lg shadow-premium-md animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  style={{"--index": index} as React.CSSProperties}
                  className={`text-sm font-medium px-4 py-2 rounded-md slide-animation ${
                    location.pathname === item.path || 
                    (location.pathname === "/shop" && location.search.includes(item.path.split("?")[1] || ""))
                      ? "bg-brand-beige text-brand-brown font-semibold"
                      : "text-muted-foreground hover:bg-brand-beige/50 hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 flex items-center justify-between px-4">
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Search className="h-5 w-5" />
                </Button>
                <Link to="/account">
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
