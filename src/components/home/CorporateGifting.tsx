
import React from "react";
import { ArrowRight, Package, PenBox, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CorporateGifting = () => {
  return (
    <section className="premium-section relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-brand-beige-light opacity-50"></div>
      <div className="absolute -right-64 -top-64 w-[500px] h-[500px] rounded-full bg-brand-gold-light blur-3xl opacity-20"></div>
      <div className="absolute -left-32 -bottom-32 w-[400px] h-[400px] rounded-full bg-brand-green-light blur-3xl opacity-20"></div>
      
      <div className="premium-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative order-2 lg:order-1">
            <div className="relative h-full rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1505872342847-6dbb5e76cd31?q=80&w=2070&auto=format&fit=crop" 
                alt="Corporate Gift Boxes"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"></div>
            </div>
            
            {/* Floating box */}
            <div className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 glass p-6 rounded-xl shadow-premium-md max-w-xs appear-animation">
              <div className="flex space-x-4">
                <div className="h-14 w-14 rounded-full bg-brand-gold/20 flex items-center justify-center">
                  <PenBox className="h-7 w-7 text-brand-gold" />
                </div>
                <div>
                  <h4 className="font-medium text-primary">Customized Packaging</h4>
                  <p className="text-sm text-muted-foreground mt-1">Add your company logo and personalized message</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="order-1 lg:order-2 appear-animation">
            <div className="mb-4 inline-block px-4 py-1 bg-brand-beige rounded-full text-sm font-medium text-brand-brown">
              For Businesses
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Customize Your Premium Corporate Gift Boxes
            </h2>
            <p className="mt-6 text-muted-foreground">
              Make a lasting impression with premium dry fruits and spices gift boxes customized for your corporate needs. Perfect for clients, employees, and business partners.
            </p>
            
            <div className="mt-8 space-y-6">
              <div className="flex space-x-4">
                <div className="h-10 w-10 rounded-full bg-brand-brown/10 flex items-center justify-center flex-shrink-0">
                  <Package className="h-5 w-5 text-brand-brown" />
                </div>
                <div>
                  <h3 className="font-medium text-primary">Premium Quality Products</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Hand-selected premium dry fruits and spices sourced from the finest regions.
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <div className="h-10 w-10 rounded-full bg-brand-brown/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-brand-brown" />
                </div>
                <div>
                  <h3 className="font-medium text-primary">Bulk Order Discounts</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Special pricing for large orders with tiered discount structure.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-brand-brown hover:bg-brand-brown-dark text-white">
                <Link to="/corporate-gifting">
                  Explore Corporate Gifting
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-brand-brown text-brand-brown hover:bg-brand-brown/5">
                <Link to="/contact">Request a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateGifting;
