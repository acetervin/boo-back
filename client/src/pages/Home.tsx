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
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80')`
          }}
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4 max-w-5xl mx-auto">
            <h1 className="font-space-grotesk text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Luxury Stays in 
              <span className="block text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text">
                Modern Kenya
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto font-inter opacity-90 leading-relaxed">
              From contemporary Nairobi apartments to beachfront villas, discover premium accommodations that blend modern luxury with authentic Kenyan hospitality
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/properties">
                <Button size="lg" className="bg-white text-slate-950 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105">
                  Explore Properties
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-space-grotesk text-3xl md:text-4xl lg:text-5xl font-bold text-slate-950 mb-6">
              Featured Properties
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Handpicked luxury accommodations from bustling city centers to serene coastal retreats
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-96 animate-pulse shadow-sm" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties?.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Link href="/properties">
              <Button size="lg" className="bg-slate-950 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                View All Properties
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-space-grotesk text-3xl md:text-4xl lg:text-5xl font-bold text-slate-950 mb-6">
              Why Choose Kenya Stays
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Premium accommodations with modern amenities and exceptional service across Kenya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50 hover:shadow-lg transition-all duration-300">
              <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">50+</span>
              </div>
              <h3 className="font-space-grotesk text-xl font-semibold text-slate-950 mb-3">Premium Properties</h3>
              <p className="text-slate-600">Modern villas and luxury apartments</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-blue-50 hover:shadow-lg transition-all duration-300">
              <div className="bg-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">5K+</span>
              </div>
              <h3 className="font-space-grotesk text-xl font-semibold text-slate-950 mb-3">Happy Guests</h3>
              <p className="text-slate-600">Satisfied customers worldwide</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-lg transition-all duration-300">
              <div className="bg-amber-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">10+</span>
              </div>
              <h3 className="font-space-grotesk text-xl font-semibold text-slate-950 mb-3">Years Experience</h3>
              <p className="text-slate-600">Trusted hospitality expertise</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-all duration-300">
              <div className="bg-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">24/7</span>
              </div>
              <h3 className="font-space-grotesk text-xl font-semibold text-slate-950 mb-3">Guest Support</h3>
              <p className="text-slate-600">Always here to help you</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
