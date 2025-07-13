import { Card, CardContent } from "@/components/ui/card";
import { experiences } from "@/data/properties";
import { Binoculars, Ship, Mountain, Users, Egg, Plane } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import Masonry from "react-masonry-css";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useState, useEffect } from "react";

const iconMap: Record<string, any> = {
  binoculars: Binoculars,
  ship: Ship,
  mountain: Mountain,
  users: Users,
  dove: Egg,
  plane: Plane,
};

export default function Gallery() {
  const { theme } = useTheme();
  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  // Fetch all properties
  const { data: properties, isLoading } = useQuery({
    queryKey: ["/api/properties"],
    queryFn: async () => {
      const res = await fetch("/api/properties");
      if (!res.ok) throw new Error("Failed to fetch properties");
      return res.json();
    },
    refetchOnWindowFocus: false,
  });

  // Store selected images in state so they don't change on theme toggle
  const [masonryImages, setMasonryImages] = useState<{ url: string; title: string }[]>([]);

  useEffect(() => {
    if (properties && Array.isArray(properties) && masonryImages.length === 0) {
      let allImages: { url: string; title: string }[] = [];
      properties.forEach((prop: any) => {
        if (prop.image_url) allImages.push({ url: prop.image_url, title: prop.name });
        if (Array.isArray(prop.images)) {
          prop.images.forEach((img: string, idx: number) => {
            allImages.push({ url: img, title: `${prop.name} #${idx + 1}` });
          });
        }
      });
      // Shuffle and pick 30 random images
      const shuffled = allImages.slice().sort(() => 0.5 - Math.random());
      setMasonryImages(shuffled.slice(0, 30));
    }
  }, [properties]);

  return (
    <div
      className="min-h-screen py-20 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Masonry Gallery */}
        {isLoading ? (
          <div className="text-muted-foreground">Loading images...</div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex gap-6"
            columnClassName="masonry-column"
          >
            {masonryImages.map((img: { url: string; title: string }, i: number) => (
              <div
                key={i}
                className="mb-6 rounded-xl overflow-hidden bg-card shadow-lg group transform transition duration-700 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full object-cover h-64 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="p-2 text-center">
                  <span className="text-xs text-muted-foreground">{img.title}</span>
                </div>
              </div>
            ))}
          </Masonry>
        )}
      </div>
    </div>
  );
}
