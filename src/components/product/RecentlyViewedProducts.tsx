
import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/ProductCard";
import { RecentlyViewedProduct } from "@/types/supabase";

interface RecentlyViewedProductsProps {
  products: RecentlyViewedProduct[];
  currentProductId?: string;
}

const RecentlyViewedProducts: React.FC<RecentlyViewedProductsProps> = ({ 
  products, 
  currentProductId 
}) => {
  // Filter out the current product if we're on a product detail page
  const filteredProducts = currentProductId 
    ? products.filter(product => product.id !== currentProductId)
    : products;

  if (!filteredProducts.length) {
    return null;
  }

  return (
    <div className="mt-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 appear-animation">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary">Recently Viewed</h2>
          <p className="mt-2 text-muted-foreground">
            Products you've recently explored
          </p>
        </div>
        <Button 
          asChild 
          variant="ghost" 
          className="mt-4 md:mt-0 text-brand-brown hover:text-brand-brown-dark hover:bg-brand-beige-light self-start md:self-auto"
        >
          <Link to="/shop" className="flex items-center">
            <span>View All Products</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.slice(0, 4).map((product, index) => (
          <ProductCard 
            key={product.id} 
            product={{
              ...product,
              originalPrice: undefined,
              badge: undefined,
              rating: 0,
              isNew: false,
              inStock: true
            }} 
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedProducts;
