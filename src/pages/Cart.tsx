
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Minus, Plus, ShoppingBag, ShoppingCart, Trash2, TruckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

// Sample cart data
const initialCartItems = [
  {
    id: "premium-almonds",
    name: "Premium California Almonds",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1574184864703-3487b13f0edd?q=80&w=1932&auto=format&fit=crop",
    quantity: 2,
    weight: "500g",
  },
  {
    id: "saffron-premium",
    name: "Pure Premium Saffron Threads",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?q=80&w=1964&auto=format&fit=crop",
    quantity: 1,
    weight: "250g",
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate tax (e.g., 8%)
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  
  // Calculate shipping (free over $50)
  const shippingThreshold = 50;
  const standardShipping = 6.99;
  const shipping = subtotal >= shippingThreshold ? 0 : standardShipping;
  
  // Calculate discount (if promo applied)
  const discountRate = promoApplied ? 0.1 : 0; // 10% discount
  const discount = subtotal * discountRate;
  
  // Calculate total
  const total = subtotal + tax + shipping - discount;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setPromoApplied(true);
      toast({
        title: "Promo code applied",
        description: "10% discount has been applied to your order.",
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "The promo code you entered is invalid or expired.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-10">
        <div className="premium-container">
          <h1 className="text-3xl font-bold text-primary mb-8">Your Cart</h1>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-premium-sm overflow-hidden animate-fade-in">
                  <div className="divide-y divide-brand-beige">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Product Image */}
                          <Link to={`/product/${item.id}`} className="block flex-shrink-0">
                            <div className="w-full sm:w-20 h-20 bg-brand-beige-light rounded-md overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          </Link>
                          
                          {/* Product Info */}
                          <div className="flex-grow">
                            <Link to={`/product/${item.id}`} className="hover:text-brand-brown">
                              <h3 className="font-medium text-primary">{item.name}</h3>
                            </Link>
                            <p className="text-sm text-muted-foreground mt-1">Weight: {item.weight}</p>
                            
                            <div className="mt-4 flex flex-wrap justify-between items-center gap-4">
                              <div className="flex items-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-l-md rounded-r-none border-r-0"
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <div className="h-8 w-12 flex items-center justify-center border border-input">
                                  <span className="text-sm">{item.quantity}</span>
                                </div>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-r-md rounded-l-none border-l-0"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              
                              <div className="flex items-center gap-4">
                                <span className="font-medium">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                  onClick={() => handleRemoveItem(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Continue Shopping */}
                <div className="mt-6 flex justify-between items-center">
                  <Button asChild variant="outline" className="border-brand-brown text-brand-brown hover:bg-brand-brown/5">
                    <Link to="/shop" className="flex items-center">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => setCartItems([])}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Cart
                  </Button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1 animate-fade-in">
                <div className="bg-white rounded-xl shadow-premium-sm overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-primary mb-4">Order Summary</h2>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      {promoApplied && (
                        <div className="flex justify-between text-brand-brown">
                          <span>Discount (10%)</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                      </div>
                      
                      <div className="pt-3 mt-3 border-t border-brand-beige flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-lg">${total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    {/* Promo Code */}
                    <div className="mb-6">
                      <label htmlFor="promo" className="block text-sm font-medium text-primary mb-2">
                        Promo Code
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="promo"
                          className="flex-grow px-3 py-2 rounded-md border border-input focus:outline-none focus:ring-1 focus:ring-brand-brown"
                          placeholder="Enter code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          disabled={promoApplied}
                        />
                        <Button 
                          variant="outline" 
                          className="border-brand-brown text-brand-brown hover:bg-brand-brown/5"
                          onClick={handleApplyPromo}
                          disabled={promoApplied || !promoCode}
                        >
                          Apply
                        </Button>
                      </div>
                      {promoApplied && (
                        <p className="text-sm text-brand-brown mt-2">Promo code "WELCOME10" applied!</p>
                      )}
                    </div>
                    
                    {/* Checkout Button */}
                    <Button className="w-full bg-brand-brown hover:bg-brand-brown-dark text-white py-6 mb-4">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    
                    {/* Shipping Info */}
                    <div className="mt-6 bg-brand-beige-light p-4 rounded-lg">
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <TruckIcon className="h-4 w-4 mr-2 text-brand-brown" />
                        <span>Free shipping on orders over ${shippingThreshold}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <ShoppingCart className="h-4 w-4 mr-2 text-brand-brown" />
                        <span>Secure checkout powered by Stripe</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-premium-sm animate-fade-in">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-primary mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Looks like you haven't added any products to your cart yet.</p>
              <Button asChild size="lg" className="bg-brand-brown hover:bg-brand-brown-dark text-white">
                <Link to="/shop">
                  Start Shopping
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
