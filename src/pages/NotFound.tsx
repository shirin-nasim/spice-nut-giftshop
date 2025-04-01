
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-brand-beige-light to-white">
      <div className="text-center max-w-md px-6 py-12 bg-white rounded-xl shadow-premium-sm animate-fade-in">
        <h1 className="text-7xl font-bold text-brand-brown mb-2">404</h1>
        <div className="w-16 h-1 bg-brand-gold mx-auto mb-6"></div>
        <p className="text-xl font-medium text-primary mb-2">Page Not Found</p>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-brown text-white rounded-md hover:bg-brand-brown-dark transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
