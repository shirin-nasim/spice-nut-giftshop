
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Grid2x2, List } from "lucide-react";
import { SortOption } from "@/services/products/searchProductService";

interface ShopToolbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortOption: SortOption | "relevance";
  setSortOption: (option: SortOption | "relevance") => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

const ShopToolbar: React.FC<ShopToolbarProps> = ({
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,
  viewMode,
  setViewMode,
}) => {
  const sortingOptions = [
    { label: "Relevance", value: "relevance" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Rating", value: "rating-desc" },
    { label: "Newest Arrivals", value: "newest" },
    { label: "Popularity", value: "popularity" },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="w-full md:w-1/2">
        <Input
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border-emerald-200 focus:border-emerald-400"
        />
      </div>
      
      <div className="flex items-center justify-between gap-4 w-full md:w-1/2">
        <Select 
          value={sortOption} 
          onValueChange={(value) => setSortOption(value as SortOption | "relevance")}
        >
          <SelectTrigger className="w-full md:w-[180px] border-emerald-200 focus:border-emerald-400">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-white border-emerald-200">
            {sortingOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className={`h-9 w-9 ${viewMode === "grid" ? "bg-emerald-600 hover:bg-emerald-700" : "border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"}`}
          >
            <Grid2x2 size={16} />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
            className={`h-9 w-9 ${viewMode === "list" ? "bg-emerald-600 hover:bg-emerald-700" : "border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"}`}
          >
            <List size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShopToolbar;
