/**
 * Landing Page (/landing)
 * 
 * This route provides direct access to the LandingPageContent.
 * The same content is currently also displayed at "/" for Meta Ads traffic.
 * 
 * See docs/PAGE_SWAP.md for configuration details.
 */

import { LandingPageContent } from "@/components/pages/landing-page-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Marketingová agentura pro gastro | Reklama pro restaurace | HeroContent",
  description: "Profesionální marketing pro restaurace a gastro podniky. Správa sociálních sítí, reklama pro gastro, marketingová agentura pro restaurace. Instagram a Facebook management od 2950 Kč měsíčně.",
  keywords: [
    "marketingová agentura pro gastro",
    "reklama pro gastro",
    "marketing pro restaurace",
    "sociální sítě pro restaurace",
    "správa Instagramu pro restaurace",
    "Facebook marketing pro gastro",
    "marketingová agentura Praha",
    "sociální média pro restaurace",
  ],
  openGraph: {
    title: "Marketingová agentura pro gastro | Reklama pro restaurace | HeroContent",
    description: "Profesionální marketing pro restaurace a gastro podniky. Správa sociálních sítí, reklama pro gastro, marketingová agentura pro restaurace.",
    url: "https://herocontent.ai/landing",
  },
  alternates: {
    canonical: "/landing",
  },
}

export default function LandingPage() {
  return <LandingPageContent />
}
