
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CorporateGifting from "@/components/home/CorporateGifting";
import Testimonials from "@/components/home/Testimonials";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [isSeedingProducts, setIsSeedingProducts] = useState(false);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const seedProducts = async () => {
    try {
      setIsSeedingProducts(true);
      toast.info("Seeding products database...");
      
      // Get the session properly
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData?.session?.access_token || '';
      
      const response = await fetch('https://vwavxfqplapjoofwbbrt.supabase.co/functions/v1/seed-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(`Added ${data.count} products to the database!`);
        // Reload the page after a short delay to show the new products
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast.error("Failed to seed products: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error seeding products:", error);
      toast.error("Failed to seed products database. See console for details.");
    } finally {
      setIsSeedingProducts(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Categories />
        <FeaturedProducts />
        <CorporateGifting />
        <Testimonials />
        
        {/* Admin section for seeding products */}
        <div className="premium-container my-10 p-6 bg-brand-beige-light rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Admin Actions</h2>
          <p className="text-muted-foreground mb-4">
            No products are currently available in the database. Click the button below to add sample products.
          </p>
          <Button 
            onClick={seedProducts} 
            disabled={isSeedingProducts}
            className="bg-brand-brown hover:bg-brand-brown-dark"
          >
            {isSeedingProducts ? "Adding Products..." : "Add Sample Products"}
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
