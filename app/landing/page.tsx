"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check, MessageCircle, Instagram, Facebook, Star, Utensils, Building2, Coffee, Sparkles } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function LandingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    obchodnipodminky: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

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
              <Link href="#o-nas" className="text-sm hover:text-yellow-400 transition-colors">
                O nás
              </Link>
              <Link href="#klienti" className="text-sm hover:text-yellow-400 transition-colors">
                Naši klienti
              </Link>
              <Link href="#kontakt" className="text-sm hover:text-yellow-400 transition-colors">
                Kontakty
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/420608570962"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kontaktovat nás na WhatsApp"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white transition-colors border-2 border-[#25D366] flex-shrink-0"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold" asChild>
                <Link href="#form">Získat ukázku zdarma</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative h-screen lg:h-screen flex items-center overflow-hidden border-2 border-red-500">
          {/* Dark blurred background */}
          <div className="absolute inset-0 z-0 border-2 border-red-500">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black border-2 border-red-500"></div>
            <div className="absolute inset-0 bg-[url('/placeholder.jpg')] bg-cover bg-center opacity-20 blur-3xl border-2 border-red-500"></div>
            <div className="absolute inset-0 bg-black/60 border-2 border-red-500"></div>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 border-2 border-red-500">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full border-2 border-red-500">
              {/* Left Side - Headline and Benefits */}
              <div className="space-y-4 lg:space-y-6 border-2 border-red-500">
                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white border-2 border-red-500">
                  <span className="block">SPRAVUJEME</span>
                  <span className="block">INSTAGRAM A</span>
                  <span className="block">
                    REKLAMU <span className="text-green-500">PRO VAŠI</span>
                  </span>
                  <span className="block text-green-500">RESTAURACI</span>
                </h1>

                {/* Benefits Boxes */}
                <div className="space-y-2 lg:space-y-3 border-2 border-red-500">
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 lg:p-4 flex items-start gap-3 lg:gap-4 border border-gray-700 border-2 border-red-500">
                    <Check className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <p className="text-white text-base lg:text-lg">Více hostů bez nutnosti řešit marketing</p>
                  </div>
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 lg:p-4 flex items-start gap-3 lg:gap-4 border border-gray-700 border-2 border-red-500">
                    <Check className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <p className="text-white text-base lg:text-lg">Žádné drahé focení - kvalitní AI úprava fotek s lidskou kontrolou</p>
                  </div>
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 lg:p-4 flex items-start gap-3 lg:gap-4 border border-gray-700 border-2 border-red-500">
                    <Check className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <p className="text-white text-base lg:text-lg">Jednoduché schvalování přes WhatsApp</p>
                  </div>
                </div>
              </div>

              {/* Right Side - Phone Mockup and Pricing */}
              <div className="relative mt-8 lg:mt-0 flex items-end lg:items-center justify-center lg:justify-end border-2 border-red-500">
                {/* Container for Phone Mockup and Pricing Box - Locked together */}
                <div className="flex flex-col w-full max-w-[280px] sm:max-w-sm lg:max-w-md border-2 border-red-500">
                  {/* Phone Mockup Container - Show only top 60% */}
                  <div className="relative w-full border-2 border-red-500 flex-shrink-0">
                    {/* Clipping container - shows only top 60% of the phone */}
                    <div className="relative w-full overflow-hidden border-2 border-red-500" style={{ aspectRatio: '9/19.5', clipPath: 'inset(0 0 40% 0)' }}>
                      <div className="relative w-full">
                        <div className="relative bg-gray-900 rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-4 lg:p-4 shadow-2xl border-2 sm:border-4 border-gray-800 w-full border-2 border-red-500">
                          {/* Phone Screen */}
                          <div className="bg-white rounded-[2rem] overflow-hidden aspect-[9/19.5] relative w-full border-2 border-red-500">
                            {/* Instagram Feed Mockup */}
                            <div className="h-full overflow-y-auto bg-white border-2 border-red-500">
                              {/* Header */}
                              <div className="bg-white border-b border-gray-200 p-2 sm:p-4 flex items-center justify-between sticky top-0 z-10 border-2 border-red-500">
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                                  <span className="font-semibold text-xs sm:text-sm">moje_restaurace</span>
                                </div>
                              </div>
                              {/* Image Grid */}
                              <div className="grid grid-cols-3 gap-0.5 sm:gap-1 p-0.5 sm:p-1 border-2 border-red-500">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                                  <div key={i} className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden border border-red-500">
                                    <img
                                      src="/placeholder.jpg"
                                      alt={`Food post ${i}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                            {/* Meta Logo Overlay */}
                            <div className="absolute bottom-4 sm:bottom-8 left-2 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg z-20 border-2 border-red-500">
                              <span className="text-white font-bold text-[10px] sm:text-xs">∞</span>
                            </div>
                            {/* Instagram Logo Overlay */}
                            <div className="absolute top-4 sm:top-8 right-2 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg z-20 border-2 border-red-500">
                              <Instagram className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Box - Starts exactly where phone mockup ends */}
                  <div className="bg-green-600 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl border-2 border-red-500 flex-shrink-0 w-full">
                    <p className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 text-center">
                      Vše za 2 950 Kč měsíčně
                    </p>
                    <Button
                      size="lg"
                      className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold text-base sm:text-lg py-4 sm:py-6 rounded-lg lg:rounded-xl shadow-lg"
                      asChild
                    >
                      <Link href="#form">ZÍSKAT UKÁZKU ZDARMA</Link>
                    </Button>
                    <div className="mt-3 lg:mt-4 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                      <span className="text-white text-xs sm:text-sm font-semibold">Bonus:</span>
                      <span className="text-orange-300 text-base sm:text-lg">🎁</span>
                      <p className="text-white text-xs sm:text-sm text-center">
                        Hotový vizuál z 9 příspěvků pro tvůj podnik zdarma
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ideal For Section */}
        <section className="bg-muted/50 py-20 border-2 border-red-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-2 border-red-500">
            <h2 className="text-4xl lg:text-5xl font-bold text-center mb-12 border-2 border-red-500">
              HeroContent je ideální pro:
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 border-2 border-red-500">
              {[
                { icon: Utensils, text: "Majitele malých a středních restaurací" },
                { icon: Building2, text: "Podniky bez vlastního marketingového týmu" },
                { icon: Coffee, text: "Kavárny, pizzerie, cukrárny, bistra" },
                { icon: Sparkles, text: "Nově otevřené podniky" },
              ].map((item, index) => (
                <div key={index} className="text-center border-2 border-red-500">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-yellow-400/10 rounded-full flex items-center justify-center border-2 border-red-500">
                    <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                  </div>
                  <p className="text-base sm:text-lg font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="cenik" className="py-20 border-2 border-red-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-2 border-red-500">
            <div className="text-center max-w-3xl mx-auto mb-12 border-2 border-red-500">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 border-2 border-red-500">Co získáte za</h2>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-400 mb-2 border-2 border-red-500">2 950 Kč/měs</div>
              <p className="text-xl text-muted-foreground border-2 border-red-500">NEJPOPULÁRNĚJŠÍ BALÍČEK</p>
            </div>

            <Card className="border-yellow-400/50 shadow-xl max-w-4xl mx-auto border-2 border-red-500">
              <CardContent className="p-6 sm:p-8 lg:p-12 border-2 border-red-500">
                <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 border-2 border-red-500">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">📝</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-base lg:text-lg mb-1">6 příspěvků měsíčně</h3>
                        <p className="text-sm text-muted-foreground">(4 plánované + 2 na přání)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">📱</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-base lg:text-lg mb-1">Až 2 Stories denně</h3>
                        <p className="text-sm text-muted-foreground">(1 pravidelná + 1 na přání)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">🎯</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-base lg:text-lg mb-1">Nastavení Meta reklamní kampaně</h3>
                        <p className="text-sm text-muted-foreground">Facebook a Instagram reklamy</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">💬</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-base lg:text-lg mb-1">Správa přes WhatsApp</h3>
                        <p className="text-sm text-muted-foreground">Rychlá komunikace</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">📊</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-base lg:text-lg mb-1">Pravidelný reporting</h3>
                        <p className="text-sm text-muted-foreground">Přehledy výsledků</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">🍽️</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-base lg:text-lg mb-1">Obsah zaměřený na vaši restauraci</h3>
                        <p className="text-sm text-muted-foreground">Personalizovaný přístup</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">💰</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-base lg:text-lg mb-1">Žádné skryté poplatky</h3>
                        <p className="text-sm text-muted-foreground">Transparentní cena</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">🔍</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-base lg:text-lg mb-1">Správa Google – již brzy!</h3>
                        <p className="text-sm text-muted-foreground">Google My Business</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-border">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-base lg:text-lg font-semibold mb-1">💰 Ušetříte až 80% nákladů</p>
                      <p className="text-sm text-muted-foreground">
                        Ve srovnání s agenturou nebo vlastním social media manažerem
                      </p>
                    </div>
                    <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold">
                      Nezávazně poptat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Form Section */}
        <section id="form" className="bg-muted/50 py-20 border-2 border-red-500">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 border-2 border-red-500">
            <div className="text-center mb-12 border-2 border-red-500">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 border-2 border-red-500">Získat ukázku zdarma</h2>
              <p className="text-xl text-muted-foreground mb-4 border-2 border-red-500">
                Připravíme zdarma obsah na 30 dní pro váš gastro podnik
              </p>
              <p className="text-lg text-muted-foreground border-2 border-red-500">
                Pošlete nám odkaz na váš web nebo Instagram — na základě toho připravíme 9 příspěvků, které
                perfektně sednou vašemu podniku i stylu
              </p>
            </div>

            <Card className="border-yellow-400/30 border-2 border-red-500">
              <CardContent className="p-6 sm:p-8 border-2 border-red-500">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Vaše celé jméno <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background"
                      placeholder="Vaše celé jméno"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Váš e-mail <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background"
                      placeholder="Váš e-mail"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Odkaz na web nebo Instagram podniku <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background"
                      placeholder="Odkaz na web nebo Instagram podniku"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Telefon <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background"
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="obchodnipodminky"
                      name="obchodnipodminky"
                      required
                      checked={formData.obchodnipodminky}
                      onChange={(e) => setFormData({ ...formData, obchodnipodminky: e.target.checked })}
                      className="mt-1"
                    />
                    <label htmlFor="obchodnipodminky" className="text-sm">
                      Souhlasím s podmínkami ochrany{" "}
                      <Link href="https://herocontent.ai/privacy-policy" className="text-yellow-400 hover:underline">
                        osobních údajů
                      </Link>
                    </label>
                  </div>
                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Jako bonus získáte hotový vizuál z 9 příspěvků pro Vaš podnik zdarma
                    </p>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold"
                    >
                      Odeslat žádost
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section id="o-nas" className="py-20 border-2 border-red-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-2 border-red-500">
            <div className="text-center max-w-3xl mx-auto mb-16 border-2 border-red-500">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 border-2 border-red-500">Naš tým</h2>
            </div>

            <div className="max-w-6xl mx-auto border-2 border-red-500">
              <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-12 border-2 border-red-500">
                {/* Anton */}
                <div className="flex flex-col items-center text-center border-2 border-red-500">
                  <div className="w-full aspect-square max-w-[300px] mb-6 rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm border-2 border-red-500">
                    <img
                      src="/placeholder.jpg"
                      alt="Anton"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 border-2 border-red-500">Anton</h3>
                  <p className="text-muted-foreground leading-relaxed border-2 border-red-500">
                    Byl ředitelem vývoje v několika technologických projektech a mimo to je také expert na umělou
                    inteligenci. Právě jeho technologie se stala srdcem HeroContentu – systému, který restauracím
                    přivádí více hostů efektivněji než kdy dřív.
                  </p>
                </div>

                {/* David */}
                <div className="flex flex-col items-center text-center border-2 border-red-500">
                  <div className="w-full aspect-square max-w-[300px] mb-6 rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm border-2 border-red-500">
                    <img
                      src="/placeholder.jpg"
                      alt="David"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 border-2 border-red-500">David</h3>
                  <p className="text-muted-foreground leading-relaxed border-2 border-red-500">
                    Vedl marketingovou agenturu i reklamní platformu, kde pomáhal desítkám značek růst díky spolupráci s
                    influencery. Uvědomil si, že velká část práce agentur se dá zautomatizovat a nabídnout restauracím
                    za zlomek ceny.
                  </p>
                </div>

                {/* Elisey */}
                <div className="flex flex-col items-center text-center border-2 border-red-500">
                  <div className="w-full aspect-square max-w-[300px] mb-6 rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm border-2 border-red-500">
                    <img
                      src="/placeholder.jpg"
                      alt="Elisey"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 border-2 border-red-500">Elisey</h3>
                  <p className="text-muted-foreground leading-relaxed border-2 border-red-500">
                    Začínal jako majitel restaurace a firmy s krabičkovou dietou, později rozjel úspěšný projekt pro
                    rychlé doručování potravin. Díky zkušenostem z obou světů pochopil, že gastro podniky potřebují být
                    vidět na sociálních sítích, ale jejich majitelé na to často nemají čas.
                  </p>
                </div>
              </div>

              {/* Mission Statement */}
              <div className="text-center max-w-3xl mx-auto border-2 border-red-500">
                <p className="text-xl lg:text-2xl font-semibold leading-relaxed text-foreground border-2 border-red-500">
                  Naším cílem je, aby všechny marketingové aktivity restaurace šlo ovládat jednoduše – jen pomocí
                  několika zpráv v telefonu.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-muted/50 py-20 border-2 border-red-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-2 border-red-500">
            <h2 className="text-4xl lg:text-5xl font-bold text-center mb-12 border-2 border-red-500">Často kladené otázky</h2>
            <Accordion type="single" collapsible className="w-full space-y-4 border-2 border-red-500">
              {[
                {
                  q: "Je to opravdu jen za 2 950 Kč?",
                  a: "Ano. Cena je finální a zahrnuje vše - správu obsahu i tvorbu reklamy.",
                },
                {
                  q: "Proč je to tak levné?",
                  a: "Využíváme poloautomatizované procesy s podporou umělé inteligence, které nám umožňují spravovat více restaurací kvalitně a zároveň šetřit vaše náklady.",
                },
                {
                  q: "Co když nemám žádné fotky?",
                  a: "Stačí nám pár snímků z mobilu. O zbytek se postaráme.",
                },
                {
                  q: "Jak rychle uvidím výsledky?",
                  a: "První zlepšení uvidíte během 2–3 týdnů. U některých klientů už po 7 dnech.",
                },
                {
                  q: "Musím něco dělat pravidelně?",
                  a: "Ne. Jen jednou měsíčně schválíte návrhy. Zbytek je na nás.",
                },
                {
                  q: "Mám nápad na příspěvek. Jak ho mohu přidat na platformu?",
                  a: "Stačí napsat Markétě na WhatsApp s vaším nápadem nebo informací. Postará se o tvorbu a zveřejnění příspěvku na vašich sociálních sítích.",
                },
                {
                  q: "Podporujete Reels a další formáty?",
                  a: "Zatím ne, ale plánujeme je taky přidat do nabídky. Neustále rozšiřujeme naše služby, abychom vám pomohli oslovit širší publikum.",
                },
                {
                  q: "Co když mám novou akci nebo fotografie?",
                  a: "Jednoduše je pošlete Markétě přes WhatsApp. Rychle je začleníme do vašeho obsahu, aby vaši zákazníci byli vždy informováni o novinkách.",
                },
                {
                  q: "Kolik času mi to zabere?",
                  a: "Minimálně! Můžete strávit méně než několik minut týdně komunikací s Markétou. Ona se postará o vše ostatní.",
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6 bg-background">
                  <AccordionTrigger className="text-base lg:text-lg font-semibold hover:no-underline py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-20 border-2 border-red-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-2 border-red-500">
            <h2 className="text-4xl lg:text-5xl font-bold text-center mb-12 border-2 border-red-500">
              Profesionální marketing pro restauraci
              <br />
              Bez vysokých nákladů a složitých smluv
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-12 border-2 border-red-500">
              8× dostupnější než běžná agentura a bez zbytečné práce navíc
            </p>

            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto border-2 border-red-500">
              {/* Agentura */}
              <Card className="border-red-200">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-3xl">🟥</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Agentura</h3>
                    <p className="text-xl font-semibold text-red-600 mb-1">Od 25 000 Kč/měs</p>
                    <p className="text-sm text-muted-foreground">Smlouvy, schůzky, vysoké náklady</p>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">❌</span>
                      <span>Náročné na koordinaci a komunikaci</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">❌</span>
                      <span>Max. 20 hodin práce měsíčně</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">❌</span>
                      <span>Zdlouhavé schvalování a procesy</span>
                    </li>
                  </ul>
                  <p className="mt-6 text-sm text-muted-foreground">
                    👎 Hodí se jen pro velké podniky s vyšším rozpočtem
                  </p>
                </CardContent>
              </Card>

              {/* Sami */}
              <Card className="border-orange-200">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-3xl">🟧</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Sami</h3>
                    <p className="text-xl font-semibold text-orange-600 mb-1">0 Kč + vlastní čas</p>
                    <p className="text-sm text-muted-foreground">Zní levně, ale stojí vás nejvíc</p>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">⚠️</span>
                      <span>Nulová pravidelnost</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">⚠️</span>
                      <span>Nízka kvalita obsahu</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">⚠️</span>
                      <span>Stojí vás 5–10 hodin týdně</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">⚠️</span>
                      <span>Žádný efekt z příspěvků bez reklamy</span>
                    </li>
                  </ul>
                  <p className="mt-6 text-sm text-muted-foreground">
                    👎 Nejčastější důvod, proč profily působí neaktivně
                  </p>
                </CardContent>
              </Card>

              {/* HeroContent */}
              <Card className="border-green-200 border-2">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-3xl">🟩</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">HeroContent</h3>
                    <p className="text-xl font-semibold text-green-600 mb-1">2 950 Kč/měs</p>
                    <p className="text-sm text-muted-foreground">Konečná cena za kompletní správu sítí a reklamy</p>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✅</span>
                      <span>Obsah připravený předem</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✅</span>
                      <span>Úprava fotek pomocí AI</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✅</span>
                      <span>Denní menu, akce a stories bez práce navíc</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✅</span>
                      <span>Vše schvalujete přes WhatsApp</span>
                    </li>
                  </ul>
                  <p className="mt-6 text-sm font-semibold text-green-600">
                    💚 Oblíbené řešení pro malé a střední podniky
                  </p>
                  <Button
                    size="lg"
                    className="w-full mt-6 bg-yellow-400 text-black hover:bg-yellow-500 font-semibold"
                    asChild
                  >
                    <Link href="#form">Chci vyzkoušet</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-12 bg-muted/50 border-2 border-red-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-2 border-red-500">
            <div className="flex flex-col gap-8 border-2 border-red-500">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-2 border-red-500">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-yellow-400 rounded-lg" aria-hidden="true" />
                    <span className="text-xl font-semibold">HeroContent</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    HeroContent, s.r.o.
                    <br />
                    IČO: 21318255
                    <br />
                    Korunní 2569/108, Vinohrady, 101 00 Prague
                    <br />
                    welcome@herocontent.ai
                  </p>
                </div>
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
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} HeroContent. Všechna práva vyhrazena.
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <Link
                    href="https://herocontent.ai/privacy-policy"
                    className="text-muted-foreground hover:text-yellow-400 transition-colors"
                  >
                    Zásady ochrany osobních údajů
                  </Link>
                  <Link
                    href="https://herocontent.ai/terms-of-service"
                    className="text-muted-foreground hover:text-yellow-400 transition-colors"
                  >
                    Obchodní podmínky
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

