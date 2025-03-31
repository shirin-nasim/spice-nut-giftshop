
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";
import { mapDbProductToInterface, SimpleQueryResult } from "../utils/dbUtils";

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
