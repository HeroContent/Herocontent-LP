'use client'

import dynamic from 'next/dynamic'

const GoogleAnalytics = dynamic(
  () => import('@/components/analytics').then((mod) => ({ default: mod.GoogleAnalytics })),
  { ssr: false }
)

export function AnalyticsWrapper() {
  return <GoogleAnalytics />
}
