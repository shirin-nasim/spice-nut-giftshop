
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: "dry-fruits",
    name: "Dry Fruits",
    description: "Premium nuts and dried fruits from select orchards",
    image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?q=80&w=1935&auto=format&fit=crop",
    color: "bg-brand-brown-light",
  },
  {
    id: "spices",
    name: "Exotic Spices",
    description: "Rare and aromatic spices from around the world",
    image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=2070&auto=format&fit=crop",
    color: "bg-brand-green-light",
  },
  {
    id: "gift-boxes",
    name: "Gift Boxes",
    description: "Curated selections for every occasion",
    image: "https://images.unsplash.com/photo-1607346511446-c79f078596e4?q=80&w=1974&auto=format&fit=crop",
    color: "bg-brand-gold-light",
  },
  {
    id: "bulk-orders",
    name: "Bulk Orders",
    description: "Wholesale quantities at special prices",
    image: "https://images.unsplash.com/photo-1599046384198-952968c7a69b?q=80&w=2070&auto=format&fit=crop", 
    color: "bg-brand-beige",
  },
];

const Categories = () => {
  return (
    <section className="premium-section bg-gradient-to-b from-background to-brand-beige-light">
      <div className="premium-container">
        <div className="text-center max-w-3xl mx-auto appear-animation">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Explore Our Collections</h2>
          <p className="mt-4 text-muted-foreground">
            Discover the finest selection of dry fruits and spices, carefully sourced from premium locations worldwide.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={category.id}
              to={`/shop?category=${category.id}`}
              className="group relative rounded-xl overflow-hidden hover-lift appear-animation"
              style={{"--index": index + 1} as React.CSSProperties}
            >
              <div className="aspect-[4/5] w-full">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                  <p className="mt-2 text-sm text-white/80">{category.description}</p>
                  <div className="mt-4 flex items-center text-white/90 text-sm font-medium transition-all duration-300 group-hover:text-white">
                    <span>Explore</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
