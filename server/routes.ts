import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { insertContactMessageSchema, insertBookingSchema } from "../shared/schema.js";
// import { createPaypalOrder, capturePaypalOrder } from "./paypal";
//import { loadMpesaSetup, createMpesaOrder, captureMpesaOrder } from "./mpesa";

export async function registerRoutes(app: Express): Promise<void> {
  // Properties routes
  app.get("/api/properties", async (req, res) => {
    try {
      console.log('Fetching properties with query:', req.query);
      
      const category = req.query.category as string;
      const featured = req.query.featured as string;

      let properties;
      if (category) {
        console.log('Fetching properties by category:', category);
        properties = await storage.getPropertiesByCategory(category);
      } else if (featured === 'true') {
        console.log('Fetching featured properties');
        properties = await storage.getFeaturedProperties();
      } else {
        console.log('Fetching all properties');
        properties = await storage.getProperties();
      }

      console.log(`Successfully retrieved ${properties?.length || 0} properties`);
      res.json(properties);
    } catch (error: any) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ 
        error: "Failed to fetch properties",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        code: error.code // Include database error codes if available
      });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const property = await storage.getProperty(id);
      
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }

      res.json(property);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch property" });
    }
  });

  // Bookings routes
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.json(booking);
    } catch (error) {
      res.status(400).json({ error: "Invalid booking data" });
    }
  });

  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const booking = await storage.getBooking(id);
      
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }

      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch booking" });
    }
  });

  app.patch("/api/bookings/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      const booking = await storage.updateBookingStatus(id, status);
      
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }

      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: "Failed to update booking status" });
    }
  });

  // Contact messages routes
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid contact data" });
    }
  });

  // PayPal routes (placeholder for now)
  app.post("/api/paypal/order", async (req, res) => {
    res.json({ success: false, error: "PayPal integration coming soon" });
  });

  app.post("/api/paypal/order/:orderID/capture", async (req, res) => {
    res.json({ success: false, error: "PayPal integration coming soon" });
  });

  // M-Pesa routes (placeholder for now)
  app.post("/api/mpesa/order", async (req, res) => {
    res.json({ success: false, error: "M-Pesa integration coming soon" });
  });

  app.get("/api/mpesa/status/:transactionId", async (req, res) => {
    res.json({ status: "pending" });
  });

  // WhatsApp booking helper
  app.post("/api/whatsapp-booking", async (req, res) => {
    try {
      const { propertyName, guestName, checkIn, checkOut, guests } = req.body;
      
      const message = `Hi! I'm interested in booking *${propertyName}*%0A%0AGuest Name: ${guestName}%0ACheck-in: ${checkIn}%0ACheck-out: ${checkOut}%0ANumber of Guests: ${guests}%0A%0APlease let me know the availability and total cost.`;
      
      const whatsappUrl = `https://wa.me/254700000000?text=${message}`;
      
      res.json({ whatsappUrl });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate WhatsApp booking link" });
    }
  });


  // No need to create HTTP server in serverless environment
  return;
}
