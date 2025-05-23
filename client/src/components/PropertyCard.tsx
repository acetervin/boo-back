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
    <Card className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-0 hover:scale-[1.02] group">
      <div className="relative">
        <img 
          src={property.imageUrl} 
          alt={property.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        {property.featured && (
          <Badge className="absolute top-4 right-4 bg-blue-600 text-white font-semibold px-3 py-1 rounded-full">
            Featured
          </Badge>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-space-grotesk text-xl font-semibold text-slate-950 leading-tight">
            {property.name}
          </h3>
        </div>
        
        <p className="text-slate-600 mb-4 flex items-center">
          <MapPin className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
          {property.location}
        </p>
        
        <div className="flex items-baseline justify-between mb-4">
          <span className="text-2xl font-bold text-slate-950">
            KES {parseFloat(property.pricePerNight).toLocaleString()}
          </span>
          <span className="text-slate-500 text-sm">per night</span>
        </div>
        
        <div className="flex items-center gap-4 mb-5 text-sm text-slate-600">
          <span className="flex items-center bg-slate-50 px-3 py-1 rounded-full">
            <Users className="h-4 w-4 text-blue-600 mr-1" />
            {property.maxGuests} guests
          </span>
          <span className="flex items-center bg-slate-50 px-3 py-1 rounded-full">
            <Bed className="h-4 w-4 text-emerald-600 mr-1" />
            {property.bedrooms} bedrooms
          </span>
        </div>
        
        <div className="flex gap-2 mb-6 flex-wrap">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="secondary" className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 border-0">
              {amenity}
            </Badge>
          ))}
          {property.amenities.length > 3 && (
            <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-500 border-0">
              +{property.amenities.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex gap-3">
          <Link href={`/properties/${property.id}`} className="flex-1">
            <Button className="w-full bg-slate-950 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105">
              View Details
            </Button>
          </Link>
          <Button
            onClick={handleWhatsAppClick}
            className="bg-whatsapp hover:bg-emerald-600 text-white px-4 rounded-xl transition-all duration-300 hover:scale-105"
            size="icon"
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
