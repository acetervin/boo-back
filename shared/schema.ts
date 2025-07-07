import { pgTable, text, serial, integer, boolean, decimal, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  price_per_night: decimal("price_per_night", { precision: 10, scale: 2 }).notNull(),
  max_guests: integer("max_guests").notNull(),
  bedrooms: integer("bedrooms").notNull(),
  image_url: text("image_url").notNull(),
  images: text("images").array(),
  categorized_images: jsonb("categorized_images").notNull().default([]),
  amenities: text("amenities").array().notNull(),
  featured: boolean("featured").default(false),
  category: text("category").notNull(), // 'diani', 'naivasha', 'nanyuki', 'nairobi', etc.
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").references(() => properties.id).notNull(),
  guestName: text("guest_name").notNull(),
  guestEmail: text("guest_email").notNull(),
  guestPhone: text("guest_phone").notNull(),
  checkIn: timestamp("check_in").notNull(),
  checkOut: timestamp("check_out").notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: text("payment_method").notNull(), // 'mpesa', 'paypal', 'cash'
  paymentStatus: text("payment_status").default("pending"), // 'pending', 'completed', 'failed'
  status: text("status").default("pending"), // 'pending', 'confirmed', 'cancelled'
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  propertyInterest: text("property_interest"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export type Property = typeof properties.$inferSelect & { categorized_images?: { category: string; images: string[] }[]; };
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
