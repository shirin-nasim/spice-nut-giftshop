
import React from "react";

interface ReviewItemProps {
  name: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ 
  name, 
  rating, 
  date, 
  title, 
  comment 
}) => {
  return (
    <div className="py-6">
      <div className="flex items-center mb-2">
        <div className="flex mr-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg 
              key={i} 
              className={`w-4 h-4 ${i < rating ? "text-brand-gold" : "text-gray-300"}`} 
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="flex items-center mb-3">
        <span className="text-sm text-muted-foreground">{name}</span>
        <span className="mx-2 text-muted-foreground">•</span>
        <span className="text-sm text-muted-foreground">{date}</span>
      </div>
      <p className="text-muted-foreground">{comment}</p>
    </div>
  );
};

export default ReviewItem;
