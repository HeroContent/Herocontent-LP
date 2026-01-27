import posthog from 'posthog-js'

// Initialize PostHog only if keys are available
if (typeof window !== 'undefined') {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST

  if (posthogKey && posthogHost) {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      defaults: '2025-11-30',
      // Only load in production to avoid polluting analytics
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          posthog.debug() // Enable debug mode in development
        }
      },
    })
  }
}
