import { Card, CardContent } from "@/components/ui/card";
import { experiences } from "@/data/properties";
import { Binoculars, Ship, Mountain, Users, Egg, Plane } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

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
  
  return (
    <div className="min-h-screen py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            Experiences & Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the incredible experiences waiting for you across Kenya's diverse landscapes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience) => {
            const Icon = iconMap[experience.icon];
            
            return (
              <Card 
                key={experience.id} 
                className="bg-card rounded-xl overflow-hidden group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative">
                  <img 
                    src={experience.imageUrl} 
                    alt={experience.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-semibold text-foreground mb-3">
                    {experience.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {experience.description}
                  </p>
                  <div className="flex items-center text-primary">
                    {Icon && <Icon className="h-4 w-4 mr-2" />}
                    <span className="font-medium">{experience.feature}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Gallery Section */}
        <div className="mt-32 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-16">
            Featured Properties
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {experiences.map((item) => (
              <div 
                key={item.id} 
                className="relative aspect-square group overflow-hidden rounded-lg"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-sm truncate">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
