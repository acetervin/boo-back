import { Home, Building2, Castle, MapPin, Palmtree, Waves } from "lucide-react";

// Property categories with icons for navigation and filtering
export const propertyCategories = [
  { id: 'all', name: 'All Properties', icon: Home },
  { id: 'apartments', name: 'Apartments', icon: Building2 },
  { id: 'villas', name: 'Villas', icon: Castle },
  { id: 'houses', name: 'House Rentals', icon: Home },
  { id: 'nairobi', name: 'Nairobi', icon: MapPin },
  { id: 'diani', name: 'Diani Beach', icon: Palmtree },
  { id: 'kilifi', name: 'Kilifi Coast', icon: Waves },
];


// Sample property data with categorized_images for gallery demo
export const properties = [
  {
    id: 1,
    name: "Westlands Executive Apartment",
    description: "Modern luxury apartment in Westlands with premium finishes, rooftop terrace, and stunning city views. Perfect for business travelers and urban stays.",
    location: "Westlands, Nairobi",
    price_per_night: 8500.00,
    max_guests: 4,
    bedrooms: 2,
    image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    amenities: ["Wi-Fi", "Gym Access", "Parking", "City View", "Kitchen", "24/7 Security"],
    featured: true,
    category: "apartments",
    categorized_images: [
      {
        category: "Bedroom",
        images: [
          "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
        ]
      },
      {
        category: "Living Room",
        images: [
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Ocean Paradise Villa",
    description: "Stunning beachfront villa with infinity pool overlooking the Indian Ocean at Diani Beach. Perfect for families and groups seeking luxury by the sea.",
    location: "Diani Beach, Kwale",
    price_per_night: 25000.00,
    max_guests: 8,
    bedrooms: 4,
    image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    amenities: ["Private Beach", "Infinity Pool", "Ocean View", "Wi-Fi", "AC", "Private Chef"],
    featured: true,
    category: "villas",
    categorized_images: [
      {
        category: "Pool",
        images: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
        ]
      },
      {
        category: "Beach",
        images: [
          "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80"
        ]
      }
    ]
  }
];
