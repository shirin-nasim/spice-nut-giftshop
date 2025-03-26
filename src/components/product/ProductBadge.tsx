
import React from "react";

interface ProductBadgeProps {
  isNew?: boolean;
  discount?: number;
  badge?: string;
}

const ProductBadge: React.FC<ProductBadgeProps> = ({ isNew, discount, badge }) => {
  if (!isNew && !discount && !badge) return null;
  
  return (
    <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1">
      {isNew && (
        <span className="inline-block bg-brand-green text-white text-xs font-medium px-2 py-1 rounded-full">
          New
        </span>
      )}
      {discount && discount > 0 && (
        <span className="inline-block bg-brand-brown text-white text-xs font-medium px-2 py-1 rounded-full">
          {discount}% Off
        </span>
      )}
      {badge && (
        <span className="inline-block bg-brand-gold text-primary text-xs font-medium px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </div>
  );
};

export default ProductBadge;
