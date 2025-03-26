
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615485020940-f877f259de73?q=80&w=2070')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
      </div>
      
      <div className="premium-container relative z-10">
        <div className="max-w-2xl appear-animation" style={{"--index": 0} as React.CSSProperties}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-shadow">
            Shop Premium Dry Fruits & Spices
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed">
            Exquisite flavors delivered to your doorstep from the finest orchards and spice gardens around the world.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-brand-gold hover:bg-brand-gold-dark text-primary font-medium px-8 py-6">
              <Link to="/shop">
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white/10 px-8 py-6">
              <Link to="/corporate-gifting">Corporate Gifting</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Premium features highlight */}
      <div className="premium-container relative z-10 mt-12 md:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              title: "Premium Quality",
              description: "Handpicked from the finest sources globally",
            },
            {
              title: "Global Shipping",
              description: "Fast, reliable delivery to your doorstep",
            },
            {
              title: "Satisfaction Guaranteed",
              description: "100% money-back guarantee on all products",
            },
          ].map((feature, index) => (
            <div 
              key={feature.title}
              className="glass-dark p-6 rounded-lg appear-animation" 
              style={{"--index": index + 1} as React.CSSProperties}
            >
              <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
