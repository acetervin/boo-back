import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure Neon for WebSocket support
neonConfig.webSocketConstructor = ws;

// Validate database URL
if (!process.env.DB_URL) {
  throw new Error("DB_URL must be set. Did you forget to provision a database?");
}

// Create pool with specific SSL and timeout settings for serverless yeenvironments
export const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false // Required for some hosting environments
  },
  connectionTimeoutMillis: 5000, // 5 second timeout
  max: 1, // Limit connections for serverless
  idleTimeoutMillis: 120000 // Close idle connections after 120 seconds
});

// Initialize Drizzle with the pool
export const db = drizzle({ client: pool, schema });

// Add connection error handling
pool.on('error', (err) => {
  console.error('Unexpected error on idle database client', err);
  process.exit(-1);
});
