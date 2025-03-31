
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronDown, Filter, Grid, List, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getProducts, getProductsByCategory } from "@/services/productService";
import { useToast } from "@/hooks/use-toast";

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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-10">
        {/* Shop Hero */}
        <div className="bg-brand-beige-light">
          <div className="premium-container py-10 md:py-16">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {activeCategory === "all" 
                ? "Our Products" 
                : categories.find(cat => cat.id === activeCategory)?.name || "Shop"}
            </h1>
            <nav>
              <ol className="flex text-sm">
                <li className="flex items-center">
                  <Link to="/" className="text-muted-foreground hover:text-brand-brown">
                    Home
                  </Link>
                  <span className="mx-2 text-muted-foreground">/</span>
                </li>
                <li className="flex items-center">
                  <Link to="/shop" className="text-muted-foreground hover:text-brand-brown">
                    Shop
                  </Link>
                  {activeCategory !== "all" && (
                    <>
                      <span className="mx-2 text-muted-foreground">/</span>
                      <span className="text-brand-brown font-medium capitalize">
                        {categories.find(cat => cat.id === activeCategory)?.name}
                      </span>
                    </>
                  )}
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="premium-container py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Desktop Filter */}
            <aside className="w-full lg:w-64 hidden lg:block">
              <div className="bg-white p-6 rounded-xl shadow-premium-sm">
                <h3 className="font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category.id}>
                      <Link
                        to={category.id === "all" ? "/shop" : `/shop?category=${category.id}`}
                        className={`block py-2 px-3 rounded-md transition ${
                          activeCategory === category.id
                            ? "bg-brand-beige text-brand-brown font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-brand-beige-light"
                        }`}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <h3 className="font-semibold mb-4">Price Range</h3>
                  <div className="px-2">
                    <div className="flex mb-1 justify-between">
                      <span className="text-sm text-muted-foreground">${priceRange[0]}</span>
                      <span className="text-sm text-muted-foreground">${priceRange[1]}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full accent-brand-brown"
                      />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full accent-brand-brown"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold mb-4">Customer Rating</h3>
                  <ul className="space-y-2">
                    {[5, 4, 3, 2, 1].map(stars => (
                      <li key={stars}>
                        <label className="flex items-center cursor-pointer">
                          <input type="checkbox" className="rounded text-brand-brown border-brand-beige-dark focus:ring-brand-brown/25 mr-2" />
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-4 h-4 ${
                                  i < stars ? "text-brand-gold" : "text-gray-300"
                                }`} 
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-1 text-muted-foreground text-sm">& Up</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="flex items-center">
                  <span className="text-muted-foreground mr-2">{filteredProducts.length} products</span>
                  
                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>Filters</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="py-4">
                        <h3 className="font-semibold mb-4">Categories</h3>
                        <ul className="space-y-2">
                          {categories.map(category => (
                            <li key={category.id}>
                              <Link
                                to={category.id === "all" ? "/shop" : `/shop?category=${category.id}`}
                                className={`block py-2 px-3 rounded-md transition ${
                                  activeCategory === category.id
                                    ? "bg-brand-beige text-brand-brown font-medium"
                                    : "text-muted-foreground hover:text-foreground hover:bg-brand-beige-light"
                                }`}
                              >
                                {category.name}
                              </Link>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-8">
                          <h3 className="font-semibold mb-4">Price Range</h3>
                          <div className="px-2">
                            <div className="flex mb-1 justify-between">
                              <span className="text-sm text-muted-foreground">${priceRange[0]}</span>
                              <span className="text-sm text-muted-foreground">${priceRange[1]}</span>
                            </div>
                            <div className="flex flex-col space-y-4">
                              <input
                                type="range"
                                min="0"
                                max="100"
                                step="5"
                                value={priceRange[0]}
                                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                                className="w-full accent-brand-brown"
                              />
                              <input
                                type="range"
                                min="0"
                                max="100"
                                step="5"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                className="w-full accent-brand-brown"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </SheetContent>
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
              
              {/* Active Filters */}
              {(activeCategory !== "all" || priceRange[0] > 0 || priceRange[1] < 100) && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {activeCategory !== "all" && (
                    <div className="bg-brand-beige-light text-foreground text-sm rounded-full px-3 py-1 flex items-center">
                      <span>Category: {categories.find(cat => cat.id === activeCategory)?.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 ml-1 hover:bg-transparent"
                        onClick={() => setActiveCategory("all")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  
                  {(priceRange[0] > 0 || priceRange[1] < 100) && (
                    <div className="bg-brand-beige-light text-foreground text-sm rounded-full px-3 py-1 flex items-center">
                      <span>Price: ${priceRange[0]} - ${priceRange[1]}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 ml-1 hover:bg-transparent"
                        onClick={() => setPriceRange([0, 100])}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  
                  <Button
                    variant="link"
                    className="text-muted-foreground text-sm p-0 h-auto"
                    onClick={() => {
                      setActiveCategory("all");
                      setPriceRange([0, 100]);
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
              
              {/* Products Grid */}
              {loading ? (
                <div className="text-center py-20">
                  <p className="text-xl text-muted-foreground mb-4">Loading products...</p>
                </div>
              ) : filteredProducts.length > 0 ? (
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
                      <Link
                        key={product.id}
                        to={`/product/${product.slug || product.id}`}
                        className="flex bg-white rounded-xl shadow-premium-sm hover:shadow-premium-md transition-all duration-300 overflow-hidden"
                      >
                        <div className="w-1/3">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover aspect-square"
                          />
                        </div>
                        <div className="w-2/3 p-4 flex flex-col">
                          <h3 className="font-medium text-primary">{product.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1 capitalize">{product.category}</p>
                          <div className="flex mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-3.5 h-3.5 ${
                                  i < product.rating ? "text-brand-gold" : "text-muted"
                                }`} 
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="font-semibold text-brand-brown-dark">${product.price.toFixed(2)}</span>
                              {product.originalPrice && (
                                <span className="ml-2 text-sm text-muted-foreground line-through">
                                  ${product.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            <Button variant="ghost" size="sm" className="text-brand-brown hover:text-brand-brown-dark hover:bg-brand-beige-light">
                              View Product
                            </Button>
                          </div>
                        </div>
                      </Link>
                    )
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 animate-fade-in">
                  <p className="text-xl text-muted-foreground mb-4">No products found</p>
                  <p className="text-muted-foreground">Try adjusting your filters or browse all products</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setActiveCategory("all");
                      setPriceRange([0, 100]);
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
