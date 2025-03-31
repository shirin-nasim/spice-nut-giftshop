
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";
import { mapDbProductToInterface, transformDbResults } from "../utils/dbUtils";

// Search products
export const searchProducts = async (query: string): Promise<Product[]> => {
  console.log(`Searching products with query: "${query}"`);
  
  const response = await supabase
    .from("products")
    .select("*")
    .or(`name.ilike.%${query}%, description.ilike.%${query}%, category.ilike.%${query}%`)
    .order("name");

  if (response.error) {
    console.error("Error searching products:", response.error);
    throw response.error;
  }

  console.log(`Search returned ${response.data?.length || 0} results`);
  
  return (response.data || []).map(mapDbProductToInterface);
};

// Get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  console.log(`Fetching products by category: ${category}`);
  
  // Handle "dry-fruits" or "dry fruits" as a special case to include both "dry fruits" and related categories 
  if (category === "dry-fruits" || category === "dry fruits") {
    const response = await supabase
      .from("products")
      .select("*")
      .or(`category.ilike.%dry%fruit%, category.ilike.%nut%`)
      .order("name");

    if (response.error) {
      console.error("Error fetching dry fruits products:", response.error);
      throw response.error;
    }

    console.log(`Retrieved ${response.data?.length || 0} dry fruits/nuts products`);
    return (response.data || []).map(mapDbProductToInterface);
  } 
  
  // For other categories, use the exact match
  const response = await supabase
    .from("products")
    .select("*")
    .ilike("category", `%${category}%`)
    .order("name");

  if (response.error) {
    console.error("Error fetching products by category:", response.error);
    throw response.error;
  }

  console.log(`Retrieved ${response.data?.length || 0} products in category "${category}"`);
  
  return (response.data || []).map(mapDbProductToInterface);
};

// Get related products (products in the same category)
export const getRelatedProducts = async (productId: string, category: string, limit: number = 4): Promise<Product[]> => {
  console.log(`Fetching ${limit} related products for product ${productId} in category ${category}`);
  
  const response = await supabase
    .from("products")
    .select("*")
    .ilike("category", `%${category}%`) 
    .neq("id", productId) // Exclude the current product
    .limit(limit);

  if (response.error) {
    console.error("Error fetching related products:", response.error);
    throw response.error;
  }

  console.log(`Retrieved ${response.data?.length || 0} related products`);
  
  return (response.data || []).map(mapDbProductToInterface);
};
