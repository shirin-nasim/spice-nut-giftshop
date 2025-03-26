
import { Database } from "@/integrations/supabase/types";

// Product type that matches our database schema
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
  description?: string;
  origin?: string;
  weight?: string;
  shelfLife?: string;
  ingredients?: string;
  stockQuantity?: number;
  details?: any; // Adding details property to fix the type error
  nutrition?: {
    servingSize?: string;
    calories?: string;
    protein?: string;
    fat?: string;
    carbohydrates?: string;
    fiber?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

// Cart type
export interface Cart {
  id: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

// CartItem type
export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product?: Product;
  createdAt?: string;
  updatedAt?: string;
}

// Order type
export interface Order {
  id: string;
  userId: string;
  status: string;
  totalAmount: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone?: string;
  };
  paymentMethod?: string;
  paymentStatus: string;
  createdAt?: string;
  updatedAt?: string;
  items?: OrderItem[];
}

// OrderItem type
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product?: Product;
  createdAt?: string;
}

// WishlistItem type
export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product?: Product;
  createdAt?: string;
}

// UserProfile type
export interface UserProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Helper type for Supabase query responses
export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never;
