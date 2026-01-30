import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kariéra - HeroContent",
  description: "Kariéra v Hero Content s.r.o.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function KarieraLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
