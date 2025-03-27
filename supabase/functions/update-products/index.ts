
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
        description: "Our organic premium Mamra almonds are sourced from the finest orchards in Iran. Known for their superior taste, exceptional nutritional profile, and distinctive flat shape. These premium almonds are considered the most luxurious variety in the world.",
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
        description: "Premium grade California almonds, perfectly roasted to enhance their natural flavor. An excellent source of protein, healthy fats, and essential nutrients. Ideal for snacking, baking, or adding to your favorite recipes.",
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
        description: "Premium Kashmiri walnuts, known for their light color, thin shells, and superior taste. Rich in Omega-3 fatty acids and antioxidants, these walnuts are harvested from the pristine valleys of Kashmir and carefully processed to preserve their nutritional integrity.",
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
        description: "Authentic Iranian pistachios, known worldwide for their exceptional flavor, distinctive green color, and remarkable size. These premium nuts are sourced from the finest orchards in Iran, where ideal growing conditions create pistachios with unmatched taste and texture.",
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
        description: "Premium Australian macadamia nuts, known for their rich, buttery flavor and creamy texture. A true delicacy for nut connoisseurs, these macadamias are grown in Australia's pristine coastal regions and carefully harvested to ensure optimal taste and quality.",
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
      {
        name: "Pecan Nuts (Organic Shelled)",
        price: 19.99,
        original_price: 23.99,
        image: "https://images.unsplash.com/photo-1573851552153-816785fecb2f?q=80&w=2070&auto=format&fit=crop",
        category: "premium dry fruits",
        rating: 4.6,
        in_stock: true,
        description: "Organic shelled pecan nuts from the finest orchards in the USA. These premium pecans offer a perfect balance of sweetness and richness, with a distinctive buttery texture that makes them ideal for snacking or baking.",
        origin: "USA",
        weight: "350g",
        shelf_life: "8 months",
        ingredients: "100% Organic Pecan Nuts",
        stock_quantity: 100,
        nutrition: {
          servingSize: "30g",
          calories: "190 kcal",
          protein: "3g",
          fat: "20g",
          carbohydrates: "4g",
          fiber: "3g"
        }
      },
      {
        name: "Turkish Hazelnuts (Roasted)",
        price: 16.99,
        original_price: 19.99,
        image: "https://images.unsplash.com/photo-1616485557198-b7420fce7c18?q=80&w=2070&auto=format&fit=crop",
        category: "premium dry fruits",
        rating: 4.7,
        in_stock: true,
        description: "Premium Turkish hazelnuts, perfectly roasted to enhance their rich, distinct flavor. Turkey produces the world's finest hazelnuts, and these select nuts showcase the perfect balance of sweetness and nuttiness that makes hazelnuts so prized.",
        origin: "Turkey",
        weight: "350g",
        shelf_life: "9 months",
        ingredients: "100% Natural Hazelnuts",
        stock_quantity: 120,
        nutrition: {
          servingSize: "30g",
          calories: "180 kcal",
          protein: "4g",
          fat: "17g",
          carbohydrates: "5g",
          fiber: "3g"
        }
      },
      {
        name: "Pine Nuts (Chilgoza Premium)",
        price: 29.99,
        original_price: 34.99,
        image: "https://images.unsplash.com/photo-1606503464620-4e138838aaf8?q=80&w=1974&auto=format&fit=crop",
        category: "premium dry fruits",
        rating: 4.9,
        in_stock: true,
        badge: "Rare",
        description: "Premium Chilgoza pine nuts harvested from the Himalayan region. These rare and exquisite nuts are hand-collected from pine cones and carefully processed to preserve their delicate, sweet, and resinous flavor that makes them highly sought after worldwide.",
        origin: "Pakistan",
        weight: "200g",
        shelf_life: "6 months",
        ingredients: "100% Natural Pine Nuts (Chilgoza)",
        stock_quantity: 60,
        nutrition: {
          servingSize: "30g",
          calories: "190 kcal",
          protein: "4g",
          fat: "19g",
          carbohydrates: "4g",
          fiber: "1g"
        }
      },
      {
        name: "Organic Brazil Nuts",
        price: 17.99,
        original_price: 21.99,
        image: "https://images.unsplash.com/photo-1603044303809-6438093680e7?q=80&w=1974&auto=format&fit=crop",
        category: "premium dry fruits",
        rating: 4.5,
        in_stock: true,
        description: "Organic Brazil nuts harvested from the pristine Amazon rainforest. Known for their extraordinarily high selenium content, these large, creamy nuts offer a subtle, earthy flavor and are among the most nutritionally dense foods on the planet.",
        origin: "Bolivia",
        weight: "300g",
        shelf_life: "6 months",
        ingredients: "100% Organic Brazil Nuts",
        stock_quantity: 90,
        nutrition: {
          servingSize: "30g",
          calories: "190 kcal",
          protein: "4g",
          fat: "19g",
          carbohydrates: "3g",
          fiber: "2g"
        }
      },
      {
        name: "Premium Dried Figs (Anjeer)",
        price: 14.99,
        original_price: 17.99,
        image: "https://images.unsplash.com/photo-1565589620809-d2ab0c93aa91?q=80&w=2070&auto=format&fit=crop",
        category: "dry fruits",
        rating: 4.6,
        in_stock: true,
        description: "Premium dried figs from Turkey, naturally sweet with a distinctive texture. These succulent figs are carefully sun-dried to preserve their natural sweetness, chewy texture, and nutritional benefits. Rich in fiber, minerals, and antioxidants.",
        origin: "Turkey",
        weight: "400g",
        shelf_life: "12 months",
        ingredients: "100% Natural Dried Figs",
        stock_quantity: 150,
        nutrition: {
          servingSize: "30g",
          calories: "70 kcal",
          protein: "1g",
          fat: "0g",
          carbohydrates: "18g",
          fiber: "3g"
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
        description: "Premium W320 cashew nuts from Vietnam, lightly roasted to perfection to enhance their naturally buttery flavor. Our cashews are carefully selected for size and quality, offering the perfect balance of crunch and creaminess.",
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
        description: "Premium golden raisins from Turkey, carefully dried to preserve their natural sweetness, flavor, and nutritional value. These juicy golden raisins are perfect for baking, cooking, or enjoying as a healthy snack throughout the day.",
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
        description: "Premium Medjool dates known for their exceptional size, sweetness, and moist texture. Often called the 'king of dates', these naturally sweet treats are harvested at peak ripeness and carefully packaged to preserve their soft, caramel-like texture.",
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
      {
        name: "Dried Apricots (Khubani)",
        price: 9.99,
        original_price: 12.99,
        image: "https://images.unsplash.com/photo-1600179114668-539cd86d1a86?q=80&w=2070&auto=format&fit=crop",
        category: "dry fruits",
        rating: 4.4,
        in_stock: true,
        description: "Premium dried apricots from Afghanistan, naturally sweet and free from added sugars or preservatives. These plump, tender apricots retain their vibrant orange color and are packed with essential nutrients, making them a perfect healthy snack.",
        origin: "Afghanistan",
        weight: "350g",
        shelf_life: "12 months",
        ingredients: "100% Natural Dried Apricots",
        stock_quantity: 160,
        nutrition: {
          servingSize: "30g",
          calories: "70 kcal",
          protein: "1g",
          fat: "0g",
          carbohydrates: "16g",
          fiber: "2g"
        }
      },
      {
        name: "Dried Cranberries (Sweetened)",
        price: 7.99,
        original_price: 9.99,
        image: "https://images.unsplash.com/photo-1577595927219-caf88d0adfb5?q=80&w=2070&auto=format&fit=crop",
        category: "dry fruits",
        rating: 4.3,
        in_stock: true,
        description: "Premium dried cranberries from the USA, lightly sweetened to balance their natural tartness. These ruby-red berries are perfect for baking, adding to salads, or enjoying as a snack. Rich in antioxidants and vitamin C.",
        origin: "USA",
        weight: "300g",
        shelf_life: "12 months",
        ingredients: "Cranberries, Sugar, Sunflower Oil",
        stock_quantity: 180,
        nutrition: {
          servingSize: "30g",
          calories: "100 kcal",
          protein: "0g",
          fat: "0g",
          carbohydrates: "25g",
          fiber: "2g"
        }
      },
      {
        name: "Dried Blueberries (Organic)",
        price: 11.99,
        original_price: 14.99,
        image: "https://images.unsplash.com/photo-1606914907643-74c4b66ae7eb?q=80&w=2070&auto=format&fit=crop",
        category: "dry fruits",
        rating: 4.5,
        in_stock: true,
        description: "Organic dried blueberries from certified farms in Canada. These tiny powerhouses are packed with antioxidants and offer the perfect balance of sweetness and tanginess. Ideal for adding to cereals, yogurt, or baking into muffins and pancakes.",
        origin: "Canada",
        weight: "250g",
        shelf_life: "12 months",
        ingredients: "100% Organic Dried Blueberries",
        stock_quantity: 130,
        nutrition: {
          servingSize: "30g",
          calories: "90 kcal",
          protein: "0g",
          fat: "0g",
          carbohydrates: "22g",
          fiber: "3g"
        }
      },
      {
        name: "Dried Prunes (Pitted)",
        price: 8.99,
        original_price: 10.99,
        image: "https://images.unsplash.com/photo-1596359700720-ec74ff74a039?q=80&w=1974&auto=format&fit=crop",
        category: "dry fruits",
        rating: 4.2,
        in_stock: true,
        description: "Premium pitted prunes from California, naturally sweet and tender. Known for their digestive health benefits, these plump, juicy prunes are carefully dried to preserve their soft texture and rich flavor profile with notes of caramel and vanilla.",
        origin: "USA",
        weight: "350g",
        shelf_life: "12 months",
        ingredients: "100% Natural Pitted Prunes",
        stock_quantity: 170,
        nutrition: {
          servingSize: "30g",
          calories: "65 kcal",
          protein: "1g",
          fat: "0g",
          carbohydrates: "16g",
          fiber: "2g"
        }
      },
      {
        name: "Dried Mango Slices (Organic)",
        price: 10.99,
        original_price: 13.99,
        image: "https://images.unsplash.com/photo-1605489102258-c1408e7df95a?q=80&w=1932&auto=format&fit=crop",
        category: "dry fruits",
        rating: 4.7,
        in_stock: true,
        description: "Organic dried mango slices from Thailand, naturally sweet with no added sugars. These chewy, vibrant orange slices offer the perfect tropical sweetness and are packed with vitamins and fiber. A healthy alternative to candy.",
        origin: "Thailand",
        weight: "300g",
        shelf_life: "9 months",
        ingredients: "100% Organic Dried Mango",
        stock_quantity: 140,
        nutrition: {
          servingSize: "30g",
          calories: "110 kcal",
          protein: "1g",
          fat: "0g",
          carbohydrates: "26g",
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
        description: "Organic Malabar black pepper, known for its robust aroma and perfect balance of pungency and flavor. Sourced from the lush hills of Kerala, India, this premium pepper is considered among the world's finest, offering complex notes of citrus, wood, and spice.",
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
        description: "Premium Salem turmeric powder from Erode, India. Known for its high curcumin content and vibrant golden-orange color. This aromatic, earthy spice is essential in Indian cuisine and has been prized for centuries for its health-promoting properties.",
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
        description: "Premium small green cardamom pods (Chhoti Elaichi) with an intense, sweet aroma perfect for both sweet and savory dishes. These aromatic pods from the cardamom hills of Kerala offer complex notes of eucalyptus, mint, and lemon.",
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
        description: "Premium Ceylon cinnamon sticks from Sri Lanka, known for their delicate, sweet flavor with subtle notes of citrus. Often called 'true cinnamon,' this variety is thinner and more brittle than cassia cinnamon, with a complex, nuanced flavor profile.",
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
      {
        name: "Cumin Seeds (Premium)",
        price: 5.99,
        original_price: 7.99,
        image: "https://images.unsplash.com/photo-1549895058-36748fa6c6a9?q=80&w=1935&auto=format&fit=crop",
        category: "spices",
        rating: 4.5,
        in_stock: true,
        description: "Premium cumin seeds with an intensely aromatic, earthy flavor profile. These essential seeds form the foundation of countless dishes across Indian, Middle Eastern, and Mexican cuisines, offering a warm, slightly bitter taste with citrus undertones.",
        origin: "India",
        weight: "200g",
        shelf_life: "24 months",
        ingredients: "100% Natural Cumin Seeds",
        stock_quantity: 190,
        nutrition: {
          servingSize: "1g",
          calories: "4 kcal",
          protein: "0g",
          fat: "0g",
          carbohydrates: "1g",
          fiber: "0g"
        }
      },
      {
        name: "Coriander Seeds (Organic)",
        price: 5.49,
        original_price: 6.99,
        image: "https://images.unsplash.com/photo-1616438577168-c3c0998e7044?q=80&w=1953&auto=format&fit=crop",
        category: "spices",
        rating: 4.4,
        in_stock: true,
        description: "Organic coriander seeds with a mild, sweet, and citrusy flavor profile. These versatile seeds are essential in numerous global cuisines and offer a delicate aroma that enhances both savory and sweet dishes without overpowering other flavors.",
        origin: "Morocco",
        weight: "200g",
        shelf_life: "24 months",
        ingredients: "100% Organic Coriander Seeds",
        stock_quantity: 170,
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
        name: "Mustard Seeds (Black)",
        price: 4.99,
        original_price: 6.49,
        image: "https://images.unsplash.com/photo-1612534498961-8444cf728b35?q=80&w=2070&auto=format&fit=crop",
        category: "spices",
        rating: 4.3,
        in_stock: true,
        description: "Premium black mustard seeds with a bold, pungent flavor that forms the foundation of many Indian tempering (tadka) preparations. These tiny seeds release a nutty, aromatic flavor when heated in oil, creating a perfect base for curries and stir-fries.",
        origin: "India",
        weight: "200g",
        shelf_life: "24 months",
        ingredients: "100% Natural Black Mustard Seeds",
        stock_quantity: 160,
        nutrition: {
          servingSize: "1g",
          calories: "5 kcal",
          protein: "0g",
          fat: "0g",
          carbohydrates: "1g",
          fiber: "0g"
        }
      },
      {
        name: "Fenugreek Seeds (Methi)",
        price: 4.99,
        original_price: 6.49,
        image: "https://images.unsplash.com/photo-1599828032761-8e3ffff07d9a?q=80&w=2070&auto=format&fit=crop",
        category: "spices",
        rating: 4.4,
        in_stock: true,
        description: "Premium fenugreek seeds with a distinctive bitter-sweet flavor and maple-like aroma. These versatile seeds are used in Indian and Middle Eastern cuisines to add complex depth to curries, pickles, and spice blends.",
        origin: "India",
        weight: "150g",
        shelf_life: "24 months",
        ingredients: "100% Natural Fenugreek Seeds",
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
        name: "Cloves (Premium Whole)",
        price: 7.99,
        original_price: 9.99,
        image: "https://images.unsplash.com/photo-1591199811198-fd2c67dc8848?q=80&w=1974&auto=format&fit=crop",
        category: "spices",
        rating: 4.6,
        in_stock: true,
        description: "Premium whole cloves with an intensely aromatic, warm, and sweet flavor profile. These flower buds from the clove tree are essential in both sweet and savory dishes across global cuisines, from holiday hams to Indian biryanis and chai masala.",
        origin: "Sri Lanka",
        weight: "100g",
        shelf_life: "24 months",
        ingredients: "100% Natural Whole Cloves",
        stock_quantity: 120,
        nutrition: {
          servingSize: "1g",
          calories: "4 kcal",
          protein: "0g",
          fat: "0g",
          carbohydrates: "1g",
          fiber: "0g"
        }
      },
      {
        name: "Nutmeg (Whole)",
        price: 8.99,
        original_price: 10.99,
        image: "https://images.unsplash.com/photo-1587131782738-de30ea91a542?q=80&w=1974&auto=format&fit=crop",
        category: "spices",
        rating: 4.5,
        in_stock: true,
        description: "Whole nutmeg seeds with a warm, aromatic flavor that's both sweet and savory. These premium seeds from Indonesia are perfect for freshly grating over desserts, creamy sauces, and beverages, offering notes of clove, cinnamon, and pine.",
        origin: "Indonesia",
        weight: "100g",
        shelf_life: "24 months",
        ingredients: "100% Natural Whole Nutmeg",
        stock_quantity: 100,
        nutrition: {
          servingSize: "1g",
          calories: "5 kcal",
          protein: "0g",
          fat: "0g",
          carbohydrates: "1g",
          fiber: "0g"
        }
      },
      {
        name: "Fennel Seeds (Sweet)",
        price: 5.99,
        original_price: 7.49,
        image: "https://images.unsplash.com/photo-1575416824992-5befb6f9d896?q=80&w=1976&auto=format&fit=crop",
        category: "spices",
        rating: 4.4,
        in_stock: true,
        description: "Premium sweet fennel seeds with a distinctive licorice-like flavor and aromatic profile. These versatile seeds are used in both sweet and savory dishes across Mediterranean and Indian cuisines, and are traditionally served as a digestive aid after meals.",
        origin: "India",
        weight: "150g",
        shelf_life: "24 months",
        ingredients: "100% Natural Fennel Seeds",
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
        name: "Bay Leaves (Tej Patta)",
        price: 4.99,
        original_price: 6.49,
        image: "https://images.unsplash.com/photo-1599909351705-726c535f7056?q=80&w=2070&auto=format&fit=crop",
        category: "spices",
        rating: 4.3,
        in_stock: true,
        description: "Premium Indian bay leaves (tej patta) with a complex, subtle flavor profile different from Mediterranean bay leaves. These aromatic leaves add depth to curries, rice dishes, and stews with their mild cinnamon-clove notes.",
        origin: "India",
        weight: "50g",
        shelf_life: "24 months",
        ingredients: "100% Natural Indian Bay Leaves",
        stock_quantity: 130,
        nutrition: {
          servingSize: "1g",
          calories: "2 kcal",
          protein: "0g",
          fat: "0g",
          carbohydrates: "0g",
          fiber: "0g"
        }
      },
      {
        name: "Ginger Powder (Organic)",
        price: 6.99,
        original_price: 8.49,
        image: "https://images.unsplash.com/photo-1568287656390-46654066d424?q=80&w=2062&auto=format&fit=crop",
        category: "spices",
        rating: 4.5,
        in_stock: true,
        description: "Organic ginger powder with a warm, spicy-sweet flavor profile. This versatile powder offers the convenience of ginger's distinctive flavor without the need for fresh root, perfect for baking, curries, stir-fries, and warming beverages.",
        origin: "India",
        weight: "150g",
        shelf_life: "24 months",
        ingredients: "100% Organic Ginger Powder",
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
        description: "Premium grade Kashmiri saffron, known for its distinctive aroma, flavor, and deep red color. Hand-harvested from the finest crocus flowers in the valleys of Kashmir, each thread releases an intense honey-like sweetness with subtle earthy notes when used in cooking.",
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
        description: "Premium whole star anise with a distinctive licorice-like flavor, perfect for both sweet and savory dishes, especially in Asian cuisine. These beautiful star-shaped pods are essential in Chinese five-spice powder and Vietnamese pho, adding a warm, sweet dimension.",
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
        description: "Fine pink Himalayan salt, known for its beautiful pink color and rich mineral content. A healthier alternative to regular table salt, this ancient sea salt is mined from the Khewra Salt Mine in Pakistan and contains trace minerals that give it a complex flavor profile.",
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
      {
        name: "Black Cardamom Pods (Large)",
        price: 9.99,
        original_price: 12.99,
        image: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?q=80&w=2070&auto=format&fit=crop",
        category: "premium spices",
        rating: 4.7,
        in_stock: true,
        description: "Premium large black cardamom pods with their distinctive smoky, camphor-like aroma and flavor. Unlike green cardamom, these pods are dried over an open fire, giving them a bold, smoky character that adds depth to savory dishes, particularly curries and biryanis.",
        origin: "Nepal",
        weight: "100g",
        shelf_life: "24 months",
        ingredients: "100% Natural Black Cardamom Pods",
        stock_quantity: 90,
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
        name: "White Pepper (Whole)",
        price: 8.99,
        original_price: 10.99,
        image: "https://images.unsplash.com/photo-1615485290442-077ea4464b40?q=80&w=2070&auto=format&fit=crop",
        category: "premium spices",
        rating: 4.4,
        in_stock: true,
        description: "Premium whole white peppercorns with a milder, more delicate flavor than black pepper. These berries undergo a process where the outer skin is removed, resulting in a cleaner, less pungent taste that's ideal for light-colored sauces and dishes.",
        origin: "Malaysia",
        weight: "150g",
        shelf_life: "24 months",
        ingredients: "100% Natural White Peppercorns",
        stock_quantity: 110,
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
        name: "Asafoetida (Hing - Pure)",
        price: 10.99,
        original_price: 13.99,
        image: "https://images.unsplash.com/photo-1590788353435-526436801fcd?q=80&w=1854&auto=format&fit=crop",
        category: "premium spices",
        rating: 4.6,
        in_stock: true,
        description: "Pure asafoetida (hing), a powerful resinous gum with a distinctive pungent aroma that transforms into a delicate, garlicky flavor when cooked. This essential spice in Indian vegetarian cooking aids digestion and adds depth to lentil dishes and vegetable preparations.",
        origin: "Afghanistan",
        weight: "50g",
        shelf_life: "24 months",
        ingredients: "100% Pure Asafoetida",
        stock_quantity: 70,
        nutrition: {
          servingSize: "1g",
          calories: "3 kcal",
          protein: "0g",
          fat: "0g",
          carbohydrates: "1g",
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
        description: "Our luxury gift box contains a carefully curated selection of premium dry fruits and exotic spices. Perfect for gifting on special occasions, corporate events, or as a treat for yourself. Contains premium Iranian pistachios, Mamra almonds, Kashmiri walnuts, Medjool dates, Kashmiri saffron, and green cardamom in an elegant wooden presentation box.",
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
      },
      {
        name: "Premium Dry Fruits Sampler Box",
        price: 39.99,
        original_price: 45.99,
        image: "https://images.unsplash.com/photo-1620149455095-85db68442af4?q=80&w=1974&auto=format&fit=crop",
        category: "gift boxes",
        badge: "Best Gift",
        rating: 4.9,
        in_stock: true,
        description: "Our Premium Dry Fruits Sampler Box features a handpicked selection of our finest nuts and dried fruits. Perfect for exploring new flavors or gifting to loved ones. Contains premium almonds, cashews, pistachios, walnuts, golden raisins, and dried apricots in a beautiful presentation box.",
        origin: "Multiple Origins",
        weight: "600g",
        shelf_life: "9 months",
        ingredients: "Premium Almonds, Cashews, Pistachios, Walnuts, Golden Raisins, Dried Apricots",
        stock_quantity: 60,
        nutrition: {
          servingSize: "Varies by product",
          calories: "Varies by product",
          protein: "Varies by product",
          fat: "Varies by product",
          carbohydrates: "Varies by product",
          fiber: "Varies by product"
        }
      },
      {
        name: "Exotic Spices Collection Box",
        price: 34.99,
        original_price: 39.99,
        image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=1974&auto=format&fit=crop",
        category: "gift boxes",
        badge: "Gourmet",
        rating: 4.8,
        is_new: true,
        in_stock: true,
        description: "Our Exotic Spices Collection Box offers a journey through the world's most distinctive spices. Perfect for culinary enthusiasts. Contains premium Kashmiri saffron, green cardamom, Ceylon cinnamon, Malabar black pepper, whole cloves, and nutmeg in an elegant wooden box with individual compartments.",
        origin: "Multiple Origins",
        weight: "300g",
        shelf_life: "24 months",
        ingredients: "Saffron, Green Cardamom, Ceylon Cinnamon, Malabar Black Pepper, Cloves, Nutmeg",
        stock_quantity: 45,
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
