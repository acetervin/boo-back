import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MessageCircle, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, Shield, Smartphone, CreditCard, DollarSign } from "lucide-react";
import type { InsertContactMessage } from "@shared/schema";
import { useTheme } from "@/hooks/use-theme";

export default function Contact() {
  const { toast } = useToast();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyInterest: "",
    message: "",
  });

  const contactMutation = useMutation({
    mutationFn: (data: InsertContactMessage) => 
      apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message! We will get back to you soon.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        propertyInterest: "",
        message: "",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a question about our properties? We're here to help you find your perfect stay in Kenya
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-foreground">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="bg-background border-border focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-foreground">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="bg-background border-border focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-background border-border focus:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">
                    Phone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="bg-background border-border focus:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="propertyInterest" className="text-sm font-medium text-foreground">
                    Interested In
                  </label>
                  <Select
                    value={formData.propertyInterest}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, propertyInterest: value }))}
                  >
                    <SelectTrigger id="propertyInterest" className="bg-background border-border">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Luxury Apartment</SelectItem>
                      <SelectItem value="villa">Private Villa</SelectItem>
                      <SelectItem value="house">Vacation Home</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="bg-background border-border focus:ring-primary min-h-[150px]"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Info Cards */}
              <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <Phone className="h-6 w-6 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Phone</h3>
                  <p className="text-muted-foreground">+254 700 000 000</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <Mail className="h-6 w-6 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
                  <p className="text-muted-foreground">info@kenyaluxuryvillas.com</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <MapPin className="h-6 w-6 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Location</h3>
                  <p className="text-muted-foreground">Nairobi, Kenya</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <MessageCircle className="h-6 w-6 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">WhatsApp</h3>
                  <p className="text-muted-foreground">+254 700 000 000</p>
                </CardContent>
              </Card>
            </div>

            {/* Trust Indicators */}
            <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
              <CardContent className="p-6 space-y-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Why Book With Us</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <h4 className="font-medium text-foreground">Secure Booking</h4>
                      <p className="text-sm text-muted-foreground">Your data and payments are protected</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Smartphone className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <h4 className="font-medium text-foreground">24/7 Support</h4>
                      <p className="text-sm text-muted-foreground">Always here when you need us</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CreditCard className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <h4 className="font-medium text-foreground">Flexible Payment</h4>
                      <p className="text-sm text-muted-foreground">Multiple payment options available</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <DollarSign className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <h4 className="font-medium text-foreground">Best Price Guarantee</h4>
                      <p className="text-sm text-muted-foreground">Get the best value for your stay</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
