
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/ProductCard";
import ProductListItem from "./ProductListItem";
import { Product } from "@/types/supabase";

interface ProductsDisplayProps {
  loading: boolean;
  filteredProducts: Product[];
  viewMode: "grid" | "list";
  resetFilters: () => void;
}

const ProductsDisplay: React.FC<ProductsDisplayProps> = ({
  loading,
  filteredProducts,
  viewMode,
  resetFilters
}) => {
  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground mb-4">Loading products...</p>
      </div>
    );
  }
  
  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <p className="text-xl text-muted-foreground mb-4">No products found</p>
        <p className="text-muted-foreground">Try adjusting your filters or browse all products</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={resetFilters}
        >
          Clear All Filters
        </Button>
      </div>
    );
  }

  return (
    <div className={`animate-fade-in ${
      viewMode === "grid" 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
        : "space-y-4"
    }`}>
      {filteredProducts.map((product, index) => (
        viewMode === "grid" ? (
          <ProductCard 
            key={product.id} 
            product={product} 
            index={index}
          />
        ) : (
          <ProductListItem key={product.id} product={product} />
        )
      ))}
    </div>
  );
};

export default ProductsDisplay;
