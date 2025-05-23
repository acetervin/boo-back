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
    <div className="min-h-screen py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-space-grotesk text-3xl md:text-4xl lg:text-5xl font-bold text-slate-950 mb-6">
            Premium Properties
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            From modern Nairobi apartments to coastal villas, discover luxury accommodations across Kenya
          </p>
        </div>

        {/* Property Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {propertyCategories.map((category) => (
            <Button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-slate-950 text-white hover:bg-slate-800 scale-105"
                  : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200 hover:border-slate-300"
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
              <div key={i} className="bg-white rounded-2xl h-96 animate-pulse shadow-sm" />
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
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <h3 className="font-space-grotesk text-xl font-semibold text-slate-950 mb-2">
                    No properties found
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Try selecting a different category to see more options.
                  </p>
                  <Button
                    onClick={() => handleCategoryChange('all')}
                    className="bg-slate-950 hover:bg-slate-800 text-white rounded-full px-6"
                  >
                    View All Properties
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
