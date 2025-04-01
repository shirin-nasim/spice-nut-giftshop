
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/supabase";

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  return (
    <Link
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
  );
};

export default ProductListItem;
