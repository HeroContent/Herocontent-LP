/**
 * Analytics Event Tracking Utility
 * 
 * This utility provides functions to track custom events in:
 * - Google Analytics 4 (GA4)
 * - Meta Pixel (Facebook)
 * - PostHog
 * 
 * All events follow platform-specific naming conventions.
 * Analytics only fire in production environment.
 */

const isProduction = process.env.NODE_ENV === 'production'

// Track a custom event in Google Analytics
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, string | number | boolean>
) => {
  if (typeof window === 'undefined' || !isProduction) {
    return
  }

  // Check if gtag is available
  if (window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      // Add timestamp for debugging
      event_timestamp: new Date().toISOString(),
    })
  }
}

// Track PostHog event
export const trackPostHogEvent = (
  eventName: string,
  properties?: Record<string, string | number | boolean>
) => {
  if (typeof window === 'undefined') {
    return
  }

  try {
    // PostHog is initialized in instrumentation-client.ts
    // Use dynamic import to avoid SSR issues
    import('posthog-js').then((posthogModule) => {
      const posthog = posthogModule.default
      if (posthog) {
        posthog.capture(eventName, properties || {})
      }
    }).catch(() => {
      // Silently fail if PostHog is not available
    })
  } catch (error) {
    // Silently fail if there's an error
  }
}

// Track a Meta Pixel event
export const trackMetaPixelEvent = (
  eventName: string,
  parameters?: Record<string, string | number>
) => {
  if (typeof window === 'undefined' || !isProduction) {
    return
  }

  if (window.fbq) {
    if (parameters) {
      window.fbq('track', eventName, parameters)
    } else {
      window.fbq('track', eventName)
    }
  }
}

// Specific event tracking functions for common actions

/**
 * Track when a lead form (contact dialog) is opened
 */
export const trackLeadFormOpen = (source?: string) => {
  if (typeof window === 'undefined') {
    return
  }
  const eventData = {
    form_name: 'contact',
    source: source || 'unknown',
    page_path: window.location.pathname,
  }
  // Track in GA4
  trackEvent('lead_form_open', eventData)
  // Track in PostHog
  trackPostHogEvent('lead_form_open', eventData)
}

/**
 * Track when a lead form is successfully submitted
 * Fires both GA4 and Meta Pixel Lead events
 */
export const trackLeadFormSubmit = (businessType?: string) => {
  if (typeof window === 'undefined') {
    return
  }

  const eventData = {
    form_name: 'contact',
    business_type: businessType || 'unknown',
    page_path: window.location.pathname,
  }

  // Google Analytics event
  trackEvent('lead_form_submit', eventData)

  // Meta Pixel Lead conversion
  trackMetaPixelEvent('Lead', {
    content_name: 'contact_form',
    content_category: businessType || 'landing',
  })

  // Track in PostHog
  trackPostHogEvent('lead_form_submit', eventData)
}

/**
 * Track when registration form page is viewed
 */
export const trackRegistrationFormOpen = () => {
  if (typeof window === 'undefined') {
    return
  }
  const eventData = {
    page_path: window.location.pathname,
  }
  // Track in GA4
  trackEvent('registration_form_open', eventData)
  // Track in PostHog
  trackPostHogEvent('registration_form_open', eventData)
}

/**
 * Track when registration is completed successfully
 */
export const trackRegistrationComplete = (restaurantName?: string) => {
  if (typeof window === 'undefined') {
    return
  }
  const eventData = {
    restaurant_name: restaurantName || 'unknown',
    page_path: window.location.pathname,
  }
  // Track in GA4
  trackEvent('registration_complete', eventData)
  // Track in Meta Pixel as CompleteRegistration conversion
  trackMetaPixelEvent('CompleteRegistration', {
    content_name: 'Registration Form',
    value: 0,
    currency: 'CZK',
  })
  // Track in PostHog
  trackPostHogEvent('registration_complete', eventData)
}

// TypeScript declarations for analytics
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
  }
}
