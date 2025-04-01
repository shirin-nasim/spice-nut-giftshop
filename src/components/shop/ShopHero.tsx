
import React from "react";
import { Link } from "react-router-dom";

interface ShopHeroProps {
  activeCategory: string;
  categories: {
    id: string;
    name: string;
  }[];
}

const ShopHero: React.FC<ShopHeroProps> = ({ activeCategory, categories }) => {
  return (
    <div className="bg-brand-beige-light">
      <div className="premium-container py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          {activeCategory === "all" 
            ? "Our Products" 
            : categories.find(cat => cat.id === activeCategory)?.name || "Shop"}
        </h1>
        <nav>
          <ol className="flex text-sm">
            <li className="flex items-center">
              <Link to="/" className="text-muted-foreground hover:text-brand-brown">
                Home
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
            </li>
            <li className="flex items-center">
              <Link to="/shop" className="text-muted-foreground hover:text-brand-brown">
                Shop
              </Link>
              {activeCategory !== "all" && (
                <>
                  <span className="mx-2 text-muted-foreground">/</span>
                  <span className="text-brand-brown font-medium capitalize">
                    {categories.find(cat => cat.id === activeCategory)?.name}
                  </span>
                </>
              )}
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default ShopHero;
