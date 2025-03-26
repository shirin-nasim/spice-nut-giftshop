
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewList from "@/components/product/ReviewList";
import ReviewForm from "@/components/product/ReviewForm";
import { Product } from "@/types/supabase";

interface ProductTabsProps {
  product: Product;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const [reviewRefetchTrigger, setReviewRefetchTrigger] = useState(0);
  
  const handleReviewAdded = () => {
    setReviewRefetchTrigger(prev => prev + 1);
  };

  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="w-full max-w-md flex justify-start bg-brand-beige-light/50 p-1 mb-6">
        <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
        <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
        <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
      </TabsList>
      
      <TabsContent value="description" className="mt-0">
        <div className="space-y-4">
          <p>{product.description || "No description available."}</p>
        </div>
      </TabsContent>
      
      <TabsContent value="details" className="mt-0">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.origin && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Origin</h3>
                <p>{product.origin}</p>
              </div>
            )}
            
            {product.ingredients && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Ingredients</h3>
                <p>{product.ingredients}</p>
              </div>
            )}
            
            {product.weight && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Weight</h3>
                <p>{product.weight}</p>
              </div>
            )}
            
            {product.shelfLife && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Shelf Life</h3>
                <p>{product.shelfLife}</p>
              </div>
            )}
          </div>
          
          {product.nutrition && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-3">Nutrition Facts</h3>
              <div className="bg-brand-beige-light/50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-2">
                  {product.nutrition.servingSize && (
                    <>
                      <div className="text-sm font-medium">Serving Size</div>
                      <div className="text-sm">{product.nutrition.servingSize}</div>
                    </>
                  )}
                  
                  {product.nutrition.calories && (
                    <>
                      <div className="text-sm font-medium">Calories</div>
                      <div className="text-sm">{product.nutrition.calories}</div>
                    </>
                  )}
                  
                  {product.nutrition.protein && (
                    <>
                      <div className="text-sm font-medium">Protein</div>
                      <div className="text-sm">{product.nutrition.protein}</div>
                    </>
                  )}
                  
                  {product.nutrition.fat && (
                    <>
                      <div className="text-sm font-medium">Total Fat</div>
                      <div className="text-sm">{product.nutrition.fat}</div>
                    </>
                  )}
                  
                  {product.nutrition.carbohydrates && (
                    <>
                      <div className="text-sm font-medium">Total Carbohydrates</div>
                      <div className="text-sm">{product.nutrition.carbohydrates}</div>
                    </>
                  )}
                  
                  {product.nutrition.fiber && (
                    <>
                      <div className="text-sm font-medium">Dietary Fiber</div>
                      <div className="text-sm">{product.nutrition.fiber}</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="reviews" className="mt-0">
        <div className="space-y-8">
          <ReviewList 
            productId={product.id} 
            refetchTrigger={reviewRefetchTrigger} 
          />
          
          <div className="pt-6 border-t border-muted">
            <ReviewForm 
              productId={product.id} 
              onReviewAdded={handleReviewAdded} 
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
