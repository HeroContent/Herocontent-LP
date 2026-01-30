import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Registrace - HeroContent",
  description: "Registrace do HeroContent",
  robots: {
    index: false,
    follow: true,
  },
}

export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
