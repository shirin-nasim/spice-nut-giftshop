import React, { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types/supabase';
import { getPaginatedProducts, ProductFilterParams, SortOption } from '@/services/productService';
import ProductCard from '@/components/ui/ProductCard';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";

const PRODUCTS_PER_PAGE = 12;

const Shop = () => {
  const [paginatedData, setPaginatedData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Filter and Sort States
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || '');
  const [categoryFilter, setCategoryFilter] = useState<string[]>(searchParams.getAll('category') || []);
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [sortOption, setSortOption] = useState<SortOption | undefined>(
    (searchParams.get('sort') as SortOption) || undefined
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Fetching products based on pagination
  const fetchAllProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await getPaginatedProducts(currentPage, PRODUCTS_PER_PAGE);
      setPaginatedData(result.products);
      setTotalProducts(result.total);
      setFilteredData([]);
      
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  // Fetching products based on filters
  const fetchFilteredProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params: ProductFilterParams = {
        search: debouncedSearchTerm,
        category: categoryFilter.length > 0 ? categoryFilter : undefined,
        priceMin: priceRange[0] === 0 ? undefined : priceRange[0],
        priceMax: priceRange[1] === 100 ? undefined : priceRange[1],
        sort: sortOption,
        page: currentPage,
        pageSize: PRODUCTS_PER_PAGE,
      };

      // const result = await getFilteredProducts(params);
      // setFilteredData(result.products);
      // setTotalProducts(result.total);
      // setPaginatedData([]);
    } catch (err) {
      console.error("Error fetching filtered products:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchTerm, categoryFilter, priceRange, sortOption, currentPage]);

  useEffect(() => {
    // Determine whether to fetch all products or filtered products
    if (debouncedSearchTerm || categoryFilter.length > 0 || priceRange[0] !== 0 || priceRange[1] !== 100 || sortOption) {
      // fetchFilteredProducts();
      console.log("Filters applied, implement fetchFilteredProducts");
      setFilteredData([]);
      setTotalProducts(0);
      setPaginatedData([]);
    } else {
      fetchAllProducts();
    }
  }, [fetchAllProducts, debouncedSearchTerm, categoryFilter, priceRange, sortOption]);

  // Update URL parameters
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (categoryFilter.length > 0) {
      categoryFilter.forEach(category => params.append('category', category));
    }
    if (priceRange[0] !== 0) params.set('priceMin', priceRange[0].toString());
    if (priceRange[1] !== 100) params.set('priceMax', priceRange[1].toString());
    if (sortOption) params.set('sort', sortOption);

    setSearchParams(params);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, categoryFilter, priceRange, sortOption, setSearchParams]);

  // Category filter options
  const categories = ["Dry Fruits", "Spices", "Gift Boxes", "Premium Spices"];

  // Sorting options
  const sortingOptions = [
    { label: "Relevance", value: undefined },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Newest Arrivals", value: "date-desc" },
  ];

  // Handlers
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0); // Scroll to top when page changes
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter([]);
    setPriceRange([0, 100]);
    setSortOption(undefined);
    navigate('/shop'); // Clear URL parameters
  };

  const productsToDisplay = filteredData.length > 0 ? filteredData : paginatedData;
  const hasProducts = productsToDisplay.length > 0;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Shop</h1>

      {/* Filters and Sorting */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Search Filter */}
        <div className="md:col-span-1">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div className="md:col-span-1">
          <h3 className="font-semibold mb-2">Category</h3>
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={categoryFilter.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <label
                htmlFor={`category-${category}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </label>
            </div>
          ))}
        </div>

        {/* Price Range Filter */}
        <div className="md:col-span-1">
          <h3 className="font-semibold mb-2">Price Range</h3>
          <div className="flex items-center justify-between">
            <span>$0</span>
            <span>$100+</span>
          </div>
          <Slider
            defaultValue={priceRange}
            max={100}
            step={10}
            onValueChange={(value) => setPriceRange(value)}
          />
          <div className="flex items-center justify-between mt-2">
            <span>Min: ${priceRange[0]}</span>
            <span>Max: ${priceRange[1] === 100 ? '100+' : priceRange[1]}</span>
          </div>
        </div>

        {/* Sorting */}
        <div className="md:col-span-1">
          <Select 
            onValueChange={(value) => setSortOption(value as SortOption)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Relevance" />
            </SelectTrigger>
            <SelectContent>
              {sortingOptions.map((option) => (
                <SelectItem key={option.value || 'default'} value={option.value || ''}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Clear Filters Button */}
      <Button variant="outline" onClick={clearFilters} className="mb-6">
        Clear Filters
      </Button>

      {/* Product Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(12).fill(0).map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-4 h-[350px] animate-pulse">
              <div className="bg-gray-200 h-[200px] mb-4 rounded-md"></div>
              <div className="bg-gray-200 h-6 w-3/4 mb-2 rounded"></div>
              <div className="bg-gray-200 h-4 w-1/2 mb-2 rounded"></div>
              <div className="bg-gray-200 h-6 w-1/4 rounded"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <h3 className="text-lg font-medium text-gray-900">Error loading products</h3>
          <p className="mt-2 text-gray-500">{error}</p>
        </div>
      ) : !hasProducts ? (
        <div className="text-center py-8">
          <h3 className="text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-2 text-gray-500">
            {debouncedSearchTerm ? 'Try adjusting your search or filters.' : 'We are currently updating our inventory. Please check back soon.'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsToDisplay.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
                className="mr-2"
              >
                Previous
              </Button>
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Shop;
