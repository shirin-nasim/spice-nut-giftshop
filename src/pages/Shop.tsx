
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import { getProductsByCategory, getPaginatedProducts } from "@/services/productService";
import { Product } from "@/types/supabase";

// Import refactored components
import ShopHero from "@/components/shop/ShopHero";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ShopToolbar from "@/components/shop/ShopToolbar";
import ActiveFilters from "@/components/shop/ActiveFilters";
import ProductsDisplay from "@/components/shop/ProductsDisplay";

const ITEMS_PER_PAGE = 12;

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get("category");
  const pageFromUrl = Number(queryParams.get("page") || "1");
  const { toast } = useToast();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(categoryFromUrl || "all");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [totalProducts, setTotalProducts] = useState(0);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  
  // Categories based on the products data
  const categories = [
    { id: "all", name: "All Products" },
    { id: "dry-fruits", name: "Dry Fruits" },
    { id: "spices", name: "Spices" },
    { id: "gift-boxes", name: "Gift Boxes" },
  ];

  // Fetch products from the database based on category
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let result;
        
        if (activeCategory === "all") {
          result = await getPaginatedProducts(currentPage, ITEMS_PER_PAGE);
          setProducts(result.products);
          setTotalProducts(result.total);
        } else {
          // For category-specific products, we'll fetch all and handle pagination client-side for now
          const fetchedProducts = await getProductsByCategory(activeCategory);
          setProducts(fetchedProducts);
          setTotalProducts(fetchedProducts.length);
        }
        
        console.log(`Fetched products for category ${activeCategory}, page ${currentPage}, total: ${totalProducts}`);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Error",
          description: "Failed to load products. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory, currentPage, toast]);

  // Filter and paginate products whenever products, sortBy, or priceRange changes
  useEffect(() => {
    let result = [...products];
    
    // Filter by price range
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort products
    switch (sortBy) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // In a real app, you'd sort by date added
        result.sort((a, b) => (a.isNew ? -1 : 1) - (b.isNew ? -1 : 1));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured - no specific sorting
        break;
    }
    
    setFilteredProducts(result);
    
    // Only when we're filtering by category client-side (not using server pagination)
    if (activeCategory !== "all") {
      // Calculate total pages
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const paginatedProducts = result.slice(startIndex, startIndex + ITEMS_PER_PAGE);
      setDisplayedProducts(paginatedProducts);
    } else {
      setDisplayedProducts(result);
    }
    
  }, [products, sortBy, priceRange, currentPage]);

  // Update URL when page or category changes
  useEffect(() => {
    const newParams = new URLSearchParams(location.search);
    
    if (activeCategory !== "all") {
      newParams.set("category", activeCategory);
    } else {
      newParams.delete("category");
    }
    
    if (currentPage > 1) {
      newParams.set("page", currentPage.toString());
    } else {
      newParams.delete("page");
    }
    
    const newSearch = newParams.toString();
    const newUrl = `${location.pathname}${newSearch ? `?${newSearch}` : ''}`;
    
    // Only update if the URL actually changes to avoid unnecessary history entries
    if (location.search !== `?${newSearch}` && location.search !== '' && newSearch !== '') {
      window.history.replaceState(null, '', newUrl);
    }
  }, [activeCategory, currentPage, location.pathname, location.search]);

  // Update activeCategory and page when the URL changes
  useEffect(() => {
    const category = queryParams.get("category") || "all";
    const page = Number(queryParams.get("page") || "1");
    
    setActiveCategory(category);
    setCurrentPage(page);
  }, [location.search]);

  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  // Reset filters helper function
  const resetFilters = () => {
    setActiveCategory("all");
    setPriceRange([0, 100]);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-10">
        {/* Shop Hero */}
        <ShopHero activeCategory={activeCategory} categories={categories} />

        <div className="premium-container py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Desktop Filter */}
            <aside className="w-full lg:w-64 hidden lg:block">
              <FilterSidebar 
                categories={categories} 
                activeCategory={activeCategory} 
                priceRange={priceRange} 
                setPriceRange={setPriceRange} 
              />
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <ShopToolbar 
                productsCount={totalProducts}
                sortBy={sortBy}
                setSortBy={setSortBy}
                viewMode={viewMode}
                setViewMode={setViewMode}
                categories={categories}
                activeCategory={activeCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
              
              {/* Active Filters */}
              <ActiveFilters 
                activeCategory={activeCategory}
                priceRange={priceRange}
                categories={categories}
                setActiveCategory={setActiveCategory}
                setPriceRange={setPriceRange}
              />
              
              {/* Products Display */}
              <ProductsDisplay 
                loading={loading}
                filteredProducts={displayedProducts}
                viewMode={viewMode}
                resetFilters={resetFilters}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
