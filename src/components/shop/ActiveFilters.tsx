
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ActiveFiltersProps {
  activeCategory: string;
  priceRange: [number, number];
  categories: { id: string; name: string; }[];
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  activeCategory,
  priceRange,
  categories,
  setActiveCategory,
  setPriceRange,
}) => {
  const navigate = useNavigate();
  
  if (activeCategory === "all" && priceRange[0] === 0 && priceRange[1] === 100) {
    return null;
  }
  
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {activeCategory !== "all" && (
        <div className="bg-emerald-100 text-emerald-800 text-sm rounded-full px-3 py-1 flex items-center">
          <span>Category: {categories.find(cat => cat.id === activeCategory)?.name}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 ml-1 hover:bg-transparent"
            onClick={() => {
              setActiveCategory("all");
              navigate("/shop");
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      {(priceRange[0] > 0 || priceRange[1] < 100) && (
        <div className="bg-emerald-100 text-emerald-800 text-sm rounded-full px-3 py-1 flex items-center">
          <span>Price: ${priceRange[0]} - ${priceRange[1] === 100 ? "100+" : priceRange[1]}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 ml-1 hover:bg-transparent"
            onClick={() => setPriceRange([0, 100])}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      <Button
        variant="link"
        className="text-emerald-700 text-sm p-0 h-auto"
        onClick={() => {
          setActiveCategory("all");
          setPriceRange([0, 100]);
          navigate("/shop");
        }}
      >
        Clear All Filters
      </Button>
    </div>
  );
};

export default ActiveFilters;
