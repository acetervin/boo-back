import 'dotenv/config';
import express, { type Express, type Request, Response, NextFunction } from "express";
import { serveStatic, log } from "./vite.js";

// This function creates and configures the Express app.
// It's async to allow for async setup tasks like registering routes.
export async function createApp(): Promise<Express> {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use((req, res, next) => {
        const start = Date.now();
        const path = req.path;
        let capturedJsonResponse: Record<string, any> | undefined = undefined;

        const originalResJson = res.json;
        res.json = function (bodyJson, ...args) {
            capturedJsonResponse = bodyJson;
            return originalResJson.apply(res, [bodyJson, ...args]);
        };

        res.on("finish", () => {
            const duration = Date.now() - start;
            if (path.startsWith("/api")) {
                let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
                if (capturedJsonResponse) {
                    logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
                }

                if (logLine.length > 80) {
                    logLine = logLine.slice(0, 79) + "…";
                }

                log(logLine);
            }
        });

        next();
    });

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
        const status = err.status || err.statusCode || 500;
        const message = err.message || "Internal Server Error";

        res.status(status).json({ message });
    });

    // For Vercel deployment, we serve the static frontend files.
    // Only serve static in development or if dist exists (not in serverless)
    if (process.env.NODE_ENV !== 'production') {
        serveStatic(app);
    }

    return app;
}
