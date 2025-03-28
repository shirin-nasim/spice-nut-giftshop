
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

    // Combine all product categories
    const products = [
      ...premiumDryFruits,
      ...regularDryFruits,
      ...essentialSpices,
      ...premiumSpices,
      ...giftBoxes
    ];

    // Insert products into the database
    const { data, error } = await supabase
      .from('products')
      .upsert(products, { onConflict: 'name' });

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ success: true, message: "Products updated successfully", count: products.length }),
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
