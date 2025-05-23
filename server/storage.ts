import { properties, bookings, contactMessages, type Property, type InsertProperty, type Booking, type InsertBooking, type ContactMessage, type InsertContactMessage } from "@shared/schema";

export interface IStorage {
  // Properties
  getProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  getPropertiesByCategory(category: string): Promise<Property[]>;
  getFeaturedProperties(): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;

  // Bookings
  getBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  getBookingsByProperty(propertyId: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;

  // Contact Messages
  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private properties: Map<number, Property>;
  private bookings: Map<number, Booking>;
  private contactMessages: Map<number, ContactMessage>;
  private currentPropertyId: number;
  private currentBookingId: number;
  private currentMessageId: number;

  constructor() {
    this.properties = new Map();
    this.bookings = new Map();
    this.contactMessages = new Map();
    this.currentPropertyId = 1;
    this.currentBookingId = 1;
    this.currentMessageId = 1;
    this.seedProperties();
  }

  private seedProperties() {
    const sampleProperties: Omit<Property, 'id'>[] = [
      {
        name: "Ocean Paradise Villa",
        description: "Stunning beachfront villa with infinity pool overlooking the Indian Ocean at Diani Beach. Perfect for families and groups seeking luxury by the sea.",
        location: "Diani Beach, Kwale",
        pricePerNight: "15000.00",
        maxGuests: 6,
        bedrooms: 3,
        imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        amenities: ["Wi-Fi", "Beach Access", "AC", "Pool", "Kitchen", "Parking"],
        featured: true,
        category: "diani"
      },
      {
        name: "Westlands Executive Apartment",
        description: "Modern luxury apartment in Westlands with premium finishes, rooftop terrace, and stunning city views. Perfect for business travelers and urban stays.",
        location: "Westlands, Nairobi",
        pricePerNight: "8500.00",
        maxGuests: 4,
        bedrooms: 2,
        imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        amenities: ["Wi-Fi", "Gym Access", "Parking", "City View", "Kitchen", "24/7 Security"],
        featured: true,
        category: "nairobi"
      },
      {
        name: "Karen Gardens Apartment",
        description: "Elegant two-bedroom apartment in the prestigious Karen area with lush garden views, modern amenities, and easy access to shopping centers.",
        location: "Karen, Nairobi",
        pricePerNight: "7500.00",
        maxGuests: 4,
        bedrooms: 2,
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        amenities: ["Wi-Fi", "Garden View", "Parking", "AC", "Kitchen", "Shopping Nearby"],
        featured: true,
        category: "nairobi"
      },
      {
        name: "Kilifi Creek Apartment",
        description: "Contemporary beachside apartment with ocean views and modern design. Perfect for couples and small families seeking coastal luxury.",
        location: "Kilifi Creek, Kilifi",
        pricePerNight: "9500.00",
        maxGuests: 3,
        bedrooms: 1,
        imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        amenities: ["Wi-Fi", "Ocean View", "Beach Access", "AC", "Kitchen", "Balcony"],
        featured: false,
        category: "kilifi"
      },
      {
        name: "Naivasha Lakeside Retreat",
        description: "Serene lakeside villa with mountain views at Lake Naivasha. Ideal for relaxation and water activities with boat dock access.",
        location: "Lake Naivasha, Nakuru",
        pricePerNight: "12500.00",
        maxGuests: 8,
        bedrooms: 4,
        imageUrl: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        amenities: ["Wi-Fi", "Fishing", "Game Drives", "Boat Dock", "Kitchen", "Fireplace"],
        featured: false,
        category: "naivasha"
      },
      {
        name: "Mount Kenya View Lodge",
        description: "Rustic mountain lodge with breathtaking views of Mount Kenya. Perfect for adventure seekers and nature lovers.",
        location: "Nanyuki, Laikipia",
        pricePerNight: "18000.00",
        maxGuests: 10,
        bedrooms: 5,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        amenities: ["Wi-Fi", "Fireplace", "Safari", "Mountain View", "Kitchen", "Hiking"],
        featured: false,
        category: "nanyuki"
      },
      {
        name: "Runda Modern Apartment",
        description: "Sophisticated apartment in the upscale Runda neighborhood with contemporary design, premium amenities, and serene environment.",
        location: "Runda, Nairobi",
        pricePerNight: "9000.00",
        maxGuests: 5,
        bedrooms: 3,
        imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        amenities: ["Wi-Fi", "Modern Design", "Parking", "AC", "Kitchen", "Quiet Area"],
        featured: false,
        category: "nairobi"
      },
      {
        name: "Amboseli Safari Villa",
        description: "Luxury safari lodge with stunning views of Mount Kilimanjaro and abundant wildlife viewing opportunities.",
        location: "Amboseli, Kajiado",
        pricePerNight: "22000.00",
        maxGuests: 12,
        bedrooms: 6,
        imageUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        amenities: ["Wi-Fi", "Game Drives", "All Meals", "Game View", "Kitchen", "Safari Guides"],
        featured: true,
        category: "amboseli"
      }
    ];

    sampleProperties.forEach(property => {
      const id = this.currentPropertyId++;
      this.properties.set(id, { ...property, id });
    });
  }

  // Properties
  async getProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getPropertiesByCategory(category: string): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      property => property.category === category
    );
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      property => property.featured
    );
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = this.currentPropertyId++;
    const property: Property = { ...insertProperty, id };
    this.properties.set(id, property);
    return property;
  }

  // Bookings
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getBookingsByProperty(propertyId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      booking => booking.propertyId === propertyId
    );
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const booking: Booking = { 
      ...insertBooking, 
      id,
      createdAt: new Date()
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (booking) {
      booking.status = status;
      this.bookings.set(id, booking);
      return booking;
    }
    return undefined;
  }

  // Contact Messages
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id,
      createdAt: new Date()
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
