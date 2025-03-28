
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  return data as unknown as Product[];
};

// Get products with pagination
export const getPaginatedProducts = async (
  page: number = 1,
  pageSize: number = 12
): Promise<{ products: Product[], total: number }> => {
  // Calculate the starting point
  const start = (page - 1) * pageSize;
  
  // Get products with pagination
  const { data, error, count } = await supabase
    .from("products")
    .select("*", { count: "exact" })
    .order("name")
    .range(start, start + pageSize - 1);

  if (error) {
    console.error("Error fetching paginated products:", error);
    throw error;
  }

  return { 
    products: data as unknown as Product[], 
    total: count || 0 
  };
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
  
  // If not UUID format, try more flexible slug-based search
  const searchTerm = productId.replace(/-/g, ' ').trim();
  console.log("Searching for product with term:", searchTerm);
  
  // Try exact match first (most likely to work)
  let { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("name", searchTerm)
    .maybeSingle();

  if ((!data || error) && error?.code !== "PGRST116") {
    // Try partial match if exact match fails
    const { data: partialData, error: partialError } = await supabase
      .from("products")
      .select("*")
      .ilike("name", `%${searchTerm}%`)
      .order("name")
      .maybeSingle();
      
    if (partialError && partialError.code !== "PGRST116") {
      console.error("Error fetching product by slug:", partialError);
      throw partialError;
    }
    
    data = partialData;
  }

  return data as unknown as Product;
};

// Get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("name");

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
    .or(`name.ilike.%${query}%, description.ilike.%${query}%, category.ilike.%${query}%`)
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
