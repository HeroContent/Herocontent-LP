# HeroContent Landing Page - Documentation

Welcome to the HeroContent landing page documentation. This repository contains comprehensive documentation for both technical implementation and product features.

## Documentation Index

- **[Technical Documentation](./TECHNICAL.md)** - Architecture, setup, development guide
- **[Product Documentation](./PRODUCT.md)** - Features, user flows, business logic
- **[Google Analytics Documentation](./GOOGLE_ANALYTICS.md)** - GA4 implementation and event tracking
- **[PostHog AWS Deployment](./POSTHOG_AWS.md)** - PostHog implementation and AWS deployment guide

## Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)
- Git

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-0MPZSF8FDF
NEXT_PUBLIC_USER_APP_URL=http://localhost:3001
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key (optional)
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com (optional)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

## Project Overview

HeroContent is a Next.js-based landing page for a social media management service targeting restaurants in the Czech Republic. The website includes:

- **Main Page** (`/`) - Full-featured landing page with services, pricing, and client showcase
- **Landing Page** (`/landing`) - Simplified landing page focused on lead generation
- **Registration Page** (`/registration`) - Free trial registration form
- **Additional Pages** - Blog, career, company info, app screenshots

## Key Features

- ✅ Responsive design (mobile-first)
- ✅ Google Analytics 4 integration
- ✅ PostHog analytics integration
- ✅ Contact form with Telegram notifications
- ✅ Client showcase with image galleries
- ✅ Dynamic pricing display
- ✅ SEO optimized
- ✅ Dark mode support (via theme provider)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + shadcn/ui
- **Analytics:** Google Analytics 4
- **Deployment:** Vercel (recommended)

## Contributing

See [Technical Documentation](./TECHNICAL.md) for development guidelines and code structure.

## Support

For questions or issues, refer to the specific documentation files or contact the development team.

# Jan 2026