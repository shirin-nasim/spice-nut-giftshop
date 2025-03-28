
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { premiumDryFruits } from "./data/premium-dry-fruits.ts";
import { regularDryFruits } from "./data/regular-dry-fruits.ts";
import { essentialSpices } from "./data/essential-spices.ts";
import { premiumSpices } from "./data/premium-spices.ts";
import { giftBoxes } from "./data/gift-boxes.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://vwavxfqplapjoofwbbrt.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Log the current state before updates
    const { data: existingProducts, error: fetchError } = await supabase
      .from('products')
      .select('name');
    
    if (fetchError) {
      console.error("Error fetching existing products:", fetchError);
    } else {
      console.log(`Found ${existingProducts.length} existing products before update`);
    }

    // Combine all product categories
    const products = [
      ...premiumDryFruits,
      ...regularDryFruits,
      ...essentialSpices,
      ...premiumSpices,
      ...giftBoxes
    ];

    console.log(`Preparing to upsert ${products.length} products`);
    
    // First, make sure to perform the upsert
    const { data, error } = await supabase
      .from('products')
      .upsert(products, { 
        onConflict: 'name',
        ignoreDuplicates: false
      });

    if (error) {
      console.error("Error during product upsert:", error);
      throw error;
    }

    // Verify that products were actually inserted by checking the count
    const { count, error: countError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error("Error counting products after upsert:", countError);
    } else {
      console.log(`Total products after update: ${count}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Products updated successfully", 
        count: products.length,
        totalInDatabase: count || 'unknown'
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );

  } catch (error) {
    console.error("Error updating products:", error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
