
import React from "react";
import { Link } from "react-router-dom";

interface ProductBreadcrumbProps {
  productName: string;
  category: string;
  slug?: string;
}

const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({ 
  productName, 
  category,
  slug
}) => {
  // Format category name for display (replace hyphens with spaces, capitalize)
  const formatCategory = (cat: string): string => {
    return cat
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <nav className="mb-6">
      <ol className="flex text-sm">
        <li className="flex items-center">
          <Link to="/" className="text-muted-foreground hover:text-brand-brown">
            Home
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
        </li>
        <li className="flex items-center">
          <Link to="/shop" className="text-muted-foreground hover:text-brand-brown">
            Shop
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
        </li>
        <li className="flex items-center">
          <Link 
            to={`/shop?category=${category}`} 
            className="text-muted-foreground hover:text-brand-brown capitalize"
          >
            {formatCategory(category)}
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
        </li>
        <li className="text-brand-brown font-medium truncate">
          {productName}
        </li>
      </ol>
    </nav>
  );
};

export default ProductBreadcrumb;
