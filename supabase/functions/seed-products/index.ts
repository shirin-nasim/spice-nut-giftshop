
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

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

    // Sample products data
    const products = [
      {
        name: "Premium California Almonds",
        price: 12.99,
        original_price: 15.99,
        image: "https://images.unsplash.com/photo-1574184864703-3487b13f0edd?q=80&w=1932&auto=format&fit=crop",
        category: "dry fruits",
        rating: 5,
        in_stock: true,
        is_new: false,
        description: "Our premium California almonds are carefully selected for their size, flavor, and nutritional value. Perfect for snacking, baking, or creating nutritious dishes.",
        origin: "California, USA",
        weight: "500g",
        shelf_life: "12 months",
        ingredients: "100% Natural Almonds",
        stock_quantity: 250,
        nutrition: {
          servingSize: "30g",
          calories: "170 kcal",
          protein: "6g",
          fat: "15g",
          carbohydrates: "6g",
          fiber: "3g"
        }
      },
      {
        name: "Jumbo Cashews Premium Grade",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1607113256158-56a934936ef1?q=80&w=1974&auto=format&fit=crop",
        category: "dry fruits",
        badge: "Best Seller",
        rating: 4.5,
        in_stock: true,
        description: "Our jumbo cashews are harvested at peak ripeness, lightly roasted to perfection to enhance their naturally buttery flavor. Each cashew is hand-selected for size and quality.",
        origin: "Vietnam",
        weight: "400g",
        shelf_life: "9 months",
        ingredients: "100% Natural Cashews",
        stock_quantity: 175,
        nutrition: {
          servingSize: "30g",
          calories: "160 kcal",
          protein: "5g",
          fat: "13g",
          carbohydrates: "9g",
          fiber: "1g"
        }
      },
      {
        name: "Pure Premium Saffron Threads",
        price: 19.99,
        original_price: 24.99,
        image: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?q=80&w=1964&auto=format&fit=crop",
        category: "spices",
        badge: "Limited",
        rating: 5,
        in_stock: true,
        description: "Harvested by hand from the finest crocus flowers, our premium saffron threads deliver exceptional color, aroma, and flavor to your culinary creations.",
        origin: "Kashmir, India",
        weight: "2g",
        shelf_life: "24 months",
        ingredients: "100% Pure Saffron Threads",
        stock_quantity: 50,
        nutrition: {
          servingSize: "0.1g",
          calories: "1 kcal",
          protein: "0g",
          fat: "0g",
          carbohydrates: "0g",
          fiber: "0g"
        }
      },
      {
        name: "Roasted Pistachios Lightly Salted",
        price: 11.99,
        image: "https://images.unsplash.com/photo-1590760475226-60ada5127a6f?q=80&w=1974&auto=format&fit=crop",
        category: "dry fruits",
        rating: 4,
        is_new: true,
        in_stock: true,
        description: "Our roasted pistachios are lightly salted to enhance their natural flavor. Packed with nutrients and antioxidants, they make a perfect healthy snack.",
        origin: "California, USA",
        weight: "350g",
        shelf_life: "8 months",
        ingredients: "Pistachios, Salt",
        stock_quantity: 200,
        nutrition: {
          servingSize: "30g",
          calories: "160 kcal",
          protein: "6g",
          fat: "13g",
          carbohydrates: "8g",
          fiber: "3g"
        }
      },
      {
        name: "Organic Green Cardamom Pods",
        price: 8.99,
        original_price: 10.99,
        image: "https://images.unsplash.com/photo-1552189050-8be8fee84507?q=80&w=1974&auto=format&fit=crop",
        category: "spices",
        rating: 4.5,
        in_stock: true,
        description: "Our organic green cardamom pods are sourced from high-altitude farms known for producing the most aromatic cardamom. Perfect for both sweet and savory dishes.",
        origin: "Kerala, India",
        weight: "50g",
        shelf_life: "18 months",
        ingredients: "100% Organic Green Cardamom Pods",
        stock_quantity: 150,
        nutrition: {
          servingSize: "1g",
          calories: "3 kcal",
          protein: "0g",
          fat: "0g",
          carbohydrates: "1g",
          fiber: "0g"
        }
      },
      {
        name: "California Walnut Halves & Pieces",
        price: 13.99,
        image: "https://images.unsplash.com/photo-1596362601603-b74f6ef166e5?q=80&w=1964&auto=format&fit=crop",
        category: "dry fruits",
        rating: 4,
        in_stock: true,
        description: "Our premium California walnuts have a mild, buttery flavor and are an excellent source of omega-3 fatty acids. Ideal for baking, cooking, or snacking.",
        origin: "California, USA",
        weight: "450g",
        shelf_life: "10 months",
        ingredients: "100% Natural Walnuts",
        stock_quantity: 180,
        nutrition: {
          servingSize: "30g",
          calories: "190 kcal",
          protein: "4g",
          fat: "18g",
          carbohydrates: "4g",
          fiber: "2g"
        }
      },
      {
        name: "Ceylon Cinnamon Sticks Premium",
        price: 7.99,
        original_price: 9.99,
        image: "https://images.unsplash.com/photo-1639981585287-ebb3cdd35e33?q=80&w=1933&auto=format&fit=crop",
        category: "spices",
        rating: 4.5,
        in_stock: true,
        description: "Our Ceylon cinnamon sticks, known as 'true cinnamon', have a delicate, sweet flavor profile with subtle notes of citrus. Perfect for teas, desserts, and curries.",
        origin: "Sri Lanka",
        weight: "100g",
        shelf_life: "24 months",
        ingredients: "100% Pure Ceylon Cinnamon",
        stock_quantity: 120,
        nutrition: {
          servingSize: "1g",
          calories: "2 kcal",
          protein: "0g",
          fat: "0g",
          carbohydrates: "1g",
          fiber: "1g"
        }
      },
      {
        name: "Luxury Dry Fruit & Spice Gift Box",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1980&auto=format&fit=crop",
        category: "gift boxes",
        badge: "Premium",
        rating: 5,
        is_new: true,
        in_stock: true,
        description: "Our luxury gift box contains a carefully curated selection of premium dry fruits and exotic spices. Perfect for gifting on special occasions or corporate events.",
        origin: "Multiple Origins",
        weight: "750g",
        shelf_life: "9 months",
        ingredients: "Premium Almonds, Cashews, Pistachios, Dried Apricots, Saffron, Green Cardamom",
        stock_quantity: 50,
        nutrition: {
          servingSize: "Varies by product",
          calories: "Varies by product",
          protein: "Varies by product",
          fat: "Varies by product",
          carbohydrates: "Varies by product",
          fiber: "Varies by product"
        }
      }
    ];

    // Insert products into the database
    const { data, error } = await supabase
      .from('products')
      .upsert(products, { onConflict: 'name' });

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ success: true, message: "Products seeded successfully", count: products.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );

  } catch (error) {
    console.error("Error seeding products:", error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
