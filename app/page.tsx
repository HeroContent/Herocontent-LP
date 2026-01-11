"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Calendar as CalendarIcon, TrendingUp, Users, MessageCircle, Instagram, Facebook, Star, Utensils, Coffee, Beer, Wine, Building, Truck, UtensilsCrossed, MapPin, ArrowUp, Menu, X, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { TypewriterText } from "@/components/typewriter-text"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"

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
                <div className="flex justify-center px-4">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full max-h-[64vh] object-contain rounded-lg border border-border"
                  />
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
        {images.map((image, index) => (
            <div key={index} className="w-[280px]">
            <img
              src={image.src}
              alt={image.alt}
                loading="lazy"
                className="w-full h-auto object-contain rounded-lg border border-border"
            />
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formData, setFormData] = useState({
    businessName: "",
    phone: "",
    email: "",
    businessType: ""
  })

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
      "/images/client-showcase-bar-1.jpg",
      "/images/client-showcase-bar-2.jpg",
      "/images/client-showcase-pub-1.jpg",
      "/images/client-showcase-pub-2.jpg",
      "/images/client-showcase-pub-3.jpg",
      "/images/client-showcase-hotel-1.jpg",
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
    if (!formData.businessName || !formData.phone || !formData.email || !formData.businessType) {
      setSubmitError("Prosím vyplňte všechna povinná pole")
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Něco se pokazilo')
      }

      setSubmitSuccess(true)
      
      // Close dialog and reset form after a short delay
      setTimeout(() => {
        setIsDialogOpen(false)
        setFormData({
          businessName: "",
          phone: "",
          email: "",
          businessType: ""
        })
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
    "@type": "Organization",
    "name": "HeroContent",
    "description": "Profesionální správa sociálních sítí pro restaurace za pouhých 2 500 Kč měsíčně. Pomůžeme vám oslovit nové zákazníky a zvýšit tržby až o 20%.",
    "url": "https://herocontent.ai",
    "logo": "https://herocontent.ai/images/HC_Logo.png",
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
    "serviceType": "Social Media Management for Restaurants"
  }

  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Správa sociálních sítí pro restaurace",
    "provider": {
      "@type": "Organization",
      "name": "HeroContent"
    },
    "description": "Profesionální správa sociálních sítí pro restaurace za pouhých 2 500 Kč měsíčně",
    "offers": {
      "@type": "Offer",
      "price": "2500",
      "priceCurrency": "CZK",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "2500",
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
          <div className="flex items-center gap-2">
            <img 
              src="/images/HC_Logo.png" 
              alt="HeroContent Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-semibold hidden md:inline">HeroContent</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#funkce" className="text-sm hover:text-yellow-400 transition-colors">
              Služby
            </Link>
            <Link href="#cenik" className="text-sm hover:text-yellow-400 transition-colors">
              Cenník
            </Link>
            <Link href="#klienti" className="text-sm hover:text-yellow-400 transition-colors">
              Ukázka
            </Link>
            <Link href="#o-nas" className="text-sm hover:text-yellow-400 transition-colors">
              O nás
            </Link>
          </nav>
          <div className="flex items-center gap-2 md:gap-3">
            <a 
              href="https://wa.me/420608570962" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Kontaktovat nás na WhatsApp"
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white transition-colors border-2 border-[#25D366] flex-shrink-0"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <Button variant="ghost" className="font-semibold hidden sm:inline-flex" asChild>
              <Link href="/login">Přihlásit se</Link>
            </Button>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold text-sm px-4 h-9 md:h-auto md:px-6" asChild>
              <Link href="/registration">Vyzkoušet zdarma</Link>
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
                    Cenník
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
                    <Link 
                      href="/login" 
                      className="block text-lg font-medium hover:text-yellow-400 transition-colors mb-3 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Přihlásit se
                    </Link>
                    <Link 
                      href="/registration" 
                      className="inline-flex items-center justify-center bg-yellow-400 text-black hover:bg-yellow-500 font-semibold text-base px-6 h-12 rounded-lg transition-colors w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Vyzkoušet zdarma
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 pb-12 sm:pb-6 lg:py-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              Spravujeme<br />
              Instagram a<br />
              reklamu pro<br />
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
              Využijte sílu umělené inteligence a udělejte z vašich sociálních sítí mašinu na oslovení nových zákazníků!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/registration"
                className="inline-flex items-center justify-center bg-yellow-400 text-black hover:bg-yellow-500 font-semibold text-lg px-8 h-12 rounded-lg transition-colors"
              >
                Vyzkoušet zdarma
              </Link>
              <Link
                href="#kontakt"
                className="inline-flex items-center justify-center border border-input bg-transparent hover:bg-accent hover:text-accent-foreground font-semibold text-lg px-8 h-12 rounded-lg transition-colors"
              >
                Chci konzultaci
              </Link>
              {/* </CHANGE> */}
            </div>
          </div>
          <div className="relative max-w-4xl mx-auto lg:ml-auto lg:mr-0">
            <div className="flex flex-row items-center justify-center gap-4 lg:gap-6">
              {/* Picture + AI Column - Same height as Reel Video */}
              <div className="flex flex-col items-center justify-center gap-3 lg:gap-4 h-[280px] sm:h-[320px] lg:h-[380px]">
                {/* Picture - Top */}
                <div className="flex-shrink-0">
                  <img
                    src="/images/hero-original-photo.png"
                    alt="Původní fotka klienta"
                    className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-cover rounded-lg shadow-lg border-2 border-gray-200"
                  />
                </div>

                {/* Plus Sign - Below Picture */}
                <div className="flex items-center justify-center flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-yellow-400/20 border-2 border-yellow-400 flex items-center justify-center">
                    <span className="text-xl sm:text-2xl lg:text-2xl font-bold text-yellow-400">+</span>
                  </div>
                </div>

                {/* HeroContent AI Box - Below Plus */}
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-lg p-3 sm:p-4 lg:p-5 border-2 border-yellow-400/50 shadow-lg">
                    <div className="text-center space-y-1.5">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 mx-auto bg-yellow-400 rounded-lg flex items-center justify-center mb-1.5">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-black rounded flex items-center justify-center">
                          <span className="text-yellow-400 font-bold text-lg sm:text-xl lg:text-xl">AI</span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm lg:text-sm font-semibold text-foreground">HeroContent</p>
                      <p className="text-xs text-muted-foreground">AI</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Equals Sign */}
              <div className="flex items-center justify-center flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full bg-yellow-400/20 border-2 border-yellow-400 flex items-center justify-center">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-400">=</span>
                </div>
              </div>

              {/* Video/Reel - Same height as Picture + AI column */}
              <div className="flex-shrink-0 h-[280px] sm:h-[320px] lg:h-[380px] flex items-center">
                <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-2xl p-2 sm:p-3 lg:p-4 border border-yellow-400/30 shadow-2xl h-full flex items-center">
                  <video
                    className="rounded-lg w-full h-full object-contain max-w-[150px] sm:max-w-[180px] lg:max-w-[240px]"
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label="Výsledné video vytvořené pomocí HeroContent AI"
                  >
                    <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%2810%29-6yCMygZ2zRGG95sljQZJUfNX1e1VIE.mp4" type="video/mp4" />
                    Váš prohlížeč nepodporuje video element.
                  </video>
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
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Jak vám ušetříme čas a přivedeme zákazníky?</h2>
            <p className="text-xl text-muted-foreground">Kompletní správa sociálních sítí pod jednou střechou</p>
          </div>

          <div className="max-w-7xl mx-auto space-y-[1.8rem]">
            {/* Feature 1: Photo Editing - Image on right */}
            <div className="flex flex-col lg:grid lg:grid-cols-[2fr_3fr] gap-6 lg:gap-12 lg:items-start min-h-[400px] lg:min-h-[500px] max-h-[600px] lg:max-h-[550px] overflow-hidden">
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
                <h3 className="text-3xl lg:text-4xl font-bold">Vylepšíme vaše fotky pomocí AI</h3>
              </div>
              {/* Photo/Mockup - Mobile: order 2, Desktop: order 2 (right side) */}
              <div className="relative order-2 lg:order-2 flex-shrink-0 h-[280px] lg:h-[400px] overflow-visible">
                <div className="grid grid-cols-2 gap-3 lg:gap-4 h-full relative">
                  <div className="rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm h-full">
                    <img
                      src="/images/feature-1-photo-before.jpeg"
                      alt="Původní fotka před úpravou"
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
                      alt="Fotka po AI úpravě"
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
                  <h3 className="text-3xl lg:text-4xl font-bold">Vylepšíme vaše fotky pomocí AI</h3>
                </div>
                {/* Text - Mobile: order 3, Desktop: part of text column */}
                <div className="text-lg text-muted-foreground leading-relaxed flex-shrink-0 space-y-4">
                  <p>
                    Možná si říkáte, že fotku z mobilu prostě nahrajete sami. My ji ale pomocí AI upravíme tak, aby na sítích opravdu zaujala. Bude čistá, světlejší a profesionální.
                  </p>
                  <p>
                    Váš podnik bude vypadat skvěle i bez drahého focení za desítky tisíc ročně.
                  </p>
                </div>
                {/* CTA - Mobile: order 4, Desktop: part of text column */}
                <div className="pt-2 flex-shrink-0 mt-auto">
                  <Link
                    href="/registration"
                    className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-8 rounded-lg font-semibold transition-colors"
                  >
                    Vyzkoušet zdarma
                  </Link>
                </div>
              </div>
            </div>

            {/* Feature 2: Advertising - Image on right */}
            <div className="flex flex-col lg:grid lg:grid-cols-[2fr_3fr] gap-6 lg:gap-12 lg:items-start min-h-[400px] lg:min-h-[500px] max-h-[600px] lg:max-h-[550px] overflow-hidden">
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
                <h3 className="text-3xl lg:text-4xl font-bold">Vytvoříme příspěvky i s texty</h3>
              </div>
              {/* Photo/Mockup - Mobile: order 2, Desktop: order 2 (right side) */}
              <div className="relative order-2 lg:order-2 flex-shrink-0 h-[280px] lg:h-[400px] overflow-hidden">
                <div className="grid grid-cols-3 gap-3 lg:gap-4 h-full">
                  {/* Instagram Post */}
                  <div className="rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm h-full">
                    <img
                      src="/images/feature-2-post-chicken-burger.png"
                      alt="Instagram post - Chicken burger"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Instagram Story */}
                  <div className="rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm h-full">
                    <img
                      src="/images/feature-2-story-pizza.png"
                      alt="Instagram story - Pizza with spinach and corn"
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
                      aria-label="Instagram reel vytvořený pomocí HeroContent AI"
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
                  <h3 className="text-3xl lg:text-4xl font-bold">Vytvoříme příspěvky i s texty</h3>
                </div>
                {/* Text - Mobile: order 3, Desktop: part of text column */}
                <div className="text-lg text-muted-foreground leading-relaxed flex-shrink-0 space-y-4">
                  <p>
                    Hodně podniků neví, co napsat k fotce. Stačí nám poslat krátkou informaci. Texty napíšeme za vás a systém z toho vytvoří hotový příspěvek, stories i reels.
                  </p>
                  <p>
                    Ušetříte čas a nemusíte nic psát ani vymýšlet. Vše dostanete hotové.
                  </p>
                </div>
                {/* CTA - Mobile: order 4, Desktop: part of text column */}
                <div className="pt-2 flex-shrink-0 mt-auto">
                  <Link
                    href="/registration"
                    className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-8 rounded-lg font-semibold transition-colors"
                  >
                    Vyzkoušet zdarma
                  </Link>
                </div>
              </div>
            </div>

            {/* Feature 3: Professional Posts - Image on right */}
            <div className="flex flex-col lg:grid lg:grid-cols-[2fr_3fr] gap-6 lg:gap-12 lg:items-start min-h-[400px] lg:min-h-[500px] max-h-[600px] lg:max-h-[550px] overflow-hidden">
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
                <h3 className="text-3xl lg:text-4xl font-bold">Obsah na celý měsíc</h3>
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
                      alt="Kalendář příspěvků"
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
                  <h3 className="text-3xl lg:text-4xl font-bold">Obsah na celý měsíc</h3>
                </div>
                {/* Text - Mobile: order 3, Desktop: part of text column */}
                <div className="text-lg text-muted-foreground leading-relaxed flex-shrink-0 space-y-4">
                  <p>
                    Mnoho podniků řeší sociální sítě stylem „když je čas". My vám jednou měsíčně pošleme všechny obrázky, texty, stories, reels a jednoduchý kalendář na celý měsíc dopředu.
                  </p>
                  <p>
                    Máte jasno, co kdy vyjde, a žádné prázdné dny nebo chaos v obsahu.
                  </p>
                </div>
                {/* CTA - Mobile: order 4, Desktop: part of text column */}
                <div className="pt-2 flex-shrink-0 mt-auto">
                  <Link
                    href="/registration"
                    className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-8 rounded-lg font-semibold transition-colors"
                  >
                    Vyzkoušet zdarma
                  </Link>
                </div>
              </div>
            </div>

            {/* Feature 4: Nastavíme reklamu - Image on right */}
            <div className="flex flex-col lg:grid lg:grid-cols-[2fr_3fr] gap-6 lg:gap-12 lg:items-start min-h-[400px] lg:min-h-[500px] max-h-[600px] lg:max-h-[550px] overflow-hidden">
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
                <h3 className="text-3xl lg:text-4xl font-bold">Spustíme reklamy jedním potvrzením</h3>
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
                      aria-label="Reklamní kampaň - vytvořená reklama"
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
                  <h3 className="text-3xl lg:text-4xl font-bold">Spustíme reklamy jedním potvrzením</h3>
                </div>
                {/* Text - Mobile: order 3, Desktop: part of text column */}
                <div className="text-lg text-muted-foreground leading-relaxed flex-shrink-0 space-y-4">
                  <p>
                    Díky reklamě můžete svůj podnik ukázat lidem, kteří o vás ještě neslyšeli skrze placenou reklamu na sociálních sítích. Všechno nastavíme za vás a pošleme vám jednoduchý návrh reklamy a informace o tom, na koho budeme cílit.
                  </p>
                  <p>
                    Každý měsíc vás mohou vidět tisíce nových potenciálních zákazníků ve vašem okolí.
                  </p>
                </div>
                {/* CTA - Mobile: order 4, Desktop: part of text column */}
                <div className="pt-2 flex-shrink-0 mt-auto">
                  <Link
                    href="/registration"
                    className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-8 rounded-lg font-semibold transition-colors"
                  >
                    Vyzkoušet zdarma
                  </Link>
                </div>
              </div>
            </div>

            {/* Feature 5: Automaticky zveřejníme vaše menu - Image on right */}
            <div className="flex flex-col lg:grid lg:grid-cols-[2fr_3fr] gap-6 lg:gap-12 lg:items-start min-h-[400px] lg:min-h-[500px] max-h-[600px] lg:max-h-[550px] overflow-hidden">
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
                <h3 className="text-3xl lg:text-4xl font-bold">Zveřejníme denní menu bez focení</h3>
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
                      alt="Automaticky vytvořené denní menu"
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
                  <h3 className="text-3xl lg:text-4xl font-bold">Zveřejníme denní menu bez focení</h3>
                </div>
                {/* Text - Mobile: order 3, Desktop: part of text column */}
                <div className="text-lg text-muted-foreground leading-relaxed flex-shrink-0 space-y-4">
                  <p>
                    Hodně podniků fotí denní menu narychlo nebo ho píše ručně do příspěvku. U nás jen pošlete seznam jídel. AI z něj vytvoří pěknou grafiku a zveřejní ji ve správný čas.
                  </p>
                  <p>
                    Menu bude každý den vypadat dobře a vy se nemusíte o nic starat.
                  </p>
                </div>
                {/* CTA - Mobile: order 4, Desktop: part of text column */}
                <div className="pt-2 flex-shrink-0 mt-auto">
                  <Link
                    href="/registration"
                    className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-8 rounded-lg font-semibold transition-colors"
                  >
                    Vyzkoušet zdarma
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="proc-my" className="bg-muted/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Jak sociální sítě zvýší váš zisk?</h2>
            <p className="text-xl text-muted-foreground">Efektivní cílená lokální reklama</p>
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
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Vyberte si plán pro vaši restauraci</h2>
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
                      <span className="text-sm">20 příběhů měsíčně</span>
                    </div>
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
                      <span className="text-sm">1 reklamní kampaň měsíčně</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">2 extra kreativy na přání měsíčně</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Služby</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">Podpora 24/7 pomocí AI agenta</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">Osobní zákaznická podpora</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">Moderování příspěvků marketingovým specialistou</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">Automatické denní/týdenní menu</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold mt-auto"
                asChild
              >
                <Link href="/registration">Vyzkoušet zdarma</Link>
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
                      <span className="text-sm">20 příběhů měsíčně</span>
                    </div>
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
                      <span className="text-sm">2 AI reels</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">2 reklamní kampaně měsíčně</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">4 extra kreativy na přání měsíčně</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Služby</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">Podpora 24/7 pomocí AI agenta</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">Osobní zákaznická podpora</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">Moderování příspěvků marketingovým specialistou</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">Automatické denní/týdenní menu</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">Personalizované návrhy na reklamní akce</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold mt-auto"
                onClick={() => setIsDialogOpen(true)}
              >
                Mám zájem
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
            Podívejte se, jak by mohly vypadat vaše sociální sítě
          </p>

          <Tabs defaultValue="restaurace" className="w-full">
            <TabsList 
              className="!grid !w-full grid-cols-3 md:grid-cols-6 gap-2 mb-6 md:mb-4 !h-auto !p-1"
              style={{ display: 'grid', width: '100%', height: 'auto', padding: '0.25rem' }}
            >
              <TabsTrigger value="restaurace" className="text-xs md:text-sm data-[state=active]:bg-yellow-400 data-[state=active]:text-black flex items-center justify-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>Restaurace</span>
              </TabsTrigger>
              <TabsTrigger value="kavarna" className="text-xs md:text-sm data-[state=active]:bg-yellow-400 data-[state=active]:text-black flex items-center justify-center gap-1.5">
                <Coffee className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>Kavárny</span>
              </TabsTrigger>
              <TabsTrigger value="pub" className="text-xs md:text-sm data-[state=active]:bg-yellow-400 data-[state=active]:text-black flex items-center justify-center gap-1.5">
                <Beer className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>Hospody</span>
              </TabsTrigger>
              <TabsTrigger value="bar" className="text-xs md:text-sm data-[state=active]:bg-yellow-400 data-[state=active]:text-black flex items-center justify-center gap-1.5">
                <Wine className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>Bary</span>
              </TabsTrigger>
              <TabsTrigger value="hotel" className="text-xs md:text-sm data-[state=active]:bg-yellow-400 data-[state=active]:text-black flex items-center justify-center gap-1.5">
                <Building className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>Hotely</span>
              </TabsTrigger>
              <TabsTrigger value="rozvoz" className="text-xs md:text-sm data-[state=active]:bg-yellow-400 data-[state=active]:text-black flex items-center justify-center gap-1.5">
                <Truck className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>Rozvoz</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="restaurace" className="mt-0 relative z-0">
              <ClientImageGallery
                images={[
                  { src: "/images/client-showcase-restaurant-1.jpg", alt: "Příspěvky pro restauraci - první set" },
                  { src: "/images/client-showcase-restaurant-2.jpeg", alt: "Příspěvky pro restauraci - druhý set" },
                  { src: "/images/client-showcase-restaurant-3.jpeg", alt: "Příspěvky pro restauraci - třetí set" },
                  { src: "/images/client-showcase-restaurant-4.jpg", alt: "Příspěvky pro restauraci - čtvrtý set" },
                ]}
              />
            </TabsContent>

            <TabsContent value="kavarna" className="mt-0 relative z-0">
              <ClientImageGallery
                images={[
                  { src: "/images/client-showcase-cafe-1.jpg", alt: "Příspěvky pro kavárny - první set" },
                  { src: "/images/client-showcase-cafe-2.jpg", alt: "Příspěvky pro kavárny - druhý set" },
                  { src: "/images/client-showcase-cafe-3.jpg", alt: "Příspěvky pro kavárny - třetí set" },
                  { src: "/images/client-showcase-cafe-1.jpg", alt: "Příspěvky pro kavárny - čtvrtý set" },
                ]}
              />
            </TabsContent>

            <TabsContent value="pub" className="mt-0 relative z-0">
              <ClientImageGallery
                images={[
                  { src: "/images/client-showcase-pub-1.jpg", alt: "Příspěvky pro hospody - první set" },
                  { src: "/images/client-showcase-pub-2.jpg", alt: "Příspěvky pro hospody - druhý set" },
                  { src: "/images/client-showcase-pub-3.jpg", alt: "Příspěvky pro hospody - třetí set" },
                  { src: "/images/client-showcase-pub-2.jpg", alt: "Příspěvky pro hospody - čtvrtý set" },
                ]}
              />
            </TabsContent>

            <TabsContent value="bar" className="mt-0 relative z-0">
              <ClientImageGallery
                images={[
                  { src: "/images/client-showcase-bar-1.jpg", alt: "Příspěvky pro bary - první set" },
                  { src: "/images/client-showcase-bar-2.jpg", alt: "Příspěvky pro bary - druhý set" },
                  { src: "/images/client-showcase-bar-1.jpg", alt: "Příspěvky pro bary - třetí set" },
                  { src: "/images/client-showcase-bar-2.jpg", alt: "Příspěvky pro bary - čtvrtý set" },
                ]}
              />
            </TabsContent>

            <TabsContent value="hotel" className="mt-0 relative z-0">
              <ClientImageGallery
                images={[
                  { src: "/images/client-showcase-hotel-1.jpg", alt: "Příspěvky pro hotely - první set" },
                  { src: "/images/client-showcase-hotel-1.jpg", alt: "Příspěvky pro hotely - druhý set" },
                  { src: "/images/client-showcase-hotel-1.jpg", alt: "Příspěvky pro hotely - třetí set" },
                  { src: "/images/client-showcase-hotel-1.jpg", alt: "Příspěvky pro hotely - čtvrtý set" },
                ]}
              />
            </TabsContent>

            <TabsContent value="rozvoz" className="mt-0 relative z-0">
              <ClientImageGallery
                images={[
                  { src: "/images/client-showcase-delivery-1.jpeg", alt: "Příspěvky pro rozvoz - pizza s přílohami" },
                  { src: "/images/client-showcase-delivery-2.jpg", alt: "Příspěvky pro rozvoz - burgery a hlavní chody" },
                  { src: "/images/client-showcase-delivery-3.jpg", alt: "Příspěvky pro rozvoz - zákaznická zkušenost" },
                  { src: "/images/client-showcase-delivery-4.jpg", alt: "Příspěvky pro rozvoz - čtvrtý set" },
                ]}
              />
            </TabsContent>
          </Tabs>
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
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Vyplňte prosím formulář</DialogTitle>
            <DialogDescription>
              Spojíme se s vámi pro ukázku služby a bezstarostné zahájení spolupráce.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">
                Název podniku <span className="text-destructive">*</span>
              </Label>
              <Input
                id="businessName"
                placeholder="Název podniku"
                value={formData.businessName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("businessName", e.target.value)}
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
                placeholder="+420 (000) 000-000"
                value={formData.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("phone", e.target.value)}
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
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessType">
                Typ podniku <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.businessType}
                onValueChange={(value: string) => handleInputChange("businessType", value)}
                required
              >
                <SelectTrigger id="businessType" className="w-full">
                  <SelectValue placeholder="Vyberte typ podniku" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restaurace">Restaurace</SelectItem>
                  <SelectItem value="kavarna">Kavárna</SelectItem>
                  <SelectItem value="pub-bar">Pub, bar</SelectItem>
                  <SelectItem value="rozvoz">Rozvoz</SelectItem>
                  <SelectItem value="jine">Jiné</SelectItem>
                </SelectContent>
              </Select>
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
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Odesílám..." : "Odeslat žádost"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
            {/* Column 1 */}
            <div className="flex flex-col gap-3 text-sm">
                <Link
                href="/o-spolecnosti"
                  className="text-muted-foreground hover:text-yellow-400 transition-colors"
                >
                O společnosti
                </Link>
                <Link
                href="/blog"
                  className="text-muted-foreground hover:text-yellow-400 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/kariera"
                className="text-muted-foreground hover:text-yellow-400 transition-colors"
              >
                Kariéra
                </Link>
              </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-3 text-sm">
                <Link
                href="/registration"
                  className="text-muted-foreground hover:text-yellow-400 transition-colors"
                >
                Vyzkoušet zdarma
                </Link>
                <Link
                  href="https://herocontent.ai/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-yellow-400 transition-colors"
                >
                  Obchodní podmínky
                </Link>
              <Link
                href="https://herocontent.ai/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
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

