
import React from "react";
import { Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MobileFilterDrawer from "./MobileFilterDrawer";

interface ShopToolbarProps {
  productsCount: number;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  viewMode: "grid" | "list";
  setViewMode: React.Dispatch<React.SetStateAction<"grid" | "list">>;
  categories: { id: string; name: string; }[];
  activeCategory: string;
  priceRange: [number, number];
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const ShopToolbar: React.FC<ShopToolbarProps> = ({
  productsCount,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  categories,
  activeCategory,
  priceRange,
  setPriceRange
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div className="flex items-center">
        <span className="text-muted-foreground mr-2">{productsCount} products</span>
        
        {/* Mobile Filter Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="lg:hidden flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </SheetTrigger>
          <MobileFilterDrawer 
            categories={categories}
            activeCategory={activeCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </Sheet>
      </div>
      
      <div className="flex items-center space-x-3 w-full sm:w-auto">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low-high">Price: Low to High</SelectItem>
            <SelectItem value="price-high-low">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="rating">Top Rated</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="hidden sm:flex border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-none rounded-l-md ${viewMode === 'grid' ? 'bg-muted' : ''}`}
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-none rounded-r-md ${viewMode === 'list' ? 'bg-muted' : ''}`}
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShopToolbar;
