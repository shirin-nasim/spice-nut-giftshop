
import React, { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { addReview } from "@/services/reviewService";
import { useAuth } from "@/hooks/useAuth";

interface ReviewFormProps {
  productId: string;
  onReviewAdded: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to leave a review",
        variant: "destructive",
      });
      return;
    }
    
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      await addReview(productId, user.id, rating, comment);
      
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      });
      
      // Reset form
      setRating(0);
      setComment("");
      
      // Refresh reviews
      onReviewAdded();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error",
        description: "There was an error submitting your review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-brand-beige-light p-6 rounded-lg text-center">
        <p className="text-muted-foreground mb-4">Please sign in to leave a review</p>
        <Button asChild variant="outline">
          <a href="/login">Sign In</a>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-medium">Write a Review</h3>
      
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none"
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(star)}
          >
            <Star
              className={`w-6 h-6 ${
                star <= (hoverRating || rating)
                  ? "text-brand-gold fill-brand-gold"
                  : "text-muted-foreground"
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-muted-foreground">
          {rating > 0 ? `You selected ${rating} star${rating !== 1 ? "s" : ""}` : "Select a rating"}
        </span>
      </div>
      
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience with this product..."
        rows={4}
        className="w-full"
      />
      
      <Button 
        type="submit" 
        disabled={isSubmitting || rating === 0}
        className="bg-brand-brown hover:bg-brand-brown-dark"
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
};

export default ReviewForm;
