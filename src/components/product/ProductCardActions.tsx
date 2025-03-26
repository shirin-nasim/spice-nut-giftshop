
import React from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardActionsProps {
  isHovered: boolean;
  isAddingToCart: boolean;
  isAddingToWishlist: boolean;
  onAddToCart: (e: React.MouseEvent) => void;
  onAddToWishlist: (e: React.MouseEvent) => void;
}

const ProductCardActions: React.FC<ProductCardActionsProps> = ({
  isHovered,
  isAddingToCart,
  isAddingToWishlist,
  onAddToCart,
  onAddToWishlist,
}) => {
  return (
    <div 
      className={`absolute inset-0 flex items-center justify-center bg-black/5 transition-all duration-300 ${
        isHovered ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <Button
          size="icon"
          className="bg-white hover:bg-brand-brown hover:text-white transition-colors rounded-full shadow-premium-sm"
          onClick={onAddToCart}
          disabled={isAddingToCart}
        >
          <ShoppingCart className={`h-4 w-4 ${isAddingToCart ? "animate-pulse" : ""}`} />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="bg-white hover:bg-brand-brown hover:text-white border-0 transition-colors rounded-full shadow-premium-sm"
          onClick={onAddToWishlist}
          disabled={isAddingToWishlist}
        >
          <Heart className={`h-4 w-4 ${isAddingToWishlist ? "animate-pulse" : ""}`} />
        </Button>
      </div>
    </div>
  );
};

export default ProductCardActions;
