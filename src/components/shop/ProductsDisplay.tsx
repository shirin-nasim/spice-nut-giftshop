
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
        <div className="flex justify-center items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-4 h-4 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-4 h-4 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
        <p className="text-xl text-gray-500 mt-4">Loading products...</p>
      </div>
    );
  }
  
  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-xl text-gray-500 mb-4">No products found</p>
        <p className="text-gray-500">Try adjusting your filters or browse all products</p>
        <Button 
          variant="outline" 
          className="mt-4 hover:bg-emerald-50 hover:text-emerald-700 border-emerald-200"
          onClick={resetFilters}
        >
          Clear All Filters
        </Button>
      </div>
    );
  }

  // Calculate start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

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
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${
          viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
        }`}
      >
        {currentProducts.map((product, index) => (
          viewMode === "grid" ? (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProductCard 
                product={product} 
                index={index}
              />
            </motion.div>
          ) : (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProductListItem product={product} />
            </motion.div>
          )
        ))}
      </motion.div>
      
      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => onPageChange(currentPage - 1)}
                  href="#"
                  className="hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-300"
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
                    className={currentPage === page ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-emerald-50 hover:text-emerald-700"}
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
                  className="hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-300"
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
