# Analytics Implementation Documentation

## Overview

This project uses multiple analytics platforms to track user interactions, form submissions, and page views:

- **Google Analytics 4 (GA4)** - Primary web analytics
- **PostHog** - Product analytics and event tracking
- **Meta Pixel** - Facebook/Instagram ads conversion tracking
- **TikTok Pixel** - TikTok ads conversion tracking

All analytics are implemented to work seamlessly with Next.js App Router and are optimized for production use.

---

## Table of Contents

1. [Environment Variables](#environment-variables)
2. [Google Analytics 4](#google-analytics-4)
3. [PostHog](#posthog)
4. [Meta Pixel & TikTok Pixel](#meta-pixel--tiktok-pixel)
5. [Event Tracking](#event-tracking)
6. [AWS Deployment](#aws-deployment)
7. [Troubleshooting](#troubleshooting)

---

## Environment Variables

### Required for Production

```env
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-0MPZSF8FDF

# PostHog (Optional)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_api_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Meta Pixel (Optional)
NEXT_PUBLIC_META_PIXEL_ID=your_meta_pixel_id

# TikTok Pixel (Optional)
NEXT_PUBLIC_TIKTOK_PIXEL_ID=your_tiktok_pixel_id

# Other
NEXT_PUBLIC_USER_APP_URL=http://localhost:3001
NEXT_PUBLIC_N8N_WEBHOOK_URL=your_webhook_url
```

### Environment-Based Behavior

| Feature | Development | Production |
|---------|-------------|------------|
| Google Analytics | Disabled | Enabled |
| Meta Pixel | Disabled | Enabled |
| TikTok Pixel | Disabled | Enabled |
| PostHog | Enabled (if configured) | Enabled (if configured) |
| n8n webhook | Optional (logs to console) | Required |

**Note:** The `NEXT_PUBLIC_` prefix is required for Next.js to expose variables to client-side code.

---

## Google Analytics 4

### Setup

**Measurement ID:** `G-0MPZSF8FDF`

Add to `.env.local`:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-0MPZSF8FDF
```

### Implementation

**Files:**
- `app/layout.tsx` - Google tag scripts (beforeInteractive)
- `components/analytics.tsx` - Page view tracking component
- `components/analytics-wrapper.tsx` - Client wrapper
- `lib/analytics.ts` - Event tracking functions

**Google Tag Implementation:**
```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
  strategy="beforeInteractive"
/>
<Script id="google-analytics" strategy="beforeInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gaMeasurementId}');
  `}
</Script>
```

### Tracked Events

#### 1. `lead_form_open`
- **Trigger:** Contact form dialog opens
- **Parameters:** `form_name`, `source`, `page_path`
- **Pages:** Main page, Landing page

#### 2. `lead_form_submit`
- **Trigger:** Contact form successfully submitted
- **Parameters:** `form_name`, `business_type`, `page_path`
- **Pages:** Main page, Landing page
- **Recommended:** Mark as conversion in GA4

#### 3. `registration_form_open`
- **Trigger:** Registration page viewed
- **Parameters:** `page_path`
- **Pages:** Registration page

#### 4. `registration_complete`
- **Trigger:** Registration form successfully submitted
- **Parameters:** `restaurant_name`, `page_path`
- **Pages:** Registration page
- **Recommended:** Mark as conversion in GA4

#### 5. Automatic Page Views
- **Trigger:** Route changes (SPA navigation)
- **Parameters:** `page_path` (auto-updated)

### Viewing Events in GA4

**Real-time:** GA4 → Reports → Realtime (appears within seconds)

**Standard Reports:** GA4 → Reports → Engagement → Events (appears within 24-48 hours)

**Mark as Conversions:**
1. Go to GA4 → Admin → Events
2. Find your event (e.g., `lead_form_submit`)
3. Toggle "Mark as conversion"

**Recommended conversions:**
- ✅ `lead_form_submit`
- ✅ `registration_complete`

### Testing

1. Open DevTools → Network tab
2. Filter by `gtag` or `collect`
3. Trigger an event (e.g., open contact form)
4. Look for requests to `google-analytics.com`

---

## PostHog

### Overview

PostHog provides product analytics, feature flags, and session recordings. It's integrated to track the same events as GA4 for comprehensive analytics coverage.

### Current Implementation

✅ **Implemented:**
- PostHog JavaScript SDK (`posthog-js`) installed
- Client-side initialization in `components/posthog-provider.tsx`
- Event tracking functions in `lib/analytics.ts`
- Integrated into `components/analytics-wrapper.tsx`

### Setup

**Required Environment Variables:**
```env
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_api_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**File Structure:**
- `components/posthog-provider.tsx` - PostHog initialization
- `components/analytics-wrapper.tsx` - Loads PostHog provider
- `lib/analytics.ts` - Event tracking functions

### PostHog Cloud (Recommended)

1. Sign up at https://posthog.com
2. Get your API key from project settings
3. Set environment variables:
   - `NEXT_PUBLIC_POSTHOG_KEY` = Your project key
   - `NEXT_PUBLIC_POSTHOG_HOST` = `https://app.posthog.com`

**Cost:**
- Free tier: Up to 1M events/month
- Paid: Starting at $0.000225 per event after free tier

### Self-Hosting on AWS

If self-hosting PostHog on AWS, you'll need:

**Infrastructure:**
- EC2/ECS/Fargate (2-4 vCPU, 4-8GB RAM)
- RDS PostgreSQL (db.t3.medium or larger)
- ElastiCache Redis (cache.t3.micro or larger)
- S3 bucket for object storage
- VPC with public/private subnets
- ALB or CloudFront for HTTPS

**Cost:** ~$100-1000+/month depending on scale

### Tracked Events

PostHog tracks the same events as GA4:
- `lead_form_open`
- `lead_form_submit`
- `registration_form_open`
- `registration_complete`
- Automatic page views

### Verification

1. **Browser Console:**
   - Look for: `[PostHog] Initialized successfully`
   - Check for errors

2. **Network Tab:**
   - Filter for "posthog" or your PostHog host
   - Verify POST requests to `/batch/` endpoint

3. **PostHog Dashboard:**
   - Events appear within seconds
   - Check "Live events" or "Events" section

### Debugging

**Check PostHog Instance:**
```javascript
// In browser console:
console.log(window.posthog)
// Should show PostHog object with methods
```

**Test Manual Event:**
```javascript
window.posthog?.capture('test_event', { test: true })
```

---

## Meta Pixel & TikTok Pixel

### Meta Pixel

**Purpose:** Track Facebook/Instagram ads conversions

**Setup:**
```env
NEXT_PUBLIC_META_PIXEL_ID=your_meta_pixel_id
```

**Tracked Events:**
- `PageView` - Automatic on page load
- `Lead` - When contact form is submitted
- `CompleteRegistration` - When registration is completed

**Implementation:** Loaded in `app/layout.tsx` (production only)

### TikTok Pixel

**Purpose:** Track TikTok ads conversions

**Setup:**
```env
NEXT_PUBLIC_TIKTOK_PIXEL_ID=your_tiktok_pixel_id
```

**Tracked Events:**
- `PageView` - Automatic on page load
- `SubmitForm` - When contact form is submitted

**Implementation:** Loaded in `app/layout.tsx` (production only)

---

## Event Tracking

### Event Tracking Functions

All tracking functions are in `lib/analytics.ts`:

```typescript
// Generic event tracking
trackEvent(eventName, parameters)

// Specific events
trackLeadFormOpen(source)
trackLeadFormSubmit(businessType)
trackRegistrationFormOpen()
trackRegistrationComplete(restaurantName)

// PostHog only
trackPostHogEvent(eventName, properties)
```

### Event Summary Table

| Event Name | GA4 | PostHog | Meta Pixel | TikTok Pixel | Conversion? |
|-----------|-----|---------|------------|--------------|-------------|
| `lead_form_open` | ✅ | ✅ | ❌ | ❌ | No |
| `lead_form_submit` | ✅ | ✅ | ✅ (Lead) | ✅ (SubmitForm) | **Yes** |
| `registration_form_open` | ✅ | ✅ | ❌ | ❌ | No |
| `registration_complete` | ✅ | ✅ | ✅ (CompleteRegistration) | ❌ | **Yes** |
| Page views | ✅ | ✅ | ✅ | ✅ | No |

### Usage Example

```tsx
import { trackLeadFormSubmit } from "@/lib/analytics"

const handleSubmit = async () => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  })
  
  if (response.ok) {
    // Tracks in GA4, PostHog, Meta Pixel, and TikTok Pixel
    trackLeadFormSubmit(formData.businessType)
  }
}
```

### Best Practices

1. ✅ Events only fire on successful actions (not on errors)
2. ✅ All tracking functions check for `window` availability (SSR-safe)
3. ✅ Events include relevant context (page path, business type, etc.)
4. ✅ Event names follow naming conventions (snake_case)
5. ✅ Parameters are consistent across similar events

---

## AWS Deployment

### Environment Variables Configuration

#### AWS Amplify

1. Go to AWS Amplify Console
2. Select your app
3. Navigate to: App settings → Environment variables
4. Add all required variables
5. Redeploy application

#### AWS Elastic Beanstalk

**Via EB CLI:**
```bash
eb setenv NEXT_PUBLIC_GA_MEASUREMENT_ID=G-0MPZSF8FDF \
         NEXT_PUBLIC_POSTHOG_KEY=your_key \
         NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**Via Console:**
- Go to Elastic Beanstalk → Your Environment → Configuration
- Software → Environment properties
- Add variables and save

#### AWS ECS/Fargate

Update task definition:
```json
{
  "environment": [
    {
      "name": "NEXT_PUBLIC_GA_MEASUREMENT_ID",
      "value": "G-0MPZSF8FDF"
    },
    {
      "name": "NEXT_PUBLIC_POSTHOG_KEY",
      "value": "your_key_here"
    },
    {
      "name": "NEXT_PUBLIC_POSTHOG_HOST",
      "value": "https://app.posthog.com"
    }
  ]
}
```

#### AWS Lambda

```bash
aws lambda update-function-configuration \
  --function-name your-function-name \
  --environment Variables='{
    "NEXT_PUBLIC_GA_MEASUREMENT_ID":"G-0MPZSF8FDF",
    "NEXT_PUBLIC_POSTHOG_KEY":"your_key_here",
    "NEXT_PUBLIC_POSTHOG_HOST":"https://app.posthog.com"
  }'
```

### Security Best Practices

1. **Use AWS Secrets Manager** for sensitive values
2. **Use Parameter Store** for non-sensitive configuration
3. **Use IAM roles** instead of access keys
4. **Separate environments** (dev/staging/prod) with different projects
5. **Never commit** API keys to version control

---

## Troubleshooting

### Google Analytics

**Tag Not Detected:**
- ✅ Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
- ✅ Check scripts are loading (DevTools → Network)
- ✅ Wait 24-48 hours for Google's detection system

**Events Not Appearing:**
- ✅ Check browser console for errors
- ✅ Verify `window.gtag` is available
- ✅ Check Network tab for `gtag` requests
- ✅ Verify in Real-time reports first
- ✅ Wait 24-48 hours for standard reports

### PostHog

**Not Initializing:**
- ✅ Verify `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` are set
- ✅ Check variables start with `NEXT_PUBLIC_`
- ✅ Check browser console for initialization messages
- ✅ Verify PostHog host URL is accessible

**Events Not Appearing:**
- ✅ Check PostHog project settings
- ✅ Verify API key is correct
- ✅ Check Network tab for failed requests
- ✅ Verify CORS settings (if self-hosting)

**Debug in Console:**
```javascript
// Check if PostHog is initialized
console.log(window.posthog)

// Test manual event
window.posthog?.capture('test_event', { test: true })
```

### Meta Pixel / TikTok Pixel

**Not Tracking:**
- ✅ Verify pixel IDs are set in environment variables
- ✅ Check scripts are loading (production only)
- ✅ Verify in Meta Events Manager / TikTok Events Manager
- ✅ Check browser console for errors

### General Issues

**SSR Build Errors:**
- ✅ Ensure client components use `'use client'`
- ✅ All tracking functions check `typeof window !== 'undefined'`
- ✅ Analytics wrapper uses `ssr: false` for dynamic imports

**Environment Variables Not Working:**
- ✅ Ensure variables start with `NEXT_PUBLIC_` for client-side
- ✅ Rebuild/redeploy after setting variables
- ✅ Check deployment platform environment variable settings

---

## Code Reference

### File Structure

```
app/
  layout.tsx                    # Google tag, Meta Pixel, TikTok Pixel scripts
components/
  analytics.tsx                 # GA4 page view tracking
  analytics-wrapper.tsx         # Analytics wrapper (loads all analytics)
  posthog-provider.tsx          # PostHog initialization
lib/
  analytics.ts                  # All event tracking functions
```

### Key Functions

**`lib/analytics.ts`:**
- `trackEvent()` - Generic GA4 event
- `trackPostHogEvent()` - PostHog event
- `trackMetaPixelEvent()` - Meta Pixel event
- `trackTikTokPixelEvent()` - TikTok Pixel event
- `trackLeadFormOpen()` - Lead form opened
- `trackLeadFormSubmit()` - Lead form submitted
- `trackRegistrationFormOpen()` - Registration page viewed
- `trackRegistrationComplete()` - Registration completed

---

## Additional Resources

- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [PostHog Documentation](https://posthog.com/docs)
- [PostHog Self-Hosting Guide](https://posthog.com/docs/self-host)
- [Meta Pixel Documentation](https://developers.facebook.com/docs/meta-pixel)
- [TikTok Pixel Documentation](https://ads.tiktok.com/help/article/standard-events-parameters)
- [Next.js Script Component](https://nextjs.org/docs/app/api-reference/components/script)
- [AWS Amplify Environment Variables](https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html)

---

## Summary Checklist

### Initial Setup
- [ ] Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in environment variables
- [ ] (Optional) Set `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`
- [ ] (Optional) Set `NEXT_PUBLIC_META_PIXEL_ID`
- [ ] (Optional) Set `NEXT_PUBLIC_TIKTOK_PIXEL_ID`
- [ ] Deploy to production
- [ ] Verify analytics are loading in browser console

### Post-Deployment
- [ ] Test event tracking (open form, submit form)
- [ ] Verify events in GA4 Real-time reports
- [ ] Verify events in PostHog dashboard (if configured)
- [ ] Mark important events as conversions in GA4
- [ ] Set up monitoring/alerts (optional)

---

**Last Updated:** January 2026
