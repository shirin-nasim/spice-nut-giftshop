
import { useState, useEffect } from 'react';
import { RecentlyViewedProduct, Product } from '@/types/supabase';

const MAX_RECENT_PRODUCTS = 8;
const STORAGE_KEY = 'recently_viewed_products';

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProduct[]>([]);

  // Load recently viewed products from localStorage on component mount
  useEffect(() => {
    const loadRecentlyViewed = () => {
      try {
        const storedProducts = localStorage.getItem(STORAGE_KEY);
        if (storedProducts) {
          const parsedProducts = JSON.parse(storedProducts);
          setRecentlyViewed(parsedProducts);
        }
      } catch (error) {
        console.error('Error loading recently viewed products:', error);
        // If there's an error, reset the storage
        localStorage.removeItem(STORAGE_KEY);
        setRecentlyViewed([]);
      }
    };

    loadRecentlyViewed();
  }, []);

  // Add product to recently viewed
  const addToRecentlyViewed = (product: Product) => {
    if (!product || !product.id) return;

    setRecentlyViewed(prevProducts => {
      // Create a new array without the current product (if it exists)
      const filteredProducts = prevProducts.filter(p => p.id !== product.id);
      
      // Create a recently viewed product object
      const recentProduct: RecentlyViewedProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        viewedAt: Date.now()
      };
      
      // Add the product to the beginning of the array and limit the list size
      const updatedProducts = [recentProduct, ...filteredProducts].slice(0, MAX_RECENT_PRODUCTS);
      
      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
      } catch (error) {
        console.error('Error saving recently viewed products:', error);
      }
      
      return updatedProducts;
    });
  };

  // Clear recently viewed products
  const clearRecentlyViewed = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRecentlyViewed([]);
  };

  return {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed
  };
};
