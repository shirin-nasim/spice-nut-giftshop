
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
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
        <p>Loading checkout...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="premium-container">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="bg-white p-6 rounded-xl shadow-premium-sm">
          <p className="text-center text-muted-foreground py-8">
            Checkout page is under construction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
