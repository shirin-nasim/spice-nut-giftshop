
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  ShoppingBag, 
  Heart, 
  LogOut,
  UserCog,
  MapPin,
  CreditCard
} from "lucide-react";

const Account = () => {
  const { user, isLoading, profile, signOut } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-slow-spin h-10 w-10 border-4 border-brand-brown-light border-t-brand-brown rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="premium-container max-w-5xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Account Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-premium-sm">
              <div className="text-center mb-6">
                <div className="h-20 w-20 bg-brand-beige rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="h-10 w-10 text-brand-brown" />
                </div>
                <h3 className="font-semibold text-lg">{profile?.firstName || 'Welcome'} {profile?.lastName || ''}</h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              
              <div className="space-y-1 pt-4 border-t border-border">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-muted-foreground hover:text-brand-brown hover:bg-brand-beige-light"
                >
                  <UserCog className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-muted-foreground hover:text-brand-brown hover:bg-brand-beige-light"
                  onClick={() => navigate("/orders")}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  <span>Orders</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-muted-foreground hover:text-brand-brown hover:bg-brand-beige-light"
                  onClick={() => navigate("/wishlist")}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Wishlist</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-muted-foreground hover:text-brand-brown hover:bg-brand-beige-light"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Account Content */}
          <div className="w-full md:w-3/4">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="bg-white rounded-xl shadow-premium-sm p-1 mb-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="payment">Payment Methods</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="bg-white p-6 rounded-xl shadow-premium-sm animate-fade-in">
                <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-muted-foreground">First Name</label>
                    <p className="font-medium">{profile?.firstName || 'Not provided'}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Last Name</label>
                    <p className="font-medium">{profile?.lastName || 'Not provided'}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Email</label>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Phone</label>
                    <p className="font-medium">{profile?.phone || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <Button className="bg-brand-brown hover:bg-brand-brown-dark">
                    Edit Profile
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="addresses" className="bg-white p-6 rounded-xl shadow-premium-sm animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Saved Addresses</h2>
                  <Button variant="outline" size="sm">
                    <MapPin className="mr-2 h-4 w-4" /> Add New Address
                  </Button>
                </div>
                
                <div className="text-center py-8 text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-2 text-muted" />
                  <p>You have no saved addresses</p>
                  <p className="text-sm">Add addresses for faster checkout</p>
                </div>
              </TabsContent>
              
              <TabsContent value="payment" className="bg-white p-6 rounded-xl shadow-premium-sm animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Payment Methods</h2>
                  <Button variant="outline" size="sm">
                    <CreditCard className="mr-2 h-4 w-4" /> Add New Card
                  </Button>
                </div>
                
                <div className="text-center py-8 text-muted-foreground">
                  <CreditCard className="h-12 w-12 mx-auto mb-2 text-muted" />
                  <p>You have no saved payment methods</p>
                  <p className="text-sm">Add payment methods for faster checkout</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
