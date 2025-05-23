import { Card, CardContent } from "@/components/ui/card";
import { experiences } from "@/data/properties";
import { Binoculars, Ship, Mountain, Users, Egg, Plane } from "lucide-react";

const iconMap: Record<string, any> = {
  binoculars: Binoculars,
  ship: Ship,
  mountain: Mountain,
  users: Users,
  dove: Egg,
  plane: Plane,
};

export default function Gallery() {
  return (
    <div className="min-h-screen py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-deep-navy mb-4">
            Experiences & Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the incredible experiences waiting for you across Kenya's diverse landscapes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience) => {
            const Icon = iconMap[experience.icon];
            
            return (
              <Card key={experience.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={experience.imageUrl} 
                  alt={experience.title}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-semibold text-deep-navy mb-3">
                    {experience.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {experience.description}
                  </p>
                  <div className="flex items-center text-terracotta">
                    {Icon && <Icon className="h-4 w-4 mr-2" />}
                    <span className="font-semibold">{experience.feature}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Featured Gallery Images */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-deep-navy mb-4">
              Kenya's Natural Beauty
            </h2>
            <p className="text-lg text-gray-600">
              A glimpse into the stunning landscapes and wildlife that make Kenya unique
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="col-span-1 md:col-span-2">
              <img 
                src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Safari lodge with Kilimanjaro views"
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600" 
                alt="Lions in Maasai Mara"
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600" 
                alt="Pristine Kenyan beach"
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400" 
                alt="Mount Kenya at sunrise"
                className="w-full h-32 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400" 
                alt="African elephants in Kenya"
                className="w-full h-32 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400" 
                alt="Hot air balloon over Maasai Mara"
                className="w-full h-32 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
