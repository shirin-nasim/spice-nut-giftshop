
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { additionalDryFruits } from "./data/additional-dry-fruits.ts";
import { additionalSpices } from "./data/additional-spices.ts";
import { regularDryFruits } from "./data/regular-dry-fruits.ts";
import { premiumSpices } from "./data/premium-spices.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
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
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing environment variables for Supabase");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Combine all product lists
    const allProducts = [
      ...additionalDryFruits,
      ...additionalSpices,
      ...regularDryFruits,
      ...premiumSpices,
    ];

    // Clean data and create slugs
    const productsWithSlugs = allProducts.map(product => {
      const slug = product.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      
      return {
        ...product,
        slug,
      };
    });

    console.log(`Preparing to insert ${productsWithSlugs.length} products`);
    
    // Insert products into database
    const { data, error } = await supabase
      .from('products')
      .upsert(productsWithSlugs, { 
        onConflict: 'name',
        ignoreDuplicates: false,
      });

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({
        success: true, 
        message: "Products updated successfully",
        count: productsWithSlugs.length
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );

  } catch (error) {
    console.error("Error updating products:", error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});
