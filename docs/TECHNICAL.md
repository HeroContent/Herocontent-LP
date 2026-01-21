# Technical Documentation

## Architecture Overview

### Framework & Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Component library built on Radix UI

### Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   └── contact/       # Contact form API endpoint
│   ├── landing/           # Landing page
│   ├── registration/      # Registration page
│   ├── page.tsx           # Main page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   ├── analytics.tsx      # Google Analytics component
│   └── analytics-wrapper.tsx
├── lib/                   # Utility functions
│   ├── analytics.ts       # GA4 event tracking
│   └── utils.ts          # General utilities
├── public/                # Static assets
│   ├── images/           # Image assets
│   └── logos/            # Client logos
└── docs/                 # Documentation
```

## Setup & Installation

### Prerequisites

- Node.js 18.0 or higher
- pnpm (recommended) or npm/yarn
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Herocontent-LP-redesign
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Run development server**
   ```bash
   pnpm dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 ID | Production only | - |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID for Facebook/Instagram ads tracking | Production only | - |
| `NEXT_PUBLIC_USER_APP_URL` | User app redirect URL | Yes | `http://localhost:3001` |
| `NEXT_PUBLIC_N8N_WEBHOOK_URL` | n8n webhook URL for form submissions | Production only | - |

See `.env.example` for a template with all variables and documentation.

### Environment-Based Behavior

The application automatically adjusts behavior based on `NODE_ENV`:

| Feature | Development | Production |
|---------|-------------|------------|
| Google Analytics | Disabled (no tracking) | Enabled |
| Meta Pixel | Disabled (no tracking) | Enabled |
| n8n webhook | Optional (logs to console if not configured) | Required (returns 503 if not configured) |
| Source maps | Enabled | Disabled |

**How it works:**
- `pnpm dev` → `NODE_ENV=development` (analytics disabled, webhook optional)
- `pnpm build && pnpm start` → `NODE_ENV=production` (analytics enabled, webhook required)

This prevents development traffic from polluting analytics data and allows local testing without n8n credentials.

## Development

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### Code Style

- **TypeScript** - Strict mode enabled
- **ESLint** - Code linting
- **Prettier** - Code formatting (if configured)
- **Component naming** - PascalCase for components
- **File naming** - kebab-case for files, PascalCase for components

### Component Architecture

#### Page Components

- `app/page.tsx` - Root index page (thin wrapper, imports page content)
- `app/landing/page.tsx` - Landing page route (thin wrapper)
- `app/registration/page.tsx` - Registration form page
- `app/login/page.tsx` - Login page

#### Page Content Components

- `components/pages/landing-page-content.tsx` - Simplified landing page for Meta Ads
- `components/pages/main-page-content.tsx` - Original full-featured main page

See `docs/PAGE_SWAP.md` for switching between page variants.

#### Shared Components

- `components/analytics.tsx` - Google Analytics tracking (production only)
- `components/analytics-wrapper.tsx` - Client-side analytics loader
- `components/typewriter-text.tsx` - Animated text component
- `components/ui/*` - Reusable UI components (shadcn/ui)

### API Routes

#### POST `/api/contact`

Handles contact form submissions.

**Request Body:**
```json
{
  "businessName": "string",
  "phone": "string",
  "email": "string",
  "businessType": "restaurace" | "kavarna" | "pub-bar" | "rozvoz" | "jine"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Form submitted successfully"
}
```

**Error Response:**
```json
{
  "error": "Error message"
}
```

**Implementation:**
- Validates required fields
- Sends notification to Telegram
- Returns success/error response

## Styling

### Tailwind CSS

The project uses Tailwind CSS with custom configuration:

- **Theme colors** - Custom yellow accent (`yellow-400`)
- **Responsive breakpoints** - Mobile-first approach
- **Dark mode** - Supported via `next-themes`

### Responsive Design

Breakpoints:
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up

### Component Styling Patterns

```tsx
// Mobile-first responsive classes
className="text-sm md:text-base lg:text-lg"

// Conditional styling
className={`base-class ${condition ? 'active-class' : 'inactive-class'}`}

// Dark mode support
className="bg-background text-foreground"
```

## State Management

### Client-Side State

- **React Hooks** - `useState`, `useEffect` for local state
- **Form State** - Managed with React state
- **Dialog State** - Controlled via `isDialogOpen` state

### No Global State Management

The project doesn't use Redux, Zustand, or similar. All state is:
- Local component state
- URL parameters (for navigation)
- Form state

## Routing

### Next.js App Router

- **File-based routing** - Pages in `app/` directory
- **Dynamic routes** - `app/blog/[slug]/page.tsx`
- **Layouts** - `app/layout.tsx` for root layout
- **Navigation** - `next/link` for client-side navigation

### Route Structure

```
/                    → Main page
/landing             → Landing page
/registration        → Registration page
/blog                → Blog listing
/blog/[slug]         → Blog post
/kariera             → Career page
/o-spolecnosti       → About company
/appscreenshots      → App screenshots
```

## Performance Optimization

### Image Optimization

- **Next.js Image** - Automatic optimization (if enabled)
- **Lazy loading** - `loading="lazy"` attribute
- **WebP format** - Preferred format where available

### Code Splitting

- **Dynamic imports** - `next/dynamic` for code splitting
- **Route-based splitting** - Automatic with App Router
- **Component lazy loading** - Analytics wrapper uses dynamic import

### Build Optimization

- **SWC minification** - Enabled in `next.config.mjs`
- **Production source maps** - Disabled for smaller builds
- **Compression** - Enabled in Next.js config

## SEO

### Metadata

Configured in `app/layout.tsx`:

- **Title** - "HeroContent - Správa sociálních sítí pro resturace"
- **Description** - Service description
- **Open Graph** - Social media sharing
- **Twitter Cards** - Twitter sharing
- **Structured Data** - JSON-LD for rich snippets

### Structured Data

- **Organization** - Company information
- **Service** - Service offerings
- **ContactPoint** - Contact information

## Analytics

See [Google Analytics Documentation](./GOOGLE_ANALYTICS.md) for detailed implementation.

### Quick Overview

- **GA4 Integration** - Google Analytics 4
- **Event Tracking** - Custom events for user actions
- **Page View Tracking** - Automatic SPA navigation tracking

## Deployment

### Vercel (Recommended)

1. **Connect repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Automatic on push to main branch

### Environment Variables in Production

Ensure all environment variables are set in your deployment platform:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_USER_APP_URL`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

### Build Configuration

```javascript
// next.config.mjs
{
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  swcMinify: true,
  compress: true,
  productionBrowserSourceMaps: false
}
```

## Troubleshooting

### Common Issues

#### Build Errors

**Issue:** SSR errors with client components
**Solution:** Ensure client components use `'use client'` directive

**Issue:** TypeScript errors
**Solution:** Check `tsconfig.json` and ensure types are imported correctly

#### Runtime Errors

**Issue:** `window is not defined`
**Solution:** Check for `typeof window !== 'undefined'` before accessing window

**Issue:** Environment variables not working
**Solution:** Ensure variables start with `NEXT_PUBLIC_` for client-side access

### Debugging

1. **Check browser console** for client-side errors
2. **Check terminal** for server-side errors
3. **Use React DevTools** for component debugging
4. **Network tab** for API request debugging

## Testing

### Manual Testing Checklist

- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Navigation works on all devices
- [ ] Images load properly
- [ ] Analytics events fire correctly
- [ ] Responsive design works on mobile/tablet/desktop

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security

### Best Practices

- ✅ **Environment variables** - Never commit secrets
- ✅ **Input validation** - Server-side validation for forms
- ✅ **HTTPS** - Always use HTTPS in production
- ✅ **CSP headers** - Content Security Policy (if configured)
- ✅ **XSS prevention** - React automatically escapes content

### API Security

- **Input validation** - All form inputs validated
- **Error handling** - Generic error messages (no sensitive info)
- **Rate limiting** - Consider adding rate limiting for production

## Maintenance

### Dependencies

Update dependencies regularly:

```bash
pnpm outdated    # Check for updates
pnpm update      # Update dependencies
```

### Monitoring

- **Google Analytics** - User behavior tracking
- **Meta Pixel** - Facebook/Instagram ads conversion tracking
- **Error tracking** - Consider adding Sentry or similar

## Contributing

### Development Workflow

1. Create feature branch
2. Make changes
3. Test locally
4. Commit with descriptive messages
5. Push and create pull request

### Code Review Checklist

- [ ] Code follows project conventions
- [ ] No console.logs in production code
- [ ] TypeScript types are correct
- [ ] Responsive design tested
- [ ] Analytics events fire correctly

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
