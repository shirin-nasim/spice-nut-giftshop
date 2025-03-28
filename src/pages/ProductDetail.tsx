
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import RelatedProducts from "@/components/product/RelatedProducts";
import RecentlyViewedProducts from "@/components/product/RecentlyViewedProducts";
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
import { getProductById, getProducts } from "@/services/productService";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { Product } from "@/types/supabase";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();
  const navigate = useNavigate();
  const [fallbackProducts, setFallbackProducts] = useState<Product[]>([]);
  
  // Weight options
  const weightOptions = [
    { value: "250g", price: 7.99 },
    { value: "500g", price: 12.99 },
    { value: "1kg", price: 22.99 },
  ];

  // Image gallery - these are additional images that will be shown alongside the main product image
  const additionalImages = [
    "https://images.unsplash.com/photo-1574184864703-3487b13f0edd?q=80&w=1932&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1640635265830-99029cdbb922?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1609671970310-7b9fb9a63d5e?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1625869841899-a3314437f4d5?q=80&w=1974&auto=format&fit=crop",
  ];
  
  // Fetch fallback products
  useEffect(() => {
    const fetchFallbackProducts = async () => {
      try {
        const products = await getProducts();
        if (products && products.length > 0) {
          setFallbackProducts(products.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching fallback products:", error);
      }
    };
    
    fetchFallbackProducts();
  }, []);
  
  // Fetch product data using React Query
  const { data: product, isLoading, error, isError } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      if (!productId) {
        console.error("No product ID provided");
        return null;
      }
      
      console.log(`Fetching product with ID/slug: ${productId}`);
      try {
        const result = await getProductById(productId);
        console.log("Product fetch result:", result);
        
        // If no product found but we have fallback products, use the first one
        if (!result && fallbackProducts.length > 0) {
          console.log("Using fallback product instead");
          return fallbackProducts[0];
        }
        
        return result;
      } catch (err) {
        console.error("Error fetching product:", err);
        toast({
          title: "Error",
          description: "Could not load product details. Please try again later.",
          variant: "destructive",
        });
        throw err;
      }
    },
    enabled: !!productId || fallbackProducts.length > 0,
    retry: 2,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  // Add to recently viewed when product loads
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  // Redirect to a random product if current one can't be found
  useEffect(() => {
    if (isError && fallbackProducts.length > 0) {
      const randomProduct = fallbackProducts[Math.floor(Math.random() * fallbackProducts.length)];
      if (randomProduct && randomProduct.id) {
        console.log(`Redirecting to random product: ${randomProduct.name}`);
        navigate(`/product/${randomProduct.id}`);
      }
    }
  }, [isError, fallbackProducts, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-10">
          <div className="premium-container">
            <div className="animate-pulse">
              <div className="mb-6">
                <Skeleton className="h-4 w-1/3" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
                <Skeleton className="h-[500px] rounded-xl" />
                <div className="space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-24 w-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <div className="flex space-x-2">
                      <Skeleton className="h-10 w-16" />
                      <Skeleton className="h-10 w-16" />
                      <Skeleton className="h-10 w-16" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                  <div className="pt-6 flex space-x-3">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-12" />
                  </div>
                </div>
              </div>
              
              <div className="mb-16">
                <div className="flex space-x-4 mb-6">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-24" />
                </div>
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-10">
          <div className="premium-container">
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground mb-2">Product not found</p>
              <p className="text-muted-foreground mb-6">
                We couldn't find the product you're looking for. It may have been removed or the URL is incorrect.
              </p>
              <Button asChild variant="outline" className="mt-4 mr-4">
                <Link to="/shop">Return to Shop</Link>
              </Button>
              <Button asChild>
                <Link to="/">Go to Homepage</Link>
              </Button>
              
              {fallbackProducts.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-lg font-medium mb-4">Browse these products instead:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                    {fallbackProducts.slice(0, 4).map(prod => (
                      <div key={prod.id} className="text-center">
                        <Link to={`/product/${prod.id}`} className="block hover:opacity-80 transition-opacity">
                          <img 
                            src={prod.image || "https://images.unsplash.com/photo-1608057432355-b39bd173756f?w=300&auto=format"} 
                            alt={prod.name}
                            className="w-full h-24 object-cover rounded-md mb-2"
                          />
                          <p className="text-sm font-medium text-primary truncate">{prod.name}</p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Create a properly typed product object to pass to components
  const typedProduct: Product = product as Product;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-10">
        <div className="premium-container">
          <ProductBreadcrumb productName={typedProduct.name || ''} category={typedProduct.category || ''} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 animate-fade-in">
            <ProductImageGallery 
              mainImage={typedProduct.image || ''} 
              additionalImages={additionalImages} 
              productName={typedProduct.name || ''} 
            />

            <ProductInfo product={typedProduct} weightOptions={weightOptions} />
          </div>

          <div className="mb-16 animate-fade-in">
            <ProductTabs product={typedProduct} />
          </div>

          <div className="animate-fade-in">
            <RelatedProducts productId={typedProduct.id || ''} category={typedProduct.category || ''} />
          </div>
          
          {recentlyViewed.length > 1 && (
            <div className="animate-fade-in">
              <RecentlyViewedProducts 
                products={recentlyViewed} 
                currentProductId={typedProduct.id || ''} 
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
