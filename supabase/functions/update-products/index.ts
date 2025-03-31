
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { essentialSpices } from "./data/essential-spices.ts";
import { additionalSpices } from "./data/additional-spices.ts";
import { additionalDryFruits } from "./data/additional-dry-fruits.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Combine product lists
    const allProducts = [
      ...essentialSpices,
      ...additionalSpices,
      ...additionalDryFruits
    ];

    console.log(`Preparing to insert/update ${allProducts.length} products`);

    // Add slug to each product if not present
    const productsWithSlugs = allProducts.map(product => {
      if (!product.slug) {
        product.slug = generateSlug(product.name);
      }
      return product;
    });

    // Insert products into the database
    const { data, error } = await supabase
      .from('products')
      .upsert(productsWithSlugs, { 
        onConflict: 'name',
        ignoreDuplicates: false
      });

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Products updated successfully", 
        count: allProducts.length 
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
