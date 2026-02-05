/**
 * Analytics Event Tracking Utility
 * 
 * This utility provides functions to track custom events in:
 * - Google Analytics 4 (GA4)
 * - Meta Pixel (Facebook)
 * - TikTok Pixel
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
    // PostHog is initialized in PostHogProvider component
    // Access the global posthog instance
    const posthog = (window as any).posthog
    
    if (posthog && typeof posthog.capture === 'function') {
      posthog.capture(eventName, properties || {})
    } else if (process.env.NODE_ENV === 'development') {
      // Log in development if PostHog is not initialized
      console.log('[PostHog] Event not tracked - PostHog not initialized:', eventName)
    }
  } catch (error) {
    // Silently fail if there's an error
    if (process.env.NODE_ENV === 'development') {
      console.error('[PostHog] Error tracking event:', error)
    }
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

// Track a TikTok Pixel event
// Standard events: https://ads.tiktok.com/help/article/standard-events-parameters
export const trackTikTokPixelEvent = (
  eventName: string,
  parameters?: Record<string, string | number>
) => {
  if (typeof window === 'undefined' || !isProduction) {
    return
  }

  if (window.ttq) {
    if (parameters) {
      window.ttq.track(eventName, parameters)
    } else {
      window.ttq.track(eventName)
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
 * Fires GA4, Meta Pixel, TikTok Pixel, and PostHog events
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

  // TikTok Pixel SubmitForm conversion (TikTok's equivalent of Lead)
  trackTikTokPixelEvent('SubmitForm', {
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
    ttq: {
      track: (eventName: string, parameters?: Record<string, any>) => void
      page: () => void
      load: (pixelId: string) => void
    }
    posthog?: {
      capture: (eventName: string, properties?: Record<string, any>) => void
      identify: (distinctId: string, properties?: Record<string, any>) => void
      reset: () => void
      debug: () => void
    }
  }
}
