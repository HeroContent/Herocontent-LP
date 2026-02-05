'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

/**
 * PostHog Provider Component
 * 
 * Initializes PostHog analytics client-side only.
 * Only loads if environment variables are configured.
 */
export function PostHogProvider() {
  useEffect(() => {
    // Only initialize on client side
    if (typeof window === 'undefined') {
      return
    }

    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST

    // Only initialize if both key and host are provided
    if (!posthogKey || !posthogHost) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[PostHog] Not initialized - missing NEXT_PUBLIC_POSTHOG_KEY or NEXT_PUBLIC_POSTHOG_HOST')
      }
      return
    }

    // Initialize PostHog
    posthog.init(posthogKey, {
      api_host: posthogHost,
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('[PostHog] Initialized successfully')
          posthog.debug() // Enable debug mode in development
        }
      },
      // Capture pageviews automatically
      capture_pageview: true,
      // Capture pageleave automatically
      capture_pageleave: true,
    })

    // Make posthog available globally for event tracking
    if (typeof window !== 'undefined') {
      window.posthog = posthog
    }
  }, [])

  return null
}
