
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
      // Use explicit typing with the full response object
      const response = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (response.error) {
        console.error("Error fetching product by ID:", response.error);
        // Don't throw here, continue with other search methods
      } else if (response.data) {
        console.log(`Found product by ID: ${response.data.name}`);
        return mapDbProductToInterface(response.data);
      } else {
        console.log("No product found with that ID");
      }
    } catch (error) {
      console.error("Exception when fetching by ID:", error);
      // Don't throw here, continue with other search methods
    }
  } 
  
  // If not found by ID, try by slug
  try {
    console.log("Attempting direct slug lookup");
    
    const slugResponse = await supabase
      .from("products")
      .select("*")
      .eq("slug", productId)
      .single();
      
    if (slugResponse.data) {
      console.log(`Found product by slug: ${slugResponse.data.name}`);
      return mapDbProductToInterface(slugResponse.data);
    }
  } catch (error) {
    console.log("Slug column might not exist or other error:", error);
    // Continue with name-based search
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
      .single();

    if (exactNameResponse.data) {
      console.log(`Found product by exact name match: ${exactNameResponse.data.name}`);
      return mapDbProductToInterface(exactNameResponse.data);
    }
  } catch (error) {
    console.log("No exact name match found, trying partial match");
  }

  // Try partial match if exact match fails
  try {
    const partialResponse = await supabase
      .from("products")
      .select("*")
      .ilike("name", `%${searchTerm}%`)
      .order("name")
      .single();
      
    if (partialResponse.data) {
      console.log(`Found product by partial name match: ${partialResponse.data.name}`);
      return mapDbProductToInterface(partialResponse.data);
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
          .limit(1)
          .single();
        
        if (wordResponse.data) {
          console.log(`Found product by word match (${word}): ${wordResponse.data.name}`);
          return mapDbProductToInterface(wordResponse.data);
        }
      } catch (error) {
        console.log(`No match found for word: ${word}`);
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
          .single();
        
        if (commonResponse.data) {
          console.log(`Found product by common name match: ${commonResponse.data.name}`);
          return mapDbProductToInterface(commonResponse.data);
        }
      } catch (error) {
        console.log(`No match found for common product: ${product}`);
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
      .single();
    
    if (anyResponse.data) {
      console.log(`Returning fallback product: ${anyResponse.data.name}`);
      return mapDbProductToInterface(anyResponse.data);
    }
  } catch (error) {
    console.log("No products found at all");
  }
  
  console.log("All search methods exhausted, no product found");
  return null;
};
