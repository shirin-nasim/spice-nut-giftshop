
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading wishlist...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="premium-container">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        
        <div className="bg-white p-6 rounded-xl shadow-premium-sm">
          <p className="text-center text-muted-foreground py-8">
            Your wishlist is currently empty.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
