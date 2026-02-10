/**
 * Root Index Page (/)
 * 
 * CURRENT CONFIGURATION: Displays the LandingPageContent (simplified version for Meta Ads)
 * 
 * This is the entry point for Meta Ads traffic targeting "/".
 * The landing page content is optimized for lead generation with:
 * - "12 free posts" offer in hero section
 * - Simplified contact form (no business type dropdown)
 * - All CTAs lead to contact form dialog
 * 
 * TO REVERT TO ORIGINAL MAIN PAGE:
 * Change the import from LandingPageContent to MainPageContent:
 * 
 * import { MainPageContent } from "@/components/pages/main-page-content"
 * 
 * export default function Home() {
 *   return <MainPageContent />
 * }
 * 
 * See docs/PAGE_SWAP.md for more details.
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
    url: "https://herocontent.ai",
  },
  alternates: {
    canonical: "https://herocontent.ai",
  },
}

export default function Home() {
  return <LandingPageContent />
}
