
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
    <div className="bg-emerald-50">
      <div className="premium-container py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
          {activeCategoryName}
        </h1>
        <nav>
          <ol className="flex flex-wrap text-sm">
            <li className="flex items-center">
              <Link to="/" className="text-gray-600 hover:text-emerald-700">
                Home
              </Link>
              {activeCategory !== "all" && (
                <>
                  <span className="mx-2 text-gray-500">/</span>
                  <span className="text-emerald-700 font-medium">
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
