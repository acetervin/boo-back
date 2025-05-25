# Luxury Kenya Stays

A modern web application for booking luxury accommodations across Kenya, built with React, TypeScript, and PostgreSQL.

## Features

- 🏠 Browse luxury properties across Kenya
- 🔍 Filter by location and property type
- 📸 Image galleries for each property
- 💳 Secure payment integration with PayPal
- 📱 Fully responsive design
- 🌓 Light/Dark mode support
- 📍 Location-based search
- 💬 Direct WhatsApp contact

## Tech Stack

- **Frontend:**
  - React with TypeScript
  - Tailwind CSS for styling
  - shadcn/ui components
  - React Query for data fetching
  - Framer Motion for animations

- **Backend:**
  - Node.js with TypeScript
  - PostgreSQL database
  - Drizzle ORM
  - Express.js

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/acetervin/Booking-web.git
   cd Booking-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your configuration:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `PAYPAL_CLIENT_ID`: Your PayPal client ID
   - `PAYPAL_CLIENT_SECRET`: Your PayPal secret key
   - `PORT`: Server port (default: 3000)

4. **Run database migrations**
   ```bash
   npm run migrate
   ```

5. **Seed the database**
   ```bash
   npm run seed
   ```

6. **Start the development server**
   ```bash
   # Start backend server
   npm run dev:server

   # In a new terminal, start frontend
   npm run dev:client
   ```

7. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## Project Structure

- `/client` - Frontend React application
  - `/src/components` - Reusable UI components
  - `/src/pages` - Page components
  - `/src/data` - Static data and types
  - `/src/hooks` - Custom React hooks
  - `/src/lib` - Utility functions

- `/server` - Backend Node.js application
  - `index.ts` - Server entry point
  - `routes.ts` - API route definitions
  - `storage.ts` - Database operations
  - `paypal.ts` - PayPal integration

- `/shared` - Shared TypeScript types and schemas
- `/migrations` - Database migration files

## Available Scripts

- `npm run dev:client` - Start frontend development server
- `npm run dev:server` - Start backend development server
- `npm run build` - Build for production
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed the database with initial data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
