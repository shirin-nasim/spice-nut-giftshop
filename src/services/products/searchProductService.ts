
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";

// Define the filter parameters type
export interface ProductFilterParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  search?: string;
  isNew?: boolean;
  origin?: string;
}

// Define the sort options type
export type SortOption = 
  | "price-asc" 
  | "price-desc" 
  | "rating-desc" 
  | "newest" 
  | "popularity";

/**
 * Search for products with filters and pagination
 */
export const searchProducts = async (
  filters: ProductFilterParams = {},
  sort: SortOption = "popularity",
  page: number = 1,
  pageSize: number = 12
): Promise<{ products: Product[]; total: number }> => {
  try {
    console.info(`Fetching paginated products: page ${page}, pageSize ${pageSize}`);
    
    // Start building the query
    let query = supabase
      .from("products")
      .select("*", { count: "exact" });
    
    // Apply filters
    if (filters.category) {
      // Handle category filter - make it case insensitive
      query = query.ilike("category", `%${filters.category.toLowerCase()}%`);
    }
    
    if (filters.minPrice !== undefined) {
      query = query.gte("price", filters.minPrice);
    }
    
    if (filters.maxPrice !== undefined) {
      query = query.lte("price", filters.maxPrice);
    }
    
    if (filters.rating !== undefined) {
      query = query.gte("rating", filters.rating);
    }
    
    if (filters.inStock !== undefined) {
      query = query.eq("in_stock", filters.inStock);
    }
    
    if (filters.isNew !== undefined) {
      query = query.eq("is_new", filters.isNew);
    }
    
    if (filters.origin) {
      query = query.ilike("origin", `%${filters.origin}%`);
    }
    
    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }
    
    // Apply sorting
    switch (sort) {
      case "price-asc":
        query = query.order("price", { ascending: true });
        break;
      case "price-desc":
        query = query.order("price", { ascending: false });
        break;
      case "rating-desc":
        query = query.order("rating", { ascending: false });
        break;
      case "newest":
        query = query.order("created_at", { ascending: false });
        break;
      case "popularity":
      default:
        query = query.order("rating", { ascending: false });
        break;
    }
    
    // Apply pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);
    
    // Execute the query
    const { data, error, count } = await query;
    
    if (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
    
    const products = data.map((product: any) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.original_price,
      image: product.image,
      category: product.category,
      badge: product.badge,
      rating: product.rating,
      isNew: product.is_new,
      inStock: product.in_stock,
      description: product.description,
      origin: product.origin,
      weight: product.weight,
      shelfLife: product.shelf_life,
      ingredients: product.ingredients,
      stockQuantity: product.stock_quantity,
      nutrition: product.nutrition,
      slug: product.slug,
      createdAt: product.created_at,
      updatedAt: product.updated_at
    }));
    
    console.info(`Retrieved ${products.length} products (total: ${count})`);
    
    return {
      products,
      total: count || 0
    };
  } catch (error) {
    console.error("Error in searchProducts:", error);
    return { products: [], total: 0 };
  }
};

/**
 * Fetch products by category
 */
export const getProductsByCategory = async (
  category: string,
  page: number = 1,
  pageSize: number = 12
): Promise<{ products: Product[]; total: number }> => {
  try {
    console.info(`Fetching products by category: ${category}`);
    
    // For "all" category, return all products
    if (category === "all") {
      return searchProducts({}, "popularity", page, pageSize);
    }
    
    // Map frontend URL parameter to database categories
    let dbCategory = category;
    
    // Convert URL-friendly format to database format
    if (category === "dry-fruits") {
      dbCategory = "dry fruits";
    }
    
    const result = await searchProducts(
      { category: dbCategory },
      "popularity",
      page,
      pageSize
    );
    
    console.info(`Fetched products for category ${category}, page ${page}, total: ${result.total}`);
    
    return result;
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    return { products: [], total: 0 };
  }
};

/**
 * Get unique product origins for filtering
 */
export const getProductOrigins = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("origin")
      .not("origin", "is", null);
    
    if (error) {
      throw error;
    }
    
    // Extract unique origins
    const origins = Array.from(new Set(data.map(item => item.origin)));
    
    return origins.filter(Boolean) as string[];
  } catch (error) {
    console.error("Error fetching product origins:", error);
    return [];
  }
};
