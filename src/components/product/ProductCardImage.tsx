
import React from "react";
import ProductBadge from "./ProductBadge";
import ProductCardActions from "./ProductCardActions";

interface ProductCardImageProps {
  image: string;
  name: string;
  isNew?: boolean;
  badge?: string;
  discount: number;
  isHovered: boolean;
  isAddingToCart: boolean;
  isAddingToWishlist: boolean;
  onAddToCart: (e: React.MouseEvent) => void;
  onAddToWishlist: (e: React.MouseEvent) => void;
}

const ProductCardImage: React.FC<ProductCardImageProps> = ({
  image,
  name,
  isNew,
  badge,
  discount,
  isHovered,
  isAddingToCart,
  isAddingToWishlist,
  onAddToCart,
  onAddToWishlist,
}) => {
  return (
    <div className="relative aspect-square overflow-hidden">
      <img 
        src={image} 
        alt={name}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      
      <ProductBadge isNew={isNew} discount={discount} badge={badge} />
      
      <ProductCardActions 
        isHovered={isHovered}
        isAddingToCart={isAddingToCart}
        isAddingToWishlist={isAddingToWishlist}
        onAddToCart={onAddToCart}
        onAddToWishlist={onAddToWishlist}
      />
    </div>
  );
};

export default ProductCardImage;
