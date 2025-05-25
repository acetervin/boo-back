import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Bed, Wifi, Car, Coffee, Waves, MessageCircle, Phone, Mail, Shield } from "lucide-react";
import PayPalButton from "@/components/PayPalButton";
import type { Property } from "@shared/schema";

// Icon mapping object
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
  const [currentImage, setCurrentImage] = useState(0);

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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Property not found</h1>
        <p className="text-muted-foreground">The property you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/properties">View All Properties</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-12">
      <div className="relative h-[60vh] md:h-[70vh]">
        <img
          src={property.image_url}
          alt={property.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card className="border-border bg-card overflow-hidden">
              <div className="relative h-[50vh]">
                <img
                  src={property.images?.[currentImage] || property.image_url}
                  alt={`${property.name} - View ${currentImage + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 grid grid-cols-4 gap-2">
                {property.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`relative aspect-[4/3] overflow-hidden rounded-lg ${
                      currentImage === index ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${property.name} - Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {property.name}
                    </h1>
                    <p className="text-muted-foreground flex items-center">
                      <MapPin className="h-4 w-4 text-primary mr-2" />
                      {property.location}
                    </p>
                  </div>
                  {property.featured && (
                    <Badge variant="default">Featured</Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
                  <span className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    {property.max_guests} guests
                  </span>
                  <span className="flex items-center">
                    <Bed className="h-5 w-5 mr-2" />
                    {property.bedrooms} bedrooms
                  </span>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  {property.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground">{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity) => {
                    const Icon = iconMap[amenity] || null;
                    return (
                      <div key={amenity} className="flex items-center text-muted-foreground">
                        {typeof Icon === 'string' ? (
                          <span className="mr-2 text-xl">{Icon}</span>
                        ) : Icon ? (
                          <Icon className="h-5 w-5 mr-2 text-primary" />
                        ) : null}
                        {amenity}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-border bg-card">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold text-foreground">
                    KES {Number(property.price_per_night).toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">per night</span>
                </div>

                <div className="space-y-4">
                  <PayPalButton 
                    amount={property.price_per_night}
                    currency="USD"
                    intent="capture"
                  />
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or contact us</span>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    onClick={handleWhatsAppBooking}
                    className="w-full"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Book via WhatsApp
                  </Button>

                  <div className="flex flex-col space-y-2">
                    <a
                      href="tel:+254700000000"
                      className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      +254 700 000 000
                    </a>
                    <a
                      href="mailto:info@kenyaluxuryvillas.com"
                      className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      info@kenyaluxuryvillas.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p>Book with confidence. All payments are secured and your data is protected.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
