
import { Product } from "@/types/supabase";

// Define SimpleQueryResult type to handle Supabase query responses
export interface SimpleQueryResult {
  data: any[] | null;
  error: any;
  count?: number;
}

// Helper function to map database fields to Product interface
export const mapDbProductToInterface = (dbProduct: any): Product => {
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
    slug: dbProduct.slug,
    createdAt: dbProduct.created_at,
    updatedAt: dbProduct.updated_at,
  };
};

// Helper function to safely transform database results into products
export const transformDbResults = (result: any): Product[] => {
  if (result?.error) {
    console.error("Error in database query:", result.error);
    return [];
  }
  
  if (!result?.data) {
    return [];
  }
  
  return result.data.map((item: any) => mapDbProductToInterface(item));
};
