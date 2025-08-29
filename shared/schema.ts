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
  main_image_url: text("main_image_url"),
  gallery_image_url: text("gallery_image_url"),
  images: text("images").array(),
  categorized_images: jsonb("categorized_images").notNull().default([]),
  amenities: text("amenities").array().notNull(),
  featured: boolean("featured").default(false),
  category: text("category").notNull(), // 'diani', 'naivasha', 'nanyuki', 'nairobi', etc.
  is_active: boolean("is_active").notNull().default(true),
  removed_at: timestamp("removed_at"),
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
  currency: text("currency").notNull().default("KES"), // 'KES', 'USD'
  paymentMethod: text("payment_method").notNull(), // 'mpesa', 'paypal', 'cash'
  paymentStatus: text("payment_status").default("pending"), // 'pending', 'completed', 'failed'
  paymentIntentId: text("payment_intent_id"), // PayPal order ID or M-Pesa transaction ID
  status: text("status").default("pending"), // 'pending', 'confirmed', 'cancelled'
  source: text("source").default("direct"), // 'direct', 'booking.com', 'airbnb'
  externalBookingId: text("external_booking_id"), // ID from external platforms
  notes: text("notes"), // Internal notes
  guestCount: integer("guest_count").notNull(),
  adults: integer("adults").notNull(),
  children: integer("children").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  is_active: boolean("is_active").notNull().default(true),
  removed_at: timestamp("removed_at"),
});

// Calendar sync table for external booking platforms
export const calendarSync = pgTable("calendar_sync", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").references(() => properties.id).notNull(),
  platform: text("platform").notNull(), // 'booking.com', 'airbnb', 'manual'
  externalCalendarUrl: text("external_calendar_url"), // iCal URL for sync
  lastSyncAt: timestamp("last_sync_at"),
  syncStatus: text("sync_status").default("pending"), // 'pending', 'success', 'failed'
  syncErrors: text("sync_errors"), // Error messages if sync fails
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Blocked dates for properties (from external calendars or manual entry)
export const blockedDates = pgTable("blocked_dates", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").references(() => properties.id).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  reason: text("reason").notNull(), // 'booking', 'maintenance', 'personal_use', 'external_booking'
  source: text("source").default("manual"), // 'manual', 'booking.com', 'airbnb', 'direct_booking'
  externalId: text("external_id"), // External booking ID if from sync
  createdAt: timestamp("created_at").defaultNow(),
  isActive: boolean("is_active").notNull().default(true),
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
  is_active: boolean("is_active").notNull().default(true),
  removed_at: timestamp("removed_at"),
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

export const insertCalendarSyncSchema = createInsertSchema(calendarSync).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBlockedDateSchema = createInsertSchema(blockedDates).omit({
  id: true,
  createdAt: true,
});

export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type CalendarSync = typeof calendarSync.$inferSelect;
export type InsertCalendarSync = z.infer<typeof insertCalendarSyncSchema>;
export type BlockedDate = typeof blockedDates.$inferSelect;
export type InsertBlockedDate = z.infer<typeof insertBlockedDateSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
