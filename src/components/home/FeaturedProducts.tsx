
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProductCard, { Product } from "@/components/ui/ProductCard";

// Sample products data
const featuredProducts: Product[] = [
  {
    id: "premium-almonds",
    name: "Premium California Almonds",
    price: 12.99,
    originalPrice: 15.99,
    image: "https://images.unsplash.com/photo-1574184864703-3487b13f0edd?q=80&w=1932&auto=format&fit=crop",
    category: "dry fruits",
    rating: 5,
    inStock: true,
  },
  {
    id: "cashews-premium",
    name: "Jumbo Cashews Premium Grade",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1607113256158-56a934936ef1?q=80&w=1974&auto=format&fit=crop",
    category: "dry fruits",
    badge: "Best Seller",
    rating: 4.5,
    inStock: true,
  },
  {
    id: "saffron-premium",
    name: "Pure Premium Saffron Threads",
    price: 19.99,
    originalPrice: 24.99,
    image: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?q=80&w=1964&auto=format&fit=crop",
    category: "spices",
    badge: "Limited",
    rating: 5,
    inStock: true,
  },
  {
    id: "pistachios-roasted",
    name: "Roasted Pistachios Lightly Salted",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1590760475226-60ada5127a6f?q=80&w=1974&auto=format&fit=crop",
    category: "dry fruits",
    rating: 4,
    isNew: true,
    inStock: true,
  },
  {
    id: "cardamom-green",
    name: "Organic Green Cardamom Pods",
    price: 8.99,
    originalPrice: 10.99,
    image: "https://images.unsplash.com/photo-1552189050-8be8fee84507?q=80&w=1974&auto=format&fit=crop",
    category: "spices",
    rating: 4.5,
    inStock: true,
  },
  {
    id: "walnuts-halves",
    name: "California Walnut Halves & Pieces",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1596362601603-b74f6ef166e5?q=80&w=1964&auto=format&fit=crop",
    category: "dry fruits",
    rating: 4,
    inStock: true,
  },
  {
    id: "cinnamon-sticks",
    name: "Ceylon Cinnamon Sticks Premium",
    price: 7.99,
    originalPrice: 9.99,
    image: "https://images.unsplash.com/photo-1639981585287-ebb3cdd35e33?q=80&w=1933&auto=format&fit=crop",
    category: "spices",
    rating: 4.5,
    inStock: true,
  },
  {
    id: "gift-box-premium",
    name: "Luxury Dry Fruit & Spice Gift Box",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1980&auto=format&fit=crop",
    category: "gift boxes",
    badge: "Premium",
    rating: 5,
    isNew: true,
    inStock: true,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="premium-section">
      <div className="premium-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 appear-animation">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Bestsellers</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              Our most popular products, loved by customers worldwide for their exceptional quality and taste.
            </p>
          </div>
          <Button asChild variant="ghost" className="mt-4 md:mt-0 text-brand-brown hover:text-brand-brown-dark hover:bg-brand-beige-light self-start md:self-auto">
            <Link to="/shop" className="flex items-center">
              <span>View All Products</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
