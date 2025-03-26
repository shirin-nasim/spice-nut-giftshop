
import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Emily Johnson",
    role: "Customer",
    content: "The almonds and pistachios are absolutely delicious - so fresh and flavorful. I've ordered multiple times and the quality is consistently excellent!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Owner",
    content: "We ordered corporate gift boxes for our top clients. The presentation was stunning and our clients were delighted with the quality. Will definitely order again.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Sarah Williams",
    role: "Chef",
    content: "As a professional chef, I'm extremely particular about my spices. The saffron and cardamom from SpiceNut are exceptional - truly some of the best I've used.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "Robert Garcia",
    role: "Customer",
    content: "Fast shipping and excellent customer service. My package arrived beautifully wrapped and the nuts were incredibly fresh. Highly recommended!",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/men/71.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="premium-section bg-white">
      <div className="premium-container">
        <div className="text-center max-w-3xl mx-auto mb-12 appear-animation">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">What Our Customers Say</h2>
          <p className="mt-4 text-muted-foreground">
            Don't just take our word for it. Here's what customers around the world think about our products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-beige-light p-6 rounded-xl shadow-premium-sm hover:shadow-premium-md transition-shadow duration-300"
            >
              <div className="relative">
                <Quote className="absolute -top-1 -left-1 h-8 w-8 text-brand-gold-light opacity-50" />
                <div className="pl-6 pt-4">
                  <p className="text-muted-foreground italic text-sm">"{testimonial.content}"</p>
                </div>
              </div>
              
              <div className="mt-6 flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="h-10 w-10 rounded-full object-cover mr-3"
                />
                <div>
                  <h4 className="font-medium text-primary text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="mt-3 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < testimonial.rating ? "text-brand-gold" : "text-gray-300"
                    }`} 
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
