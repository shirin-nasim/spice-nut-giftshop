
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";
import { mapDbProductToInterface } from "../utils/dbUtils";

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  console.log("Fetching all products from database...");
  
  const response = await supabase
    .from("products")
    .select("*")
    .order("name");

  if (response.error) {
    console.error("Error fetching products:", response.error);
    throw response.error;
  }

  console.log(`Retrieved ${response.data?.length || 0} products from database`);
  
  // Add this debug logging to help identify issues
  if (response.data?.length === 0) {
    console.log("WARNING: No products found in database. Check if products table is populated.");
  } else if (response.data) {
    // Log the first few products to help with debugging
    console.log("Sample products:", response.data.slice(0, 3).map(p => ({ id: p.id, name: p.name, category: p.category })));
  }
  
  return (response.data || []).map(mapDbProductToInterface);
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
  const response = await supabase
    .from("products")
    .select("*", { count: "exact" })
    .order("name")
    .range(start, start + pageSize - 1);

  if (response.error) {
    console.error("Error fetching paginated products:", response.error);
    throw response.error;
  }

  console.log(`Retrieved ${response.data?.length || 0} products (total: ${response.count || 0})`);
  
  return { 
    products: (response.data || []).map(mapDbProductToInterface), 
    total: response.count || 0 
  };
};
