import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HeroContent - Správa sociálních sítí pro resturace",
  description: "Profesionální správa Instagramu a Facebooku pro restaurace. Vytváříme obsah, zveřejňujeme příspěvky, spravujeme reklamy a pomáháme vám oslovit nové hosty. Od 2950 Kč měsíčně.",
  keywords: [
    "Instagram",
    "Facebook",
    "Sociální sítě",
    "Restaurace",
    "Reklama",
  ],
  authors: [{ name: "HeroContent" }],
  creator: "HeroContent",
  publisher: "HeroContent",
  metadataBase: new URL("https://herocontent.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://herocontent.ai",
    siteName: "HeroContent",
    title: "HeroContent - Správa sociálních sítí pro resturace",
    description: "Profesionální správa Instagramu a Facebooku pro restaurace. Vytváříme obsah, zveřejňujeme příspěvky, spravujeme reklamy a pomáháme vám oslovit nové hosty. Od 2950 Kč měsíčně.",
    images: [
      {
        url: "/images/HC_Logo.png",
        width: 1200,
        height: 630,
        alt: "HeroContent - Správa sociálních sítí pro restaurace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HeroContent - Správa sociálních sítí pro resturace",
    description: "Profesionální správa Instagramu a Facebooku pro restaurace. Vytváříme obsah, zveřejňujeme příspěvky, spravujeme reklamy a pomáháme vám oslovit nové hosty. Od 2950 Kč měsíčně.",
    images: ["/images/HC_Logo.png"],
    creator: "@herocontent",
  },
  icons: {
    icon: [
      {
        url: "/images/Favicon.png",
        type: "image/png",
      },
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/images/Favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
