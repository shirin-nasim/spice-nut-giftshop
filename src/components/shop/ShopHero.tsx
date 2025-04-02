
import React from "react";
import { Link } from "react-router-dom";

interface Category {
  id: string;
  name: string;
}

interface ShopHeroProps {
  activeCategory: string;
  categories: Category[];
}

const ShopHero: React.FC<ShopHeroProps> = ({ activeCategory, categories }) => {
  const activeCategoryName = categories.find(cat => cat.id === activeCategory)?.name || "Shop";
  
  return (
    <div className="bg-brand-beige-light">
      <div className="premium-container py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          {activeCategoryName}
        </h1>
        <nav>
          <ol className="flex flex-wrap text-sm">
            <li className="flex items-center">
              <Link to="/" className="text-muted-foreground hover:text-brand-brown">
                Home
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
            </li>
            <li className="flex items-center">
              <Link to="/shop" className={activeCategory === "all" ? "text-brand-brown font-medium" : "text-muted-foreground hover:text-brand-brown"}>
                Shop
              </Link>
              {activeCategory !== "all" && (
                <>
                  <span className="mx-2 text-muted-foreground">/</span>
                  <span className="text-brand-brown font-medium">
                    {activeCategoryName}
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
