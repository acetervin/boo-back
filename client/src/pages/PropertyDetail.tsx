import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Users, Bed, Wifi, Car, Coffee, Waves, Play, Star, Heart, Share2, ImageIcon, Video, ArrowLeft, ArrowRight, X } from "lucide-react";
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

  // Property-specific videos - generated based on property location and type
  const propertyVideos = property ? (() => {
    const videos = [];
    
    // Main property tour video (if available)
    if (property.main_image_url) {
      videos.push({
        id: 1,
        title: `${property.name} - Virtual Tour`,
        thumbnail: property.main_image_url,
        url: `https://www.youtube.com/embed/property_${property.id}_tour` // Dynamic URL based on property ID
      });
    }
    
    // Location-specific videos based on property location
    if (property.location.toLowerCase().includes('nairobi')) {
      videos.push({
        id: 2,
        title: "Discover Nairobi",
        thumbnail: property.image_url || property.main_image_url,
        url: `https://www.youtube.com/embed/nairobi_guide_${property.id}`
      });
    } else if (property.location.toLowerCase().includes('diani')) {
      videos.push({
        id: 2,
        title: "Diani Beach Experience",
        thumbnail: property.image_url || property.main_image_url,
        url: `https://www.youtube.com/embed/diani_beach_${property.id}`
      });
    } else if (property.location.toLowerCase().includes('naivasha')) {
      videos.push({
        id: 2,
        title: "Lake Naivasha Adventures",
        thumbnail: property.image_url || property.main_image_url,
        url: `https://www.youtube.com/embed/naivasha_lake_${property.id}`
      });
    } else {
      videos.push({
        id: 2,
        title: `Explore ${property.location}`,
        thumbnail: property.image_url || property.main_image_url,
        url: `https://www.youtube.com/embed/location_${property.id}_guide`
      });
    }
    
    return videos;
  })() : [];

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
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        
        
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
          <div className="space-y-6">
            {/* Enhanced Property Overview */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">About this luxury property</CardTitle>
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

            {/* Mobile Property Highlights & Booking - Only show on small screens */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="lg:hidden"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Property Details & Booking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Property Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Users className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <div className="font-semibold">{property.max_guests}</div>
                      <div className="text-sm text-muted-foreground">Guests</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Bed className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <div className="font-semibold">{property.bedrooms}</div>
                      <div className="text-sm text-muted-foreground">Bedrooms</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold text-primary">
                        {new Intl.NumberFormat('en-KE', {
                          style: 'currency',
                          currency: 'KES',
                          minimumFractionDigits: 0
                        }).format(Number(property.price_per_night))}
                      </div>
                      <div className="text-xs text-muted-foreground">per night</div>
                    </div>
                  </div>
                  
                  {/* Booking Button */}
                  <Button 
                    onClick={() => window.location.href = `/booking/${property.id}`} 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Proceed to Booking
                  </Button>
                  
                  {/* Contact Info */}
                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    <a
                      href="tel:+254700000000"
                      className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      +254 700 000 000
                    </a>
                    <a
                      href="mailto:info@kenyaluxuryvillas.com"
                      className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      info@kenyaluxuryvillas.com
                    </a>
                  </div>
                  
                  <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <div className="w-4 h-4 bg-primary/20 rounded-full mt-0.5 flex-shrink-0" />
                    <p>Book with confidence. All payments are secured and your data is protected.</p>
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
                  <CardTitle className="text-xl flex items-center">
                    <ImageIcon className="h-5 w-5 mr-2" />
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
                      {/* Enhanced CategoryGallery */}
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
                      
                      {/* Enhanced Image/Video Modal */}
                      {showVideoModal && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                          onClick={() => setShowVideoModal(false)}
                        >
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative max-w-5xl w-full"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {selectedVideoUrl ? (
                              // Video content
                              <div className="bg-black rounded-xl overflow-hidden">
                                <div className="aspect-video">
                                  <iframe
                                    src={selectedVideoUrl}
                                    className="w-full h-full"
                                    frameBorder="0"
                                    allowFullScreen
                                    title="Property Video"
                                  />
                                </div>
                              </div>
                            ) : (
                              // Image content with navigation
                              <div className="relative">
                                <div className="aspect-video bg-black rounded-xl overflow-hidden">
                                  <motion.img
                                    key={activeImageIndex}
                                    src={allImages[activeImageIndex]}
                                    alt={`${property.name} view ${activeImageIndex + 1}`}
                                    className="w-full h-full object-contain"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                  />
                                </div>
                                
                                {/* Navigation arrows */}
                                {allImages.length > 1 && (
                                  <>
                                    <Button
                                      variant="ghost"
                                      size="lg"
                                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3"
                                      onClick={() => setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)}
                                    >
                                      <ArrowLeft className="h-6 w-6" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="lg"
                                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3"
                                      onClick={() => setActiveImageIndex((prev) => (prev + 1) % allImages.length)}
                                    >
                                      <ArrowRight className="h-6 w-6" />
                                    </Button>
                                  </>
                                )}
                                
                                {/* Image counter */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md rounded-full px-3 py-1">
                                  <span className="text-white text-sm font-medium">
                                    {activeImageIndex + 1} / {allImages.length}
                                  </span>
                                </div>
                              </div>
                            )}
                            
                            {/* Close button */}
                            <Button
                              variant="ghost"
                              size="lg"
                              className="absolute -top-12 right-0 text-white hover:bg-white/20 rounded-full p-2"
                              onClick={() => setShowVideoModal(false)}
                            >
                              <X className="h-6 w-6" />
                            </Button>
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
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Luxury Amenities & Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => {
                      const Icon = iconMap[amenity] || null;
                      return (
                        <motion.div 
                          key={amenity}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="flex items-center p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          {typeof Icon === 'string' ? (
                            <span className="mr-2 text-lg">{Icon}</span>
                          ) : Icon ? (
                            <Icon className="h-4 w-4 mr-2 text-primary" />
                          ) : (
                            <div className="w-4 h-4 mr-2 bg-primary/20 rounded-full" />
                          )}
                          <span className="font-medium text-sm text-foreground">{amenity}</span>
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
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
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

          {/* Desktop Booking Form Sidebar - Only show on large screens */}
          <div className="hidden lg:block lg:col-span-2">
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
