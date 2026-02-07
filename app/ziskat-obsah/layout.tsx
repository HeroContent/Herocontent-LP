import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Získat obsah zdarma - HeroContent",
  description: "Získejte 12 příspěvků zdarma pro vaše sociální sítě",
  robots: {
    index: false,
    follow: true,
  },
}

export default function ZiskatObsahLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
