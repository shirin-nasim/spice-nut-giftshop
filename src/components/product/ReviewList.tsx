
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductReviews } from "@/services/reviewService";
import { Skeleton } from "@/components/ui/skeleton";
import ReviewItem from "@/components/product/ReviewItem";

interface ReviewListProps {
  productId: string;
  refetchTrigger: number;
}

const ReviewList: React.FC<ReviewListProps> = ({ productId, refetchTrigger }) => {
  const { data: reviews, isLoading, error } = useQuery({
    queryKey: ['productReviews', productId, refetchTrigger],
    queryFn: () => getProductReviews(productId),
    enabled: !!productId,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16 mt-1" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md">
        Error loading reviews. Please try again later.
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No reviews yet. Be the first to review this product!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <ReviewItem 
          key={review.id} 
          review={review}
        />
      ))}
    </div>
  );
};

export default ReviewList;
