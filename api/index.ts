import { type Express } from 'express';
import { createApp } from '../server/index';

// This file serves as the entry point for the Vercel serverless function.
// It creates the app instance on the first request and caches it for subsequent ones.
let cachedApp: Express;

export default async function handler(req: any, res: any) {
  try {
    // Don't cache the app in production/Vercel environment
    if (process.env.NODE_ENV === 'production') {
      const app = await createApp();
      return app(req, res);
    } else {
      // Cache only in development
      if (!cachedApp) {
        console.log('Initializing server in development environment');
        console.log('Database URL configured:', !!process.env.DATABASE_URL);
        console.log('Node ENV:', process.env.NODE_ENV);
        
        cachedApp = await createApp();
        console.log('Server initialized successfully');
      }
      return cachedApp(req, res);
    }
  } catch (error: unknown) {
    console.error('Error in Vercel handler:', error);
    // Ensure we always send a response even if there's an error
    res.status(500).json({
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' ? 
        error instanceof Error ? error.message : String(error) : 
        undefined
    });
    res.status(500).json({ 
      error: "Internal Server Error",
      message: "Failed to initialize server"
    });
  }
}
