
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";
import { mapDbProductToInterface, SimpleQueryResult } from "../utils/dbUtils";

// Search products
export const searchProducts = async (query: string): Promise<Product[]> => {
  console.log(`Searching products with query: "${query}"`);
  
  const result: SimpleQueryResult = await supabase
    .from("products")
    .select("*")
    .or(`name.ilike.%${query}%, description.ilike.%${query}%, category.ilike.%${query}%`)
    .order("name") as unknown as SimpleQueryResult;

  const { data, error } = result;

  if (error) {
    console.error("Error searching products:", error);
    throw error;
  }

  console.log(`Search returned ${data?.length || 0} results`);
  
  return (data || []).map(mapDbProductToInterface);
};

// Get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  console.log(`Fetching products by category: ${category}`);
  
  const result: SimpleQueryResult = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("name") as unknown as SimpleQueryResult;

  const { data, error } = result;

  if (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }

  console.log(`Retrieved ${data?.length || 0} products in category "${category}"`);
  
  return (data || []).map(mapDbProductToInterface);
};

// Get related products (products in the same category)
export const getRelatedProducts = async (productId: string, category: string, limit: number = 4): Promise<Product[]> => {
  console.log(`Fetching ${limit} related products for product ${productId} in category ${category}`);
  
  const result: SimpleQueryResult = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .neq("id", productId) // Exclude the current product
    .limit(limit) as unknown as SimpleQueryResult;

  const { data, error } = result;

  if (error) {
    console.error("Error fetching related products:", error);
    throw error;
  }

  console.log(`Retrieved ${data?.length || 0} related products`);
  
  return (data || []).map(mapDbProductToInterface);
};
