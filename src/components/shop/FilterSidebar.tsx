
import React from "react";
import { Link } from "react-router-dom";

interface FilterSidebarProps {
  categories: {
    id: string;
    name: string;
  }[];
  activeCategory: string;
  priceRange: [number, number];
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  activeCategory,
  priceRange,
  setPriceRange,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-premium-sm">
      <h3 className="font-semibold mb-4">Categories</h3>
      <ul className="space-y-2">
        {categories.map(category => (
          <li key={category.id}>
            <Link
              to={category.id === "all" ? "/shop" : `/shop?category=${category.id}`}
              className={`block py-2 px-3 rounded-md transition ${
                activeCategory === category.id
                  ? "bg-brand-beige text-brand-brown font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-brand-beige-light"
              }`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <h3 className="font-semibold mb-4">Price Range</h3>
        <div className="px-2">
          <div className="flex mb-1 justify-between">
            <span className="text-sm text-muted-foreground">${priceRange[0]}</span>
            <span className="text-sm text-muted-foreground">${priceRange[1]}</span>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
              className="w-full accent-brand-brown"
            />
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full accent-brand-brown"
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold mb-4">Customer Rating</h3>
        <ul className="space-y-2">
          {[5, 4, 3, 2, 1].map(stars => (
            <li key={stars}>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="rounded text-brand-brown border-brand-beige-dark focus:ring-brand-brown/25 mr-2" />
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < stars ? "text-brand-gold" : "text-gray-300"
                      }`} 
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-muted-foreground text-sm">& Up</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterSidebar;
