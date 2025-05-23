import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import { propertyCategories } from "@/data/properties";
import type { Property } from "@shared/schema";

export default function Properties() {
  const [location] = useLocation();
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
    <div className="min-h-screen py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-deep-navy mb-4">
            Our Premium Properties
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our carefully curated collection of luxury villas and apartments across Kenya's most desirable locations
          </p>
        </div>

        {/* Property Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {propertyCategories.map((category) => (
            <Button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`px-6 py-3 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? "bg-terracotta text-white hover:bg-orange-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Properties Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties?.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {properties?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                  No properties found for this category.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
