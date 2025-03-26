
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  badge?: string;
  rating: number;
  isNew?: boolean;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="h-full flex flex-col bg-white rounded-xl shadow-premium-sm hover:shadow-premium-md transition-all duration-300 overflow-hidden">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            
            {/* Badge */}
            {(product.badge || discount > 0 || product.isNew) && (
              <div className="absolute top-3 left-3 z-10">
                {product.isNew && (
                  <span className="inline-block bg-brand-green text-white text-xs font-medium px-2 py-1 rounded-full mr-2">
                    New
                  </span>
                )}
                {discount > 0 && (
                  <span className="inline-block bg-brand-brown text-white text-xs font-medium px-2 py-1 rounded-full mr-2">
                    {discount}% Off
                  </span>
                )}
                {product.badge && (
                  <span className="inline-block bg-brand-gold text-primary text-xs font-medium px-2 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>
            )}
            
            {/* Quick Actions */}
            <div 
              className={`absolute inset-0 flex items-center justify-center bg-black/5 transition-all duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <Button
                  size="icon"
                  className="bg-white hover:bg-brand-brown hover:text-white transition-colors rounded-full shadow-premium-sm"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="bg-white hover:bg-brand-brown hover:text-white border-0 transition-colors rounded-full shadow-premium-sm"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Product Info */}
          <div className="flex flex-col flex-grow p-4 pt-5">
            <div className="flex-grow">
              <h3 className="font-medium text-primary line-clamp-1">{product.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 capitalize">{product.category}</p>
            </div>
            
            {/* Price and Rating */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-semibold text-brand-brown-dark">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="ml-2 text-sm text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="flex items-center">
                <div className="flex">
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
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
