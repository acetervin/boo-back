import { Card, CardContent } from "@/components/ui/card";
import { experiences } from "@/data/properties";
import { Binoculars, Ship, Mountain, Users, Egg, Plane } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import Masonry from "react-masonry-css";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

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

  // Collect all images from properties
  let allImages: { url: string; title: string }[] = [];
  if (properties && Array.isArray(properties)) {
    properties.forEach((prop: any) => {
      if (prop.image_url) allImages.push({ url: prop.image_url, title: prop.name });
      if (Array.isArray(prop.images)) {
        prop.images.forEach((img: string, idx: number) => {
          allImages.push({ url: img, title: `${prop.name} #${idx + 1}` });
        });
      }
    });
  }
  // Shuffle and pick 30 random images
  function getRandomImages(arr: { url: string; title: string }[], n: number) {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }
  const masonryImages = getRandomImages(allImages, 30);

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
            {masonryImages.map((img, i) => (
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
