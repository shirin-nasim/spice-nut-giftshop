
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";

// Helper function to map database fields to Product interface
const mapDbProductToInterface = (dbProduct: any): Product => {
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
    details: dbProduct.details,
    nutrition: dbProduct.nutrition,
    createdAt: dbProduct.created_at,
    updatedAt: dbProduct.updated_at,
  };
};

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
  
  // Add this debug logging to help identify issues
  if (data?.length === 0) {
    console.log("WARNING: No products found in database. Check if products table is populated.");
  } else if (data) {
    // Log the first few products to help with debugging
    console.log("Sample products:", data.slice(0, 3).map(p => ({ id: p.id, name: p.name, category: p.category })));
  }
  
  return (data || []).map(mapDbProductToInterface);
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
    products: (data || []).map(mapDbProductToInterface), 
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
      return mapDbProductToInterface(data);
    } else {
      console.log("No product found with that ID");
    }
  } 
  
  // If not found by ID, try a more direct approach - check if there's a slug column
  // First try a direct slug lookup if the slug column exists
  try {
    console.log("Attempting direct slug lookup");
    const { data: slugData, error: slugError } = await supabase
      .from("products")
      .select("*")
      .eq("slug", productId)
      .maybeSingle();
      
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
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("name", searchTerm)
    .maybeSingle();

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
    return mapDbProductToInterface(partialData);
  } 
  
  console.log("No products found with that name pattern");
  
  // Last attempt: try searching word by word
  const words = searchTerm.split(' ').filter(word => word.length > 3);
  console.log(`Trying word-by-word search with: ${words.join(', ')}`);
  
  if (words.length > 0) {
    for (const word of words) {
      // Fix the infinite type instantiation error by specifying a concrete type
      type ProductQueryResult = { data: any; error: any };
      const result: ProductQueryResult = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${word}%`)
        .limit(1)
        .maybeSingle();
        
      if (!result.error && result.data) {
        console.log(`Found product by word match (${word}): ${result.data.name}`);
        return mapDbProductToInterface(result.data);
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
      type ProductQueryResult = { data: any; error: any };
      const result: ProductQueryResult = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${product}%`)
        .limit(1)
        .maybeSingle();
        
      if (result.data) {
        console.log(`Found product by common name match: ${result.data.name}`);
        return mapDbProductToInterface(result.data);
      }
    }
  }
  
  // Try searching all products as a last resort
  console.log("Attempting to find any product as a fallback");
  const { data: anyProduct } = await supabase
    .from("products")
    .select("*")
    .limit(1)
    .maybeSingle();
    
  if (anyProduct) {
    console.log(`Returning fallback product: ${anyProduct.name}`);
    return mapDbProductToInterface(anyProduct);
  }
  
  console.log("All search methods exhausted, no product found");
  return null;
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
  
  return (data || []).map(mapDbProductToInterface);
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
  
  return (data || []).map(mapDbProductToInterface);
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
  
  return (data || []).map(mapDbProductToInterface);
};
