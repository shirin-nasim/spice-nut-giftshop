
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  return data as unknown as Product[];
};

// Get product by ID or slug
export const getProductById = async (productId: string): Promise<Product | null> => {
  // Try to get by ID first (for UUID format)
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  
  if (uuidPattern.test(productId)) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching product by ID:", error);
      throw error;
    }

    return data as unknown as Product;
  } 
  
  // If not UUID, try by slug (converted from productId)
  // Convert slug like "saffron-premium" to name like "Pure Premium Saffron Threads"
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("name", `%${productId.split('-').join(' ')}%`)
    .maybeSingle();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching product by slug:", error);
    throw error;
  }

  return data as unknown as Product;
};

// Get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category);

  if (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }

  return data as unknown as Product[];
};

// Search products
export const searchProducts = async (query: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("name", `%${query}%`)
    .order("name");

  if (error) {
    console.error("Error searching products:", error);
    throw error;
  }

  return data as unknown as Product[];
};

// Get related products (products in the same category)
export const getRelatedProducts = async (productId: string, category: string, limit: number = 4): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .neq("id", productId) // Exclude the current product
    .limit(limit);

  if (error) {
    console.error("Error fetching related products:", error);
    throw error;
  }

  return data as unknown as Product[];
};
