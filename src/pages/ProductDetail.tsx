
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Product } from "@/types/supabase";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";

// Sample product data - in a real app, this would come from an API
const products: (Product & { details?: any })[] = [
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
  
  // Weight options
  const weightOptions = [
    { value: "250g", price: 7.99 },
    { value: "500g", price: 12.99 },
    { value: "1kg", price: 22.99 },
  ];

  // Image gallery
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
    }

    window.scrollTo(0, 0);
  }, [productId]);

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
          <ProductBreadcrumb productName={product.name} category={product.category} />

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 animate-fade-in">
            {/* Product Images */}
            <ProductImageGallery 
              mainImage={product.image} 
              additionalImages={additionalImages} 
              productName={product.name} 
            />

            {/* Product Info */}
            <ProductInfo product={product} weightOptions={weightOptions} />
          </div>

          {/* Product Details Tabs */}
          <div className="mb-16 animate-fade-in">
            <ProductTabs product={product} />
          </div>

          {/* Related Products */}
          <div className="animate-fade-in">
            <RelatedProducts products={relatedProducts} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
