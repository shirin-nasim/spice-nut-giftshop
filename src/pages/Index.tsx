
import React, { useEffect } from "react";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CorporateGifting from "@/components/home/CorporateGifting";
import Testimonials from "@/components/home/Testimonials";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Categories />
        <FeaturedProducts />
        <CorporateGifting />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
