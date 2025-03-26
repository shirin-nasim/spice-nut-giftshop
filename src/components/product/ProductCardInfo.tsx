
import React from "react";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";

interface ProductCardInfoProps {
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
}

const ProductCardInfo: React.FC<ProductCardInfoProps> = ({
  name,
  category,
  price,
  originalPrice,
  rating,
}) => {
  return (
    <div className="flex flex-col flex-grow p-4 pt-5">
      <div className="flex-grow">
        <h3 className="font-medium text-primary line-clamp-1">{name}</h3>
        <p className="text-xs text-muted-foreground mt-1 capitalize">{category}</p>
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <ProductPrice price={price} originalPrice={originalPrice} />
        <ProductRating rating={rating} />
      </div>
    </div>
  );
};

export default ProductCardInfo;
