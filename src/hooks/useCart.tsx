
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem } from "@/types/supabase";
import { 
  getOrCreateCart, 
  getCartItems, 
  getGuestCartItems,
  initializeCartFromStorage
} from "@/services/cartService";
import { useAuth } from "@/hooks/useAuth";

interface CartContextType {
  cartItems: CartItem[];
  cartTotal: number;
  cartCount: number;
  isLoading: boolean;
  refetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      
      if (user) {
        // For authenticated users
        const cart = await getOrCreateCart(user.id);
        
        // Initialize from localStorage first to show items quickly
        const localItems = await initializeCartFromStorage(user.id);
        if (localItems.length > 0) {
          setCartItems(localItems);
        }
        
        // Then fetch the latest items from the database
        const items = await getCartItems(cart.id);
        setCartItems(items);
      } else {
        // For guests
        const guestItems = await getGuestCartItems();
        setCartItems(guestItems);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.product?.price || 0) * item.quantity,
    0
  );

  // Calculate cart count (total number of items)
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  useEffect(() => {
    fetchCart();
  }, [user]);

  const value = {
    cartItems,
    cartTotal,
    cartCount,
    isLoading,
    refetchCart: fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
