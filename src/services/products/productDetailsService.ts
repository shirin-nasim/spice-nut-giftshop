
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";
import { mapDbProductToInterface } from "../utils/dbUtils";

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
        .maybeSingle();

      if (response.error) {
        if (response.error.code !== "PGRST116") {
          console.error("Error fetching product by ID:", response.error);
          throw response.error;
        }
      }

      if (response.data) {
        console.log(`Found product by ID: ${response.data.name}`);
        return mapDbProductToInterface(response.data);
      } else {
        console.log("No product found with that ID");
      }
    } catch (error) {
      console.error("Exception when fetching by ID:", error);
      throw error;
    }
  } 
  
  // If not found by ID, try by slug
  try {
    console.log("Attempting direct slug lookup");
    
    const slugResponse = await supabase
      .from("products")
      .select("*")
      .eq("slug", productId)
      .maybeSingle();
      
    if (!slugResponse.error && slugResponse.data) {
      console.log(`Found product by slug: ${slugResponse.data.name}`);
      return mapDbProductToInterface(slugResponse.data);
    }
  } catch (e) {
    console.log("Slug column might not exist, continuing with name-based search");
  }
  
  // Convert slug to a likely product name (replace hyphens with spaces)
  const searchTerm = productId.replace(/-/g, ' ').trim();
  console.log(`Converted slug to search term: "${searchTerm}"`);
  
  // Try exact match first on name
  try {
    const exactNameResponse = await supabase
      .from("products")
      .select("*")
      .ilike("name", searchTerm)
      .maybeSingle();

    if (exactNameResponse.data) {
      console.log(`Found product by exact name match: ${exactNameResponse.data.name}`);
      return mapDbProductToInterface(exactNameResponse.data);
    }
    
    if (exactNameResponse.error && exactNameResponse.error.code !== "PGRST116") {
      console.error("Error in exact name search:", exactNameResponse.error);
    } else {
      console.log("No exact name match found, trying partial match");
    }
  } catch (error) {
    console.error("Exception when searching by exact name:", error);
  }

  // Try partial match if exact match fails
  try {
    const partialResponse = await supabase
      .from("products")
      .select("*")
      .ilike("name", `%${searchTerm}%`)
      .order("name")
      .maybeSingle();
      
    if (partialResponse.error && partialResponse.error.code !== "PGRST116") {
      console.error("Error in partial name search:", partialResponse.error);
      throw partialResponse.error;
    }
    
    if (partialResponse.data) {
      console.log(`Found product by partial name match: ${partialResponse.data.name}`);
      return mapDbProductToInterface(partialResponse.data);
    }
  } catch (error) {
    console.error("Exception when searching by partial name:", error);
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
          .limit(1)
          .maybeSingle();
        
        if (!wordResponse.error && wordResponse.data) {
          console.log(`Found product by word match (${word}): ${wordResponse.data.name}`);
          return mapDbProductToInterface(wordResponse.data);
        }
      } catch (error) {
        console.error(`Error searching by word '${word}':`, error);
      }
    }
  }
  
  // Direct case-insensitive approach for common products
  // Try to match against a list of common product names
  const commonProducts = [
    "almonds", "cashews", "walnuts", "pistachios", "raisins", "figs", "dates",
    "black pepper", "cumin", "coriander", "turmeric", "cinnamon", "cloves", "cardamom"
  ];
  
  for (const product of commonProducts) {
    if (searchTerm.toLowerCase().includes(product)) {
      console.log(`Trying common product match for: ${product}`);
      
      try {
        const commonResponse = await supabase
          .from("products")
          .select("*")
          .ilike("name", `%${product}%`)
          .limit(1)
          .maybeSingle();
        
        if (commonResponse.data) {
          console.log(`Found product by common name match: ${commonResponse.data.name}`);
          return mapDbProductToInterface(commonResponse.data);
        }
      } catch (error) {
        console.error(`Error searching by common product '${product}':`, error);
      }
    }
  }
  
  // Try searching all products as a last resort
  console.log("Attempting to find any product as a fallback");
  
  try {
    const anyResponse = await supabase
      .from("products")
      .select("*")
      .limit(1)
      .maybeSingle();
    
    if (anyResponse.data) {
      console.log(`Returning fallback product: ${anyResponse.data.name}`);
      return mapDbProductToInterface(anyResponse.data);
    }
  } catch (error) {
    console.error("Error fetching fallback product:", error);
  }
  
  console.log("All search methods exhausted, no product found");
  return null;
};
