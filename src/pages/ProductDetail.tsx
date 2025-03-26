
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingCart, Heart, Truck, Package, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard, { Product } from "@/components/ui/ProductCard";
import { useToast } from "@/hooks/use-toast";

// Sample product data - in a real app, this would come from an API
const products: Product[] = [
  {
    id: "premium-almonds",
    name: "Premium California Almonds",
    price: 12.99,
    originalPrice: 15.99,
    image: "https://images.unsplash.com/photo-1574184864703-3487b13f0edd?q=80&w=1932&auto=format&fit=crop",
    category: "dry fruits",
    rating: 5,
    inStock: true,
    description: "Our Premium California Almonds are carefully selected for quality and taste. These delicious nuts are a great source of protein, fiber, and healthy fats, making them an ideal snack for any time of day. Enjoy them straight from the pack or use them in your favorite recipes.",
    details: {
      origin: "California, USA",
      weight: "Available in 250g, 500g, and 1kg packages",
      shelfLife: "12 months when stored in a cool, dry place",
      ingredients: "100% Natural Almonds",
      nutrition: {
        servingSize: "30g (approximately 23 almonds)",
        calories: "170 kcal",
        protein: "6g",
        fat: "14.5g (of which saturates: 1.1g)",
        carbohydrates: "5.4g (of which sugars: 1.2g)",
        fiber: "3.1g",
      },
    },
  },
];

// Sample related products
const relatedProducts: Product[] = [
  {
    id: "cashews-premium",
    name: "Jumbo Cashews Premium Grade",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1607113256158-56a934936ef1?q=80&w=1974&auto=format&fit=crop",
    category: "dry fruits",
    badge: "Best Seller",
    rating: 4.5,
    inStock: true,
  },
  {
    id: "pistachios-roasted",
    name: "Roasted Pistachios Lightly Salted",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1590760475226-60ada5127a6f?q=80&w=1974&auto=format&fit=crop",
    category: "dry fruits",
    rating: 4,
    isNew: true,
    inStock: true,
  },
  {
    id: "walnuts-halves",
    name: "California Walnut Halves & Pieces",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1596362601603-b74f6ef166e5?q=80&w=1964&auto=format&fit=crop",
    category: "dry fruits",
    rating: 4,
    inStock: true,
  },
  {
    id: "gift-box-premium",
    name: "Luxury Dry Fruit & Spice Gift Box",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1980&auto=format&fit=crop",
    category: "gift boxes",
    badge: "Premium",
    rating: 5,
    isNew: true,
    inStock: true,
  },
];

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<(Product & { description?: string; details?: any }) | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState("500g");
  const { toast } = useToast();
  
  // Weights and prices
  const weightOptions = [
    { value: "250g", price: 7.99 },
    { value: "500g", price: 12.99 },
    { value: "1kg", price: 22.99 },
  ];

  // Image gallery
  const [mainImage, setMainImage] = useState("");
  const additionalImages = [
    "https://images.unsplash.com/photo-1574184864703-3487b13f0edd?q=80&w=1932&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1640635265830-99029cdbb922?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1609671970310-7b9fb9a63d5e?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1625869841899-a3314437f4d5?q=80&w=1974&auto=format&fit=crop",
  ];

  useEffect(() => {
    // Find product by ID - in a real app, this would be an API call
    const foundProduct = products.find((p) => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(foundProduct.image);
    }

    window.scrollTo(0, 0);
  }, [productId]);

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product?.name} (${selectedWeight}) has been added to your cart.`,
    });
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product?.name} has been added to your wishlist.`,
    });
  };

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-10">
          <div className="premium-container">
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">Product not found</p>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/shop">Return to Shop</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-10">
        <div className="premium-container">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex text-sm">
              <li className="flex items-center">
                <Link to="/" className="text-muted-foreground hover:text-brand-brown">
                  Home
                </Link>
                <span className="mx-2 text-muted-foreground">/</span>
              </li>
              <li className="flex items-center">
                <Link to="/shop" className="text-muted-foreground hover:text-brand-brown">
                  Shop
                </Link>
                <span className="mx-2 text-muted-foreground">/</span>
              </li>
              <li className="flex items-center">
                <Link to={`/shop?category=${product.category}`} className="text-muted-foreground hover:text-brand-brown capitalize">
                  {product.category}
                </Link>
                <span className="mx-2 text-muted-foreground">/</span>
              </li>
              <li className="text-brand-brown font-medium truncate">
                {product.name}
              </li>
            </ol>
          </nav>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 animate-fade-in">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl overflow-hidden aspect-square shadow-premium-sm hover:shadow-premium-md transition-shadow">
                <img 
                  src={mainImage} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {additionalImages.map((img, index) => (
                  <button
                    key={index}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      mainImage === img ? "border-brand-brown" : "border-transparent hover:border-brand-brown-light"
                    }`}
                    onClick={() => setMainImage(img)}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {product.badge && (
                <span className="inline-block bg-brand-gold text-primary text-xs font-medium px-2 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
              <h1 className="text-3xl font-bold text-primary">{product.name}</h1>
              
              {/* Ratings */}
              <div className="flex items-center">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${
                        i < product.rating ? "text-brand-gold" : "text-muted"
                      }`} 
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">
                  ({product.rating} out of 5)
                </span>
              </div>

              {/* Price */}
              <div className="pt-2">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-brand-brown-dark">
                    ${weightOptions.find(w => w.value === selectedWeight)?.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="ml-2 text-base text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Includes all taxes and duties
                </p>
              </div>

              {/* Description */}
              <p className="text-muted-foreground">
                {product.description}
              </p>

              {/* Weight Selection */}
              <div className="pt-2">
                <h3 className="text-sm font-medium mb-3">Weight</h3>
                <div className="flex flex-wrap gap-3">
                  {weightOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        selectedWeight === option.value
                          ? "bg-brand-brown text-white"
                          : "bg-brand-beige-light text-primary hover:bg-brand-beige"
                      }`}
                      onClick={() => setSelectedWeight(option.value)}
                    >
                      {option.value}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-3">Quantity</h3>
                <div className="flex items-center">
                  <button
                    className="h-10 w-10 rounded-l-md bg-brand-beige flex items-center justify-center border border-brand-beige hover:bg-brand-beige-dark transition-colors"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="h-10 w-14 flex items-center justify-center border-t border-b border-brand-beige bg-white">
                    <span className="text-sm font-medium">{quantity}</span>
                  </div>
                  <button
                    className="h-10 w-10 rounded-r-md bg-brand-beige flex items-center justify-center border border-brand-beige hover:bg-brand-beige-dark transition-colors"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Cart Actions */}
              <div className="pt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                <Button 
                  size="lg" 
                  className="flex-1 bg-brand-brown hover:bg-brand-brown-dark py-6"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="hidden sm:flex h-14 w-14 border-brand-brown text-brand-brown hover:bg-brand-brown/5"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-brand-beige-light rounded-lg">
                  <Truck className="h-5 w-5 text-brand-brown" />
                  <span className="text-sm">Free shipping over $50</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-brand-beige-light rounded-lg">
                  <Package className="h-5 w-5 text-brand-brown" />
                  <span className="text-sm">Premium packaging</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-brand-beige-light rounded-lg">
                  <Shield className="h-5 w-5 text-brand-brown" />
                  <span className="text-sm">Satisfaction guaranteed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mb-16 animate-fade-in">
            <Tabs defaultValue="details">
              <TabsList className="grid grid-cols-3 max-w-md mb-8">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                <h3 className="text-xl font-semibold">Product Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="origin">
                        <AccordionTrigger>Origin</AccordionTrigger>
                        <AccordionContent>
                          {product.details?.origin || "California, USA"}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="weight">
                        <AccordionTrigger>Size Options</AccordionTrigger>
                        <AccordionContent>
                          {product.details?.weight || "Available in 250g, 500g, and 1kg packages"}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="shelf-life">
                        <AccordionTrigger>Shelf Life</AccordionTrigger>
                        <AccordionContent>
                          {product.details?.shelfLife || "12 months when stored in a cool, dry place"}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="ingredients">
                        <AccordionTrigger>Ingredients</AccordionTrigger>
                        <AccordionContent>
                          {product.details?.ingredients || "100% Natural Almonds"}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Storage Instructions</h4>
                    <p className="text-muted-foreground text-sm">
                      Store in a cool, dry place away from direct sunlight. Once opened, transfer to an airtight container to maintain freshness and extend shelf life.
                    </p>
                    <h4 className="font-medium pt-2">Quality Guarantee</h4>
                    <p className="text-muted-foreground text-sm">
                      We guarantee the quality of our products. If you're not satisfied, please contact our customer service team within 30 days of purchase for a refund or replacement.
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="nutrition" className="space-y-4">
                <h3 className="text-xl font-semibold">Nutritional Information</h3>
                <p className="text-muted-foreground">Nutritional values per serving</p>
                
                <div className="max-w-lg">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-2 bg-brand-beige-light p-4 border-b">
                      <span className="font-medium">Serving Size</span>
                      <span>{product.details?.nutrition?.servingSize || "30g (approximately 23 almonds)"}</span>
                    </div>
                    <div className="grid grid-cols-2 p-4 border-b">
                      <span className="font-medium">Calories</span>
                      <span>{product.details?.nutrition?.calories || "170 kcal"}</span>
                    </div>
                    <div className="grid grid-cols-2 bg-brand-beige-light p-4 border-b">
                      <span className="font-medium">Protein</span>
                      <span>{product.details?.nutrition?.protein || "6g"}</span>
                    </div>
                    <div className="grid grid-cols-2 p-4 border-b">
                      <span className="font-medium">Total Fat</span>
                      <span>{product.details?.nutrition?.fat || "14.5g (of which saturates: 1.1g)"}</span>
                    </div>
                    <div className="grid grid-cols-2 bg-brand-beige-light p-4 border-b">
                      <span className="font-medium">Total Carbohydrates</span>
                      <span>{product.details?.nutrition?.carbohydrates || "5.4g (of which sugars: 1.2g)"}</span>
                    </div>
                    <div className="grid grid-cols-2 p-4">
                      <span className="font-medium">Dietary Fiber</span>
                      <span>{product.details?.nutrition?.fiber || "3.1g"}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    * Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  <Button variant="outline" className="border-brand-brown text-brand-brown hover:bg-brand-brown/5">
                    Write a Review
                  </Button>
                </div>
                
                <div className="divide-y">
                  {[
                    {
                      name: "Sarah W.",
                      rating: 5,
                      date: "March 15, 2023",
                      title: "Excellent quality!",
                      comment: "These almonds are the best I've ever tasted. Super fresh, crunchy, and flavorful. Will definitely be ordering again!",
                    },
                    {
                      name: "Michael T.",
                      rating: 4,
                      date: "February 22, 2023",
                      title: "Great product, packaging could be better",
                      comment: "The almonds are delicious and very fresh. My only minor complaint is that the packaging could be more eco-friendly. Otherwise, excellent product!",
                    },
                  ].map((review, index) => (
                    <div key={index} className="py-6">
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? "text-brand-gold" : "text-gray-300"}`} 
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm font-medium">{review.title}</span>
                      </div>
                      <div className="flex items-center mb-3">
                        <span className="text-sm text-muted-foreground">{review.name}</span>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-8">You May Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
