'use client'

import dynamic from 'next/dynamic'
import { PostHogProvider } from '@/components/posthog-provider'

const GoogleAnalytics = dynamic(
  () => import('@/components/analytics').then((mod) => ({ default: mod.GoogleAnalytics })),
  { ssr: false }
)

/**
 * Analytics Wrapper Component
 * 
 * Only loads Google Analytics in production environment to prevent
 * development traffic from polluting analytics data.
 * PostHog loads in all environments if configured.
 */
export function AnalyticsWrapper() {
  return (
    <>
      {/* PostHog - loads if environment variables are set */}
      <PostHogProvider />
      {/* Google Analytics - only in production */}
      {process.env.NODE_ENV === 'production' && <GoogleAnalytics />}
    </>
  )
}
