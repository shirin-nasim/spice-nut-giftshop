
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Users, 
  Package, 
  ShoppingBag, 
  BarChart,
  Search,
  PlusCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Admin = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  React.useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
    // In a real app, check admin role here
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-slow-spin h-10 w-10 border-4 border-brand-brown-light border-t-brand-brown rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Admin Sidebar */}
        <div className="w-64 min-h-screen bg-white shadow-premium-sm p-4">
          <div className="py-4 px-2 border-b border-border mb-6">
            <h1 className="text-xl font-bold text-brand-brown">SpiceNut Admin</h1>
            <p className="text-sm text-muted-foreground">Management Dashboard</p>
          </div>
          
          <nav className="space-y-1">
            <Button
              variant={activeTab === "dashboard" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("dashboard")}
            >
              <BarChart className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === "products" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("products")}
            >
              <Package className="mr-2 h-4 w-4" />
              Products
            </Button>
            <Button
              variant={activeTab === "orders" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("orders")}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Orders
            </Button>
            <Button
              variant={activeTab === "users" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("users")}
            >
              <Users className="mr-2 h-4 w-4" />
              Users
            </Button>
          </nav>
        </div>
        
        {/* Admin Content */}
        <div className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="dashboard" className="animate-fade-in">
              <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-4 rounded-xl shadow-premium-sm">
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <h3 className="text-2xl font-bold">24</h3>
                </div>
                
                <div className="bg-white p-4 rounded-xl shadow-premium-sm">
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <h3 className="text-2xl font-bold">16</h3>
                </div>
                
                <div className="bg-white p-4 rounded-xl shadow-premium-sm">
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <h3 className="text-2xl font-bold">42</h3>
                </div>
                
                <div className="bg-white p-4 rounded-xl shadow-premium-sm">
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <h3 className="text-2xl font-bold">$3,240</h3>
                </div>
              </div>
              
              <div className="mt-8 bg-white p-6 rounded-xl shadow-premium-sm">
                <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                <div className="text-center py-12 text-muted-foreground">
                  <p>No recent activity</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="products" className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Products</h2>
                <Button className="bg-brand-brown hover:bg-brand-brown-dark">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Product
                </Button>
              </div>
              
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search products..." 
                    className="pl-8" 
                  />
                </div>
                
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="dry-fruits">Dry Fruits</SelectItem>
                    <SelectItem value="spices">Spices</SelectItem>
                    <SelectItem value="gift-boxes">Gift Boxes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="bg-white overflow-hidden rounded-xl shadow-premium-sm">
                <div className="text-center py-12 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-2 text-muted" />
                  <p>No products found</p>
                  <p className="text-sm">Add products to your inventory</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="orders" className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Orders</h2>
              </div>
              
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search orders..." 
                    className="pl-8" 
                  />
                </div>
                
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="bg-white overflow-hidden rounded-xl shadow-premium-sm">
                <div className="text-center py-12 text-muted-foreground">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-2 text-muted" />
                  <p>No orders found</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Users</h2>
              </div>
              
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search users..." 
                    className="pl-8" 
                  />
                </div>
                
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="bg-white overflow-hidden rounded-xl shadow-premium-sm">
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-2 text-muted" />
                  <p>No users found</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
