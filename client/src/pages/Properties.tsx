import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import PropertySkeleton from "@/components/ui/PropertySkeleton";
import { propertyCategories } from "@/data/properties";
import type { Property } from "@shared/schema";
import { useTheme } from "@/hooks/use-theme";
import { motion } from "framer-motion";

export default function Properties() {
  const [location] = useLocation();
  const { theme } = useTheme();
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const initialCategory = urlParams.get('category') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: selectedCategory === 'all' 
      ? ["/api/properties"] 
      : ["/api/properties", { category: selectedCategory }],
    queryFn: () => {
      const url = selectedCategory === 'all' 
        ? "/api/properties" 
        : `/api/properties?category=${selectedCategory}`;
      return fetch(url).then(res => res.json());
    },
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Update URL without navigation
    const newUrl = category === 'all' ? '/properties' : `/properties?category=${category}`;
    window.history.pushState({}, '', newUrl);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen py-20 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-space-grotesk text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Premium Properties
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            From modern Nairobi apartments to coastal villas, discover luxury accommodations across Kenya
          </p>
        </div>

        {/* Property Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {propertyCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="rounded-full"
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.icon && (
                <category.icon className="h-4 w-4 mr-2" />
              )}
              {category.name}
            </Button>
          ))}
        </div>

        {/* Properties Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <PropertySkeleton key={i} />
            ))}
          </div>
        ) : properties?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">No properties found in this category.</p>
            <Button variant="outline" onClick={() => handleCategoryChange('all')}>
              View All Properties
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties?.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
