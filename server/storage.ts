import pg, { Client as PgClient } from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Client } = pg;
import { type Property, type InsertProperty, type Booking, type InsertBooking, type ContactMessage, type InsertContactMessage, } from "@shared/schema";

export class PgStorage {
  private client: PgClient;

  constructor() {
    this.client = new Client({ connectionString: process.env.DATABASE_URL });
    this.client.connect();
  }

  // Properties
  async getProperties(): Promise<Property[]> {
    const res = await this.client.query("SELECT * FROM properties");
    return res.rows;
  }

  async getProperty(id: number): Promise<Property | undefined> {
    const res = await this.client.query("SELECT * FROM properties WHERE id = $1", [id]);
    return res.rows[0];
  }

  async getPropertiesByCategory(category: string): Promise<Property[]> {
    const res = await this.client.query("SELECT * FROM properties WHERE category = $1", [category]);
    return res.rows;
  }

  async getFeaturedProperties(): Promise<Property[]> {
    const res = await this.client.query("SELECT * FROM properties WHERE featured = true");
    return res.rows;
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const res = await this.client.query(
      `INSERT INTO properties 
        (name, description, location, price_per_night, max_guests, bedrooms, image_url, images, amenities, featured, category, categorized_images)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [
        property.name,
        property.description,
        property.location,
        property.price_per_night,
        property.max_guests,
        property.bedrooms,
        property.image_url,
        property.images || [],
        property.amenities,
        property.featured,
        property.category,
        property.categorized_images || []
      ]
    );
    return res.rows[0];
  }

  // Bookings
  async getBookings(): Promise<Booking[]> {
    const res = await this.client.query("SELECT * FROM bookings");
    return res.rows;
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    const res = await this.client.query("SELECT * FROM bookings WHERE id = $1", [id]);
    return res.rows[0];
  }

  async getBookingsByProperty(propertyId: number): Promise<Booking[]> {
    const res = await this.client.query("SELECT * FROM bookings WHERE property_id = $1", [propertyId]);
    return res.rows;
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const res = await this.client.query(
      `INSERT INTO bookings 
        (property_id, guest_name, guest_email, guest_phone, check_in, check_out, total_amount, payment_method, payment_status, status, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,NOW()) RETURNING *`,
      [
        booking.propertyId,
        booking.guestName,
        booking.guestEmail,
        booking.guestPhone,
        booking.checkIn,
        booking.checkOut,
        booking.totalAmount,
        booking.paymentMethod,
        booking.paymentStatus,
        booking.status
      ]
    );
    return res.rows[0];
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const res = await this.client.query(
      "UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    return res.rows[0];
  }

  // Contact Messages
  async getContactMessages(): Promise<ContactMessage[]> {
    const res = await this.client.query("SELECT * FROM contact_messages");
    return res.rows;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const res = await this.client.query(
      `INSERT INTO contact_messages 
        (first_name, last_name, email, phone, property_interest, message, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,NOW()) RETURNING *`,
      [
        message.firstName,
        message.lastName,
        message.email,
        message.phone,
        message.propertyInterest,
        message.message
      ]
    );
    return res.rows[0];
  }
}

// Export this instead of MemStorage:
export const storage = new PgStorage();