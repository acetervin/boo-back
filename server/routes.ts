import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertBookingSchema } from "@shared/schema";
// import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault } from "./paypal";
//import { loadMpesaSetup, createMpesaOrder, captureMpesaOrder } from "./mpesa";

export async function registerRoutes(app: Express): Promise<Server> {
  // Properties routes
  app.get("/api/properties", async (req, res) => {
    try {
      const category = req.query.category as string;
      const featured = req.query.featured as string;

      let properties;
      if (category) {
        properties = await storage.getPropertiesByCategory(category);
      } else if (featured === 'true') {
        properties = await storage.getFeaturedProperties();
      } else {
        properties = await storage.getProperties();
      }

      res.json(properties);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch properties" });
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

 {/*  Mpesa routes
  app.get("/api/mpesa/setup", async (req, res) => {
    await loadMpesaSetup(req, res);
  });

  app.post("/api/mpesa/order", async (req, res) => {
    await createMpesaOrder(req, res);
  });

  app.post("/api/mpesa/order/:orderID/capture", async (req, res) => {
    await captureMpesaOrder(req, res);
  });
*/}

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


  const httpServer = createServer(app);
  return httpServer;
}
