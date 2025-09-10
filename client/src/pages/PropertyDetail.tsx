import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Users, Bed, Wifi, Car, Coffee, Waves, Play, Star, Heart, Share2, ImageIcon, Video } from "lucide-react";
import CategoryGallery from "../components/CategoryGallery";
import { BookingForm } from "@/components/BookingForm";
import type { Property } from "@shared/schema";
import { motion } from "framer-motion";

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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");

  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: [`/api/properties/${propertyId}`],
    enabled: !!propertyId,
  });

  // Sample video URLs - in real implementation these could come from property data or be configurable
  const propertyVideos = property ? [
    {
      id: 1,
      title: "Property Tour",
      thumbnail: property.main_image_url || property.image_url || "/placeholder.jpg",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with actual video URLs
    },
    {
      id: 2,
      title: "Neighborhood Overview",
      thumbnail: property.image_url || "/placeholder.jpg",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with actual video URLs
    }
  ] : [];

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

  // Get all images for the enhanced gallery (only if property exists)
  const allImages = property ? (() => {
    const images = Array.isArray(property.categorized_images)
      ? property.categorized_images.flatMap((cat: any) => cat.images || [])
      : [];
    
    // Add main image if not in categorized images
    if (property.main_image_url && !images.includes(property.main_image_url)) {
      images.unshift(property.main_image_url);
    }
    return images;
  })() : [];

  const openVideoModal = (videoUrl: string) => {
    setSelectedVideoUrl(videoUrl);
    setShowVideoModal(true);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Enhanced Hero Section */}
      <div className="relative h-[75vh] overflow-hidden">
        <motion.img
          key={activeImageIndex}
          src={allImages[activeImageIndex] || property.main_image_url || property.image_url}
          alt={property.name}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Image Navigation */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {allImages.slice(0, 5).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeImageIndex ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
            {allImages.length > 5 && (
              <span className="text-white text-sm">+{allImages.length - 5}</span>
            )}
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-md hover:bg-white/30">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-md hover:bg-white/30">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Property Header Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white"
            >
              <div className="flex items-center space-x-3 mb-2">
                {property.featured && (
                  <Badge className="bg-yellow-500 text-black">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Premium Luxury
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-3 tracking-tight">
                {property.name}
              </h1>
              <div className="flex items-center space-x-6 text-lg">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  {property.location}
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  {property.max_guests} guests
                </div>
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2" />
                  {property.bedrooms} bedrooms
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Enhanced Property Overview */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">About this luxury property</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert max-w-none">
                    {property.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Enhanced Media Section */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <ImageIcon className="h-6 w-6 mr-2" />
                    Property Gallery & Videos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="gallery" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="gallery" className="flex items-center">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Photo Gallery
                      </TabsTrigger>
                      <TabsTrigger value="videos" className="flex items-center">
                        <Video className="h-4 w-4 mr-2" />
                        Virtual Tours
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="gallery" className="mt-6">
                      {/* Enhanced Gallery */}
                      <CategoryGallery
                        categories={
                          Array.isArray(property.categorized_images)
                            ? property.categorized_images
                            : []
                        }
                      />
                    </TabsContent>
                    
                    <TabsContent value="videos" className="mt-6">
                      {/* Video Section */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {propertyVideos.map((video) => (
                          <motion.div
                            key={video.id}
                            whileHover={{ scale: 1.05 }}
                            className="relative group cursor-pointer rounded-lg overflow-hidden"
                            onClick={() => openVideoModal(video.url)}
                          >
                            <div className="aspect-video relative">
                              <img 
                                src={video.thumbnail} 
                                alt={video.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                <div className="bg-white/20 backdrop-blur-md rounded-full p-4 group-hover:scale-110 transition-transform">
                                  <Play className="h-8 w-8 text-white fill-white" />
                                </div>
                              </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                              <h3 className="text-white font-semibold">{video.title}</h3>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Video Modal */}
                      {showVideoModal && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                          onClick={() => setShowVideoModal(false)}
                        >
                          <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="bg-white rounded-lg overflow-hidden max-w-4xl w-full"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="aspect-video">
                              <iframe
                                src={selectedVideoUrl}
                                className="w-full h-full"
                                frameBorder="0"
                                allowFullScreen
                                title="Property Video"
                              />
                            </div>
                            <div className="p-4 flex justify-end">
                              <Button 
                                variant="outline" 
                                onClick={() => setShowVideoModal(false)}
                              >
                                Close
                              </Button>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>


            {/* Enhanced Amenities */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Luxury Amenities & Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {property.amenities.map((amenity, index) => {
                      const Icon = iconMap[amenity] || null;
                      return (
                        <motion.div 
                          key={amenity}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="flex items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          {typeof Icon === 'string' ? (
                            <span className="mr-3 text-xl">{Icon}</span>
                          ) : Icon ? (
                            <Icon className="h-5 w-5 mr-3 text-primary" />
                          ) : (
                            <div className="w-5 h-5 mr-3 bg-primary/20 rounded-full" />
                          )}
                          <span className="font-medium text-foreground">{amenity}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Enhanced Location & Nearby */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <MapPin className="h-6 w-6 mr-2" />
                    Location & Nearby Attractions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-lg font-semibold">
                      <MapPin className="h-5 w-5 mr-2 text-primary" />
                      {property.location}
                    </div>
                    <p className="text-muted-foreground">
                      Experience the best of Kenya from this prime location. Whether you're here for business or leisure, 
                      you'll find everything you need within reach.
                    </p>
                    {/* You can add more location-specific content here */}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Enhanced Booking Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="sticky top-8"
            >
              <BookingForm
                pricePerNight={Number(property.price_per_night)}
                propertyId={property.id}
                maxGuests={property.max_guests}
                bedrooms={property.bedrooms}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
