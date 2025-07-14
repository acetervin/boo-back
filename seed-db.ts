// Sample categorized images for demo properties
const propertyImages = [
  { property_name: "Westlands Executive Apartment", category: "Bedroom", image_url: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80" },
  { property_name: "Westlands Executive Apartment", category: "Bedroom", image_url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
  { property_name: "Westlands Executive Apartment", category: "Living Room", image_url: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" },
  { property_name: "Karen Heights Apartment", category: "Bedroom", image_url: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80" },
  { property_name: "Karen Heights Apartment", category: "Garden", image_url: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" }
];
import * as dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  idleTimeoutMillis: 30000 // 30 seconds
});

const properties: Array<{
  id?: number;
  name: string;
  description: string;
  location: string;
  price_per_night: number;
  max_guests: number;
  bedrooms: number;
  image_url: string;
  images: string[];
  amenities: string[];
  featured: boolean;
  category: string;
  categorized_images?: any[];
}> = [
  {
    name: "Westlands Executive Apartment",
    description: "Modern luxury apartment in Westlands with premium finishes, rooftop terrace, and stunning city views. Perfect for business travelers and urban stays.",
    location: "Westlands, Nairobi",
    price_per_night: 8500.00,
    max_guests: 4,
    bedrooms: 2,
    image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    amenities: ["Wi-Fi", "Gym Access", "Parking", "City View", "Kitchen", "24/7 Security"],
    featured: true,
    category: "apartments",
    // removed categorized_images
  },
  {
    name: "Karen Heights Apartment",
    description: "Elegant apartment in upscale Karen with garden views, modern furnishings, and access to exclusive amenities.",
    location: "Karen, Nairobi",
    price_per_night: 12000.00,
    max_guests: 6,
    bedrooms: 3,
    image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    amenities: ["Wi-Fi", "Garden View", "Balcony", "Kitchen", "Security", "Parking"],
    featured: true,
    category: "apartments",
    // removed categorized_images
  },
  {
    name: "Ocean Paradise Villa",
    description: "Stunning beachfront villa with infinity pool overlooking the Indian Ocean at Diani Beach. Perfect for families and groups seeking luxury by the sea.",
    location: "Diani Beach, Kwale",
    price_per_night: 25000.00,
    max_guests: 8,
    bedrooms: 4,
    image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    amenities: ["Private Beach", "Infinity Pool", "Ocean View", "Wi-Fi", "AC", "Private Chef"],
    featured: true,
    category: "villas",
    // removed categorized_images
  },
  {
    name: "Kilifi Creek Villa",
    description: "Elegant villa overlooking Kilifi Creek with traditional Swahili architecture and modern luxury amenities.",
    location: "Kilifi, Coast Province",
    price_per_night: 18000.00,
    max_guests: 6,
    bedrooms: 3,    image_url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    amenities: ["Creek View", "Traditional Design", "Pool", "Wi-Fi", "Spacious Terrace", "Dhow Trips"],
    featured: false,
    category: "villas",
    // removed categorized_images
  },
  {
    name: "Lavington Family House",
    description: "Spacious family house in quiet Lavington neighborhood, perfect for long-term stays and large families.",
    location: "Lavington, Nairobi",
    price_per_night: 15000.00,
    max_guests: 10,
    bedrooms: 5,    image_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1564013434775-f71db0030976?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1564013442641-f49f7e2f750b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1564013549179-8a71f5eae137?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    amenities: ["Large Garden", "Family Room", "Wi-Fi", "Kitchen", "Parking", "Security"],
    featured: true,
    category: "houses",
    // removed categorized_images
  },
  {
    name: "Runda Contemporary House",
    description: "Modern house in prestigious Runda estate with beautiful landscaping and premium finishes.",
    location: "Runda, Nairobi",
    price_per_night: 20000.00,
    max_guests: 8,
    bedrooms: 4,    image_url: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    images: [
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1505843555519-42609742c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1505843476565-c1540fb34b5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1505843492508-1d9c22793c1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    amenities: ["Modern Design", "Garden", "Wi-Fi", "Study Room", "Parking", "Gated Community"],
    featured: false,
    category: "houses",
    // removed categorized_images
  },
  {
    name: "Karen Gardens Apartment",
    description: "Elegant two-bedroom apartment in the prestigious Karen area with lush garden views, modern amenities, and easy access to shopping centers.",
    location: "Karen, Nairobi",
    price_per_night: 7500.00,
    max_guests: 4,
    bedrooms: 2,
    image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    amenities: ["Wi-Fi", "Garden View", "Parking", "AC", "Kitchen", "Shopping Nearby"],
    featured: true,
    category: "apartments",
    // removed categorized_images
  },
  {
    name: "Kilifi Creek Apartment",
    description: "Contemporary beachside apartment with ocean views and modern design. Perfect for couples and small families seeking coastal luxury.",
    location: "Kilifi Creek, Kilifi",
    price_per_night: 9500.00,
    max_guests: 3,
    bedrooms: 1,    image_url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    amenities: ["Wi-Fi", "Ocean View", "Beach Access", "AC", "Kitchen", "Balcony"],
    featured: false,
    category: "villas",
    // removed categorized_images
  },
  {
    name: "Naivasha Lakeside Retreat",
    description: "Serene lakeside villa with mountain views at Lake Naivasha. Ideal for relaxation and water activities with boat dock access.",
    location: "Lake Naivasha, Nakuru",
    price_per_night: 12500.00,
    max_guests: 8,
    bedrooms: 4,
    image_url: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    images: [
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1505692433770-36f19f51681d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    amenities: ["Wi-Fi", "Fishing", "Game Drives", "Boat Dock", "Kitchen", "Fireplace"],
    featured: false,
    category: "houses",
    // removed categorized_images
  },
  {
    name: "Mount Kenya View Lodge",
    description: "Rustic mountain lodge with breathtaking views of Mount Kenya. Perfect for adventure seekers and nature lovers.",
    location: "Nanyuki, Laikipia",
    price_per_night: 18000.00,
    max_guests: 10,
    bedrooms: 5,
    image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1517320964276-a002fa203177?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    amenities: ["Wi-Fi", "Fireplace", "Safari", "Mountain View", "Kitchen", "Hiking"],
    featured: false,
    category: "houses",
    // categorized_images removed; images are now seeded via property_images table
  },
  {
    name: "Runda Modern Apartment",
    description: "Sophisticated apartment in the upscale Runda neighborhood with contemporary design, premium amenities, and serene environment.",
    location: "Runda, Nairobi",
    price_per_night: 9000.00,
    max_guests: 5,
    bedrooms: 3,
    image_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    amenities: ["Wi-Fi", "Modern Design", "Parking", "AC", "Kitchen", "Quiet Area"],
    featured: false,
    category: "apartments",
    categorized_images: []
  },
  {
    name: "Amboseli Safari Villa",
    description: "Luxury safari lodge with stunning views of Mount Kilimanjaro and abundant wildlife viewing opportunities.",
    location: "Amboseli, Kajiado",
    price_per_night: 22000.00,
    max_guests: 12,
    bedrooms: 6,
    image_url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    images: [
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1490735891913-40897cdaafd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    amenities: ["Wi-Fi", "Game Drives", "All Meals", "Game View", "Kitchen", "Safari Guides"],
    featured: true,
    category: "houses",
    // categorized_images removed; images are now seeded via property_images table
  }
];

async function seed() {
  // Optional: Clear the table first
  await pool.query('DELETE FROM property_images');
  await pool.query('DELETE FROM properties');

  // Insert properties and build a map of name -> id
  const propertyIdMap = new Map();
  for (let i = 0; i < properties.length; i++) {
    const property = properties[i];
    const res = await pool.query(
      `INSERT INTO properties
        (name, description, location, price_per_night, max_guests, bedrooms, image_url, images, amenities, featured, category)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id`,
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
        property.category
      ]
    );
    property.id = res.rows[0].id;
    propertyIdMap.set(property.name, property.id);
  }

  // Seed categorized images using mapped IDs
  for (const img of propertyImages) {
    const property_id = propertyIdMap.get(img.property_name);
    if (property_id) {
      await pool.query(
        `INSERT INTO property_images (property_id, category, image_url) VALUES ($1, $2, $3)`,
        [property_id, img.category, img.image_url]
      );
    }
  }

  await pool.end();
  console.log("Database seeded!");
}

seed().catch(e => {
  console.error(e);
  pool.end();
});