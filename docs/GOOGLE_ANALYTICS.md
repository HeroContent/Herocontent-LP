# Google Analytics 4 (GA4) Implementation Documentation

## Overview

This project uses Google Analytics 4 (GA4) to track user interactions, form submissions, and page views. The implementation follows GA4 best practices and is optimized for Next.js App Router.

**Measurement ID:** `G-0MPZSF8FDF`

## Setup

### Environment Variables

Add the following to your `.env.local` file:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-0MPZSF8FDF
```

**Important:** Also add this environment variable to your deployment platform (Vercel, etc.) for production.

## Implementation Details

### Files Structure

- `app/layout.tsx` - Main layout with Google tag scripts
- `components/analytics.tsx` - GoogleAnalytics component for page view tracking
- `components/analytics-wrapper.tsx` - Client component wrapper for dynamic import
- `lib/analytics.ts` - Event tracking utility functions

### Google Tag Implementation

The Google tag is implemented in `app/layout.tsx` using Next.js `Script` component with `strategy="beforeInteractive"`. This ensures:

- Scripts are loaded early in the page lifecycle
- Scripts are injected into `<head>` automatically
- Google can detect the tag for verification

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

## Tracked Events

### 1. `lead_form_open`

**Description:** Tracks when the contact/lead form dialog is opened.

**Trigger Point:** When `isDialogOpen` state changes to `true` (via `useEffect`)

**Location:** 
- `app/page.tsx` (Main page)
- `app/landing/page.tsx` (Landing page)

**Parameters:**
- `form_name`: `"contact"`
- `source`: `"main_page"` or `"landing_page"`
- `page_path`: Current page path (e.g., `/` or `/landing`)

**Code Example:**
```tsx
useEffect(() => {
  if (isDialogOpen) {
    trackLeadFormOpen('main_page') // or 'landing_page'
  }
}, [isDialogOpen])
```

---

### 2. `lead_form_submit`

**Description:** Tracks when the contact/lead form is successfully submitted.

**Trigger Point:** 
1. User clicks submit button
2. Client-side validation passes
3. API request is sent to `/api/contact`
4. Server responds with HTTP 200 (success)
5. **Event fires immediately after receiving success response**
6. Success message is shown
7. Dialog closes after 2 seconds

**Location:**
- `app/page.tsx` (Main page)
- `app/landing/page.tsx` (Landing page)

**Parameters:**
- `form_name`: `"contact"`
- `business_type`: Selected business type (`"restaurace"`, `"kavarna"`, `"pub-bar"`, `"rozvoz"`, `"jine"`, or `"unknown"`)
- `page_path`: Current page path

**Code Flow:**
```tsx
const response = await fetch('/api/contact', {
  method: 'POST',
  body: JSON.stringify(formData),
})

const data = await response.json()

if (!response.ok) {
  throw new Error(data.error || 'Něco se pokazilo')
}

setSubmitSuccess(true)

// EVENT TRIGGERS HERE ⬇️
trackLeadFormSubmit(formData.businessType)

// Dialog closes 2 seconds later
setTimeout(() => {
  setIsDialogOpen(false)
  // ... reset form
}, 2000)
```

**Important Notes:**
- ✅ Only fires on successful API response (HTTP 200)
- ✅ Fires before dialog closes
- ✅ Fires before success message is shown
- ❌ Does NOT fire if validation fails
- ❌ Does NOT fire if API returns error (4xx/5xx)
- ❌ Does NOT fire if user cancels before submitting

---

### 3. `registration_form_open`

**Description:** Tracks when the registration form page is viewed.

**Trigger Point:** When user navigates to `/registration` page (on page load via `useEffect`)

**Location:** `app/registration/page.tsx`

**Parameters:**
- `page_path`: `"/registration"`

**Code Example:**
```tsx
useEffect(() => {
  trackRegistrationFormOpen()
}, [])
```

---

### 4. `registration_complete`

**Description:** Tracks when the registration form is successfully submitted.

**Trigger Point:** 
1. User fills out registration form
2. Form validation passes
3. Form is submitted
4. **Event fires immediately before redirect**
5. User is redirected to user app

**Location:** `app/registration/page.tsx`

**Parameters:**
- `restaurant_name`: Name of the restaurant (or `"unknown"` if not provided)
- `page_path`: `"/registration"`

**Code Example:**
```tsx
if (validateForm()) {
  // Track successful registration completion
  trackRegistrationComplete(formData.restaurantName)
  
  // Redirect to user app
  window.location.href = `${USER_APP_URL}?${params.toString()}`
}
```

---

### 5. Automatic Page Views

**Description:** Tracks page views automatically on route changes (SPA navigation).

**Trigger Point:** When user navigates between pages using Next.js routing

**Location:** `components/analytics.tsx` (via `GoogleAnalytics` component)

**Parameters:**
- `page_path`: Current page path (updated automatically on route changes)

**Implementation:**
- Uses `usePathname()` and `useSearchParams()` hooks
- Tracks route changes in Next.js App Router
- Automatically updates `page_path` parameter

## Viewing Events in Google Analytics

### Automatic Collection

All custom events are **automatically collected** by GA4. No manual setup is required.

**Where to view:**
- **Real-time:** GA4 → Reports → Realtime (appears within seconds)
- **Standard Reports:** GA4 → Reports → Engagement → Events (appears within 24-48 hours)

### Optional: Mark Events as Conversions

To track important events as conversions:

1. Go to **GA4 → Admin → Events**
2. Find your event (e.g., `lead_form_submit`, `registration_complete`)
3. Toggle **"Mark as conversion"** for events you want to track as goals

**Recommended conversions:**
- ✅ `lead_form_submit` - Contact form submissions
- ✅ `registration_complete` - Completed registrations

### Optional: Create Custom Dimensions

To analyze event parameters better:

1. Go to **GA4 → Admin → Custom Definitions → Create custom dimensions**
2. Create dimensions for:
   - `business_type` (Event parameter)
   - `form_source` (Event parameter)
   - `restaurant_name` (Event parameter)

## Event Summary Table

| Event Name | Trigger | Parameters | Pages | Conversion? |
|------------|---------|------------|-------|-------------|
| `lead_form_open` | Dialog opens | `form_name`, `source`, `page_path` | Main, Landing | No |
| `lead_form_submit` | Form submitted successfully | `form_name`, `business_type`, `page_path` | Main, Landing | **Yes (Recommended)** |
| `registration_form_open` | Page viewed | `page_path` | Registration | No |
| `registration_complete` | Form submitted successfully | `restaurant_name`, `page_path` | Registration | **Yes (Recommended)** |
| Page views | Route changes | `page_path` | All pages | No |

## Testing

### Verify Events are Firing

1. **Open browser DevTools → Network tab**
2. Filter by `gtag` or `collect`
3. Trigger an event (e.g., open contact form)
4. Look for requests to `google-analytics.com` or `googletagmanager.com`

### Verify in GA4

1. Go to **GA4 → Reports → Realtime**
2. Trigger events on your site
3. Events should appear within seconds in the real-time report

## Troubleshooting

### Google Tag Not Detected

- ✅ Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set in environment variables
- ✅ Check that scripts are loading (DevTools → Network tab)
- ✅ Verify scripts are in `<head>` (DevTools → Elements tab)
- ✅ Wait 24-48 hours for Google's detection system to update

### Events Not Appearing

- ✅ Check browser console for errors
- ✅ Verify `window.gtag` is available
- ✅ Check Network tab for `gtag` requests
- ✅ Verify events are firing in Real-time reports first
- ✅ Wait 24-48 hours for events to appear in standard reports

### SSR Build Errors

- ✅ Ensure `components/analytics-wrapper.tsx` uses `ssr: false`
- ✅ All tracking functions check for `typeof window === 'undefined'`
- ✅ Client components are properly marked with `'use client'`

## Code Reference

### Event Tracking Functions

All tracking functions are in `lib/analytics.ts`:

- `trackEvent(eventName, parameters)` - Generic event tracking
- `trackLeadFormOpen(source)` - Lead form opened
- `trackLeadFormSubmit(businessType)` - Lead form submitted
- `trackRegistrationFormOpen()` - Registration page viewed
- `trackRegistrationComplete(restaurantName)` - Registration completed

### Usage Example

```tsx
import { trackLeadFormSubmit } from "@/lib/analytics"

// In your component
const handleSubmit = async () => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  })
  
  if (response.ok) {
    trackLeadFormSubmit(formData.businessType)
  }
}
```

## Best Practices

1. ✅ Events only fire on successful actions (not on errors)
2. ✅ All tracking functions check for `window` availability (SSR-safe)
3. ✅ Events include relevant context (page path, business type, etc.)
4. ✅ Event names follow GA4 naming conventions (snake_case)
5. ✅ Parameters are consistent across similar events

## Support

For issues or questions about Google Analytics implementation, refer to:
- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js Script Component](https://nextjs.org/docs/app/api-reference/components/script)
