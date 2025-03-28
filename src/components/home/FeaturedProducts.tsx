
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Fetch all products and select a mixture of categories for featured display
        const products = await getProducts();
        
        console.log(`Fetched ${products.length} products for featured section`);
        
        if (products.length === 0) {
          toast.error("No products found. Please check the database connection.");
          setIsLoading(false);
          return;
        }
        
        // Filter to get a good mix of products (nuts, spices, gift boxes)
        const dryFruits = products.filter(p => p.category === "dry fruits").slice(0, 3);
        const spices = products.filter(p => p.category === "spices").slice(0, 3);
        const premiumSpices = products.filter(p => p.category === "premium spices").slice(0, 1);
        const giftBoxes = products.filter(p => p.category === "gift boxes").slice(0, 1);
        
        console.log(`Category breakdown: Dry Fruits (${dryFruits.length}), Spices (${spices.length}), Premium Spices (${premiumSpices.length}), Gift Boxes (${giftBoxes.length})`);
        
        // Combine and shuffle slightly to get a good mix
        const featured = [...dryFruits, ...spices, ...premiumSpices, ...giftBoxes]
          .sort(() => Math.random() - 0.5)
          .slice(0, 8);
          
        if (featured.length === 0) {
          toast.warning("Couldn't find a variety of products. Displaying any available products.");
          
          // Just display any products we have if categorization failed
          setFeaturedProducts(products.slice(0, 8));
        } else {
          setFeaturedProducts(featured);
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
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
