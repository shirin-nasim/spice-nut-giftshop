
import { supabase } from "@/integrations/supabase/client";
import { Cart, CartItem, Product } from "@/types/supabase";

const LOCAL_CART_KEY = 'premium_market_cart';

// Helper function to map database product to our Product type
const mapProductFromDb = (dbProduct: any): Product => {
  if (!dbProduct) return null as unknown as Product;
  
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    price: dbProduct.price,
    originalPrice: dbProduct.original_price,
    image: dbProduct.image,
    category: dbProduct.category,
    badge: dbProduct.badge,
    rating: dbProduct.rating,
    isNew: dbProduct.is_new,
    inStock: dbProduct.in_stock,
    description: dbProduct.description,
    origin: dbProduct.origin,
    weight: dbProduct.weight,
    shelfLife: dbProduct.shelf_life,
    ingredients: dbProduct.ingredients,
    stockQuantity: dbProduct.stock_quantity,
    nutrition: dbProduct.nutrition,
    createdAt: dbProduct.created_at,
    updatedAt: dbProduct.updated_at
  };
};

// Local storage cart persistence
const saveCartToLocalStorage = (userId: string | null, items: CartItem[]) => {
  try {
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify({
      userId,
      items,
      updatedAt: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const getCartFromLocalStorage = (): { userId: string | null, items: CartItem[] } => {
  try {
    const data = localStorage.getItem(LOCAL_CART_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return { userId: null, items: [] };
};

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

  const cartItems = data.map((item: any) => ({
    id: item.id,
    cartId: item.cart_id,
    productId: item.product_id,
    quantity: item.quantity,
    product: mapProductFromDb(item.product),
    createdAt: item.created_at,
    updatedAt: item.updated_at
  }));

  // Save to localStorage for persistence
  saveCartToLocalStorage(null, cartItems);

  return cartItems;
};

// Get cart items for guest
export const getGuestCartItems = async (): Promise<CartItem[]> => {
  const { items } = getCartFromLocalStorage();
  
  if (!items || items.length === 0) {
    return [];
  }
  
  // Fetch the latest product data for all items in the cart
  const productIds = items.map(item => item.productId);
  
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .in("id", productIds);
    
  if (error) {
    console.error("Error fetching product data for guest cart:", error);
    return items; // Return the cached items even without updated product data
  }
  
  // Match products with cart items
  const updatedItems = items.map(item => {
    const dbProduct = products.find(p => p.id === item.productId);
    return {
      ...item,
      product: dbProduct ? mapProductFromDb(dbProduct) : item.product
    };
  });
  
  return updatedItems;
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

  let result;
  
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

    result = {
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

    result = {
      id: data.id,
      cartId: data.cart_id,
      productId: data.product_id,
      quantity: data.quantity,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }
  
  // Fetch all cart items to update localStorage
  const allCartItems = await getCartItems(cartId);
  saveCartToLocalStorage(null, allCartItems);
  
  return result;
};

// Add item to guest cart
export const addToGuestCart = async (productId: string, quantity: number = 1): Promise<CartItem[]> => {
  // Fetch product data
  const { data: dbProduct, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();
    
  if (error) {
    console.error("Error fetching product for guest cart:", error);
    throw error;
  }
  
  const { items } = getCartFromLocalStorage();
  
  // Check if the product already exists in the cart
  const existingItemIndex = items.findIndex(item => item.productId === productId);
  
  if (existingItemIndex >= 0) {
    // Update quantity
    items[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    const product = mapProductFromDb(dbProduct);
    
    const newItem: CartItem = {
      id: `local-${Date.now()}`,
      cartId: 'guest-cart',
      productId: product.id,
      quantity: quantity,
      product: product,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    items.push(newItem);
  }
  
  saveCartToLocalStorage(null, items);
  return items;
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
  
  // Fetch the cart ID from the item
  const { data: cartItem } = await supabase
    .from("cart_items")
    .select("cart_id")
    .eq("id", itemId)
    .single();
    
  if (cartItem) {
    // Update localStorage with latest cart data
    const cartItems = await getCartItems(cartItem.cart_id);
    saveCartToLocalStorage(null, cartItems);
  }
};

// Update guest cart item quantity
export const updateGuestCartItemQuantity = (itemId: string, quantity: number): CartItem[] => {
  const { items } = getCartFromLocalStorage();
  
  const updatedItems = items.map(item => {
    if (item.id === itemId) {
      return { ...item, quantity, updatedAt: new Date().toISOString() };
    }
    return item;
  });
  
  saveCartToLocalStorage(null, updatedItems);
  return updatedItems;
};

// Remove item from cart
export const removeFromCart = async (itemId: string): Promise<void> => {
  // Get cart ID before deleting
  const { data: cartItem } = await supabase
    .from("cart_items")
    .select("cart_id")
    .eq("id", itemId)
    .single();
    
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", itemId);

  if (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
  
  if (cartItem) {
    // Update localStorage with latest cart data
    const cartItems = await getCartItems(cartItem.cart_id);
    saveCartToLocalStorage(null, cartItems);
  }
};

// Remove item from guest cart
export const removeFromGuestCart = (itemId: string): CartItem[] => {
  const { items } = getCartFromLocalStorage();
  
  const updatedItems = items.filter(item => item.id !== itemId);
  
  saveCartToLocalStorage(null, updatedItems);
  return updatedItems;
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
  
  // Clear localStorage cart
  saveCartToLocalStorage(null, []);
};

// Merge guest cart with user cart
export const mergeGuestCartWithUserCart = async (userId: string): Promise<void> => {
  const { items: guestItems } = getCartFromLocalStorage();
  
  if (!guestItems || guestItems.length === 0) {
    return; // No guest items to merge
  }
  
  try {
    // Get or create the user's cart
    const cart = await getOrCreateCart(userId);
    
    // Add each guest item to the user's cart
    for (const item of guestItems) {
      await addToCart(cart.id, item.productId, item.quantity);
    }
    
    // Clear the guest cart after merging
    saveCartToLocalStorage(userId, []);
  } catch (error) {
    console.error("Error merging guest cart with user cart:", error);
    throw error;
  }
};

// Initialize cart from localStorage for guests or new sessions
export const initializeCartFromStorage = async (userId: string | null): Promise<CartItem[]> => {
  const { userId: storedUserId, items } = getCartFromLocalStorage();
  
  // If user is logged in and we have a stored cart for a different or no user,
  // migrate the cart to the current user
  if (userId && (!storedUserId || storedUserId !== userId)) {
    if (items.length > 0) {
      await mergeGuestCartWithUserCart(userId);
    }
    return [];
  }
  
  return items;
};
