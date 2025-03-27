
import React from "react";
import { format } from "date-fns";
import { Star } from "lucide-react";
import { Review } from "@/types/supabase";

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const userName = review.user?.firstName && review.user?.lastName
    ? `${review.user.firstName} ${review.user.lastName}`
    : "Anonymous";
  
  const formattedDate = review.createdAt
    ? format(new Date(review.createdAt), "MMMM d, yyyy")
    : "";

  return (
    <div className="border-b border-muted pb-4 last:border-0">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="font-medium">{userName}</div>
          <div className="text-sm text-muted-foreground">{formattedDate}</div>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${
                i < review.rating ? "text-brand-gold fill-brand-gold" : "text-muted-foreground"
              }`} 
            />
          ))}
        </div>
      </div>
      <p className="text-primary whitespace-pre-line">{review.comment}</p>
    </div>
  );
};

export default ReviewItem;
