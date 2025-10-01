import { Home, Building2, Castle, MapPin, Palmtree, Waves } from "lucide-react";
import properties from './properties.json';
import propertyImages from './property-images.json';
import { Property } from '@shared/schema';

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

export function getProperties(category?: string, featured?: boolean): Property[] {
  let filteredProperties = properties.filter(p => p.is_active);

  if (category) {
    filteredProperties = filteredProperties.filter(p => p.category === category);
  }

  if (featured) {
    filteredProperties = filteredProperties.filter(p => p.featured);
  }

  return filteredProperties.map(p => ({
    ...p,
    categorized_images: propertyImages
      .filter(pi => pi.property_id === p.id)
      .reduce((acc, pi) => {
        const category = acc.find(c => c.category === pi.category);
        if (category) {
          category.images.push(pi.image_url);
        } else {
          acc.push({ category: pi.category, images: [pi.image_url] });
        }
        return acc;
      }, [] as { category: string; images: string[] }[]),
  }));
}

export function getProperty(id: number): Property | undefined {
  const property = properties.find(p => p.id === id);
  if (!property || !property.is_active) {
    return undefined;
  }

  return {
    ...property,
    categorized_images: propertyImages
      .filter(pi => pi.property_id === id)
      .reduce((acc, pi) => {
        const category = acc.find(c => c.category === pi.category);
        if (category) {
          category.images.push(pi.image_url);
        } else {
          acc.push({ category: pi.category, images: [pi.image_url] });
        }
        return acc;
      }, [] as { category: string; images: string[] }[]),
  };
}