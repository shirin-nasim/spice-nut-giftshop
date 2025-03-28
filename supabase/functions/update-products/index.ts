
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { premiumDryFruits } from "./data/premium-dry-fruits.ts";
import { regularDryFruits } from "./data/regular-dry-fruits.ts";
import { essentialSpices } from "./data/essential-spices.ts";
import { premiumSpices } from "./data/premium-spices.ts";
import { giftBoxes } from "./data/gift-boxes.ts";
import { additionalDryFruits } from "./data/additional-dry-fruits.ts";
import { additionalSpices } from "./data/additional-spices.ts";

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
    console.log("Starting product update process...");
    
    if (!SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set. Cannot proceed with database operations.");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Log the current state before updates
    const { data: existingProducts, error: fetchError } = await supabase
      .from('products')
      .select('name');
    
    if (fetchError) {
      console.error("Error fetching existing products:", fetchError);
    } else {
      console.log(`Found ${existingProducts.length} existing products before update`);
      if (existingProducts.length > 0) {
        console.log("Sample products:", existingProducts.slice(0, 3).map(p => p.name));
      }
    }

    // Combine all product categories, including the new ones
    const products = [
      ...premiumDryFruits,
      ...regularDryFruits,
      ...essentialSpices,
      ...premiumSpices,
      ...giftBoxes,
      ...additionalDryFruits,
      ...additionalSpices
    ];

    console.log(`Preparing to upsert ${products.length} products`);
    console.log("Product categories breakdown:");
    console.log(`- Premium Dry Fruits: ${premiumDryFruits.length}`);
    console.log(`- Regular Dry Fruits: ${regularDryFruits.length}`);
    console.log(`- Essential Spices: ${essentialSpices.length}`);
    console.log(`- Premium Spices: ${premiumSpices.length}`);
    console.log(`- Gift Boxes: ${giftBoxes.length}`);
    console.log(`- Additional Dry Fruits: ${additionalDryFruits.length}`);
    console.log(`- Additional Spices: ${additionalSpices.length}`);
    
    // Verify some sample product data
    const sampleProducts = [
      products[0],
      products[Math.floor(products.length / 3)],
      products[Math.floor(products.length * 2 / 3)],
      products[products.length - 1]
    ];
    
    console.log("Sample product data for verification:");
    sampleProducts.forEach((product, index) => {
      console.log(`Sample ${index + 1}: ${product.name} (${product.category}) - $${product.price}`);
    });
    
    // First, make sure to perform the upsert with proper error handling
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

    // Verify that products were actually inserted by checking specific products
    console.log("Verifying specific products after upsert...");
    
    // Check for a dry fruit product
    const { data: almondProduct, error: almondError } = await supabase
      .from('products')
      .select('*')
      .ilike('name', '%Almond%')
      .limit(1)
      .single();
      
    if (almondError) {
      console.error("Error verifying almond product:", almondError);
    } else {
      console.log("Almond product verification:", almondProduct ? "Found" : "Not found");
      if (almondProduct) {
        console.log(`- ${almondProduct.name} (${almondProduct.category})`);
      }
    }
    
    // Check for a spice product
    const { data: pepperProduct, error: pepperError } = await supabase
      .from('products')
      .select('*')
      .ilike('name', '%Pepper%')
      .limit(1)
      .single();
      
    if (pepperError) {
      console.error("Error verifying pepper product:", pepperError);
    } else {
      console.log("Pepper product verification:", pepperProduct ? "Found" : "Not found");
      if (pepperProduct) {
        console.log(`- ${pepperProduct.name} (${pepperProduct.category})`);
      }
    }

    // Get the final count of all products
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
