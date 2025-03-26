import { supabase } from "@/integrations/supabase/client";
import { Cart, CartItem, Product } from "@/types/supabase";

// Get or create cart for user
export const getOrCreateCart = async (userId: string): Promise<Cart> => {
  // Check if user already has a cart
  const { data: existingCart, error: fetchError } = await supabase
    .from("cart")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error("Error fetching cart:", fetchError);
    throw fetchError;
  }

  // If cart exists, return it
  if (existingCart) {
    return {
      id: existingCart.id,
      userId: existingCart.user_id,
      createdAt: existingCart.created_at,
      updatedAt: existingCart.updated_at
    };
  }

  // Otherwise, create a new cart
  const { data: newCart, error: createError } = await supabase
    .from("cart")
    .insert({ user_id: userId })
    .select()
    .single();

  if (createError) {
    console.error("Error creating cart:", createError);
    throw createError;
  }

  return {
    id: newCart.id,
    userId: newCart.user_id,
    createdAt: newCart.created_at,
    updatedAt: newCart.updated_at
  };
};

// Get cart items
export const getCartItems = async (cartId: string): Promise<CartItem[]> => {
  const { data, error } = await supabase
    .from("cart_items")
    .select(`
      *,
      product:product_id (*)
    `)
    .eq("cart_id", cartId);

  if (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }

  return data.map((item: any) => ({
    id: item.id,
    cartId: item.cart_id,
    productId: item.product_id,
    quantity: item.quantity,
    product: item.product as Product,
    createdAt: item.created_at,
    updatedAt: item.updated_at
  }));
};

// Add item to cart
export const addToCart = async (cartId: string, productId: string, quantity: number = 1): Promise<CartItem> => {
  // Check if item already exists in cart
  const { data: existingItem, error: fetchError } = await supabase
    .from("cart_items")
    .select("*")
    .eq("cart_id", cartId)
    .eq("product_id", productId)
    .maybeSingle();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error("Error checking existing cart item:", fetchError);
    throw fetchError;
  }

  if (existingItem) {
    // Update quantity if item exists
    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + quantity })
      .eq("id", existingItem.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating cart item:", error);
      throw error;
    }

    return {
      id: data.id,
      cartId: data.cart_id,
      productId: data.product_id,
      quantity: data.quantity,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  } else {
    // Add new item if it doesn't exist
    const { data, error } = await supabase
      .from("cart_items")
      .insert({
        cart_id: cartId,
        product_id: productId,
        quantity
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding item to cart:", error);
      throw error;
    }

    return {
      id: data.id,
      cartId: data.cart_id,
      productId: data.product_id,
      quantity: data.quantity,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }
};

// Update cart item quantity
export const updateCartItemQuantity = async (itemId: string, quantity: number): Promise<void> => {
  const { error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", itemId);

  if (error) {
    console.error("Error updating cart item quantity:", error);
    throw error;
  }
};

// Remove item from cart
export const removeFromCart = async (itemId: string): Promise<void> => {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", itemId);

  if (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
};

// Clear cart
export const clearCart = async (cartId: string): Promise<void> => {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("cart_id", cartId);

  if (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};
