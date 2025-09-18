import { type Express } from 'express';
import { createApp } from '../server/index.js';

// This file serves as the entry point for the Vercel serverless function.
// It creates the app instance on the first request and caches it for subsequent ones.
let cachedApp: Express;

export default async function handler(req: any, res: any) {
  if (!cachedApp) {
    cachedApp = await createApp();
  }
  return cachedApp(req, res);
}
