import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Bed, Wifi, Car, Coffee, Waves, MessageCircle, Phone, Mail, Shield } from "lucide-react";
import PayPalButton from "@/components/PayPalButton";
import type { Property } from "@shared/schema";

const iconMap: Record<string, any> = {
  "Wi-Fi": Wifi,
  "Parking": Car,
  "Kitchen": Coffee,
  "Pool": Waves,
  "Beach Access": Waves,
  "AC": "❄️",
  "Fireplace": "🔥",
  "Safari": "🦁",
  "Mountain View": "🏔️",
  "City View": "🏙️",
  "Game View": "🦒",
  "Fishing": "🎣",
  "Game Drives": "🚙",
  "Boat Dock": "⛵",
  "Gym Access": "💪",
  "24/7 Security": "🔒",
  "Cultural Tours": "🏺",
  "Snorkeling": "🤿",
  "Garden": "🌺",
  "All Meals": "🍽️",
  "Safari Guides": "👨‍🏫",
  "Hiking": "🥾"
};

export default function PropertyDetail() {
  const [match, params] = useRoute("/properties/:id");
  const propertyId = params?.id ? parseInt(params.id) : null;

  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: [`/api/properties/${propertyId}`],
    enabled: !!propertyId,
  });

  const handleWhatsAppBooking = () => {
    if (!property) return;
    
    const message = `Hi! I'm interested in booking *${property.name}*%0A%0APlease let me know the availability and total cost.`;
    const whatsappUrl = `https://wa.me/254700000000?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="bg-gray-300 h-96 rounded-xl mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-gray-300 h-8 w-3/4 mb-4 rounded" />
                <div className="bg-gray-300 h-4 w-1/2 mb-6 rounded" />
                <div className="bg-gray-300 h-32 w-full rounded" />
              </div>
              <div>
                <div className="bg-gray-300 h-64 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen py-20 bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
            <p className="text-gray-600 mb-4">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/properties">
              <Button>Back to Properties</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-terracotta">Home</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-terracotta">Properties</Link>
            <span>/</span>
            <span className="text-gray-900">{property.name}</span>
          </div>
        </nav>

        {/* Property Image */}
        <div className="relative mb-8">
          <img 
            src={property.imageUrl} 
            alt={property.name}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
          {property.featured && (
            <Badge className="absolute top-4 left-4 bg-terracotta text-white text-lg px-4 py-2">
              Featured Property
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
              <h1 className="font-playfair text-4xl font-bold text-deep-navy mb-4">
                {property.name}
              </h1>
              
              <p className="text-gray-600 mb-6 flex items-center text-lg">
                <MapPin className="h-5 w-5 text-terracotta mr-2" />
                {property.location}
              </p>

              <div className="flex items-center gap-6 mb-6 text-gray-600">
                <span className="flex items-center">
                  <Users className="h-5 w-5 text-terracotta mr-2" />
                  {property.maxGuests} guests
                </span>
                <span className="flex items-center">
                  <Bed className="h-5 w-5 text-terracotta mr-2" />
                  {property.bedrooms} bedrooms
                </span>
              </div>

              <div className="prose max-w-none mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-playfair text-2xl font-semibold text-deep-navy mb-4">
                  Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => {
                    const Icon = iconMap[amenity];
                    return (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        {typeof Icon === "string" ? (
                          <span className="text-xl mr-3">{Icon}</span>
                        ) : Icon ? (
                          <Icon className="h-5 w-5 text-terracotta mr-3" />
                        ) : (
                          <div className="w-5 h-5 bg-terracotta rounded-full mr-3" />
                        )}
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-deep-navy mb-2">
                    KES {parseFloat(property.pricePerNight).toLocaleString()}
                  </div>
                  <div className="text-gray-500">per night</div>
                </div>

                <div className="space-y-4 mb-6">
                  <Button
                    onClick={handleWhatsAppBooking}
                    className="w-full bg-whatsapp hover:bg-green-600 text-white py-4 text-lg"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Book via WhatsApp
                  </Button>

                  <div className="text-center text-gray-500 text-sm">or</div>

                  {/* PayPal Payment */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Pay with PayPal</h4>
                    <PayPalButton
                      amount={property.pricePerNight}
                      currency="USD"
                      intent="CAPTURE"
                    />
                  </div>
                </div>

                {/* Payment Options */}
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Payment Options</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <div className="bg-mpesa/10 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        <span className="text-mpesa font-bold">M</span>
                      </div>
                      <div>
                        <div className="font-medium">M-Pesa</div>
                        <div className="text-gray-500">Paybill: 123456</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-bold">P</span>
                      </div>
                      <div>
                        <div className="font-medium">PayPal</div>
                        <div className="text-gray-500">International payments</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600">💰</span>
                      </div>
                      <div>
                        <div className="font-medium">Cash on Arrival</div>
                        <div className="text-gray-500">Pay at check-in</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-6 pt-6 border-t">
                  <div className="flex items-center justify-center text-gray-600 text-sm">
                    <Shield className="h-4 w-4 text-terracotta mr-2" />
                    Secure booking protected
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-playfair text-xl font-semibold text-deep-navy mb-4">
                  Need Help?
                </h3>
                <div className="space-y-3">
                  <a href="https://wa.me/254700000000" className="flex items-center text-gray-600 hover:text-terracotta">
                    <MessageCircle className="h-4 w-4 mr-3" />
                    WhatsApp: +254 700 000 000
                  </a>
                  <a href="tel:+254700000000" className="flex items-center text-gray-600 hover:text-terracotta">
                    <Phone className="h-4 w-4 mr-3" />
                    Call: +254 700 000 000
                  </a>
                  <a href="mailto:info@kenyaluxuryvillas.com" className="flex items-center text-gray-600 hover:text-terracotta">
                    <Mail className="h-4 w-4 mr-3" />
                    Email: info@kenyaluxuryvillas.com
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
