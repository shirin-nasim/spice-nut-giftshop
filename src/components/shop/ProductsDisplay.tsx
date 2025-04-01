
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/ProductCard";
import ProductListItem from "./ProductListItem";
import { Product } from "@/types/supabase";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ProductsDisplayProps {
  loading: boolean;
  filteredProducts: Product[];
  viewMode: "grid" | "list";
  resetFilters: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

const ProductsDisplay: React.FC<ProductsDisplayProps> = ({
  loading,
  filteredProducts,
  viewMode,
  resetFilters,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage
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

  // Generate array of page numbers to display
  const generatePaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5;
    
    // Always show first page
    items.push(1);
    
    // Calculate start and end of the middle pages
    let startPage = Math.max(2, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 3);
    
    // Adjust if we're showing too few pages
    if (endPage - startPage < maxPagesToShow - 3) {
      startPage = Math.max(2, totalPages - maxPagesToShow + 2);
    }
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      items.push('ellipsis-start');
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      items.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      items.push('ellipsis-end');
    }
    
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      items.push(totalPages);
    }
    
    return items;
  };

  return (
    <div className="flex flex-col gap-8">
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
      
      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => onPageChange(currentPage - 1)}
                  href="#"
                />
              </PaginationItem>
            )}
            
            {generatePaginationItems().map((page, i) => (
              page === 'ellipsis-start' || page === 'ellipsis-end' ? (
                <PaginationItem key={`ellipsis-${i}`}>
                  <span className="flex h-9 w-9 items-center justify-center">...</span>
                </PaginationItem>
              ) : (
                <PaginationItem key={i}>
                  <PaginationLink 
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(Number(page));
                    }}
                    href="#"
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            ))}
            
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext 
                  onClick={() => onPageChange(currentPage + 1)}
                  href="#"
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ProductsDisplay;
