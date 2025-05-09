import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";
import { mapDbProductToInterface, transformDbResults } from "../utils/dbUtils";

// Get product by ID or slug
export const getProductById = async (productId: string): Promise<Product | null> => {
  console.log(`Searching for product with ID/slug: "${productId}"`);
  
  // Try to get by ID first (for UUID format)
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  
  if (uuidPattern.test(productId)) {
    console.log("ID appears to be a UUID, searching by exact ID match");
    
    try {
      const response = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (response.error) {
        console.error("Error fetching product by ID:", response.error);
      } else if (response.data) {
        console.log(`Found product by ID: ${response.data.name}`);
        return mapDbProductToInterface(response.data);
      } else {
        console.log("No product found with that ID");
      }
    } catch (error) {
      console.error("Exception when fetching by ID:", error);
    }
  } 
  
  // Try by slug
  try {
    console.log("Attempting slug lookup");
    
    const slugResponse = await supabase
      .from("products")
      .select("*")
      .eq("slug", productId)
      .single();
      
    if (!slugResponse.error && slugResponse.data) {
      console.log(`Found product by slug: ${slugResponse.data.name}`);
      return mapDbProductToInterface(slugResponse.data);
    } else {
      console.log("No product found with that slug:", slugResponse.error);
    }
  } catch (error) {
    console.log("Error in slug lookup:", error);
  }
  
  // Convert slug to a likely product name (replace hyphens with spaces)
  const searchTerm = productId.replace(/-/g, ' ').trim();
  console.log(`Converted slug to search term: "${searchTerm}"`);
  
  // Try exact match first on name
  try {
    const exactNameResponse = await supabase
      .from("products")
      .select("*")
      .ilike("name", searchTerm);

    if (!exactNameResponse.error && exactNameResponse.data && exactNameResponse.data.length > 0) {
      console.log(`Found product by exact name match: ${exactNameResponse.data[0].name}`);
      return mapDbProductToInterface(exactNameResponse.data[0]);
    }
  } catch (error) {
    console.log("No exact name match found, trying partial match");
  }

  // Try partial match 
  try {
    const partialResponse = await supabase
      .from("products")
      .select("*")
      .ilike("name", `%${searchTerm}%`)
      .order("name");
      
    if (!partialResponse.error && partialResponse.data && partialResponse.data.length > 0) {
      console.log(`Found product by partial name match: ${partialResponse.data[0].name}`);
      return mapDbProductToInterface(partialResponse.data[0]);
    }
  } catch (error) {
    console.log("No partial name match found");
  }
  
  console.log("No products found with that name pattern");
  
  // Last attempt: try searching word by word
  const words = searchTerm.split(' ').filter(word => word.length > 3);
  console.log(`Trying word-by-word search with: ${words.join(', ')}`);
  
  if (words.length > 0) {
    for (const word of words) {
      try {
        const wordResponse = await supabase
          .from("products")
          .select("*")
          .ilike("name", `%${word}%`)
          .limit(1);
        
        if (!wordResponse.error && wordResponse.data && wordResponse.data.length > 0) {
          console.log(`Found product by word match (${word}): ${wordResponse.data[0].name}`);
          return mapDbProductToInterface(wordResponse.data[0]);
        }
      } catch (error) {
        console.log(`No match found for word: ${word}`);
      }
    }
  }
  
  // Try searching all products as a last resort
  console.log("Attempting to find any product as a fallback");
  
  try {
    const anyResponse = await supabase
      .from("products")
      .select("*")
      .limit(1);
    
    if (!anyResponse.error && anyResponse.data && anyResponse.data.length > 0) {
      console.log(`Returning fallback product: ${anyResponse.data[0].name}`);
      return mapDbProductToInterface(anyResponse.data[0]);
    }
  } catch (error) {
    console.log("No products found at all");
  }
  
  console.log("All search methods exhausted, no product found");
  return null;
};

/**
 * Get related products based on category
 * @param productId - The current product ID to exclude from results
 * @param category - The category to find related products from
 * @param limit - Maximum number of related products to return
 * @returns Array of related products
 */
export const getRelatedProducts = async (
  productId: string, 
  category?: string, 
  limit: number = 4
): Promise<Product[]> => {
  console.log(`Fetching related products for product ${productId} in category ${category}`);
  
  if (!category) {
    console.log("No category provided, fetching random products");
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .neq("id", productId)
      .limit(limit);
      
    if (error) {
      console.error("Error fetching related products:", error);
      throw error;
    }
    
    return (data || []).map(mapDbProductToInterface);
  }
  
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .neq("id", productId)
    .limit(limit);
    
  if (error) {
    console.error("Error fetching related products:", error);
    throw error;
  }
  
  console.log(`Found ${data?.length || 0} related products`);
  
  return (data || []).map(mapDbProductToInterface);
};
