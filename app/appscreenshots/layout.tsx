import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Screenshoty aplikace - HeroContent",
  description: "Screenshoty aplikace HeroContent",
  robots: {
    index: false,
    follow: true,
  },
}

export default function AppScreenshotsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
