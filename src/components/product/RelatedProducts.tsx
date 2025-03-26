
import React from "react";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types/supabase";

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
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
