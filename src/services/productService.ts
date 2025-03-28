
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  console.log("Fetching all products from database...");
  
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  console.log(`Retrieved ${data?.length || 0} products from database`);
  
  return data as unknown as Product[];
};

// Get products with pagination
export const getPaginatedProducts = async (
  page: number = 1,
  pageSize: number = 12
): Promise<{ products: Product[], total: number }> => {
  // Calculate the starting point
  const start = (page - 1) * pageSize;
  
  console.log(`Fetching paginated products: page ${page}, pageSize ${pageSize}`);
  
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

  console.log(`Retrieved ${data?.length || 0} products (total: ${count || 0})`);
  
  return { 
    products: data as unknown as Product[], 
    total: count || 0 
  };
};

// Get product by ID or slug
export const getProductById = async (productId: string): Promise<Product | null> => {
  console.log(`Searching for product with ID/slug: "${productId}"`);
  
  // Try to get by ID first (for UUID format)
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  
  if (uuidPattern.test(productId)) {
    console.log("ID appears to be a UUID, searching by exact ID match");
    
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching product by ID:", error);
      throw error;
    }

    if (data) {
      console.log(`Found product by ID: ${data.name}`);
    } else {
      console.log("No product found with that ID");
    }

    return data as unknown as Product;
  } 
  
  // If not UUID format, try more flexible slug-based search
  // First, convert slug to a likely product name (replace hyphens with spaces)
  const searchTerm = productId.replace(/-/g, ' ').trim();
  console.log(`Converted slug to search term: "${searchTerm}"`);
  
  // Try exact match first (most likely to work)
  let { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("name", searchTerm)
    .maybeSingle();

  if (data) {
    console.log(`Found product by exact name match: ${data.name}`);
    return data as unknown as Product;
  }
  
  if (error && error.code !== "PGRST116") {
    console.error("Error in exact name search:", error);
  } else {
    console.log("No exact name match found, trying partial match");
  }

  // Try partial match if exact match fails
  const { data: partialData, error: partialError } = await supabase
    .from("products")
    .select("*")
    .ilike("name", `%${searchTerm}%`)
    .order("name")
    .maybeSingle();
    
  if (partialError && partialError.code !== "PGRST116") {
    console.error("Error in partial name search:", partialError);
    throw partialError;
  }
  
  if (partialData) {
    console.log(`Found product by partial name match: ${partialData.name}`);
  } else {
    console.log("No products found with that name pattern");
    
    // Last attempt: try searching word by word
    const words = searchTerm.split(' ').filter(word => word.length > 3);
    console.log(`Trying word-by-word search with: ${words.join(', ')}`);
    
    if (words.length > 0) {
      for (const word of words) {
        const { data: wordData, error: wordError } = await supabase
          .from("products")
          .select("*")
          .ilike("name", `%${word}%`)
          .limit(1)
          .maybeSingle();
          
        if (!wordError && wordData) {
          console.log(`Found product by word match (${word}): ${wordData.name}`);
          return wordData as unknown as Product;
        }
      }
    }
    
    console.log("All search methods exhausted, no product found");
  }

  return partialData as unknown as Product;
};

// Get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  console.log(`Fetching products by category: ${category}`);
  
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("name");

  if (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }

  console.log(`Retrieved ${data?.length || 0} products in category "${category}"`);
  
  return data as unknown as Product[];
};

// Search products
export const searchProducts = async (query: string): Promise<Product[]> => {
  console.log(`Searching products with query: "${query}"`);
  
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or(`name.ilike.%${query}%, description.ilike.%${query}%, category.ilike.%${query}%`)
    .order("name");

  if (error) {
    console.error("Error searching products:", error);
    throw error;
  }

  console.log(`Search returned ${data?.length || 0} results`);
  
  return data as unknown as Product[];
};

// Get related products (products in the same category)
export const getRelatedProducts = async (productId: string, category: string, limit: number = 4): Promise<Product[]> => {
  console.log(`Fetching ${limit} related products for product ${productId} in category ${category}`);
  
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

  console.log(`Retrieved ${data?.length || 0} related products`);
  
  return data as unknown as Product[];
};
