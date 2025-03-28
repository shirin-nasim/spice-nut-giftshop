
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types/supabase";
import { getProducts } from "@/services/productService";
import { toast } from "sonner";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setFetchError(null);
        
        // Fetch all products and select a mixture of categories for featured display
        const products = await getProducts();
        
        console.log(`Fetched ${products.length} products for featured section`);
        
        if (products.length === 0) {
          console.log("No products found in database");
          setFetchError("No products available. Products database might be empty.");
          setIsLoading(false);
          
          // Still show toast but don't return, attempt to show default products
          toast.warning("No products found. The database may be empty.");
        }
        
        // If we have products, filter to get a good mix
        if (products.length > 0) {
          // Filter to get a good mix of products (nuts, spices, gift boxes)
          const dryFruits = products.filter(p => p.category?.toLowerCase() === "dry fruits").slice(0, 3);
          const spices = products.filter(p => p.category?.toLowerCase() === "spices").slice(0, 3);
          const premiumSpices = products.filter(p => p.category?.toLowerCase() === "premium spices").slice(0, 1);
          const giftBoxes = products.filter(p => p.category?.toLowerCase() === "gift boxes").slice(0, 1);
          
          console.log(`Category breakdown: Dry Fruits (${dryFruits.length}), Spices (${spices.length}), Premium Spices (${premiumSpices.length}), Gift Boxes (${giftBoxes.length})`);
          
          // Combine and shuffle slightly to get a good mix
          const featured = [...dryFruits, ...spices, ...premiumSpices, ...giftBoxes]
            .sort(() => Math.random() - 0.5)
            .slice(0, 8);
            
          if (featured.length === 0) {
            console.log("Couldn't find products with specific categories");
            
            // Just display any products we have if categorization failed
            setFeaturedProducts(products.slice(0, 8));
            toast.info("Displaying available products.");
          } else {
            setFeaturedProducts(featured);
          }
        } else {
          // Create sample fallback products for display when database is empty
          const fallbackProducts: Product[] = [
            {
              id: "fallback-1",
              name: "Premium Almonds",
              price: 12.99,
              image: "https://images.unsplash.com/photo-1574184864703-3487b13f0edd?w=600&auto=format",
              category: "dry fruits",
              rating: 4.8,
              inStock: true
            },
            {
              id: "fallback-2",
              name: "Kashmiri Saffron",
              price: 19.99,
              image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f1?w=600&auto=format",
              category: "spices",
              rating: 5.0,
              inStock: true
            },
            {
              id: "fallback-3",
              name: "Organic Walnuts",
              price: 14.99,
              image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=600&auto=format",
              category: "dry fruits",
              rating: 4.7,
              inStock: true
            },
            {
              id: "fallback-4",
              name: "Black Pepper",
              price: 9.99,
              image: "https://images.unsplash.com/photo-1589946506082-7bfea9ac1997?w=600&auto=format",
              category: "spices",
              rating: 4.6,
              inStock: true
            }
          ];
          
          console.log("Using fallback products for display");
          setFeaturedProducts(fallbackProducts);
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
        setFetchError("Failed to load products. Please try refreshing the page.");
        toast.error("Failed to load featured products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="premium-section">
      <div className="premium-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 appear-animation">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Bestsellers</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              Our most popular products, loved by customers worldwide for their exceptional quality and taste.
            </p>
          </div>
          <Button asChild variant="ghost" className="mt-4 md:mt-0 text-brand-brown hover:text-brand-brown-dark hover:bg-brand-beige-light self-start md:self-auto">
            <Link to="/shop" className="flex items-center">
              <span>View All Products</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Show loading skeleton when fetching products
            Array(8).fill(0).map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4 h-[350px] animate-pulse">
                <div className="bg-gray-200 h-[200px] mb-4 rounded-md"></div>
                <div className="bg-gray-200 h-6 w-3/4 mb-2 rounded"></div>
                <div className="bg-gray-200 h-4 w-1/2 mb-2 rounded"></div>
                <div className="bg-gray-200 h-6 w-1/4 rounded"></div>
              </div>
            ))
          ) : fetchError && featuredProducts.length === 0 ? (
            // Show a message when there's an error and no fallback products
            <div className="col-span-full text-center py-8">
              <h3 className="text-lg font-medium text-gray-900">Error loading products</h3>
              <p className="mt-2 text-gray-500">
                {fetchError}
              </p>
              <Button 
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </div>
          ) : featuredProducts.length === 0 ? (
            // Show a message when no products are found
            <div className="col-span-full text-center py-8">
              <h3 className="text-lg font-medium text-gray-900">No products available</h3>
              <p className="mt-2 text-gray-500">
                We're currently updating our inventory. Please check back soon.
              </p>
            </div>
          ) : (
            // Show actual products when loaded
            featuredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
