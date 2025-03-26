
import React, { useState } from "react";
import LazyImage from "@/components/ui/LazyImage";

interface ProductImageGalleryProps {
  mainImage: string;
  additionalImages: string[];
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  mainImage: initialMainImage,
  additionalImages,
  productName,
}) => {
  const [mainImage, setMainImage] = useState(initialMainImage);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl overflow-hidden aspect-square shadow-premium-sm hover:shadow-premium-md transition-shadow">
        <LazyImage 
          src={mainImage} 
          alt={productName}
          className="w-full h-full hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {additionalImages.map((img, index) => (
          <button
            key={index}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              mainImage === img ? "border-brand-brown" : "border-transparent hover:border-brand-brown-light"
            }`}
            onClick={() => setMainImage(img)}
          >
            <LazyImage 
              src={img} 
              alt={`${productName} view ${index + 1}`}
              className="w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
