
import { supabase } from "@/integrations/supabase/client";

/**
 * Trigger the update-products Edge Function to add all products to the database
 */
export const updateProductsInDatabase = async (): Promise<{ success: boolean; message: string; count?: number }> => {
  try {
    const { data, error } = await supabase.functions.invoke("update-products");
    
    if (error) {
      console.error("Error invoking update-products function:", error);
      return {
        success: false,
        message: `Failed to update products: ${error.message}`
      };
    }
    
    if (!data || !data.success) {
      return {
        success: false,
        message: data?.message || "Unknown error occurred while updating products"
      };
    }
    
    return {
      success: true,
      message: data.message || "Products updated successfully",
      count: data.count
    };
  } catch (error) {
    console.error("Exception in updateProductsInDatabase:", error);
    return {
      success: false,
      message: `Exception occurred: ${error instanceof Error ? error.message : String(error)}`
    };
  }
};
