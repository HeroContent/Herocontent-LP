import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Přihlášení - HeroContent",
  description: "Přihlášení do HeroContent",
  robots: {
    index: false,
    follow: true,
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
