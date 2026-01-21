import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Geist, Geist_Mono } from "next/font/google"
import { AnalyticsWrapper } from "@/components/analytics-wrapper"
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
        url: "/icon.png",
        type: "image/png",
        sizes: "any",
      },
      {
        url: "/images/Favicon.png",
        type: "image/png",
        sizes: "any",
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
    shortcut: "/icon.png",
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
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const isProduction = process.env.NODE_ENV === 'production'
  
  return (
    <html lang="cs">
      <body className={`font-sans antialiased`}>
        {/* Google tag (gtag.js) - Only load in production to avoid polluting analytics */}
        {isProduction && gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="beforeInteractive"
            />
            <Script id="google-analytics" strategy="beforeInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        )}
        {/* Meta Pixel - Only load in production to avoid polluting analytics */}
        {isProduction && metaPixelId && (
          <Script id="meta-pixel" strategy="beforeInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
        {children}
        <AnalyticsWrapper />
      </body>
    </html>
  )
}
