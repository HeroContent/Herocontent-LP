import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Geist, Geist_Mono } from "next/font/google"
import { AnalyticsWrapper } from "@/components/analytics-wrapper"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

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
    title: "Marketingová agentura pro gastro | Reklama pro restaurace | HeroContent",
    description: "Profesionální marketing pro restaurace a gastro podniky. Správa sociálních sítí, reklama pro gastro, marketingová agentura pro restaurace.",
    images: [
      {
        url: "/images/brand/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HeroContent - Správa sociálních sítí pro restaurace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketingová agentura pro gastro | Reklama pro restaurace | HeroContent",
    description: "Profesionální marketing pro restaurace a gastro podniky. Správa sociálních sítí, reklama pro gastro, marketingová agentura pro restaurace.",
    images: ["/images/brand/og-image.jpg"],
    creator: "@herocontent",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const tiktokPixelId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID
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
        {/* TikTok Pixel - Only load in production to avoid polluting analytics */}
        {isProduction && tiktokPixelId && (
          <Script id="tiktok-pixel" strategy="beforeInteractive">
            {`
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
                ttq.load('${tiktokPixelId}');
                ttq.page();
              }(window, document, 'ttq');
            `}
          </Script>
        )}
        {children}
        <AnalyticsWrapper />
      </body>
    </html>
  )
}
