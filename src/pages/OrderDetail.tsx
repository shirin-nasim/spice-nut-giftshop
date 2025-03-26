
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";

const OrderDetail = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();

  React.useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="premium-container">
        <h1 className="text-3xl font-bold mb-8">Order #{orderId}</h1>
        
        <div className="bg-white p-6 rounded-xl shadow-premium-sm">
          <p className="text-center text-muted-foreground py-8">
            Order details are not available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
