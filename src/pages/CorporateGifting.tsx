
import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ChevronRight, Clock, Gift, Package, Phone, ShieldCheck, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const CorporateGifting = () => {
  const features = [
    {
      title: "Customized Gifts",
      description: "Tailor your gifts to match your brand's identity and the recipient's preferences.",
      icon: Gift,
    },
    {
      title: "Premium Packaging",
      description: "Elegant gift boxes with your company logo and personalized message cards.",
      icon: Package,
    },
    {
      title: "Bulk Discounts",
      description: "Special pricing tiers for large orders to maximize your budget.",
      icon: UserPlus,
    },
    {
      title: "Quality Assurance",
      description: "Every product is carefully selected and quality-checked before shipping.",
      icon: ShieldCheck,
    },
    {
      title: "Timely Delivery",
      description: "Scheduled deliveries to ensure your gifts arrive right on time.",
      icon: Clock,
    },
    {
      title: "Dedicated Support",
      description: "A dedicated account manager to assist with your corporate gifting needs.",
      icon: Phone,
    },
  ];

  const testimonials = [
    {
      content: "The corporate gift boxes we ordered for our clients were exceptional. The quality of products and presentation exceeded our expectations. Our clients were genuinely impressed!",
      author: "Sarah Johnson",
      role: "Marketing Director, TechCorp Inc.",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      content: "We've been using SpiceNut for our employee appreciation gifts for two years now. The quality is consistently excellent, and their team is responsive and professional.",
      author: "Michael Chen",
      role: "HR Manager, Global Solutions",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];

  const giftingIdeas = [
    {
      title: "Client Appreciation",
      description: "Show gratitude to loyal clients with premium gift boxes.",
      image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1974&auto=format&fit=crop",
    },
    {
      title: "Employee Recognition",
      description: "Celebrate achievements and milestones with thoughtful gifts.",
      image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Holiday Gifting",
      description: "Spread seasonal cheer with festive gift selections.",
      image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Event Giveaways",
      description: "Make a lasting impression with premium event gifts.",
      image: "https://images.unsplash.com/photo-1563991655280-cb95c90ca2fb?q=80&w=1974&auto=format&fit=crop",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=2187')] bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50"></div>
          </div>
          
          <div className="premium-container relative z-10">
            <div className="max-w-2xl appear-animation" style={{"--index": 0} as React.CSSProperties}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-shadow">
                Corporate Gifting Solutions
              </h1>
              <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed">
                Make a lasting impression with premium dry fruits and spices gift boxes customized for your business needs.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-brand-gold hover:bg-brand-gold-dark text-primary font-medium py-6">
                  <a href="#request-quote">
                    Request a Quote
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white/10 py-6">
                  <a href="#gift-options">
                    Explore Gift Options
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="premium-section bg-white">
          <div className="premium-container">
            <div className="text-center max-w-3xl mx-auto mb-12 appear-animation">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Why Choose Our Corporate Gifting Service</h2>
              <p className="mt-4 text-muted-foreground">
                Elevate your corporate gifting with our premium service, designed to make a lasting impression on your clients and team members.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="bg-brand-beige-light p-6 rounded-xl hover-lift appear-animation"
                  style={{"--index": index + 1} as React.CSSProperties}
                >
                  <div className="h-12 w-12 rounded-full bg-brand-brown-light/20 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-brand-brown" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="premium-section bg-gradient-to-b from-background to-brand-beige-light" id="gift-options">
          <div className="premium-container">
            <div className="text-center max-w-3xl mx-auto mb-12 appear-animation">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">How It Works</h2>
              <p className="mt-4 text-muted-foreground">
                Our simple process makes corporate gifting easy and effective.
              </p>
            </div>

            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute top-14 left-1/2 -translate-x-1/2 w-1 h-[calc(100%-4rem)] bg-brand-brown-light/30 hidden md:block"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-16">
                {/* Step 1 */}
                <div className="relative appear-animation" style={{"--index": 1} as React.CSSProperties}>
                  <div className="md:text-right">
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 hidden md:block">
                      <div className="h-8 w-8 rounded-full bg-brand-brown text-white flex items-center justify-center">
                        1
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Consultation</h3>
                    <p className="text-muted-foreground mb-4">
                      Share your requirements, budget, and timeline with our corporate gifting specialists.
                    </p>
                    <ul className="space-y-2">
                      {["Understand your brand", "Define your objectives", "Determine budget"].map((item, i) => (
                        <li key={i} className="flex md:flex-row-reverse items-center gap-2">
                          <span>{item}</span>
                          <CheckCircle className="h-4 w-4 text-brand-brown flex-shrink-0" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Step 1 Image */}
                <div className="rounded-xl overflow-hidden shadow-premium-md appear-animation" style={{"--index": 2} as React.CSSProperties}>
                  <img 
                    src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1974&auto=format&fit=crop" 
                    alt="Consultation"
                    className="w-full h-64 object-cover"
                  />
                </div>
                
                {/* Step 2 Image */}
                <div className="rounded-xl overflow-hidden shadow-premium-md order-3 md:order-3 appear-animation" style={{"--index": 3} as React.CSSProperties}>
                  <img 
                    src="https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=1974&auto=format&fit=crop" 
                    alt="Customization"
                    className="w-full h-64 object-cover"
                  />
                </div>
                
                {/* Step 2 */}
                <div className="relative order-4 md:order-4 appear-animation" style={{"--index": 4} as React.CSSProperties}>
                  <div>
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 hidden md:block">
                      <div className="h-8 w-8 rounded-full bg-brand-brown text-white flex items-center justify-center">
                        2
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Customization</h3>
                    <p className="text-muted-foreground mb-4">
                      Choose products and customize packaging to align with your brand identity.
                    </p>
                    <ul className="space-y-2">
                      {["Select products", "Custom packaging", "Personalized messaging"].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-brand-brown flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="relative order-5 md:order-5 appear-animation" style={{"--index": 5} as React.CSSProperties}>
                  <div className="md:text-right">
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 hidden md:block">
                      <div className="h-8 w-8 rounded-full bg-brand-brown text-white flex items-center justify-center">
                        3
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Fulfillment & Delivery</h3>
                    <p className="text-muted-foreground mb-4">
                      We handle the entire process, from packaging to timely delivery.
                    </p>
                    <ul className="space-y-2">
                      {["Quality control", "Secure packaging", "On-time delivery"].map((item, i) => (
                        <li key={i} className="flex md:flex-row-reverse items-center gap-2">
                          <span>{item}</span>
                          <CheckCircle className="h-4 w-4 text-brand-brown flex-shrink-0" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Step 3 Image */}
                <div className="rounded-xl overflow-hidden shadow-premium-md order-6 md:order-6 appear-animation" style={{"--index": 6} as React.CSSProperties}>
                  <img 
                    src="https://images.unsplash.com/photo-1541795795328-f073b763494e?q=80&w=1974&auto=format&fit=crop" 
                    alt="Delivery"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gifting Ideas */}
        <section className="premium-section bg-white">
          <div className="premium-container">
            <div className="text-center max-w-3xl mx-auto mb-12 appear-animation">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Corporate Gifting Ideas</h2>
              <p className="mt-4 text-muted-foreground">
                Explore our curated selection of gifting options for various corporate occasions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {giftingIdeas.map((idea, index) => (
                <div 
                  key={idea.title}
                  className="group relative rounded-xl overflow-hidden hover-lift appear-animation"
                  style={{"--index": index + 1} as React.CSSProperties}
                >
                  <div className="aspect-square w-full">
                    <img 
                      src={idea.image} 
                      alt={idea.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <h3 className="text-xl font-semibold text-white">{idea.title}</h3>
                      <p className="mt-2 text-sm text-white/80">{idea.description}</p>
                      <Link to="/contact" className="mt-4 inline-flex items-center text-white/90 text-sm font-medium transition-all duration-300 group-hover:text-white">
                        <span>Learn More</span>
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="premium-section bg-brand-beige-light">
          <div className="premium-container">
            <div className="text-center max-w-3xl mx-auto mb-12 appear-animation">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">What Our Corporate Clients Say</h2>
              <p className="mt-4 text-muted-foreground">
                Hear from businesses who have partnered with us for their corporate gifting needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-premium-md hover-lift appear-animation"
                  style={{"--index": index + 1} as React.CSSProperties}
                >
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author}
                      className="h-14 w-14 rounded-full object-cover border-2 border-brand-beige"
                    />
                    <div className="ml-4">
                      <h4 className="font-semibold text-primary">{testimonial.author}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Request a Quote */}
        <section className="premium-section bg-white" id="request-quote">
          <div className="premium-container">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="appear-animation">
                  <h2 className="text-3xl md:text-4xl font-bold text-primary">Request a Quote</h2>
                  <p className="mt-4 text-muted-foreground">
                    Fill out the form to get a customized quote for your corporate gifting needs. Our team will get back to you within 24 hours.
                  </p>
                  
                  <div className="mt-8 space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-brown flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">
                        <span className="font-medium text-primary">Custom branding</span> with your company logo and colors
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-brown flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">
                        <span className="font-medium text-primary">Personalized message cards</span> to add a personal touch
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-brown flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">
                        <span className="font-medium text-primary">Volume discounts</span> for orders of all sizes
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-brown flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">
                        <span className="font-medium text-primary">International shipping</span> to multiple locations
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-brand-beige-light p-6 md:p-8 rounded-xl shadow-premium-md appear-animation">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-primary mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-2 rounded-md border border-brand-beige focus:outline-none focus:ring-1 focus:ring-brand-brown"
                          placeholder="John Smith"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-primary mb-1">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          id="company"
                          className="w-full px-4 py-2 rounded-md border border-brand-beige focus:outline-none focus:ring-1 focus:ring-brand-brown"
                          placeholder="ACME Inc."
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-2 rounded-md border border-brand-beige focus:outline-none focus:ring-1 focus:ring-brand-brown"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-primary mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          className="w-full px-4 py-2 rounded-md border border-brand-beige focus:outline-none focus:ring-1 focus:ring-brand-brown"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="requirements" className="block text-sm font-medium text-primary mb-1">
                        Gift Requirements *
                      </label>
                      <select
                        id="requirements"
                        className="w-full px-4 py-2 rounded-md border border-brand-beige focus:outline-none focus:ring-1 focus:ring-brand-brown"
                        required
                      >
                        <option value="">Select Option</option>
                        <option value="client-gifts">Client Appreciation Gifts</option>
                        <option value="employee-gifts">Employee Recognition Gifts</option>
                        <option value="event-gifts">Event Giveaways</option>
                        <option value="holiday-gifts">Holiday Gifts</option>
                        <option value="custom">Custom Requirement</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-primary mb-1">
                        Approximate Quantity *
                      </label>
                      <select
                        id="quantity"
                        className="w-full px-4 py-2 rounded-md border border-brand-beige focus:outline-none focus:ring-1 focus:ring-brand-brown"
                        required
                      >
                        <option value="">Select Quantity</option>
                        <option value="10-25">10-25</option>
                        <option value="26-50">26-50</option>
                        <option value="51-100">51-100</option>
                        <option value="101-250">101-250</option>
                        <option value="251+">251+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-primary mb-1">
                        Additional Information
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-2 rounded-md border border-brand-beige focus:outline-none focus:ring-1 focus:ring-brand-brown"
                        placeholder="Tell us more about your requirements, budget, and timeline..."
                      ></textarea>
                    </div>
                    
                    <Button className="w-full bg-brand-brown hover:bg-brand-brown-dark text-white py-6">
                      Submit Quote Request
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this form, you agree to our privacy policy and terms of service.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="premium-section bg-gradient-to-b from-white to-brand-beige-light">
          <div className="premium-container">
            <div className="text-center max-w-3xl mx-auto mb-12 appear-animation">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Frequently Asked Questions</h2>
              <p className="mt-4 text-muted-foreground">
                Find answers to common questions about our corporate gifting service.
              </p>
            </div>

            <div className="max-w-3xl mx-auto divide-y divide-brand-beige-dark appear-animation">
              {[
                {
                  question: "What is the minimum order quantity for corporate gifts?",
                  answer: "Our minimum order quantity for corporate gifts is 10 units. However, for fully customized gifts with special packaging and branding, we recommend a minimum of 25 units to optimize costs.",
                },
                {
                  question: "Can I include my company logo on the gift boxes?",
                  answer: "Yes, we offer custom branding options including your company logo on gift boxes, packaging materials, and gift cards. We can match your brand colors and design specifications.",
                },
                {
                  question: "How far in advance should I place my order?",
                  answer: "For standard corporate gifts, we recommend placing your order at least 2-3 weeks in advance. For custom or large orders, especially during holiday seasons, 4-6 weeks is ideal to ensure timely delivery.",
                },
                {
                  question: "Do you offer international shipping for corporate orders?",
                  answer: "Yes, we offer worldwide shipping for corporate orders. Shipping costs and delivery timeframes vary by destination. Our team can provide detailed information based on your specific requirements.",
                },
                {
                  question: "What payment methods do you accept for corporate orders?",
                  answer: "We accept various payment methods including credit cards, bank transfers, and PayPal. For corporate clients, we also offer invoicing with net 30 terms upon credit approval.",
                },
              ].map((faq, index) => (
                <div key={index} className="py-6">
                  <h3 className="text-lg font-medium text-primary">{faq.question}</h3>
                  <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CorporateGifting;
