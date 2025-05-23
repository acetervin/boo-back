import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import { ChevronRight } from "lucide-react";
import type { Property } from "@shared/schema";

export default function Home() {
  const { data: featuredProperties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties?featured=true"],
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-gradient"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80')`
          }}
        />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6">
              Experience Luxury Stays in Kenya
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover breathtaking villas and apartments across Kenya's most stunning destinations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/properties">
                <Button size="lg" className="bg-terracotta hover:bg-orange-600 text-white px-8 py-4 text-lg">
                  View Villas
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-deep-navy mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most popular luxury villas and apartments
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties?.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/properties">
              <Button size="lg" className="bg-deep-navy hover:bg-blue-900 text-white">
                View All Properties
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-sandy-beige/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-deep-navy mb-4">
              Why Choose Kenya Luxury Villas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference with our premium service and exceptional properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-terracotta/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-terracotta">50+</span>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-deep-navy mb-2">Premium Properties</h3>
              <p className="text-gray-600">Carefully curated luxury accommodations</p>
            </div>

            <div className="text-center">
              <div className="bg-terracotta/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-terracotta">10K+</span>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-deep-navy mb-2">Happy Guests</h3>
              <p className="text-gray-600">Satisfied customers worldwide</p>
            </div>

            <div className="text-center">
              <div className="bg-terracotta/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-terracotta">15+</span>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-deep-navy mb-2">Years Experience</h3>
              <p className="text-gray-600">Expertise in luxury hospitality</p>
            </div>

            <div className="text-center">
              <div className="bg-terracotta/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-terracotta">24/7</span>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-deep-navy mb-2">Guest Support</h3>
              <p className="text-gray-600">Always here to assist you</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
