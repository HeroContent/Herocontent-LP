"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Calendar as CalendarIcon, TrendingUp, Users, MessageCircle, Instagram, Facebook, Star } from "lucide-react"
import Link from "next/link"
import { TypewriterText } from "@/components/typewriter-text"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { useEffect, useState } from "react"

function ClientImageGallery({ title, images }: { title: string; images: Array<{ src: string; alt: string }> }) {
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
      <h3 className="text-2xl font-bold mb-6 text-center">{title}</h3>
      
      {/* Mobile Carousel */}
      <div className="md:hidden">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="flex justify-center">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full max-h-[80vh] object-contain rounded-lg border border-border"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* Carousel Indicators */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                index + 1 === current ? "w-8 bg-yellow-400" : "w-2 bg-muted-foreground/30"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
          <span className="ml-2 text-sm text-muted-foreground">
            {current} / {count}
          </span>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image.src}
              alt={image.alt}
              className="w-full max-h-[60vh] object-contain rounded-lg border border-border"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1920px] mx-auto">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-yellow-400 rounded-lg" aria-hidden="true" />
            <span className="text-xl font-semibold">HeroContent</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#sluzby" className="text-sm hover:text-yellow-400 transition-colors">
              Služby
            </Link>
            <Link href="#proc-my" className="text-sm hover:text-yellow-400 transition-colors">
              Proč my
            </Link>
            <Link href="#klienti" className="text-sm hover:text-yellow-400 transition-colors">
              Klienti
            </Link>
            <Link href="#cenik" className="text-sm hover:text-yellow-400 transition-colors">
              Ceník
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="font-semibold" asChild>
              <Link href="/login">Přihlásit se</Link>
            </Button>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold" asChild>
              <Link href="/trial">Vyzkoušet zdarma</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-balance">
              Spravujeme Instagram a reklamu pro v
              <TypewriterText
                phrases={[
                  { prefix: "aši ", suffix: "Restauraci" },
                  { prefix: "aši ", suffix: "Kavárnu" },
                  { prefix: "áš ", suffix: "Pub" },
                  { prefix: "áš ", suffix: "Hotel" },
                  { prefix: "áš ", suffix: "Bar" },
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
                href="/trial"
                className="inline-flex items-center justify-center bg-yellow-400 text-black hover:bg-yellow-500 font-semibold text-lg px-8 h-12 rounded-lg transition-colors"
              >
                Vyzkoušet zdarma
              </Link>
              <Link
                href="#kontakt"
                className="inline-flex items-center justify-center border border-input bg-transparent hover:bg-accent hover:text-accent-foreground font-semibold text-lg px-8 h-12 rounded-lg transition-colors"
              >
                Bezplatná 30min konzultace
              </Link>
              {/* </CHANGE> */}
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-muted border-2 border-background"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div>
                <p className="text-sm font-medium">400+ restaurací nám důvěřuje</p>
                <div className="flex items-center gap-1" role="img" aria-label="5 z 5 hvězdiček">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="relative max-w-4xl mx-auto lg:ml-auto lg:mr-0">
            <div className="flex flex-row items-center justify-center gap-4 lg:gap-6">
              {/* Picture + AI Column - Same height as Reel Video */}
              <div className="flex flex-col items-center justify-center gap-3 lg:gap-4 h-[280px] sm:h-[320px] lg:h-[380px]">
                {/* Picture - Top */}
                <div className="flex-shrink-0">
                  <img
                    src="/images/image.png"
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

      {/* Stats Section */}
      <section className="py-16 border-y border-border" aria-labelledby="stats-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="stats-heading" className="sr-only">
            Klíčová čísla a výsledky
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-5xl font-bold text-yellow-400">10x</div>
              <p className="text-lg font-semibold">Levnější</p>
              <p className="text-sm text-muted-foreground">než marketingová agentura</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-yellow-400">8+</div>
              <p className="text-lg font-semibold">Hodin týdně ušetříte</p>
              <p className="text-sm text-muted-foreground">Na správě sociálních sítí</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-yellow-400">100+</div>
              <p className="text-lg font-semibold">Restaurací používá</p>
              <p className="text-sm text-muted-foreground">Naše řešení</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="funkce" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Co pro vás děláme?</h2>
            <p className="text-xl text-muted-foreground">Kompletní správa sociálních sítí pod jednou střechou</p>
          </div>

          <div className="max-w-7xl mx-auto space-y-24">
            {/* Feature 1: Photo Editing - Image on right */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 lg:items-start min-h-[400px] lg:min-h-[500px] max-h-[800px] lg:max-h-[700px] overflow-hidden">
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
                <h3 className="text-3xl lg:text-4xl font-bold">Vyšperkujeme vaše fotky</h3>
              </div>
              {/* Photo/Mockup - Mobile: order 2, Desktop: order 2 (right side) */}
              <div className="relative order-2 lg:order-2 flex-shrink-0 h-[200px] lg:h-[280px] overflow-visible">
                <div className="grid grid-cols-2 gap-3 lg:gap-4 h-full relative">
                  <div className="rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm h-full">
                    <img
                      src="/mock/posts/post-01-a.svg"
                      alt="Původní fotka před úpravou"
                      className="w-full h-full object-contain"
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
                  <div className="rounded-lg overflow-hidden border-2 border-yellow-400/50 bg-background shadow-sm h-full">
                    <img
                      src="/mock/posts/post-01-b.svg"
                      alt="Fotka po AI úpravě"
                      className="w-full h-full object-contain"
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
                  <h3 className="text-3xl lg:text-4xl font-bold">Vyšperkujeme vaše fotky</h3>
                </div>
                {/* Text - Mobile: order 3, Desktop: part of text column */}
                <p className="text-lg text-muted-foreground leading-relaxed flex-shrink-0">
                  Možná si říkáte, že vlastní fotky si můžete zveřejnit sami, s námi je rozdíl v tom, že my z
                  jednoduchých fotek z telefonu vytvoříme prémiový obsah pomocí AI technologie.
                </p>
                {/* CTA - Mobile: order 4, Desktop: part of text column */}
                <div className="pt-2 flex-shrink-0 mt-auto">
                  <Link
                    href="/trial"
                    className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-8 rounded-lg font-semibold transition-colors"
                  >
                    Vyzkoušet zdarma
                  </Link>
                </div>
              </div>
            </div>

            {/* Feature 2: Advertising - Image on right */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 lg:items-start min-h-[400px] lg:min-h-[500px] max-h-[800px] lg:max-h-[700px] overflow-hidden">
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
                <h3 className="text-3xl lg:text-4xl font-bold">Vytvoříme příspěvky včetně textů</h3>
              </div>
              {/* Photo/Mockup - Mobile: order 2, Desktop: order 2 (right side) */}
              <div className="relative order-2 lg:order-2 flex-shrink-0 h-[280px] lg:h-[400px] overflow-hidden">
                <div className="grid grid-cols-3 gap-3 lg:gap-4 h-full">
                  {/* Instagram Post */}
                  <div className="rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm h-full">
                    <img
                      src="/placeholder.jpg"
                      alt="Instagram post"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Instagram Story */}
                  <div className="rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm h-full">
                    <img
                      src="/placeholder.jpg"
                      alt="Instagram story"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Video */}
                  <div className="rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm h-full flex items-center justify-center bg-gray-100">
                    <div className="text-center text-gray-400">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs">Video placeholder</span>
                    </div>
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
                  <h3 className="text-3xl lg:text-4xl font-bold">Vytvoříme příspěvky včetně textů</h3>
                </div>
                {/* Text - Mobile: order 3, Desktop: part of text column */}
                <p className="text-lg text-muted-foreground leading-relaxed flex-shrink-0">
                  Umíme posty včetně textů, storíčka i reels, jejich počty pak záleží na vašem předplatném. Pokud během
                  měsíce potřebujete aktuální příspěvky připravíme je také.
                </p>
                {/* CTA - Mobile: order 4, Desktop: part of text column */}
                <div className="pt-2 flex-shrink-0 mt-auto">
                  <Link
                    href="/trial"
                    className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-8 rounded-lg font-semibold transition-colors"
                  >
                    Vyzkoušet zdarma
                  </Link>
                </div>
              </div>
            </div>

            {/* Feature 3: Professional Posts - Image on right */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 lg:items-start min-h-[400px] lg:min-h-[500px] max-h-[800px] lg:max-h-[700px] overflow-hidden">
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
                <h3 className="text-3xl lg:text-4xl font-bold">Zašleme vám kalendář příspěvků na měsíc dopředu</h3>
              </div>
              {/* Photo/Mockup - Mobile: order 2, Desktop: order 2 (right side) */}
              <div className="relative order-2 lg:order-2 flex-shrink-0 w-full">
                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  {/* WhatsApp Mockup */}
                  <div className="rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm">
                    <div className="bg-[#e5ddd5] p-3 rounded-lg h-full flex items-end">
                      <div className="w-full">
                        <div className="flex items-start gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-black">HC</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] text-gray-600 mb-0.5">HeroContent</div>
                            <div className="text-xs text-gray-800 bg-white rounded-lg px-3 py-2 shadow-sm inline-block max-w-[85%]">
                              Posíláme vám plán příspěvků na příští měsíc
                            </div>
                            <div className="text-[9px] text-gray-500 mt-0.5 text-right pr-1">12:34</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Calendar Picture */}
                  <div className="rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm">
                    <img
                      src="/placeholder.jpg"
                      alt="Kalendář příspěvků"
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold">Zašleme vám kalendář příspěvků na měsíc dopředu</h3>
                </div>
                {/* Text - Mobile: order 3, Desktop: part of text column */}
                <p className="text-lg text-muted-foreground leading-relaxed flex-shrink-0">
                  Pokud by se vám nějaký příspěvek nelíbil, obratem ho předěláme.
                </p>
                {/* CTA - Mobile: order 4, Desktop: part of text column */}
                <div className="pt-2 flex-shrink-0 mt-auto">
                  <Link
                    href="/trial"
                    className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-8 rounded-lg font-semibold transition-colors"
                  >
                    Vyzkoušet zdarma
                  </Link>
                </div>
              </div>
            </div>

            {/* Feature 4: Nastavíme reklamu - Image on right */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 lg:items-start min-h-[400px] lg:min-h-[500px] max-h-[800px] lg:max-h-[700px] overflow-hidden">
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
                <h3 className="text-3xl lg:text-4xl font-bold">Nastavíme reklamu</h3>
              </div>
              {/* Photo/Mockup - Mobile: order 2, Desktop: order 2 (right side) */}
              <div className="relative order-2 lg:order-2 flex-shrink-0 h-[200px] lg:h-[280px] overflow-hidden">
                <div className="grid grid-cols-2 gap-3 lg:gap-4 h-full">
                  {/* WhatsApp Mockup from Client */}
                  <div className="rounded-lg overflow-hidden border-2 border-yellow-400/50 bg-background shadow-sm">
                    <div className="bg-[#e5ddd5] p-3 rounded-lg h-full flex items-end">
                      <div className="w-full">
                        <div className="flex items-start gap-2 mb-2 justify-end">
                          <div className="flex-1 min-w-0 flex justify-end">
                            <div className="max-w-[85%]">
                              <div className="text-xs text-gray-800 bg-[#dcf8c6] rounded-lg px-3 py-2 shadow-sm">
                                Příští týden máme u nás akci, udělejte mi na ni reklamu.
                              </div>
                              <div className="text-[9px] text-gray-500 mt-0.5 text-right pr-1">12:34</div>
                            </div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-semibold text-gray-700">K</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Ad Creative */}
                  <div className="rounded-lg overflow-hidden border-2 border-yellow-400/50 bg-background shadow-sm h-full">
                    <img
                      src="/placeholder.jpg"
                      alt="Reklamní kampaň - vytvořená reklama"
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
                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold">Nastavíme reklamu</h3>
                </div>
                {/* Text - Mobile: order 3, Desktop: part of text column */}
                <p className="text-lg text-muted-foreground leading-relaxed flex-shrink-0">
                  Postaráme se o kompletní nastavení a správu reklam, aby oslovily lidi ve vašem okolí (do 1 km) nebo
                  podle zájmů.
                </p>
                {/* CTA - Mobile: order 4, Desktop: part of text column */}
                <div className="pt-2 flex-shrink-0 mt-auto">
                  <Link
                    href="/trial"
                    className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-8 rounded-lg font-semibold transition-colors"
                  >
                    Vyzkoušet zdarma
                  </Link>
                </div>
              </div>
            </div>

            {/* Feature 5: Automaticky zveřejníme vaše menu - Image on right */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 lg:items-start min-h-[400px] lg:min-h-[500px] max-h-[800px] lg:max-h-[700px] overflow-hidden">
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
                <h3 className="text-3xl lg:text-4xl font-bold">Automaticky zveřejníme vaše menu v designu na míru</h3>
              </div>
              {/* Photo/Mockup - Mobile: order 2, Desktop: order 2 (right side) */}
              <div className="relative order-2 lg:order-2 flex-shrink-0 h-[200px] lg:h-[280px] overflow-hidden">
                <div className="grid grid-cols-2 gap-3 lg:gap-4 h-full">
                  {/* WhatsApp Mockup from Client */}
                  <div className="rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm">
                    <div className="bg-[#e5ddd5] p-3 rounded-lg h-full flex items-end">
                      <div className="w-full">
                        <div className="flex items-start gap-2 mb-2 justify-end">
                          <div className="flex-1 min-w-0 flex justify-end">
                            <div className="max-w-[85%]">
                              <div className="text-xs text-gray-800 bg-[#dcf8c6] rounded-lg px-3 py-2 shadow-sm">
                                Dnes máme na jídelníčku: Hovězí s brambory, Špagety se sýrem, burger.
                              </div>
                              <div className="text-[9px] text-gray-500 mt-0.5 text-right pr-1">12:34</div>
                            </div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-semibold text-gray-700">K</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Daily Menu Created Automatically */}
                  <div className="rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm h-full">
                    <img
                      src="/placeholder.jpg"
                      alt="Automaticky vytvořené denní menu"
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold">Automaticky zveřejníme vaše menu v designu na míru</h3>
                </div>
                {/* Text - Mobile: order 3, Desktop: part of text column */}
                <p className="text-lg text-muted-foreground leading-relaxed flex-shrink-0">
                  Už žádné nudné fotografování menu. Vytvoříme pro vás profesionální design, který automaticky
                  zveřejníme podle vašeho harmonogramu.
                </p>
                {/* CTA - Mobile: order 4, Desktop: part of text column */}
                <div className="pt-2 flex-shrink-0 mt-auto">
                  <Link
                    href="/trial"
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

      {/* Markéta Section */}
      <section id="marketa" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Seznamte se s Markétou</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Vaše osobní manažerka sociálních sítí pro restaurace
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              Ahoj! Jsem Markéta, a jsem tu, abych vám pomohla zvýšit zisk vaší restaurace. Svěřte mi správu vaší online
              prezentace a postarám se o vše od tvorby nápadů po publikování atraktivních příspěvků na Facebooku a
              Instagramu.
            </p>
            <p className="text-lg leading-relaxed">Díky mé odbornosti oslovíte více zákazníků a naplníte stoly.</p>
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {[
                { icon: CalendarIcon, text: "Detailně poznává vaši restauraci" },
                { icon: TrendingUp, text: "Vytváří měsíční plán příspěvků" },
                { icon: Users, text: "Nastavuje reklamní kampaně" },
                { icon: MessageCircle, text: "Komunikuje s vámi přes WhatsApp" },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-400/10 rounded-lg mt-1" aria-hidden="true">
                    <item.icon className="w-5 h-5 text-yellow-400" />
                  </div>
                  <p className="text-base leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
            <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold">
              Napiš Markétě
            </Button>
          </div>
          <div className="relative">
            <Card className="border-yellow-400/30">
              <CardContent className="p-8">
                <div className="aspect-square bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-32 h-32 text-yellow-400" aria-hidden="true" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="proc-my" className="bg-muted/50 py-20">
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
                stat: "20% více prodaných obědů",
                client: "Cube Eatery",
              },
              {
                title: "Oslovte místní zákazníky akcemi",
                description: "Zviditelňujeme vaše speciální akce, živou hudbu a speciality ve vašem okolí.",
                stat: "Naplnění pobočky hned první den",
                client: "Dhaba Beas",
              },
              {
                title: "Přitáhněte turisty",
                description:
                  "Cílíme reklamu i na turisty ve vašem okolí, kteří touží poznat místní kuchyni a atmosféru.",
                stat: "Větší návštěvnost od turistů",
                client: "Pivní Přístav",
              },
            ].map((benefit, i) => (
              <Card key={i} className="border-border hover:border-yellow-400 transition-colors">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-yellow-400/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-semibold text-yellow-400">{benefit.stat}</p>
                    <p className="text-sm text-muted-foreground">{benefit.client}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
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
      <section id="cenik" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Vyberte si plán pro vaši restauraci</h2>
          <p className="text-xl text-muted-foreground">Flexibilní řešení pro každou velikost týmu</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Start Tier */}
          <Card className="border-border">
            <CardContent className="p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Start</h3>
                <div className="text-4xl font-bold mb-2">
                  950 Kč<span className="text-lg font-normal text-muted-foreground">/měsíčně</span>
                </div>
                <p className="text-muted-foreground">Pro začátečníky a malé restaurace</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Výstupy</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">4 příspěvky měsíčně</span>
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
                      <span className="text-sm">Podpora pomocí AI agenta</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button size="lg" variant="outline" className="w-full font-semibold bg-transparent" asChild>
                <Link href="/trial">Vyzkoušet zdarma</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Standard Tier */}
          <Card className="border-yellow-400/50 shadow-xl relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">Nejoblíbenější</span>
            </div>
            <CardContent className="p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Standard</h3>
                <div className="text-4xl font-bold mb-2">
                  2 950 Kč<span className="text-lg font-normal text-muted-foreground">/měsíčně</span>
                </div>
                <p className="text-muted-foreground">Pro aktivní restaurace a kavárny</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Výstupy</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">15 příběhů měsíčně</span>
                    </div>
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
                      <span className="text-sm">4 extra kreativy na přání měsíčně</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">1 reklamní kampaň měsíčně</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Funkce</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">Osobní zákaznická podpora přes WhatsApp</span>
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

              <Button size="lg" className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold">
                Mám zájem
              </Button>
            </CardContent>
          </Card>

          {/* Premium Tier */}
          <Card className="border-border">
            <CardContent className="p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <div className="text-4xl font-bold mb-2">
                  4 450 Kč<span className="text-lg font-normal text-muted-foreground">/měsíčně</span>
                </div>
                <p className="text-muted-foreground">Pro velké restaurace a hotely</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Výstupy</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">15 příběhů měsíčně</span>
                    </div>
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
                      <span className="text-sm">2 AI reels</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">2 reklamní kampaně měsíčně</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Funkce</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-sm">Osobní zákaznická podpora přes WhatsApp</span>
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

              <Button size="lg" className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold">
                Mám zájem
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-muted/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Začněte jednoduše</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Základní informace", description: "Pošlete odkazy na váš web a sociální sítě." },
              { step: "2", title: "Přístup k účtům", description: "Poskytněte přístup ke správě sociálních sítí." },
              {
                step: "3",
                title: "Schválení příspěvků",
                description: "Volitelné – schvalte příspěvky před zveřejněním.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-yellow-400 text-black text-2xl font-bold flex items-center justify-center mx-auto">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-2xl font-bold text-yellow-400 mb-6">A je to!</p>
            <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold">
              Začít nyní
            </Button>
          </div>
        </div>
      </section>

      {/* Client Showcase Section */}
      <section id="klienti" className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4">Naši spokojení klienti</h2>
          <p className="text-xl text-muted-foreground text-center mb-16">
            Přidejte se k restauracím, které již využívají HeroContent
          </p>

          <div className="space-y-12">
            {/* Pizzerie */}
            <ClientImageGallery
              title="Pizzerie"
              images={[
                { src: "/images/pizzeria-1.png", alt: "Příspěvky pro pizzerii - pizza s přílohami" },
                { src: "/images/pizzeria-2.png", alt: "Příspěvky pro pizzerii - burgery a hlavní chody" },
                { src: "/images/pizzeria-3.png", alt: "Příspěvky pro pizzerii - zákaznická zkušenost" },
              ]}
            />

            {/* Asian Restaurant */}
            <ClientImageGallery
              title="Asijská kuchyně"
              images={[
                { src: "/images/asian-1.png", alt: "Příspěvky pro asijskou restauraci - první set" },
                { src: "/images/asian-2.png", alt: "Příspěvky pro asijskou restauraci - druhý set" },
                { src: "/images/asian-3.png", alt: "Příspěvky pro asijskou restauraci - třetí set" },
              ]}
            />

            {/* Modern Restaurant/Bar */}
            <ClientImageGallery
              title="Moderní restaurace & Bar"
              images={[
                { src: "/images/restaurant-1.png", alt: "Příspěvky pro moderní restauraci - první set" },
                { src: "/images/restaurant-2.png", alt: "Příspěvky pro moderní restauraci - druhý set" },
                { src: "/images/restaurant-3.png", alt: "Příspěvky pro moderní restauraci - třetí set" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Připraveni zvýšit zisk své restaurace o 20 % za pouhých 2 500 Kč měsíčně?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nechte Markétu pracovat za vás a ušetřete náklady – naše služba je 3× levnější než agentura a 2× levnější
            než SMM manažer.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-black text-white hover:bg-black/90 font-semibold text-lg px-8"
          >
            Získejte více hostů hned
          </Button>
        </div>
      </section>

      {/* O nás Section */}
      <section id="o-nas" className="py-20">
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
                    src="/placeholder.jpg"
                    alt="Elisey"
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
                    src="/placeholder.jpg"
                    alt="David"
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
                    src="/placeholder.jpg"
                    alt="Anton"
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

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-yellow-400 rounded-lg" aria-hidden="true" />
              <span className="text-xl font-semibold">HeroContent</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} HeroContent. Všechna práva vyhrazena.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-yellow-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-yellow-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}

