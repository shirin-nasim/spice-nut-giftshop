
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import { getProducts, getProductsByCategory } from "@/services/productService";
import { Product } from "@/types/supabase";

// Import refactored components
import ShopHero from "@/components/shop/ShopHero";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ShopToolbar from "@/components/shop/ShopToolbar";
import ActiveFilters from "@/components/shop/ActiveFilters";
import ProductsDisplay from "@/components/shop/ProductsDisplay";

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get("category");
  const { toast } = useToast();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(categoryFromUrl || "all");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  
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
        let fetchedProducts;
        if (activeCategory === "all") {
          fetchedProducts = await getProducts();
        } else {
          fetchedProducts = await getProductsByCategory(activeCategory);
        }
        
        console.log(`Fetched ${fetchedProducts.length} products for category ${activeCategory}`);
        setProducts(fetchedProducts);
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
  }, [activeCategory, toast]);

  // Filter products whenever products, sortBy, or priceRange changes
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
  }, [products, sortBy, priceRange]);

  // Update activeCategory when the URL changes
  useEffect(() => {
    const category = queryParams.get("category") || "all";
    setActiveCategory(category);
  }, [location.search]);

  // Reset filters helper function
  const resetFilters = () => {
    setActiveCategory("all");
    setPriceRange([0, 100]);
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
                productsCount={filteredProducts.length}
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
                filteredProducts={filteredProducts}
                viewMode={viewMode}
                resetFilters={resetFilters}
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
