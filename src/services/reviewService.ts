
import { supabase } from "@/integrations/supabase/client";
import { Review } from "@/types/supabase";

// Get reviews for a product
export const getProductReviews = async (productId: string): Promise<Review[]> => {
  const { data, error } = await supabase
    .from("product_reviews")
    .select(`
      id,
      product_id,
      user_id,
      rating,
      comment,
      created_at,
      profiles(id, first_name, last_name)
    `)
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }

  // Transform the data to match our Review type
  return data.map(item => ({
    id: item.id,
    productId: item.product_id,
    userId: item.user_id,
    rating: item.rating,
    comment: item.comment,
    createdAt: item.created_at,
    user: item.profiles ? {
      id: item.profiles.id,
      firstName: item.profiles.first_name,
      lastName: item.profiles.last_name
    } : undefined
  }));
};

// Add a review
export const addReview = async (
  productId: string, 
  userId: string, 
  rating: number, 
  comment: string
): Promise<Review> => {
  const { data, error } = await supabase
    .from("product_reviews")
    .insert({
      product_id: productId,
      user_id: userId,
      rating,
      comment
    })
    .select()
    .single();

  if (error) {
    console.error("Error adding review:", error);
    throw error;
  }

  // Update product average rating
  await updateProductRating(productId);

  return {
    id: data.id,
    productId: data.product_id,
    userId: data.user_id,
    rating: data.rating,
    comment: data.comment,
    createdAt: data.created_at
  };
};

// Update a review
export const updateReview = async (
  reviewId: string, 
  rating: number, 
  comment: string
): Promise<Review> => {
  const { data, error } = await supabase
    .from("product_reviews")
    .update({ rating, comment })
    .eq("id", reviewId)
    .select()
    .single();

  if (error) {
    console.error("Error updating review:", error);
    throw error;
  }

  // Get product id from the review to update its rating
  const productId = data.product_id;
  await updateProductRating(productId);

  return {
    id: data.id,
    productId: data.product_id,
    userId: data.user_id,
    rating: data.rating,
    comment: data.comment,
    createdAt: data.created_at
  };
};

// Delete a review
export const deleteReview = async (reviewId: string): Promise<void> => {
  // First get the product_id to update its rating after deletion
  const { data: review } = await supabase
    .from("product_reviews")
    .select("product_id")
    .eq("id", reviewId)
    .single();

  const { error } = await supabase
    .from("product_reviews")
    .delete()
    .eq("id", reviewId);

  if (error) {
    console.error("Error deleting review:", error);
    throw error;
  }

  // Update product average rating
  if (review) {
    await updateProductRating(review.product_id);
  }
};

// Helper function to update product average rating
const updateProductRating = async (productId: string): Promise<void> => {
  // Calculate average rating
  const { data, error } = await supabase
    .rpc("calculate_product_average_rating", { product_id_param: productId });

  if (error) {
    console.error("Error calculating average rating:", error);
    return;
  }

  const averageRating = data || 0;

  // Update product rating
  await supabase
    .from("products")
    .update({ rating: averageRating })
    .eq("id", productId);
};
