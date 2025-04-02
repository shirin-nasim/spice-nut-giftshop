
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Grid2x2, List } from "lucide-react";

import { searchProducts, getProductsByCategory, ProductFilterParams, SortOption } from '@/services/products/searchProductService';
import ShopHero from '@/components/shop/ShopHero';
import ProductsDisplay from '@/components/shop/ProductsDisplay';
import FilterSidebar from '@/components/shop/FilterSidebar';
import MobileFilterDrawer from '@/components/shop/MobileFilterDrawer';
import ActiveFilters from '@/components/shop/ActiveFilters';
import ShopToolbar from '@/components/shop/ShopToolbar';

const PRODUCTS_PER_PAGE = 12;

const Shop = () => {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // View state
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  
  // Filter states
  const [activeCategory, setActiveCategory] = useState<string>(categoryId || searchParams.get('category') || "all");
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([
    parseInt(searchParams.get('priceMin') || '0'),
    parseInt(searchParams.get('priceMax') || '100'),
  ]);
  const [sortOption, setSortOption] = useState<SortOption | "relevance">(
    (searchParams.get('sort') as SortOption) || "popularity"
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || '1')
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Update active category when route parameter changes
  useEffect(() => {
    if (categoryId) {
      setActiveCategory(categoryId);
      console.log("Category ID from params:", categoryId);
    }
  }, [categoryId]);

  // Fetch products based on filters
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', activeCategory, debouncedSearchTerm, priceRange, sortOption, currentPage],
    queryFn: async () => {
      console.log("Fetching products for category:", activeCategory);
      
      if (activeCategory !== "all") {
        return getProductsByCategory(activeCategory, currentPage, PRODUCTS_PER_PAGE);
      } else {
        const filters: ProductFilterParams = {
          search: debouncedSearchTerm || undefined,
          priceMin: priceRange[0] > 0 ? priceRange[0] : undefined,
          priceMax: priceRange[1] < 100 ? priceRange[1] : undefined,
          sort: sortOption !== "relevance" ? sortOption as SortOption : undefined,
          page: currentPage,
          pageSize: PRODUCTS_PER_PAGE,
        };
        
        return searchProducts(filters, filters.sort || "popularity", filters.page || 1, filters.pageSize || PRODUCTS_PER_PAGE);
      }
    }
  });

  // Update URL params based on filters
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (activeCategory !== "all") {
      params.set('category', activeCategory);
    }
    
    if (debouncedSearchTerm) {
      params.set('search', debouncedSearchTerm);
    }
    
    if (priceRange[0] > 0) {
      params.set('priceMin', priceRange[0].toString());
    }
    
    if (priceRange[1] < 100) {
      params.set('priceMax', priceRange[1].toString());
    }
    
    if (sortOption !== "relevance") {
      params.set('sort', sortOption);
    }
    
    if (currentPage > 1) {
      params.set('page', currentPage.toString());
    }
    
    // Only update search params if we're on the main shop page
    if (!categoryId) {
      setSearchParams(params);
    }
  }, [activeCategory, debouncedSearchTerm, priceRange, sortOption, currentPage, setSearchParams, categoryId]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, debouncedSearchTerm, priceRange, sortOption]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 100]);
    setSortOption("relevance");
    
    if (categoryId) {
      // If we're on a category page, keep the category
      setActiveCategory(categoryId);
    } else {
      setActiveCategory("all");
      navigate('/shop');
    }
  };

  // Product categories for navigation
  const categories = [
    { id: "all", name: "All Products" },
    { id: "dry-fruits", name: "Dry Fruits" },
    { id: "spices", name: "Spices" },
    { id: "gift-boxes", name: "Gift Boxes" },
  ];

  console.log("Current Active Category:", activeCategory);
  console.log("Current Products:", data?.products);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Add top margin to account for fixed header */}
      <div className="pt-24"></div>
      
      <ShopHero 
        activeCategory={activeCategory} 
        categories={categories} 
      />
      
      <div className="premium-container py-8 flex-grow">
        {/* Mobile filter toggle */}
        <div className="flex md:hidden items-center justify-between mb-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setIsFilterDrawerOpen(true)}
          >
            <SlidersHorizontal size={16} /> Filters
          </Button>
          
          <div className="flex items-center gap-2">
            <Button 
              variant={viewMode === "grid" ? "default" : "outline"} 
              size="icon"
              onClick={() => setViewMode("grid")}
              className="h-9 w-9"
            >
              <Grid2x2 size={16} />
            </Button>
            <Button 
              variant={viewMode === "list" ? "default" : "outline"} 
              size="icon"
              onClick={() => setViewMode("list")}
              className="h-9 w-9"
            >
              <List size={16} />
            </Button>
          </div>
        </div>
        
        {/* Active filters display */}
        <ActiveFilters 
          activeCategory={activeCategory}
          priceRange={priceRange}
          categories={categories}
          setActiveCategory={setActiveCategory}
          setPriceRange={setPriceRange}
        />
        
        {/* Desktop layout */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters - desktop only */}
          <div className="hidden md:block w-1/4">
            <FilterSidebar 
              categories={categories}
              activeCategory={activeCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>
          
          {/* Main content area */}
          <div className="w-full md:w-3/4">
            {/* Toolbar (searching, sorting, view switching) */}
            <ShopToolbar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortOption={sortOption}
              setSortOption={setSortOption}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
            
            {/* Products display */}
            <ProductsDisplay 
              loading={isLoading}
              filteredProducts={data?.products || []}
              viewMode={viewMode}
              resetFilters={resetFilters}
              currentPage={currentPage}
              totalPages={Math.ceil((data?.total || 0) / PRODUCTS_PER_PAGE)}
              onPageChange={handlePageChange}
              itemsPerPage={PRODUCTS_PER_PAGE}
            />
          </div>
        </div>
      </div>
      
      {/* Mobile filter drawer */}
      <Sheet open={isFilterDrawerOpen} onOpenChange={setIsFilterDrawerOpen}>
        <MobileFilterDrawer 
          categories={categories}
          activeCategory={activeCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
      </Sheet>
    </div>
  );
};

export default Shop;
