import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import PropertySkeleton from "@/components/ui/PropertySkeleton";
import { ChevronRight, Building2, Home as HomeIcon, Castle } from "lucide-react";
import { motion } from "framer-motion";
import type { Property } from "@shared/schema";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Home() {
  const { data: apartments, isLoading: apartmentsLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties", { category: "apartments" }],
    queryFn: () => fetch("/api/properties?category=apartments").then(res => res.json()),
  });

  const { data: villas, isLoading: villasLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties", { category: "villas" }],
    queryFn: () => fetch("/api/properties?category=villas").then(res => res.json()),
  });

  const { data: houses, isLoading: housesLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties", { category: "houses" }],
    queryFn: () => fetch("/api/properties?category=houses").then(res => res.json()),
  });

  const isInitialLoading = apartmentsLoading && villasLoading && housesLoading;

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          <div className="h-screen bg-muted/50" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {[1, 2, 3].map(i => (
              <div key={i} className="mb-16">
                <div className="h-8 bg-muted/50 w-1/4 mb-8 rounded" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map(j => (
                    <PropertySkeleton key={j} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1577393165327-137dce103a76?q=80&w=1920"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1582610116397-edb318620f90?q=80&w=1920";
            }}
            alt="Luxury villa in Kenya"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-foreground mb-6"
          >
            Experience Luxury Living in Kenya
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Discover our handpicked collection of luxury villas, apartments, and houses across Kenya's most stunning locations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/properties">
              <Button size="lg" className="min-w-[200px]">
                Browse Properties
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="min-w-[200px]">
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center text-muted-foreground">
            <span className="text-sm mb-2">Scroll to explore</span>
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <ChevronRight className="h-6 w-6 rotate-90" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Featured Properties Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Apartments Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center">
              <Building2 className="mr-2 h-6 w-6 text-primary" />
              Luxury Apartments
            </h2>
            <Link href="/properties?category=apartments">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                View All
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apartments && apartments.length > 0 ? (
              apartments.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="col-span-3 text-center text-muted-foreground py-8">
                No apartments available at the moment.
              </div>
            )}
          </div>
        </section>

        {/* Villas Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center">
              <Castle className="mr-2 h-6 w-6 text-primary" />
              Exclusive Villas
            </h2>
            <Link href="/properties?category=villas">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                View All
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {villas && villas.length > 0 ? (
              villas.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="col-span-3 text-center text-muted-foreground py-8">
                No villas available at the moment.
              </div>
            )}
          </div>
        </section>

        {/* Houses Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center">
              <HomeIcon className="mr-2 h-6 w-6 text-primary" />
              Premium Houses
            </h2>
            <Link href="/properties?category=houses">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                View All
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {houses && houses.length > 0 ? (
              houses.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="col-span-3 text-center text-muted-foreground py-8">
                No houses available at the moment.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
