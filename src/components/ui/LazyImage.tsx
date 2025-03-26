
import React, { useState, useEffect, useRef } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  placeholder = "/placeholder.svg" 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, {
      rootMargin: "100px",
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={imgRef}>
      {!isLoaded && (
        <img 
          src={placeholder} 
          alt="Loading" 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
        />
      )}
      {isInView && (
        <img 
          src={src} 
          alt={alt} 
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};

export default LazyImage;
