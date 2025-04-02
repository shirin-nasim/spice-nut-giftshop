import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Grid2x2, List } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import ProductListItem from "@/components/shop/ProductListItem";
import { searchProducts } from "@/services/products/searchProductService";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PRODUCTS_PER_PAGE = 12;

const GiftBoxesPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<"popularity" | "price-asc" | "price-desc">("popularity");

  const { data, isLoading } = useQuery({
    queryKey: ['gift-boxes', searchTerm, sortOption, currentPage],
    queryFn: async () => {
      return searchProducts(
        { 
          category: "gift boxes", 
          search: searchTerm || undefined,
        },
        sortOption,
        currentPage,
        PRODUCTS_PER_PAGE
      );
    }
  });

  const products = data?.products || [];
  const totalPages = Math.ceil((data?.total || 0) / PRODUCTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const generatePaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5;
    
    items.push(1);
    
    let startPage = Math.max(2, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 3);
    
    if (endPage - startPage < maxPagesToShow - 3) {
      startPage = Math.max(2, totalPages - maxPagesToShow + 2);
    }
    
    if (startPage > 2) {
      items.push('ellipsis-start');
    }
    
    for (let i = startPage; i <= endPage; i++) {
      items.push(i);
    }
    
    if (endPage < totalPages - 1) {
      items.push('ellipsis-end');
    }
    
    if (totalPages > 1) {
      items.push(totalPages);
    }
    
    return items;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="pt-24"></div>
      
      <div className="bg-emerald-50">
        <div className="premium-container py-10 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
            Gift Boxes
          </h1>
          <nav>
            <ol className="flex flex-wrap text-sm">
              <li className="flex items-center">
                <Link to="/" className="text-gray-600 hover:text-emerald-700">
                  Home
                </Link>
                <span className="mx-2 text-gray-500">/</span>
                <span className="text-emerald-700 font-medium">
                  Gift Boxes
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      
      <div className="premium-container py-8 flex-grow">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="w-full md:w-1/2">
            <Input
              type="search"
              placeholder="Search gift boxes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-emerald-200 focus:border-emerald-400"
            />
          </div>
          
          <div className="flex items-center justify-between gap-4 w-full md:w-1/2">
            <select 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value as any)}
              className="w-full md:w-[180px] border-emerald-200 focus:border-emerald-400 rounded-md py-2 px-3"
            >
              <option value="popularity">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            
            <div className="flex items-center gap-2">
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
        
        {isLoading && (
          <div className="text-center py-20">
            <div className="flex justify-center items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-4 h-4 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-4 h-4 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
            <p className="text-xl text-gray-500 mt-4">Loading gift boxes...</p>
          </div>
        )}
        
        {!isLoading && products.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-500 mb-4">No gift boxes found</p>
            <p className="text-gray-500">Try adjusting your search term</p>
          </div>
        )}
        
        {!isLoading && products.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
              : "space-y-4"
            }
          >
            {products.map((product, index) => (
              viewMode === "grid" ? (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProductCard product={product} index={index} />
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
        )}
        
        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(currentPage - 1)}
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
                        handlePageChange(Number(page));
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
                    onClick={() => handlePageChange(currentPage + 1)}
                    href="#"
                    className="hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-300"
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default GiftBoxesPage;
