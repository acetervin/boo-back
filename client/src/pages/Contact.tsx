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

export default function Contact() {
  const { toast } = useToast();
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
    <div className="min-h-screen py-20 bg-deep-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Ready to book your perfect Kenyan getaway? Contact us through your preferred method
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="font-playfair text-2xl font-semibold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-whatsapp w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold">WhatsApp</p>
                    <a href="https://wa.me/254700000000" className="text-gray-300 hover:text-white transition-colors">
                      +254 700 000 000
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-terracotta w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <a href="tel:+254700000000" className="text-gray-300 hover:text-white transition-colors">
                      +254 700 000 000
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <a href="mailto:info@kenyaluxuryvillas.com" className="text-gray-300 hover:text-white transition-colors">
                      info@kenyaluxuryvillas.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-gray-600 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Office</p>
                    <p className="text-gray-300">Westlands, Nairobi, Kenya</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-gray-700 hover:bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="bg-gray-700 hover:bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="bg-gray-700 hover:bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="bg-gray-700 hover:bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                    <Youtube className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-white text-gray-900">
            <CardContent className="p-8">
              <h2 className="font-playfair text-2xl font-semibold text-deep-navy mb-6">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <Input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <Input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Interest
                  </label>
                  <Select value={formData.propertyInterest} onValueChange={(value) => handleInputChange("propertyInterest", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a property..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ocean-paradise">Ocean Paradise Villa - Diani</SelectItem>
                      <SelectItem value="naivasha-retreat">Naivasha Lakeside Retreat</SelectItem>
                      <SelectItem value="mount-kenya">Mount Kenya View Lodge</SelectItem>
                      <SelectItem value="westlands-suite">Westlands Executive Suite</SelectItem>
                      <SelectItem value="malindi-heritage">Malindi Heritage House</SelectItem>
                      <SelectItem value="amboseli-safari">Amboseli Safari Villa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Tell us about your requirements..."
                    required
                    className="w-full"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full bg-terracotta hover:bg-orange-600 text-white py-4 text-lg font-semibold"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Payment Information */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
              Easy & Secure Payments
            </h2>
            <p className="text-lg text-gray-300">
              Multiple payment options for your convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* M-Pesa Payment */}
            <Card className="bg-white text-gray-900">
              <CardContent className="p-8 text-center">
                <div className="bg-mpesa/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-mpesa" />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-deep-navy mb-3">M-Pesa</h3>
                <p className="text-gray-600 mb-4">Quick and secure mobile payments for Kenyan residents</p>
                <div className="bg-gray-50 p-4 rounded-lg text-sm">
                  <p className="font-semibold text-gray-800">Paybill: 123456</p>
                  <p className="text-gray-600">Account: Your Booking ID</p>
                </div>
              </CardContent>
            </Card>

            {/* PayPal Payment */}
            <Card className="bg-white text-gray-900">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-deep-navy mb-3">PayPal</h3>
                <p className="text-gray-600 mb-4">International payments made simple and secure</p>
                <div className="bg-gray-50 p-4 rounded-lg text-sm">
                  <p className="font-semibold text-gray-800">Perfect for international guests</p>
                  <p className="text-gray-600">USD, EUR, GBP accepted</p>
                </div>
              </CardContent>
            </Card>

            {/* Cash Payment */}
            <Card className="bg-white text-gray-900">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-deep-navy mb-3">Cash on Arrival</h3>
                <p className="text-gray-600 mb-4">Pay directly upon check-in at the property</p>
                <div className="bg-gray-50 p-4 rounded-lg text-sm">
                  <p className="font-semibold text-gray-800">KES or USD accepted</p>
                  <p className="text-gray-600">Receipt provided</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-300 flex items-center justify-center">
              <Shield className="h-5 w-5 text-terracotta mr-2" />
              All payments are secure and your booking is protected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
