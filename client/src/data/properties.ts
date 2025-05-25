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

// Experience section data for the gallery page
export interface Experience {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  feature: string;
  icon: string;
}

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Maasai Mara Safari",
    description: "Experience the Great Migration and witness the Big Five in their natural habitat.",
    imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    feature: "Wildlife Photography Tours",
    icon: "binoculars"
  },
  {
    id: 2,
    title: "Coastal Adventures",
    description: "Enjoy pristine beaches, dhow sailing, and world-class diving in the Indian Ocean.",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    feature: "Private Dhow Cruises",
    icon: "ship"
  }
];
