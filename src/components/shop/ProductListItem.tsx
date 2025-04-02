
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/supabase";
import { ShoppingCart } from "lucide-react";

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  return (
    <Link
      to={`/product/${product.slug || product.id}`}
      className="flex bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="w-1/3">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover aspect-square"
          loading="lazy"
        />
      </div>
      <div className="w-2/3 p-4 flex flex-col">
        <h3 className="font-medium text-emerald-800">{product.name}</h3>
        <p className="text-xs text-gray-500 mt-1 capitalize">{product.category}</p>
        <div className="flex mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg 
              key={i} 
              className={`w-3.5 h-3.5 ${
                i < (product.rating || 0) ? "text-amber-400" : "text-gray-300"
              }`} 
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-1 text-xs text-gray-500">({product.rating?.toFixed(1) || "0.0"})</span>
        </div>
        
        <div className="mt-2 text-sm text-gray-600 line-clamp-2">
          {product.description?.substring(0, 120) || "No description available"}
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-semibold text-emerald-800">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50">
              View
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 text-emerald-700 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductListItem;
