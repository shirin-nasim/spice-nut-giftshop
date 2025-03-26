
import React from "react";
import { Truck, Package, Shield } from "lucide-react";

const ProductFeatures: React.FC = () => {
  return (
    <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex items-center space-x-3 p-3 bg-brand-beige-light rounded-lg">
        <Truck className="h-5 w-5 text-brand-brown" />
        <span className="text-sm">Free shipping over $50</span>
      </div>
      <div className="flex items-center space-x-3 p-3 bg-brand-beige-light rounded-lg">
        <Package className="h-5 w-5 text-brand-brown" />
        <span className="text-sm">Premium packaging</span>
      </div>
      <div className="flex items-center space-x-3 p-3 bg-brand-beige-light rounded-lg">
        <Shield className="h-5 w-5 text-brand-brown" />
        <span className="text-sm">Satisfaction guaranteed</span>
      </div>
    </div>
  );
};

export default ProductFeatures;
