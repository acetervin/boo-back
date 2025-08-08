import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Bed, Wifi, Car, Coffee, Waves } from "lucide-react";
import CategoryGallery from "../components/CategoryGallery";
import { BookingForm } from "@/components/BookingForm";
import type { Property } from "@shared/schema";

// Icon mapping object
const iconMap: Record<string, any> = {
  "Wi-Fi": Wifi,
  "Parking": Car,
  "Kitchen": Coffee,
  "Pool": Waves,
  "Beach Access": Waves,
  "AC": undefined,
  "Fireplace": undefined,
  "Safari": undefined,
  "Mountain View": undefined,
  "City View": undefined,
  "Game View": undefined,
  "Fishing": undefined,
  "Game Drives": undefined,
  "Boat Dock": undefined,
  "Gym Access": undefined,
  "24/7 Security": undefined,
  "Cultural Tours": undefined,
  "Snorkeling": undefined,
  "Garden": undefined,
  "All Meals": undefined,
  "Safari Guides": undefined,
  "Hiking": undefined
};

export default function PropertyDetail() {
  const [match, params] = useRoute("/properties/:id");
  const propertyId = params?.id ? parseInt(params.id) : null;

  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: [`/api/properties/${propertyId}`],
    enabled: !!propertyId,
  });

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
          src={property.main_image_url || property.image_url}
          alt={property.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Property Header */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {property.name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4">
                <p className="text-muted-foreground flex items-center">
                  <MapPin className="h-4 w-4 text-primary mr-2" />
                  {property.location}
                </p>
                {property.featured && (
                  <Badge variant="default">Featured</Badge>
                )}
              </div>
            </div>

            {/* Image Gallery */}
            <CategoryGallery
              categories={
                Array.isArray(property.categorized_images)
                  ? property.categorized_images
                  : []
              }
            />

            {/* Property Info */}
            <div className="border-t border-b border-border py-6 space-y-6">
              <div className="flex flex-wrap gap-x-8 gap-y-4 text-muted-foreground">
                <span className="flex items-center text-lg">
                  <Users className="h-5 w-5 mr-2" />
                  {property.max_guests} guests
                </span>
                <span className="flex items-center text-lg">
                  <Bed className="h-5 w-5 mr-2" />
                  {property.bedrooms} bedrooms
                </span>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-semibold text-foreground mb-4">About this space</h2>
                {property.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">What this place offers</h2>
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
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <BookingForm
              pricePerNight={Number(property.price_per_night)}
              propertyId={property.id}
              maxGuests={property.max_guests}
              bedrooms={property.bedrooms}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
