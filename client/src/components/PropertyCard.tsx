import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Bed, MessageCircle } from "lucide-react";
import type { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const handleWhatsAppClick = () => {
    const message = `Hi, I'm interested in ${property.name}`;
    const whatsappUrl = `https://wa.me/254700000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={property.imageUrl} 
          alt={property.name}
          className="w-full h-64 object-cover"
        />
        {property.featured && (
          <Badge className="absolute top-4 right-4 bg-terracotta text-white">
            Featured
          </Badge>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-playfair text-2xl font-semibold text-deep-navy">
            {property.name}
          </h3>
        </div>
        
        <p className="text-gray-600 mb-3 flex items-center">
          <MapPin className="h-4 w-4 text-terracotta mr-2" />
          {property.location}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-deep-navy">
            KES {parseFloat(property.pricePerNight).toLocaleString()}
          </span>
          <span className="text-gray-500">per night</span>
        </div>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <span className="flex items-center">
            <Users className="h-4 w-4 text-terracotta mr-1" />
            {property.maxGuests} guests
          </span>
          <span className="flex items-center">
            <Bed className="h-4 w-4 text-terracotta mr-1" />
            {property.bedrooms} bedrooms
          </span>
        </div>
        
        <div className="flex gap-2 mb-4 flex-wrap">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-3">
          <Link href={`/properties/${property.id}`} className="flex-1">
            <Button className="w-full bg-terracotta hover:bg-orange-600 text-white">
              View Details
            </Button>
          </Link>
          <Button
            onClick={handleWhatsAppClick}
            className="bg-whatsapp hover:bg-green-600 text-white px-4"
            size="icon"
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
