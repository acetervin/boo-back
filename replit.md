# Overview

This is a luxury property rental platform for Kenya, featuring premium apartments, villas, and houses across locations like Nairobi, Diani Beach, and other Kenyan destinations. The application allows users to browse properties, view detailed information with categorized image galleries, and make bookings with integrated payment processing via PayPal and M-Pesa.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui component library built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Styling**: Tailwind CSS with custom design tokens and dark/light theme support
- **Animations**: Framer Motion for smooth transitions and interactions

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **API Design**: RESTful API endpoints under `/api` prefix
- **File Structure**: Shared schema definitions between client and server for type safety

## Data Storage Solutions
- **Primary Database**: PostgreSQL (configured for Neon serverless)
- **Schema Management**: Drizzle Kit for migrations and schema synchronization
- **Connection**: PostgreSQL connection pool with SSL support for production
- **Tables**: Properties, bookings, contact messages, and property images with categorization

## Database Schema Design
- **Properties**: Core property information with JSON fields for amenities and categorized images
- **Bookings**: Guest reservations with payment tracking and status management
- **Contact Messages**: Customer inquiries and property interest tracking
- **Soft Deletes**: Implemented via `is_active` flags and `removed_at` timestamps

## Authentication and Authorization
- **Current State**: No authentication system implemented
- **Session Management**: Express session infrastructure prepared but not actively used
- **Security**: Basic request validation and error handling

## API Structure
- **Properties**: CRUD operations with category and featured filtering
- **Bookings**: Creation and management of property reservations
- **Contact**: Message submission and storage
- **Payment Integration**: Separate endpoints for PayPal and M-Pesa processing

# External Dependencies

## Payment Processing
- **PayPal**: Integrated via PayPal Server SDK for international payments
- **M-Pesa**: Placeholder implementation for local Kenyan mobile payments
- **Payment Flow**: Order creation, capture, and status tracking

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Environment Variables**: `DATABASE_URL` for connection string management

## UI and Design
- **Shadcn/ui**: Pre-built accessible component library
- **Radix UI**: Headless UI primitives for complex interactions
- **Tailwind CSS**: Utility-first CSS framework with custom theme configuration
- **Lucide React**: Icon library for consistent iconography

## Communication Services
- **WhatsApp Integration**: Direct messaging links for customer communication
- **Phone Integration**: Click-to-call functionality for mobile users

## Image Storage
- **Unsplash**: External image service for property photos and galleries
- **Categorized Images**: Organized by room type (Bedroom, Living Room, Garden, etc.)

## Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds
- **Cross-env**: Environment variable management across platforms