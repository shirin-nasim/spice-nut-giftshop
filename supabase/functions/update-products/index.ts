
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

    // New product data based on user's requirements
    const products = [
      // Premium & Exotic Dry Fruits
      {
        name: "Mamra Almonds (Organic Premium)",
        price: 24.99,
        original_price: 29.99,
        image: "https://images.unsplash.com/photo-1574184864703-3487b13f0edd?q=80&w=1932&auto=format&fit=crop",
        category: "premium dry fruits",
        rating: 5,
        in_stock: true,
        badge: "Premium",
        description: "Our organic premium Mamra almonds are sourced from the finest orchards in Iran. Known for their superior taste and exceptional nutritional profile.",
        origin: "Iran",
        weight: "500g",
        shelf_life: "12 months",
        ingredients: "100% Organic Mamra Almonds",
        stock_quantity: 120,
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
        name: "California Almonds (Premium Grade)",
        price: 14.99,
        original_price: 17.99,
        image: "https://images.unsplash.com/photo-1596579953343-24513594fb48?q=80&w=2070&auto=format&fit=crop",
        category: "dry fruits",
        rating: 4.5,
        in_stock: true,
        description: "Premium grade California almonds, perfectly roasted to enhance their natural flavor. An excellent source of protein and healthy fats.",
        origin: "USA",
        weight: "500g",
        shelf_life: "12 months",
        ingredients: "100% Natural California Almonds",
        stock_quantity: 200,
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
        name: "Kashmiri Walnuts (Without Shell)",
        price: 18.99,
        original_price: 22.99,
        image: "https://images.unsplash.com/photo-1596362601603-b74f6ef166e5?q=80&w=1964&auto=format&fit=crop",
        category: "premium dry fruits",
        rating: 4.7,
        in_stock: true,
        description: "Premium Kashmiri walnuts, known for their light color, thin shells, and superior taste. Rich in Omega-3 fatty acids and antioxidants.",
        origin: "India",
        weight: "400g",
        shelf_life: "10 months",
        ingredients: "100% Natural Kashmiri Walnuts",
        stock_quantity: 150,
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
        name: "Iranian Pistachios (Premium)",
        price: 21.99,
        original_price: 24.99,
        image: "https://images.unsplash.com/photo-1590760475226-60ada5127a6f?q=80&w=1974&auto=format&fit=crop",
        category: "premium dry fruits",
        rating: 4.9,
        in_stock: true,
        badge: "Limited",
        description: "Authentic Iranian pistachios, known worldwide for their exceptional flavor, distinctive green color, and remarkable size.",
        origin: "Iran",
        weight: "350g",
        shelf_life: "9 months",
        ingredients: "100% Natural Iranian Pistachios",
        stock_quantity: 100,
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
        name: "Australian Macadamia Nuts (Whole)",
        price: 25.99,
        original_price: 29.99,
        image: "https://images.unsplash.com/photo-1574053103709-e5141aeac851?q=80&w=1974&auto=format&fit=crop",
        category: "premium dry fruits",
        rating: 4.8,
        in_stock: true,
        badge: "Luxury",
        description: "Premium Australian macadamia nuts, known for their rich, buttery flavor and creamy texture. A true delicacy for nut connoisseurs.",
        origin: "Australia",
        weight: "300g",
        shelf_life: "9 months",
        ingredients: "100% Natural Macadamia Nuts",
        stock_quantity: 80,
        nutrition: {
          servingSize: "30g",
          calories: "200 kcal",
          protein: "2g",
          fat: "22g",
          carbohydrates: "4g",
          fiber: "2g"
        }
      },
      
      // Regular Dry Fruits
      {
        name: "Premium Cashew Nuts (W320)",
        price: 16.99,
        original_price: 19.99,
        image: "https://images.unsplash.com/photo-1607113256158-56a934936ef1?q=80&w=1974&auto=format&fit=crop",
        category: "dry fruits",
        rating: 4.6,
        in_stock: true,
        badge: "Best Seller",
        description: "Premium W320 cashew nuts from Vietnam, lightly roasted to perfection to enhance their naturally buttery flavor.",
        origin: "Vietnam",
        weight: "400g",
        shelf_life: "9 months",
        ingredients: "100% Natural Cashew Nuts",
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
        name: "Golden Raisins (Premium)",
        price: 8.99,
        original_price: 10.99,
        image: "https://images.unsplash.com/photo-1580910527739-57906fb0ae89?q=80&w=1974&auto=format&fit=crop",
        category: "dry fruits",
        rating: 4.3,
        in_stock: true,
        description: "Premium golden raisins from Turkey, carefully dried to preserve their natural sweetness, flavor, and nutritional value.",
        origin: "Turkey",
        weight: "350g",
        shelf_life: "12 months",
        ingredients: "100% Natural Golden Raisins",
        stock_quantity: 220,
        nutrition: {
          servingSize: "30g",
          calories: "90 kcal",
          protein: "1g",
          fat: "0g",
          carbohydrates: "22g",
          fiber: "1g"
        }
      },
      {
        name: "Medjool Dates (Premium)",
        price: 12.99,
        original_price: 15.99,
        image: "https://images.unsplash.com/photo-1609040146481-24ae5b7de636?q=80&w=1974&auto=format&fit=crop",
        category: "dry fruits",
        rating: 4.7,
        in_stock: true,
        description: "Premium Medjool dates known for their exceptional size, sweetness, and moist texture. Often called the 'king of dates'.",
        origin: "Saudi Arabia",
        weight: "400g",
        shelf_life: "12 months",
        ingredients: "100% Natural Medjool Dates",
        stock_quantity: 150,
        nutrition: {
          servingSize: "30g",
          calories: "80 kcal",
          protein: "0.5g",
          fat: "0g",
          carbohydrates: "20g",
          fiber: "2g"
        }
      },
      
      // Essential Spices
      {
        name: "Malabar Black Pepper (Organic)",
        price: 7.99,
        original_price: 9.99,
        image: "https://images.unsplash.com/photo-1623682866500-4f5faf31570a?q=80&w=1974&auto=format&fit=crop",
        category: "spices",
        rating: 4.6,
        in_stock: true,
        description: "Organic Malabar black pepper, known for its robust aroma and perfect balance of pungency and flavor.",
        origin: "India",
        weight: "150g",
        shelf_life: "24 months",
        ingredients: "100% Organic Malabar Black Pepper",
        stock_quantity: 180,
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
        name: "Turmeric Powder (Salem)",
        price: 6.99,
        original_price: 8.99,
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=2070&auto=format&fit=crop",
        category: "spices",
        rating: 4.5,
        in_stock: true,
        description: "Premium Salem turmeric powder from Erode, India. Known for its high curcumin content and vibrant golden-orange color.",
        origin: "India",
        weight: "200g",
        shelf_life: "24 months",
        ingredients: "100% Pure Turmeric Powder",
        stock_quantity: 200,
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
        name: "Green Cardamom Pods (Small)",
        price: 9.99,
        original_price: 12.99,
        image: "https://images.unsplash.com/photo-1552189050-8be8fee84507?q=80&w=1974&auto=format&fit=crop",
        category: "spices",
        rating: 4.8,
        in_stock: true,
        description: "Premium small green cardamom pods (Chhoti Elaichi) with an intense, sweet aroma perfect for both sweet and savory dishes.",
        origin: "India",
        weight: "100g",
        shelf_life: "18 months",
        ingredients: "100% Natural Green Cardamom Pods",
        stock_quantity: 120,
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
        name: "Ceylon Cinnamon Sticks (Premium)",
        price: 8.99,
        original_price: 10.99,
        image: "https://images.unsplash.com/photo-1639981585287-ebb3cdd35e33?q=80&w=1933&auto=format&fit=crop",
        category: "spices",
        rating: 4.7,
        in_stock: true,
        description: "Premium Ceylon cinnamon sticks from Sri Lanka, known for their delicate, sweet flavor with subtle notes of citrus.",
        origin: "Sri Lanka",
        weight: "100g",
        shelf_life: "24 months",
        ingredients: "100% Pure Ceylon Cinnamon",
        stock_quantity: 130,
        nutrition: {
          servingSize: "1g",
          calories: "2 kcal",
          protein: "0g",
          fat: "0g",
          carbohydrates: "1g",
          fiber: "1g"
        }
      },
      
      // Premium & Rare Spices
      {
        name: "Kashmiri Saffron (Premium Grade)",
        price: 29.99,
        original_price: 34.99,
        image: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?q=80&w=1964&auto=format&fit=crop",
        category: "premium spices",
        badge: "Luxury",
        rating: 5,
        in_stock: true,
        description: "Premium grade Kashmiri saffron, known for its distinctive aroma, flavor, and deep red color. Hand-harvested from the finest crocus flowers.",
        origin: "India (Kashmir)",
        weight: "2g",
        shelf_life: "36 months",
        ingredients: "100% Pure Kashmiri Saffron Threads",
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
        name: "Star Anise (Whole)",
        price: 7.99,
        original_price: 9.99,
        image: "https://images.unsplash.com/photo-1611745801482-fe8ac1b7db83?q=80&w=2070&auto=format&fit=crop",
        category: "spices",
        rating: 4.6,
        in_stock: true,
        description: "Premium whole star anise with a distinctive licorice-like flavor, perfect for both sweet and savory dishes, especially in Asian cuisine.",
        origin: "Vietnam",
        weight: "100g",
        shelf_life: "24 months",
        ingredients: "100% Natural Star Anise",
        stock_quantity: 140,
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
        name: "Pink Himalayan Salt (Fine)",
        price: 6.99,
        original_price: 8.99,
        image: "https://images.unsplash.com/photo-1584255014406-4858bcc37109?q=80&w=2070&auto=format&fit=crop",
        category: "premium spices",
        rating: 4.5,
        in_stock: true,
        description: "Fine pink Himalayan salt, known for its beautiful pink color and rich mineral content. A healthier alternative to regular table salt.",
        origin: "Pakistan",
        weight: "250g",
        shelf_life: "36 months",
        ingredients: "100% Pure Himalayan Pink Salt",
        stock_quantity: 180,
        nutrition: {
          servingSize: "1g",
          calories: "0 kcal",
          protein: "0g",
          fat: "0g",
          carbohydrates: "0g",
          fiber: "0g"
        }
      },
      // Gift Box
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
