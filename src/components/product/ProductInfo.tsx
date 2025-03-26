
import React, { useState } from "react";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ProductFeatures from "./ProductFeatures";
import ProductRating from "./ProductRating";
import { Product } from "@/types/supabase";

interface WeightOption {
  value: string;
  price: number;
}

interface ProductInfoProps {
  product: Product & { details?: any; description?: string };
  weightOptions: WeightOption[];
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, weightOptions }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState("500g");
  const { toast } = useToast();

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedWeight}) has been added to your cart.`,
    });
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  return (
    <div className="space-y-6">
      {product.badge && (
        <span className="inline-block bg-brand-gold text-primary text-xs font-medium px-2 py-1 rounded-full">
          {product.badge}
        </span>
      )}
      <h1 className="text-3xl font-bold text-primary">{product.name}</h1>
      
      {/* Ratings */}
      <div className="flex items-center">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg 
              key={i} 
              className={`w-5 h-5 ${
                i < product.rating ? "text-brand-gold" : "text-muted"
              }`} 
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="ml-2 text-sm text-muted-foreground">
          ({product.rating} out of 5)
        </span>
      </div>

      {/* Price */}
      <div className="pt-2">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-brand-brown-dark">
            ${weightOptions.find(w => w.value === selectedWeight)?.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="ml-2 text-base text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Includes all taxes and duties
        </p>
      </div>

      {/* Description */}
      <p className="text-muted-foreground">
        {product.description}
      </p>

      {/* Weight Selection */}
      <div className="pt-2">
        <h3 className="text-sm font-medium mb-3">Weight</h3>
        <div className="flex flex-wrap gap-3">
          {weightOptions.map((option) => (
            <button
              key={option.value}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                selectedWeight === option.value
                  ? "bg-brand-brown text-white"
                  : "bg-brand-beige-light text-primary hover:bg-brand-beige"
              }`}
              onClick={() => setSelectedWeight(option.value)}
            >
              {option.value}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="pt-4">
        <h3 className="text-sm font-medium mb-3">Quantity</h3>
        <div className="flex items-center">
          <button
            className="h-10 w-10 rounded-l-md bg-brand-beige flex items-center justify-center border border-brand-beige hover:bg-brand-beige-dark transition-colors"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="h-4 w-4" />
          </button>
          <div className="h-10 w-14 flex items-center justify-center border-t border-b border-brand-beige bg-white">
            <span className="text-sm font-medium">{quantity}</span>
          </div>
          <button
            className="h-10 w-10 rounded-r-md bg-brand-beige flex items-center justify-center border border-brand-beige hover:bg-brand-beige-dark transition-colors"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Cart Actions */}
      <div className="pt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
        <Button 
          size="lg" 
          className="flex-1 bg-brand-brown hover:bg-brand-brown-dark py-6"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="hidden sm:flex h-14 w-14 border-brand-brown text-brand-brown hover:bg-brand-brown/5"
          onClick={handleAddToWishlist}
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      {/* Features */}
      <ProductFeatures />
    </div>
  );
};

export default ProductInfo;
