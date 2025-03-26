
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ReviewItem from "./ReviewItem";
import { Product } from "@/types/supabase";

interface ProductTabsProps {
  product: Product & { description?: string; details?: any };
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const reviews = [
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
  ];

  return (
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
          {reviews.map((review, index) => (
            <ReviewItem key={index} {...review} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
