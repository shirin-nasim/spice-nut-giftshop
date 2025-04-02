
import React from "react";
import { useNavigate } from "react-router-dom";
import { SheetHeader, SheetTitle, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface MobileFilterDrawerProps {
  categories: {
    id: string;
    name: string;
  }[];
  activeCategory: string;
  priceRange: [number, number];
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  categories,
  activeCategory,
  priceRange,
  setPriceRange,
}) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === "all") {
      navigate("/shop");
    } else {
      navigate(`/shop/category/${categoryId}`);
    }
  };

  return (
    <SheetContent side="left">
      <SheetHeader>
        <SheetTitle>Filters</SheetTitle>
      </SheetHeader>
      <div className="py-4">
        <h3 className="font-semibold mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category.id}>
              <Button
                variant="ghost"
                className={`w-full justify-start py-2 px-3 h-auto ${
                  activeCategory === category.id
                    ? "bg-brand-beige text-brand-brown font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-brand-beige-light"
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </Button>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <h3 className="font-semibold mb-4">Price Range</h3>
          <div className="px-2">
            <div className="flex mb-1 justify-between">
              <span className="text-sm text-muted-foreground">${priceRange[0]}</span>
              <span className="text-sm text-muted-foreground">${priceRange[1] === 100 ? "100+" : priceRange[1]}</span>
            </div>
            <div className="flex flex-col space-y-4">
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
      </div>
    </SheetContent>
  );
};

export default MobileFilterDrawer;
