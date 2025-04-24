# Hey Strangers App

A modern sports field booking and management platform built with Next.js and PayloadCMS.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/docs) (App Router)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) with [Tailwind CSS](https://tailwindcss.com/)
- **CMS & Backend**: [PayloadCMS](https://payloadcms.com/)
- **Database**: PostgreSQL (compatible with Supabase)
- **Storage**: S3-compatible storage (compatible with Supabase Storage)
- **Authentication**: Custom OTP-based authentication
- **Payments**: [Stripe](https://stripe.com/docs)
- **Package Manager**: [pnpm](https://pnpm.io/)

## Project Structure

The project follows a feature-driven architecture with the following main directories:

```
src/
├── app/              # Next.js app router pages and layouts
├── components/       # Reusable UI components
├── collections/      # PayloadCMS collections
├── domains/         # Business logic and domain-specific code
├── globals/         # PayloadCMS global configurations
├── lib/            # Utility functions and shared code
├── database/       # Database migrations and seeds
├── i18n/           # Internationalization
└── access/         # Access control and permissions
```

## Setup Instructions

1. **Prerequisites**
   - Node.js ^18.20.2 or >=20.9.0
   - pnpm 10.0.0
   - PostgreSQL database (or Supabase)
   - S3-compatible storage (or Supabase Storage)

2. **Environment Variables**
Copy `.env.example` to `.env` and fill in the required values:
- Database connection string (from Supabase or local postgres container)
- S3 storage credentials (from Supabase or local S3-compatible storage container)
- Stripe keys (get from Stripe dashboard)
- OTP configuration (use WhatsApp API key from facebook business dashboard)
- PayloadCMS secret (generate a random hash string)

3. **Installation**
```bash
pnpm install
```

4. **Database Setup**
- The project uses PayloadCMS with PostgreSQL
- Migrations are automatically run in development mode
- To run migrations manually:
```bash
pnpm payload migrate
```
- To seed the database:
```bash
pnpm seed
```
- For more information about migrations, see the [PayloadCMS Migration Documentation](https://payloadcms.com/docs/database/migrations)

5. **Development**
```bash
pnpm dev
```

6. **Production Build**

- Feel free to use Vercel or any other hosting service to deploy the application.
- Supabase is also a good option for database and storage hosting.

## Key Features

### PayloadCMS Integration

PayloadCMS serves as both the CMS and data layer for the application. This means that it runs alongside the Next.js application. Simply visit `/admin` to access the admin panel.
It manages:
- User authentication and authorization
- Content management (pages, sports, fields, etc.)
- Internationalization
- Media management
- Database migrations and seeding

### Media Storage

Media files are stored using an S3-compatible storage solution:
- Configured in `payload.config.ts`
- Supports image optimization with Sharp
- Compatible with Supabase Storage

### OTP Authentication

The application uses a custom OTP-based authentication system:
- One-time passwords for user verification sent via WhatsApp (or logged to console in development mode)
- Secure token management
- Session handling

### Stripe Integration

Stripe is integrated for payment processing:
- Payment processing for field bookings
- Subscription management
- Webhook handling for payment events

## TODOS

- [ ] Add more payment methods besides credit/debit card
- [ ] Navbar should be responsive (hamburger menu)
- [ ] `/pt` and `/en` routes are not working in production due to static generation (I think)
- [ ] Use IP address to get the user's location and show the closest city instead of the browser's Geolocation API
