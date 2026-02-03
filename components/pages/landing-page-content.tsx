"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Calendar as CalendarIcon, TrendingUp, Users, Instagram, Facebook, Star, Utensils, Coffee, Beer, Wine, Building, Truck, UtensilsCrossed, MapPin, ArrowUp, Menu, X, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { TypewriterText } from "@/components/typewriter-text"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { trackLeadFormOpen, trackLeadFormSubmit } from "@/lib/analytics"

function ClientImageGallery({ images }: { images: Array<{ src: string; alt: string }> }) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  // Reset carousel to first slide when images change (tab change on mobile)
  useEffect(() => {
    if (api) {
      api.scrollTo(0, true) // Scroll to first slide immediately
      setCurrent(1)
    }
  }, [images, api])

  return (
    <div>
      {/* Mobile Carousel */}
      <div className="md:hidden relative">
        {/* Left scroll indicator */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none flex items-center justify-start pl-2">
          <ChevronLeft className="w-6 h-6 text-muted-foreground/50" />
        </div>
        {/* Right scroll indicator */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none flex items-center justify-end pr-2">
          <ChevronRight className="w-6 h-6 text-muted-foreground/50" />
        </div>
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="flex justify-center px-4 relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full max-h-[64vh] object-contain rounded-lg border border-border"
                  />
                  {/* Blur overlay on top 27% */}
                  <div className="absolute top-0 left-4 right-4 h-[27%] rounded-t-lg pointer-events-none bg-gradient-to-b from-background/25 via-background/15 via-background/10 via-background/5 to-transparent" style={{ backdropFilter: 'blur(3px)' }} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* Carousel Indicators */}
        <div className="flex justify-center items-center gap-3 mt-4">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`h-2.5 rounded-full transition-all touch-manipulation ${
                index + 1 === current ? "w-8 bg-yellow-400" : "w-2.5 bg-muted-foreground/30"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              style={{ minWidth: '10px', minHeight: '10px' }}
            />
          ))}
          <span className="ml-2 text-sm text-muted-foreground">
            {current} / {count}
          </span>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:flex md:justify-center">
        <div className="grid grid-cols-4 gap-4 max-w-fit">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="w-[280px] relative">
              {images[index] ? (
                <>
                <img
                  src={images[index].src}
                  alt={images[index].alt}
                  loading="lazy"
                  className="w-full h-auto object-contain rounded-lg border border-border"
                />
                  {/* Blur overlay on top 27% */}
                  <div className="absolute top-0 left-0 right-0 h-[27%] rounded-t-lg pointer-events-none bg-gradient-to-b from-background/25 via-background/15 via-background/10 via-background/5 to-transparent" style={{ backdropFilter: 'blur(3px)' }} />
                </>
              ) : (
                <div className="w-full h-auto rounded-lg border border-border bg-muted/30" style={{ aspectRatio: '1/1' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * LandingPageContent - Simplified landing page for Meta Ads traffic
 * 
 * This component contains:
 * - Hero with "12 free posts" offer and showcase images
 * - Simplified header (no login/WhatsApp buttons)
 * - All CTAs lead to contact form dialog
 * - Simpler form (no business type dropdown)
 * - Privacy policy checkbox
 * 
 * Use this when you want the simplified lead-generation focused page.
 * 
 * Currently configured as the default index page for Meta Ads traffic.
 * See docs/PAGE_SWAP.md for instructions on how to revert.
 */
export function LandingPageContent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Track when lead form dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      trackLeadFormOpen('landing_page')
    }
  }, [isDialogOpen])
  const [formData, setFormData] = useState({
    businessName: "",
    phone: "+420",
    email: ""
  })
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false)
  const [activeShowcaseTab, setActiveShowcaseTab] = useState("restaurace")
  
  // Tracking data for form submission (captured on page load)
  const [trackingData, setTrackingData] = useState({
    cookies: "",
    referer: "",
    utm_source: "",
    utm_medium: "",
    utm_content: ""
  })

  // Capture tracking data on page load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get UTM params from URL
      const urlParams = new URLSearchParams(window.location.search)
      
      setTrackingData({
        cookies: document.cookie || "",
        referer: document.referrer || "",
        utm_source: urlParams.get('utm_source') || "",
        utm_medium: urlParams.get('utm_medium') || "",
        utm_content: urlParams.get('utm_content') || ""
      })
    }
  }, [])
  
  // Client Showcase tabs data
  const showcaseTabs = [
    { id: "restaurace", label: "Restaurace", icon: Utensils, images: [
      { src: "/images/client-showcase-restaurant-1.jpg", alt: "Příspěvky pro restauraci - první set" },
      { src: "/images/client-showcase-restaurant-2.jpeg", alt: "Příspěvky pro restauraci - druhý set" },
      { src: "/images/client-showcase-restaurant-3.jpeg", alt: "Příspěvky pro restauraci - třetí set" },
      { src: "/images/client-showcase-restaurant-4.jpg", alt: "Příspěvky pro restauraci - čtvrtý set" },
    ]},
    { id: "kavarna", label: "Kavárny", icon: Coffee, images: [
      { src: "/images/client-showcase-cafe-1.jpg", alt: "Příspěvky pro kavárny - první set" },
      { src: "/images/client-showcase-cafe-2.jpg", alt: "Příspěvky pro kavárny - druhý set" },
      { src: "/images/client-showcase-cafe-3.jpg", alt: "Příspěvky pro kavárny - třetí set" },
      { src: "/images/client-showcase-cafe-4.jpg", alt: "Příspěvky pro kavárny - čtvrtý set" },
      { src: "/images/client-showcase-cafe-5.jpg", alt: "Příspěvky pro kavárny - pátý set" },
    ]},
    { id: "pub", label: "Hospody", icon: Beer, images: [
      { src: "/images/client-showcase-pub-1.jpg", alt: "Příspěvky pro hospody - první set" },
      { src: "/images/client-showcase-pub-2.jpg", alt: "Příspěvky pro hospody - druhý set" },
      { src: "/images/client-showcase-pub-3.jpg", alt: "Příspěvky pro hospody - třetí set" },
      { src: "/images/client-showcase-pub-4.jpg", alt: "Příspěvky pro hospody - čtvrtý set" },
    ]},
    { id: "bar", label: "Bary", icon: Wine, images: [
      { src: "/images/client-showcase-bar-1.jpg", alt: "Příspěvky pro bary - první set" },
      { src: "/images/client-showcase-bar-2.jpg", alt: "Příspěvky pro bary - druhý set" },
      { src: "/images/client-showcase-bar-3.jpg", alt: "Příspěvky pro bary - třetí set" },
    ]},
    { id: "hotel", label: "Hotely", icon: Building, images: [
      { src: "/images/client-showcase-hotel-1.jpg", alt: "Příspěvky pro hotely - první set" },
      { src: "/images/client-showcase-hotel-2.jpg", alt: "Příspěvky pro hotely - druhý set" },
      { src: "/images/client-showcase-hotel-3.jpg", alt: "Příspěvky pro hotely - třetí set" },
    ]},
    { id: "rozvoz", label: "Rozvoz", icon: Truck, images: [
      { src: "/images/client-showcase-delivery-1.jpeg", alt: "Příspěvky pro rozvoz - pizza s přílohami" },
      { src: "/images/client-showcase-delivery-2.jpg", alt: "Příspěvky pro rozvoz - burgery a hlavní chody" },
      { src: "/images/client-showcase-delivery-3.jpg", alt: "Příspěvky pro rozvoz - zákaznická zkušenost" },
      { src: "/images/client-showcase-delivery-4.jpg", alt: "Příspěvky pro rozvoz - čtvrtý set" },
    ]},
  ];
  const activeShowcaseTabData = showcaseTabs.find(tab => tab.id === activeShowcaseTab);

  // Scroll to top on page load/refresh (prevents auto-scroll to hash sections)
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      // Clear hash from URL if present to prevent scroll restoration
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      }
    })
  }, [])

  // Preload client showcase images in background (Apple best practice)
  useEffect(() => {
    const clientShowcaseImages = [
      "/images/client-showcase-restaurant-1.jpg",
      "/images/client-showcase-restaurant-2.jpeg",
      "/images/client-showcase-restaurant-3.jpeg",
      "/images/client-showcase-restaurant-4.jpg",
      "/images/client-showcase-cafe-1.jpg",
      "/images/client-showcase-cafe-2.jpg",
      "/images/client-showcase-cafe-3.jpg",
      "/images/client-showcase-cafe-4.jpg",
      "/images/client-showcase-cafe-5.jpg",
      "/images/client-showcase-bar-1.jpg",
      "/images/client-showcase-bar-2.jpg",
      "/images/client-showcase-bar-3.jpg",
      "/images/client-showcase-pub-1.jpg",
      "/images/client-showcase-pub-2.jpg",
      "/images/client-showcase-pub-3.jpg",
      "/images/client-showcase-pub-4.jpg",
      "/images/client-showcase-hotel-1.jpg",
      "/images/client-showcase-hotel-2.jpg",
      "/images/client-showcase-hotel-3.jpg",
      "/images/client-showcase-hotel-4.jpg",
      "/images/client-showcase-delivery-1.jpeg",
      "/images/client-showcase-delivery-2.jpg",
      "/images/client-showcase-delivery-3.jpg",
      "/images/client-showcase-delivery-4.jpg",
    ]

    // Preload images after initial page load
    const preloadImages = () => {
      clientShowcaseImages.forEach((src) => {
        const link = document.createElement("link")
        link.rel = "preload"
        link.as = "image"
        link.href = src
        document.head.appendChild(link)
      })
    }

    // Delay preloading to not block initial render
    const timeoutId = setTimeout(preloadImages, 1000)

    return () => clearTimeout(timeoutId)
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: typeof formData) => ({ ...prev, [field]: value }))
    setSubmitError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setSubmitSuccess(false)
    
    // Validate all required fields
    if (!formData.businessName || !formData.phone || !formData.email || !privacyPolicyAccepted) {
      setSubmitError("Prosím vyplňte všechna povinná pole a souhlaste s podmínkami ochrany osobních údajů")
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
      
      if (!webhookUrl) {
        console.error('NEXT_PUBLIC_N8N_WEBHOOK_URL not configured')
        throw new Error('Služba není dostupná. Zkuste to prosím později.')
      }

      // Build payload matching Tilda format for n8n compatibility
      const webhookPayload = {
        name: formData.businessName,
        company: formData.businessName,
        phone: formData.phone,
        email: formData.email,
        COOKIES: trackingData.cookies,
        referer: trackingData.referer,
        utm_source: trackingData.utm_source,
        utm_medium: trackingData.utm_medium,
        utm_content: trackingData.utm_content,
        source: 'herocontent-lp-2026',
        timestamp: new Date().toISOString(),
      }

      // Send directly to n8n webhook (client-side)
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload),
      })

      if (!response.ok) {
        throw new Error('Něco se pokazilo při odesílání')
      }

      setSubmitSuccess(true)
      
      // Track successful form submission
      trackLeadFormSubmit('landing')
      
      // Close dialog and reset form after a short delay
      setTimeout(() => {
        setIsDialogOpen(false)
        setFormData({
          businessName: "",
          phone: "+420",
          email: ""
        })
        setPrivacyPolicyAccepted(false)
        setSubmitSuccess(false)
      }, 2000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError(error instanceof Error ? error.message : 'Něco se pokazilo. Zkuste to prosím znovu.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "name": "HeroContent",
    "description": "Marketingová agentura pro gastro podniky. Profesionální reklama pro gastro, marketing pro restaurace a správa sociálních sítí pro restaurace. Pomůžeme vám oslovit nové zákazníky a zvýšit tržby.",
    "url": "https://herocontent.ai",
    "logo": "https://herocontent.ai/images/HC_Logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Korunní 2569/108",
      "addressLocality": "Praha",
      "addressRegion": "Praha",
      "postalCode": "101 00",
      "addressCountry": "CZ"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+420-296-183-097",
      "contactType": "customer service",
      "email": "welcome@herocontent.ai",
      "availableLanguage": ["Czech", "Slovak"]
    },
    "sameAs": [
      "https://www.facebook.com/herocontent.studio",
      "https://www.instagram.com/herocontent.ai/"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Czech Republic"
    },
    "serviceType": ["Marketingová agentura pro gastro", "Reklama pro gastro", "Marketing pro restaurace", "Správa sociálních sítí pro restaurace"]
  }

  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": ["Marketingová agentura pro gastro", "Reklama pro gastro", "Marketing pro restaurace", "Správa sociálních sítí pro restaurace"],
    "provider": {
      "@type": "Organization",
      "name": "HeroContent"
    },
    "description": "Marketingová agentura pro gastro podniky. Profesionální reklama pro gastro, marketing pro restaurace a správa sociálních sítí pro restaurace. Od 2950 Kč měsíčně.",
    "areaServed": {
      "@type": "Country",
      "name": "Czech Republic"
    },
    "offers": {
      "@type": "Offer",
      "price": "2950",
      "priceCurrency": "CZK",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "2950",
        "priceCurrency": "CZK",
        "unitCode": "MON"
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }}
      />
      <div className="max-w-[1920px] mx-auto">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img 
              src="/images/HC_Logo.png" 
              alt="HeroContent Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-semibold hidden md:inline">HeroContent</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#funkce" className="text-sm hover:text-yellow-400 transition-colors">
              Služby
            </Link>
            <Link href="#cenik" className="text-sm hover:text-yellow-400 transition-colors">
              Ceník
            </Link>
            <Link href="#klienti" className="text-sm hover:text-yellow-400 transition-colors">
              Ukázka
            </Link>
            <Link href="#o-nas" className="text-sm hover:text-yellow-400 transition-colors">
              O nás
            </Link>
          </nav>
          <div className="flex items-center gap-2 md:gap-3">
            <Button 
              className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold text-sm px-4 h-9 md:h-auto md:px-6 cursor-pointer"
              onClick={() => setIsDialogOpen(true)}
            >
              Vyzkoušet zdarma
            </Button>
            {/* Mobile Menu - top right */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="w-10 h-10">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Otevřít menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-auto w-full p-4 pb-6">
                <nav className="flex flex-col gap-3">
                  <Link 
                    href="#funkce" 
                    className="text-lg font-medium hover:text-yellow-400 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Služby
                  </Link>
                  <Link 
                    href="#cenik" 
                    className="text-lg font-medium hover:text-yellow-400 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Ceník
                  </Link>
                  <Link 
                    href="#klienti" 
                    className="text-lg font-medium hover:text-yellow-400 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Ukázka
                  </Link>
                  <Link 
                    href="#o-nas" 
                    className="text-lg font-medium hover:text-yellow-400 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    O nás
                  </Link>
                  <div className="pt-3 border-t mt-2">
                    <Button
                      onClick={() => {
                        setIsDialogOpen(true)
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold text-base px-6 h-12 rounded-lg cursor-pointer"
                    >
                      Vyzkoušet zdarma
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 pb-12 sm:pb-6 lg:py-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Headline and content */}
          <div className="space-y-6 order-1 lg:order-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              Profesionální<br />
              sociální sítě<br />
              a reklama jen<br />
              za 2 950 Kč pro<br />
              {/* Static text for SEO - all phrases visible to search engines */}
              <span className="sr-only">vaši Restauraci, vaši Kavárnu, váš Pub, váš Hotel, váš Bar</span>
              <TypewriterText
                phrases={[
                  { prefix: "vaši ", suffix: "Restauraci" },
                  { prefix: "vaši ", suffix: "Kavárnu" },
                  { prefix: "váš ", suffix: "Pub" },
                  { prefix: "váš ", suffix: "Hotel" },
                  { prefix: "váš ", suffix: "Bar" },
                ]}
                typingSpeed={100}
                deletingSpeed={80}
                pauseDuration={1500}
              />
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nahraďte drahé marketingové agentury umělou inteligencí a získejte nové zákazníky díky efektivní správě sociálních sítí pro gastro podniky.
            </p>
          </div>
          
          {/* Right Column - Free Content Block */}
          <div className="order-2 lg:order-2 w-full">
            <div className="bg-yellow-400/10 border-2 border-yellow-400/50 rounded-lg p-4 sm:p-5 lg:p-4 flex flex-col gap-3 lg:gap-3 lg:scale-110">
              {/* Images Container - Mobile: mobile image, Desktop: combined image */}
              <div className="min-h-[300px] sm:min-h-[400px] lg:min-h-0 order-2 lg:order-1">
                <div className="w-full rounded-lg overflow-hidden border border-border bg-background flex items-center justify-center p-0 lg:w-fit lg:mx-auto">
                  {/* Mobile image */}
                  <img
                    src="/images/Story showcase mobile.jpg"
                    alt="Ukázka 12 příspěvků pro sociální sítě"
                    className="w-full h-auto lg:hidden object-contain"
                    loading="lazy"
                  />
                  {/* Desktop image */}
                  <img
                    src="/images/story-showcase-combined.jpg"
                    alt="Ukázka 12 příspěvků pro sociální sítě"
                    className="hidden lg:block lg:w-auto lg:h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
              {/* Text and CTA - Mobile: stacked, Desktop: inline */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4 flex-shrink-0 order-1 lg:order-2">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl sm:text-3xl lg:text-xl font-bold mb-2 lg:mb-1">
                    12 příspěvků zdarma pro vaše sítě
                  </h2>
                  <p className="text-sm sm:text-base lg:text-sm text-muted-foreground">
                    Získejte ukázku obsahu na míru vašemu podniku
                  </p>
                </div>
                {/* CTA Button - Right side on desktop */}
                <div className="flex justify-center lg:justify-end flex-shrink-0">
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold px-6 sm:px-8 h-11 sm:h-12 lg:h-10 lg:px-6 text-base sm:text-lg lg:text-sm cursor-pointer"
                  >
                    Získat zdarma
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Wall Section */}
      <section className="py-4 border-y border-border relative" aria-labelledby="logo-wall-heading">
        <div className="w-full relative overflow-hidden">
          <h2 id="logo-wall-heading" className="sr-only">
            Naši klienti
          </h2>
          {/* Gradient overlays for fade effect - positioned at screen edges (hidden on mobile) */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-background via-background/95 to-transparent z-20 pointer-events-none" />
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-background via-background/95 to-transparent z-20 pointer-events-none" />
          
          {/* Scrolling logo container */}
          <div className="flex gap-8 animate-scroll relative z-10 px-4 sm:px-6 lg:px-8">
              {/* Logo files array */}
              {[
                "logo_dhaba.png",
                "logo_coal_&_fire.png",
                "logo_ekant.png",
                "logo_futrovna.png",
                "logo_my_bistro_cafe.png",
                "logo_pizzamat.png",
                "logo_pizzburg.png",
                "logo_udobremyslenky.png",
                "logo_black_sheep.png",
                "logo_placeholder.png",
              ].map((logo, i) => (
                <div
                  key={`logo-1-${i}`}
                  className="flex-shrink-0 w-32 h-32 bg-background rounded-lg flex items-center justify-center border border-border p-4"
                >
                  <img
                    src={`/logos/${logo}`}
                    alt={`Restaurant logo ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {[
                "logo_dhaba.png",
                "logo_coal_&_fire.png",
                "logo_ekant.png",
                "logo_futrovna.png",
                "logo_my_bistro_cafe.png",
                "logo_pizzamat.png",
                "logo_pizzburg.png",
                "logo_udobremyslenky.png",
                "logo_black_sheep.png",
                "logo_placeholder.png",
              ].map((logo, i) => (
                <div
                  key={`logo-2-${i}`}
                  className="flex-shrink-0 w-32 h-32 bg-background rounded-lg flex items-center justify-center border border-border p-4"
                >
                  <img
                    src={`/logos/${logo}`}
                    alt={`Restaurant logo ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="funkce" className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Jak funguje správa sociálních sítí pro restaurace</h2>
            <p className="text-xl text-muted-foreground">Kompletní správa sociálních sítí pod jednou střechou, aby vám šetřila čas a přiváděla nové zákazníky.</p>
          </div>

          <div className="max-w-7xl mx-auto space-y-[1.8rem]">
            {/* Feature 1: Photo Editing - Image on right */}
            <article className="flex flex-col lg:grid lg:grid-cols-[2fr_3fr] gap-6 lg:gap-12 lg:items-start min-h-[400px] lg:min-h-[500px] max-h-[600px] lg:max-h-[550px] overflow-hidden">
              {/* Headline - Mobile: order 1, Desktop: part of text column (hidden on desktop, shown in text column) */}
              <div className="flex items-center gap-4 order-1 lg:hidden flex-shrink-0">
                <div className="inline-block p-3 bg-yellow-400/10 rounded-xl" aria-hidden="true">
                  <svg
                    className="w-8 h-8 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold">Profesionální fotky pro sociální sítě</h3>
              </div>
              {/* Photo/Mockup - Mobile: order 2, Desktop: order 2 (right side) */}
              <div className="relative order-2 lg:order-2 flex-shrink-0 h-[280px] lg:h-[400px] overflow-visible">
                <div className="grid grid-cols-2 gap-3 lg:gap-4 h-full relative">
                  <div className="rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm h-full">
                    <img
                      src="/images/feature-1-photo-before.jpeg"
                      alt="Původní fotografie jídla před profesionální úpravou pro sociální sítě restaurací"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Arrow pointing from picture 1 to picture 2 */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block">
                    <div className="flex items-center justify-center">
                      <svg
                        className="w-8 h-8 lg:w-12 lg:h-12 text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm h-full">
                    <img
                      src="/images/feature-1-photo-after.jpeg"
                      alt="Profesionálně upravená fotografie jídla pro sociální sítě gastro podniků pomocí AI"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* Text Content Column - Mobile: order 3,4 | Desktop: order 1 (left side) */}
              <div className="flex flex-col space-y-6 order-3 lg:order-1 flex-1 min-h-0">
                {/* Headline - Desktop only (hidden on mobile, shown above) */}
                <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
                  <div className="inline-block p-3 bg-yellow-400/10 rounded-xl" aria-hidden="true">
                    <svg
                      className="w-8 h-8 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold">Profesionální fotky pro sociální sítě</h3>
                </div>
                {/* Text - Mobile: order 3, Desktop: part of text column */}
                <div className="text-lg text-muted-foreground leading-relaxed flex-shrink-0 space-y-4">
                  <p>
                    Upravíme vaše fotky tak, aby na sociálních sítích působily profesionálně a konzistentně. Díky tomu ušetříte za drahé focení a grafiku a váš podnik bude vypadat kvalitně v každém příspěvku.
                  </p>
                </div>
                {/* CTA - Mobile: order 4, Desktop: part of text column */}
                <div className="pt-2 flex-shrink-0 mt-auto">
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-8 rounded-lg font-semibold cursor-pointer"
                  >
                    Vyzkoušet zdarma
                  </Button>
                </div>
              </div>
            </article>

            {/* Feature 2: Advertising - Image on right */}
            <article className="flex flex-col lg:grid lg:grid-cols-[2fr_3fr] gap-6 lg:gap-12 lg:items-start min-h-[400px] lg:min-h-[500px] max-h-[600px] lg:max-h-[550px] overflow-hidden">
              {/* Headline - Mobile: order 1, Desktop: part of text column (hidden on desktop, shown in text column) */}
              <div className="flex items-center gap-4 order-1 lg:hidden flex-shrink-0">
                <div className="inline-block p-3 bg-yellow-400/10 rounded-xl" aria-hidden="true">
                  <svg
                    className="w-8 h-8 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold">Tvorba příspěvků včetně textů a popisků</h3>
              </div>
              {/* Photo/Mockup - Mobile: order 2, Desktop: order 2 (right side) */}
              <div className="relative order-2 lg:order-2 flex-shrink-0 h-[280px] lg:h-[400px] overflow-hidden">
                <div className="grid grid-cols-3 gap-3 lg:gap-4 h-full">
                  {/* Instagram Post */}
                  <div className="rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm h-full">
                    <img
                      src="/images/feature-2-post-chicken-burger.png"
                      alt="Příklad Instagram příspěvku pro restaurace - profesionální tvorba obsahu pro sociální sítě"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Instagram Story */}
                  <div className="rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm h-full">
                    <img
                      src="/images/feature-2-story-pizza.png"
                      alt="Příklad Instagram story pro gastro podniky - správa sociálních sítí pro restaurace"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Reel Video */}
                  <div className="rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm h-full">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      aria-label="Instagram reel video pro restaurace vytvořený pomocí AI - marketing pro gastro podniky"
                    >
                      <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%2810%29-6yCMygZ2zRGG95sljQZJUfNX1e1VIE.mp4" type="video/mp4" />
                      Váš prohlížeč nepodporuje video element.
                    </video>
                  </div>
                </div>
              </div>
              {/* Text Content Column - Mobile: order 3,4 | Desktop: order 1 (left side) */}
              <div className="flex flex-col space-y-6 order-3 lg:order-1 flex-1 min-h-0">
                {/* Headline - Desktop only (hidden on mobile, shown above) */}
                <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
                  <div className="inline-block p-3 bg-yellow-400/10 rounded-xl" aria-hidden="true">
                    <svg
                      className="w-8 h-8 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold">Tvorba příspěvků včetně textů a popisků</h3>
                </div>
                {/* Text - Mobile: order 3, Desktop: part of text column */}
                <div className="text-lg text-muted-foreground leading-relaxed flex-shrink-0 space-y-4">
                  <p>
                    Texty a popisky připravíme kompletně za vás. Projdeme si váš podnik, nabídku a styl komunikace a na základě toho vytvoříme příspěvky, které dávají smysl vašim zákazníkům. Vy se o nic nestaráte, obsah vzniká automaticky.
                  </p>
                </div>
                {/* CTA - Mobile: order 4, Desktop: part of text column */}
                <div className="pt-2 flex-shrink-0 mt-auto">
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-8 rounded-lg font-semibold cursor-pointer"
                  >
                    Vyzkoušet zdarma
                  </Button>
                </div>
              </div>
            </article>

            {/* Feature 3: Professional Posts - Image on right */}
            <article className="flex flex-col lg:grid lg:grid-cols-[2fr_3fr] gap-6 lg:gap-12 lg:items-start min-h-[400px] lg:min-h-[500px] max-h-[600px] lg:max-h-[550px] overflow-hidden">
              {/* Headline - Mobile: order 1, Desktop: part of text column (hidden on desktop, shown in text column) */}
              <div className="flex items-center gap-4 order-1 lg:hidden flex-shrink-0">
                <div className="inline-block p-3 bg-yellow-400/10 rounded-xl" aria-hidden="true">
                  <svg
                    className="w-8 h-8 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold">Obsah na celý měsíc připravený dopředu</h3>
              </div>
              {/* Photo/Mockup - Mobile: order 2, Desktop: order 2 (right side) */}
              <div className="relative order-2 lg:order-2 flex-shrink-0 w-full h-[280px] lg:h-[400px] overflow-hidden">
                <div className="grid grid-cols-[1fr_1fr] gap-3 lg:gap-4 h-full">
                  {/* WhatsApp Mockup - Same size as Feature 2 content */}
                  <div className="rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm h-full">
                    <div className="bg-[#e5ddd5] h-full w-full p-3 flex flex-col">
                      <div className="flex-1 w-full overflow-y-auto">
                        <div className="flex flex-col justify-end min-h-full space-y-2 pb-2">
                          {/* Message 1: From HeroContent */}
                          <div className="flex items-start gap-2 w-full">
                            <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-black">HC</span>
                            </div>
                            <div className="flex flex-col items-start max-w-[75%]">
                              <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                                <p className="text-xs text-gray-800 m-0">Posíláme vám plán příspěvků na příští měsíc</p>
                              </div>
                              <span className="text-[9px] text-gray-500 mt-0.5">12:34</span>
                            </div>
                          </div>
                          {/* Message 2: From Client */}
                          <div className="flex items-start gap-2 w-full justify-end">
                            <div className="flex flex-col items-end max-w-[75%]">
                              <div className="bg-[#dcf8c6] rounded-lg px-3 py-2 shadow-sm">
                                <p className="text-xs text-gray-800 m-0">Schváleno</p>
                              </div>
                              <span className="text-[9px] text-gray-500 mt-0.5">12:35</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Calendar Picture */}
                  <div className="rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm h-full flex items-start justify-center">
                    <img
                      src="/images/feature-3-calendar.jpg"
                      alt="Kalendář příspěvků pro sociální sítě restaurací - plánování obsahu na celý měsíc"
                      loading="lazy"
                      className="w-full h-full object-contain object-top"
                    />
                  </div>
                </div>
              </div>
              {/* Text Content Column - Mobile: order 3,4 | Desktop: order 1 (left side) */}
              <div className="flex flex-col space-y-6 order-3 lg:order-1 flex-1 min-h-0">
                {/* Headline - Desktop only (hidden on mobile, shown above) */}
                <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
                  <div className="inline-block p-3 bg-yellow-400/10 rounded-xl" aria-hidden="true">
                    <svg
                      className="w-8 h-8 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold">Obsah na celý měsíc připravený dopředu</h3>
                </div>
                {/* Text - Mobile: order 3, Desktop: part of text column */}
                <div className="text-lg text-muted-foreground leading-relaxed flex-shrink-0 space-y-4">
                  <p>
                    Veškerý obsah připravíme dopředu na celý měsíc. Máte jasno, co a kdy se bude publikovat, bez každodenního řešení sociálních sítí. Žádné prázdné dny, žádný chaos, všechno běží podle plánu.
                  </p>
                </div>
                {/* CTA - Mobile: order 4, Desktop: part of text column */}
                <div className="pt-2 flex-shrink-0 mt-auto">
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-8 rounded-lg font-semibold cursor-pointer"
                  >
                    Vyzkoušet zdarma
                  </Button>
                </div>
              </div>
            </article>

            {/* Feature 4: Nastavíme reklamu - Image on right */}
            <article className="flex flex-col lg:grid lg:grid-cols-[2fr_3fr] gap-6 lg:gap-12 lg:items-start min-h-[400px] lg:min-h-[500px] max-h-[600px] lg:max-h-[550px] overflow-hidden">
              {/* Headline - Mobile: order 1, Desktop: part of text column (hidden on desktop, shown in text column) */}
              <div className="flex items-center gap-4 order-1 lg:hidden flex-shrink-0">
                <div className="inline-block p-3 bg-yellow-400/10 rounded-xl" aria-hidden="true">
                  <svg
                    className="w-8 h-8 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold">Efektivní reklama pro váš podnik</h3>
              </div>
              {/* Photo/Mockup - Mobile: order 2, Desktop: order 2 (right side) */}
              <div className="relative order-2 lg:order-2 flex-shrink-0 h-[280px] lg:h-[400px] overflow-hidden">
                <div className="grid grid-cols-[1fr_1fr] gap-3 lg:gap-4 h-full">
                  {/* WhatsApp Mockup - Same size as Feature 2 content */}
                  <div className="rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm h-full">
                    <div className="bg-[#e5ddd5] h-full w-full p-3 flex flex-col">
                      <div className="flex-1 w-full overflow-y-auto">
                        <div className="flex flex-col justify-end min-h-full space-y-2 pb-2">
                          {/* Message 1: From Client */}
                          <div className="flex items-start gap-2 w-full justify-end">
                            <div className="flex flex-col items-end max-w-[75%]">
                              <div className="bg-[#dcf8c6] rounded-lg px-3 py-2 shadow-sm">
                                <p className="text-xs text-gray-800 m-0">Příští týden máme u nás akci, udělejte mi na ni reklamu.</p>
                              </div>
                              <span className="text-[9px] text-gray-500 mt-0.5">12:34</span>
                            </div>
                          </div>
                          {/* Message 2: From HeroContent */}
                          <div className="flex items-start gap-2 w-full">
                            <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-black">HC</span>
                            </div>
                            <div className="flex flex-col items-start max-w-[75%]">
                              <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                                <p className="text-xs text-gray-800 m-0">
                                  Text: Tématika akce, doba trvání a více detailů<br />
                                  Cílení: Okruh 1km od vašeho podniku<br />
                                  Rozpočet: 500 Kč<br />
                                  <span className="mt-1 block">Je to takto v pořádku?</span>
                                </p>
                              </div>
                              <span className="text-[9px] text-gray-500 mt-0.5">12:35</span>
                            </div>
                          </div>
                          {/* Message 3: From Client */}
                          <div className="flex items-start gap-2 w-full justify-end">
                            <div className="flex flex-col items-end max-w-[75%]">
                              <div className="bg-[#dcf8c6] rounded-lg px-3 py-2 shadow-sm">
                                <p className="text-xs text-gray-800 m-0">Ano</p>
                              </div>
                              <span className="text-[9px] text-gray-500 mt-0.5">12:36</span>
                            </div>
                          </div>
                          {/* Message 4: From HeroContent */}
                          <div className="flex items-start gap-2 w-full">
                            <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-black">HC</span>
                            </div>
                            <div className="flex flex-col items-start max-w-[75%]">
                              <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                                <p className="text-xs text-gray-800 m-0">Skvěle, zasíláme vám reklamní příspěvek ke schválení</p>
                              </div>
                              <span className="text-[9px] text-gray-500 mt-0.5">12:37</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Ad Creative */}
                  <div className="rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm h-full">
                    <video
                      src="/video/mock_ad.MP4"
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      aria-label="Reklamní kampaň pro restaurace na Facebooku a Instagramu - efektivní reklama pro gastro podniky"
                    />
                  </div>
                </div>
              </div>
              {/* Text Content Column - Mobile: order 3,4 | Desktop: order 1 (left side) */}
              <div className="flex flex-col space-y-6 order-3 lg:order-1 flex-1 min-h-0">
                {/* Headline - Desktop only (hidden on mobile, shown above) */}
                <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
                  <div className="inline-block p-3 bg-yellow-400/10 rounded-xl" aria-hidden="true">
                    <svg
                      className="w-8 h-8 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold">Efektivní reklama pro váš podnik</h3>
                </div>
                {/* Text - Mobile: order 3, Desktop: part of text column */}
                <div className="text-lg text-muted-foreground leading-relaxed flex-shrink-0 space-y-4">
                  <p>
                    Pomocí reklamy dostaneme váš podnik k lidem, kteří o vás ještě neslyšeli. Kampaně nastavíme, připravíme návrhy a optimalizujeme jejich výkon. Vy jen potvrdíte a reklamy běží bez složité komunikace a technických starostí.
                  </p>
                </div>
                {/* CTA - Mobile: order 4, Desktop: part of text column */}
                <div className="pt-2 flex-shrink-0 mt-auto">
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-8 rounded-lg font-semibold cursor-pointer"
                  >
                    Vyzkoušet zdarma
                  </Button>
                </div>
              </div>
            </article>

            {/* Feature 5: Automaticky zveřejníme vaše menu - Image on right */}
            <article className="flex flex-col lg:grid lg:grid-cols-[2fr_3fr] gap-6 lg:gap-12 lg:items-start min-h-[400px] lg:min-h-[500px] max-h-[600px] lg:max-h-[550px] overflow-hidden">
              {/* Headline - Mobile: order 1, Desktop: part of text column (hidden on desktop, shown in text column) */}
              <div className="flex items-center gap-4 order-1 lg:hidden flex-shrink-0">
                <div className="inline-block p-3 bg-yellow-400/10 rounded-xl" aria-hidden="true">
                  <svg
                    className="w-8 h-8 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold">Automatické zveřejňování denního menu</h3>
              </div>
              {/* Photo/Mockup - Mobile: order 2, Desktop: order 2 (right side) */}
              <div className="relative order-2 lg:order-2 flex-shrink-0 h-[280px] lg:h-[400px] overflow-hidden">
                <div className="grid grid-cols-[1fr_1fr] gap-3 lg:gap-4 h-full">
                  {/* WhatsApp Mockup - Same size as Feature 2 content */}
                  <div className="rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm h-full">
                    <div className="bg-[#e5ddd5] h-full w-full p-3 flex flex-col">
                      <div className="flex-1 w-full overflow-y-auto">
                        <div className="flex flex-col justify-end min-h-full space-y-2 pb-2">
                          {/* Message 1: From Client */}
                          <div className="flex items-start gap-2 w-full justify-end">
                            <div className="flex flex-col items-end max-w-[75%]">
                              <div className="bg-[#dcf8c6] rounded-lg px-3 py-2 shadow-sm">
                                <p className="text-xs text-gray-800 m-0">Dnes máme na jídelníčku: Kuřecí vývar s celestýnskými nudlemi, Čevabčiči, brambory, hořčice 175 Kč, Kuřecí asijská směs, nudle 169 Kč, BBQ trhané maso se sýrem a hranolkami 175 Kč</p>
                              </div>
                              <span className="text-[9px] text-gray-500 mt-0.5">12:34</span>
                            </div>
                          </div>
                          {/* Message 2: From HeroContent */}
                          <div className="flex items-start gap-2 w-full">
                            <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-black">HC</span>
                            </div>
                            <div className="flex flex-col items-start max-w-[75%]">
                              <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                                <p className="text-xs text-gray-800 m-0">Skvěle, vytvořili jsme vaše denní menu a zvěřejnili na Facebooku a Instagramu</p>
                              </div>
                              <span className="text-[9px] text-gray-500 mt-0.5">12:35</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Daily Menu Created Automatically */}
                  <div className="rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm h-full">
                    <img
                      src="/images/feature-5-daily-menu.png"
                      alt="Automaticky vytvořené denní menu pro sociální sítě restaurací - správa obsahu pro gastro podniky"
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
              {/* Text Content Column - Mobile: order 3,4 | Desktop: order 1 (left side) */}
              <div className="flex flex-col space-y-6 order-3 lg:order-1 flex-1 min-h-0">
                {/* Headline - Desktop only (hidden on mobile, shown above) */}
                <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
                  <div className="inline-block p-3 bg-yellow-400/10 rounded-xl" aria-hidden="true">
                    <svg
                      className="w-8 h-8 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold">Automatické zveřejňování denního menu</h3>
                </div>
                {/* Text - Mobile: order 3, Desktop: part of text column */}
                <div className="text-lg text-muted-foreground leading-relaxed flex-shrink-0 space-y-4">
                  <p>
                    Denní menu zveřejňujeme automaticky ve formě přehledné grafiky. Aktuální nabídku si vezmeme z vašeho webu, zprávy na WhatsAppu nebo z PDF souboru a ve správný čas ji publikujeme na sociálních sítích. Bez ruční práce a bez řešení detailů.
                  </p>
                </div>
                {/* CTA - Mobile: order 4, Desktop: part of text column */}
                <div className="pt-2 flex-shrink-0 mt-auto">
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-8 rounded-lg font-semibold cursor-pointer"
                  >
                    Vyzkoušet zdarma
                  </Button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="proc-my" className="bg-muted/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Jak vám profesionální reklama pro restaurace přivede hosty?</h2>
            <p className="text-xl text-muted-foreground">Efektivní cílená lokální reklama pro gastro podniky</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Přilákejte zákazníky na denní menu",
                description:
                  "Zobrazujeme vaše denní menu lidem ve vašem okolí ve chvíli, kdy rozhodují, kde poobědvat.",
                caseHeadline: "20% více prodaných obědů",
                caseSubheadline: "Díky cílené reklamě na denní menu v době oběda",
                icon: UtensilsCrossed,
                logo: "logo_cube_eatery.jpg",
              },
              {
                title: "Oslovte místní zákazníky akcemi",
                description: "Zviditelňujeme vaše speciální akce, živou hudbu a speciality ve vašem okolí.",
                caseHeadline: "Naplnění pobočky hned první den",
                caseSubheadline: "Reklamní kampaň na speciální akci s živou hudbou",
                icon: CalendarIcon,
                logo: "logo_dhaba.png",
              },
              {
                title: "Přitáhněte turisty",
                description:
                  "Cílíme reklamu i na turisty ve vašem okolí, kteří touží poznat místní kuchyni a atmosféru.",
                caseHeadline: "Větší návštěvnost od turistů",
                caseSubheadline: "Cílená reklama na turisty v okolí podniku",
                icon: MapPin,
                logo: "logo_pivni_privstav.png",
              },
            ].map((benefit, i) => {
              const IconComponent = benefit.icon
              return (
                <Card key={i} className="border-border hover:border-yellow-400 transition-colors flex flex-col">
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-yellow-400" />
                      </div>
                      <h3 className="text-xl font-semibold">{benefit.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">{benefit.description}</p>
                    <div className="pt-4 border-t border-border mt-auto">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-yellow-400 mb-1">{benefit.caseHeadline}</p>
                          <p className="text-sm text-muted-foreground">{benefit.caseSubheadline}</p>
                        </div>
                        {benefit.logo && (
                          <img 
                            src={`/logos/${benefit.logo}`} 
                            alt="Restaurant logo"
                            loading="lazy"
                            className="w-16 h-16 object-contain flex-shrink-0"
                          />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <div className="text-center mt-12">
            <p className="text-2xl font-semibold mb-6">
              100 Kč denně vám pomůže oslovit více než <span className="text-yellow-400">1 000 lidí</span> ve vašem
              okolí!
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="cenik" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Vyberte si plán pro váš podnik</h2>
          </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Standard Tier */}
          <Card className="border-yellow-400/50 shadow-xl relative flex flex-col">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">Nejoblíbenější</span>
            </div>
            <CardContent className="p-8 flex flex-col flex-1 space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Standard</h3>
                <div className="text-4xl font-bold mb-2">
                  2 950 Kč<span className="text-lg font-normal text-muted-foreground">/měsíčně</span>
                </div>
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <h4 className="font-semibold mb-3">Výstupy</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">8 příspěvků měsíčně</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">15 stories měsíčně</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">2 příspěvky nebo stories na přání</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">1 reklamní kampaň měsíčně</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">publikace na Facebooku a Instagramu</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">správa přes WhatsApp</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">pravidelný reporting</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold mt-auto cursor-pointer"
                onClick={() => setIsDialogOpen(true)}
              >
                Vyzkoušet zdarma
              </Button>
            </CardContent>
          </Card>

          {/* Premium Tier */}
          <Card className="border-border flex flex-col">
            <CardContent className="p-8 flex flex-col flex-1 space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <div className="text-4xl font-bold mb-2">
                  4 450 Kč<span className="text-lg font-normal text-muted-foreground">/měsíčně</span>
                </div>
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <h4 className="font-semibold mb-3">Výstupy</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">12 příspěvků měsíčně</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">30 stories měsíčně</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">2 reklamní kampaň měsíčně</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">2 reels videa měsíčně</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">publikace na Facebooku a Instagramu</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">správa přes WhatsApp</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">pravidelný reporting</span>
                    </div>
                      </div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold mt-auto cursor-pointer"
                onClick={() => setIsDialogOpen(true)}
              >
                Vyzkoušet zdarma
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Client Showcase Section */}
      <section id="klienti" className="py-10 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4">Ukázka naší práce</h2>
          <p className="text-xl text-muted-foreground text-center mb-16">
            Podívejte se, jak by mohl vypadat Facebook a Instagram vašeho podniku.
          </p>

          {/* Client Showcase Tabs - Rebuilt from scratch with custom state */}
          {/* Tab Navigation - Clean grid layout (2 rows on mobile, 1 row on desktop) */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6 md:mb-4 w-full">
            {showcaseTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeShowcaseTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveShowcaseTab(tab.id)}
                  className={`
                    flex items-center justify-center gap-1.5
                    px-2 py-2 rounded-md
                    text-xs md:text-sm font-medium
                    transition-colors
                    ${isActive 
                      ? 'bg-yellow-400 text-black' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }
                  `}
                >
                  <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          {activeShowcaseTabData && (
            <ClientImageGallery images={activeShowcaseTabData.images} />
          )}
        </div>
      </section>

      {/* O nás Section */}
      <section id="o-nas" className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">O nás</h2>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Founders Grid */}
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-12">
              {/* Elisey */}
              <div className="flex flex-col items-center text-center">
                <div className="w-full aspect-square max-w-[300px] mb-6 rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm">
                  <img
                    src="/images/founder-elisey.jpg"
                    alt="Elisey"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4">Elisey</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Začínal jako majitel restaurace a firmy s krabičkovou dietou, později rozjel úspěšný projekt pro rychlé doručování potravin. Díky zkušenostem z obou světů pochopil, že gastro podniky potřebují být vidět na sociálních sítích, ale jejich majitelé na to často nemají čas.
                </p>
              </div>

              {/* David */}
              <div className="flex flex-col items-center text-center">
                <div className="w-full aspect-square max-w-[300px] mb-6 rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm">
                  <img
                    src="/images/founder-david.jpg"
                    alt="David"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4">David</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Vedl marketingovou agenturu i reklamní platformu, kde pomáhal desítkám značek růst díky spolupráci s influencery. Uvědomil si, že velká část práce agentur se dá zautomatizovat a nabídnout restauracím za zlomek ceny.
                </p>
              </div>

              {/* Anton */}
              <div className="flex flex-col items-center text-center">
                <div className="w-full aspect-square max-w-[300px] mb-6 rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm">
                  <img
                    src="/images/founder-anton.jpg"
                    alt="Anton"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4">Anton</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Byl ředitelem vývoje v několika technologických projektech a mimo to je také expert na umělou inteligenci. Právě jeho technologie se stala srdcem HeroContentu – systému, který restauracím přivádí více hostů efektivněji než kdy dřív.
                </p>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-xl lg:text-2xl font-semibold leading-relaxed text-foreground">
                Naším cílem je, aby všechny marketingové aktivity restaurace šlo ovládat jednoduše – jen pomocí několika zpráv v telefonu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent 
          className="sm:max-w-[600px]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Vyplňte prosím formulář</DialogTitle>
            <DialogDescription className="text-center">
              Spojíme se s vámi pro ukázku služby a bezstarostné zahájení spolupráce.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">
                Název vašeho gastro podniku <span className="text-destructive">*</span>
              </Label>
              <Input
                id="businessName"
                placeholder="Název vašeho gastro podniku"
                value={formData.businessName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("businessName", e.target.value)}
                className="h-11"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                Telefonní číslo <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+420 000 000 000"
                value={formData.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("phone", e.target.value)}
                className="h-11"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Váš e-mail"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("email", e.target.value)}
                className="h-11"
                required
              />
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox
                id="privacyPolicy"
                checked={privacyPolicyAccepted}
                onCheckedChange={(checked) => setPrivacyPolicyAccepted(checked === true)}
                className="mt-1"
              />
              <Label
                htmlFor="privacyPolicy"
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Souhlasím s podmínkami{" "}
                <Link
                  href="https://herocontent.ai/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-500 underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  ochrany osobních údajů
                </Link>{" "}
                <span className="text-destructive">*</span>
              </Label>
            </div>
            {submitError && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {submitError}
              </div>
            )}
            {submitSuccess && (
              <div className="text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                ✅ Žádost byla úspěšně odeslána! Děkujeme.
              </div>
            )}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Odesílám..." : "Odeslat žádost"}
              </Button>
              <p className="text-sm text-center text-muted-foreground mt-3">
                Získejte 12 příspěvků zdarma pro vaše sítě
              </p>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-8">
            {/* Column 1 */}
            <div className="flex flex-col gap-3 text-sm">
              <button
                onClick={() => setIsDialogOpen(true)}
                className="text-muted-foreground hover:text-yellow-400 transition-colors text-left"
              >
                Vyzkoušet zdarma
              </button>
              <Link
                href="/obchodni-podminky"
                className="text-muted-foreground hover:text-yellow-400 transition-colors"
              >
                Obchodní podmínky
              </Link>
              <Link
                href="/zasady-ochrany-osobnich-udaju"
                className="text-muted-foreground hover:text-yellow-400 transition-colors"
              >
                Zpracování osobních údajů
              </Link>
            </div>

            {/* Column 3 - Kontakt */}
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="mailto:welcome@herocontent.ai"
                className="text-muted-foreground hover:text-yellow-400 transition-colors"
              >
                welcome@herocontent.ai
              </a>
              <a
                href="tel:+420296183097"
                className="text-muted-foreground hover:text-yellow-400 transition-colors"
              >
                +420296183097
              </a>
            </div>

            {/* Column 4 - Sledujte nás */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <Link
                  href="https://www.instagram.com/herocontent.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-yellow-400 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.facebook.com/herocontent.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-yellow-400 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} HeroContent. Všechna práva vyhrazena.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-yellow-400 hover:text-black transition-colors text-muted-foreground"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}
