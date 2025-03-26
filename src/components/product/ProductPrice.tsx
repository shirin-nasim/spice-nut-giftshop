
import React from "react";

interface ProductPriceProps {
  price: number;
  originalPrice?: number;
}

const ProductPrice: React.FC<ProductPriceProps> = ({ price, originalPrice }) => {
  return (
    <div className="flex items-center">
      <span className="font-semibold text-brand-brown-dark">${price.toFixed(2)}</span>
      {originalPrice && (
        <span className="ml-2 text-sm text-muted-foreground line-through">
          ${originalPrice.toFixed(2)}
        </span>
      )}
    </div>
  );
};

export default ProductPrice;
