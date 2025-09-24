import { type Express } from 'express';
import { createApp } from '../server/index.js';

// This file serves as the entry point for the Vercel serverless function.
// It creates the app instance on the first request and caches it for subsequent ones.
let cachedApp: Express;

export default async function handler(req: any, res: any) {
  try {
    if (!cachedApp) {
      console.log('Initializing server in Vercel environment');
      console.log('Database URL configured:', !!process.env.DATABASE_URL);
      console.log('Node ENV:', process.env.NODE_ENV);
      
      cachedApp = await createApp();
      console.log('Server initialized successfully');
    }
    return cachedApp(req, res);
  } catch (error) {
    console.error('Error in Vercel handler:', error);
    res.status(500).json({ 
      error: "Internal Server Error",
      message: "Failed to initialize server"
    });
  }
}
