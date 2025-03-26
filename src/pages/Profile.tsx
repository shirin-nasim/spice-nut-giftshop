
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { user, isLoading, profile } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading user profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="premium-container">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <div className="bg-white p-6 rounded-xl shadow-premium-sm">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{profile?.firstName} {profile?.lastName}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              className="bg-brand-brown hover:bg-brand-brown-dark"
              onClick={() => navigate("/orders")}
            >
              View My Orders
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
