
import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types/supabase";
import { getRelatedProducts } from "@/services/productService";
import { Skeleton } from "@/components/ui/skeleton";

interface RelatedProductsProps {
  productId: string;
  category: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ productId, category }) => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['relatedProducts', productId, category],
    queryFn: () => getRelatedProducts(productId, category, 4),
    enabled: !!productId && !!category,
  });

  if (isLoading) {
    return (
      <div>
        <h3 className="text-2xl font-bold mb-8">You May Also Like</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="rounded-xl shadow-premium-sm overflow-hidden">
              <Skeleton className="h-64 w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !products || products.length === 0) {
    return null; // Don't render the section if there are no related products
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-8">You May Also Like</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
