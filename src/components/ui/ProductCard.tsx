
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { addToCart, getOrCreateCart } from "@/services/cartService";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Product } from "@/types/supabase";
import ProductCardImage from "@/components/product/ProductCardImage";
import ProductCardInfo from "@/components/product/ProductCardInfo";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your cart",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsAddingToCart(true);
      const cart = await getOrCreateCart(user.id);
      await addToCart(cart.id, product.id);
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Failed to add to cart",
        description: "There was an error adding this item to your cart.",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your wishlist",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsAddingToWishlist(true);
      
      // Check if already in wishlist
      const { data: existingItem } = await supabase
        .from("wishlist")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .maybeSingle();
      
      if (existingItem) {
        toast({
          title: "Already in wishlist",
          description: `${product.name} is already in your wishlist.`,
        });
        return;
      }
      
      // Add to wishlist
      await supabase
        .from("wishlist")
        .insert({
          user_id: user.id,
          product_id: product.id
        });
      
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast({
        title: "Failed to add to wishlist",
        description: "There was an error adding this item to your wishlist.",
        variant: "destructive",
      });
    } finally {
      setIsAddingToWishlist(false);
    }
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
          <ProductCardImage 
            image={product.image}
            name={product.name}
            isNew={product.isNew}
            badge={product.badge}
            discount={discount}
            isHovered={isHovered}
            isAddingToCart={isAddingToCart}
            isAddingToWishlist={isAddingToWishlist}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
          />
          
          <ProductCardInfo 
            name={product.name}
            category={product.category}
            price={product.price}
            originalPrice={product.originalPrice}
            rating={product.rating}
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
