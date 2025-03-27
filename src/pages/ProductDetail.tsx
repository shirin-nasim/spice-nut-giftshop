
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import RelatedProducts from "@/components/product/RelatedProducts";
import RecentlyViewedProducts from "@/components/product/RecentlyViewedProducts";
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
import { getProductById } from "@/services/productService";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { Product } from "@/types/supabase";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();
  const navigate = useNavigate();
  
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
  
  // Fetch product data using React Query
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId || ''),
    enabled: !!productId,
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
