
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";
import { mapDbProductToInterface, SimpleQueryResult } from "../utils/dbUtils";

// Get product by ID or slug
export const getProductById = async (productId: string): Promise<Product | null> => {
  console.log(`Searching for product with ID/slug: "${productId}"`);
  
  // Try to get by ID first (for UUID format)
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  
  if (uuidPattern.test(productId)) {
    console.log("ID appears to be a UUID, searching by exact ID match");
    
    const result: SimpleQueryResult = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .maybeSingle() as unknown as SimpleQueryResult;

    if (result.error && result.error.code !== "PGRST116") {
      console.error("Error fetching product by ID:", result.error);
      throw result.error;
    }

    if (result.data) {
      console.log(`Found product by ID: ${result.data.name}`);
      return mapDbProductToInterface(result.data);
    } else {
      console.log("No product found with that ID");
    }
  } 
  
  // If not found by ID, try by slug
  try {
    console.log("Attempting direct slug lookup");
    
    const result: SimpleQueryResult = await supabase
      .from("products")
      .select("*")
      .eq("slug", productId)
      .maybeSingle() as unknown as SimpleQueryResult;
    
    const slugData = result.data;
    const slugError = result.error;
      
    if (!slugError && slugData) {
      console.log(`Found product by slug: ${slugData.name}`);
      return mapDbProductToInterface(slugData);
    }
  } catch (e) {
    console.log("Slug column might not exist, continuing with name-based search");
  }
  
  // Convert slug to a likely product name (replace hyphens with spaces)
  const searchTerm = productId.replace(/-/g, ' ').trim();
  console.log(`Converted slug to search term: "${searchTerm}"`);
  
  // Try exact match first on name
  const nameResult: SimpleQueryResult = await supabase
    .from("products")
    .select("*")
    .ilike("name", searchTerm)
    .maybeSingle() as unknown as SimpleQueryResult;
    
  // Manual extraction
  const data = nameResult.data;
  const error = nameResult.error;

  if (data) {
    console.log(`Found product by exact name match: ${data.name}`);
    return mapDbProductToInterface(data);
  }
  
  if (error && error.code !== "PGRST116") {
    console.error("Error in exact name search:", error);
  } else {
    console.log("No exact name match found, trying partial match");
  }

  // Try partial match if exact match fails
  const partialResult: SimpleQueryResult = await supabase
    .from("products")
    .select("*")
    .ilike("name", `%${searchTerm}%`)
    .order("name")
    .maybeSingle() as unknown as SimpleQueryResult;
    
  // Manual extraction
  const partialData = partialResult.data;
  const partialError = partialResult.error;
    
  if (partialError && partialError.code !== "PGRST116") {
    console.error("Error in partial name search:", partialError);
    throw partialError;
  }
  
  if (partialData) {
    console.log(`Found product by partial name match: ${partialData.name}`);
    return mapDbProductToInterface(partialData);
  } 
  
  console.log("No products found with that name pattern");
  
  // Last attempt: try searching word by word
  const words = searchTerm.split(' ').filter(word => word.length > 3);
  console.log(`Trying word-by-word search with: ${words.join(', ')}`);
  
  if (words.length > 0) {
    for (const word of words) {
      const wordResult: SimpleQueryResult = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${word}%`)
        .limit(1)
        .maybeSingle() as unknown as SimpleQueryResult;
      
      if (!wordResult.error && wordResult.data) {
        console.log(`Found product by word match (${word}): ${wordResult.data.name}`);
        return mapDbProductToInterface(wordResult.data);
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
      
      const commonResult: SimpleQueryResult = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${product}%`)
        .limit(1)
        .maybeSingle() as unknown as SimpleQueryResult;
      
      if (commonResult.data) {
        console.log(`Found product by common name match: ${commonResult.data.name}`);
        return mapDbProductToInterface(commonResult.data);
      }
    }
  }
  
  // Try searching all products as a last resort
  console.log("Attempting to find any product as a fallback");
  
  const anyResult: SimpleQueryResult = await supabase
    .from("products")
    .select("*")
    .limit(1)
    .maybeSingle() as unknown as SimpleQueryResult;
  
  if (anyResult.data) {
    console.log(`Returning fallback product: ${anyResult.data.name}`);
    return mapDbProductToInterface(anyResult.data);
  }
  
  console.log("All search methods exhausted, no product found");
  return null;
};
