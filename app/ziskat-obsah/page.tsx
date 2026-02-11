"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Instagram, Facebook, TrendingUp, Star, PenTool, Target, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"
import { trackLeadFormOpen, trackLeadFormSubmit } from "@/lib/analytics"

export default function ZiskatObsahPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formFieldLoading, setFormFieldLoading] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    businessName: "",
    phone: "+420",
    email: "",
  })

  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(true) // Hidden checkbox, always accepted

  // Track when page is viewed
  useEffect(() => {
    trackLeadFormOpen('ziskat_obsah_page')
  }, [])

  // Tracking data for form submission
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

  const handleInputChange = (field: string, value: string) => {
    if (field === 'email') {
      setFormFieldLoading('email')
      setTimeout(() => setFormFieldLoading(null), 50)
    }
    
    setFormData((prev) => ({ ...prev, [field]: value }))
    setSubmitError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setSubmitSuccess(false)
    
    // Validate required fields
    const trimmedPhone = formData.phone.trim()
    if (!formData.businessName || !formData.email || !trimmedPhone || trimmedPhone === "+420" || trimmedPhone.length < 9) {
      setSubmitError("Prosím vyplňte všechna povinná pole včetně telefonního čísla")
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
      
      if (!webhookUrl) {
        console.error('NEXT_PUBLIC_N8N_WEBHOOK_URL not configured')
        throw new Error('Služba není dostupná. Zkuste to prosím později.')
      }

      // Capture tracking data right before submission to ensure we have the latest values
      const urlParams = new URLSearchParams(window.location.search)
      const currentTrackingData = {
        cookies: document.cookie || "",
        referer: document.referrer || trackingData.referer || "",
        utm_source: urlParams.get('utm_source') || trackingData.utm_source || "",
        utm_medium: urlParams.get('utm_medium') || trackingData.utm_medium || "",
        utm_content: urlParams.get('utm_content') || trackingData.utm_content || ""
      }

      // Build payload matching Tilda format for n8n compatibility
      const webhookPayload = {
        name: formData.businessName,
        company: formData.businessName,
        businessName: formData.businessName,
        phone: formData.phone,
        email: formData.email,
        COOKIES: currentTrackingData.cookies,
        referer: currentTrackingData.referer,
        utm_source: currentTrackingData.utm_source,
        utm_medium: currentTrackingData.utm_medium,
        utm_content: currentTrackingData.utm_content,
        source: 'herocontent-ziskat-obsah',
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
      trackLeadFormSubmit('ziskat_obsah')
      
      // Reset form after a short delay
      setTimeout(() => {
        setFormData({
          businessName: "",
          phone: "+420",
          email: "",
        })
        setPrivacyPolicyAccepted(true) // Keep accepted (hidden checkbox)
        setSubmitSuccess(false)
      }, 2000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError(error instanceof Error ? error.message : 'Něco se pokazilo. Zkuste to prosím znovu.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img 
              src="/images/brand/HC_Logo.png" 
              alt="HeroContent Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-semibold hidden md:inline">HeroContent</span>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Two Column Layout: Content Left, Form Right on Desktop */}
        {/* Mobile: Headline -> Form -> Content Boxes */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-16 items-start">
          {/* Left Column - Content (Desktop) */}
          <div className="w-full lg:w-auto space-y-12 order-1">
            {/* Hero Section */}
            <section>
              <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold mb-6 leading-tight">
                Získejte 12 příspěvků zdarma a zjistě, jak vyřešíme vaše sociální sítě jen za 2 950 Kč měsíčně
              </h1>
              <p className="text-xl text-muted-foreground mb-4 lg:mb-6">
                Jednoduše, bez závazků, bez dlouhodobých smluv. Stovky restaurací důvěřují HeroContent.
              </p>
              <div className="flex flex-row gap-4 sm:gap-6 mb-4 lg:mb-0">
                <div className="flex flex-col">
                  <div className="flex items-center h-6 mb-1">
                    <span className="text-base font-semibold text-yellow-400 leading-none">
                      100+
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground capitalize leading-tight">
                    Spokojených zákazníků
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center h-6 mb-1">
                    <img 
                      src="/images/brand/meta-logo.png" 
                      alt="Meta" 
                      className="h-6 w-auto object-contain"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground leading-tight">
                    Oficiální partner Meta
                  </span>
                </div>
              </div>
            </section>

            {/* Content Boxes and Testimonial - Desktop only */}
            <div className="hidden lg:block space-y-12">
              {/* What We'll Cover Section */}
              <section>
                <h2 className="text-3xl lg:text-4xl font-bold mb-8">
                  Co vám ukážeme:
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <Card className="border-border">
                    <CardContent className="p-6 relative">
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-yellow-400/10 flex items-center justify-center">
                        <PenTool className="w-4 h-4 text-yellow-400" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 pr-12">Jak tvoříme obsah</h3>
                      <p className="text-sm text-muted-foreground">
                        Profesionální příspěvky, grafika a text pro Instagram a Facebook.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="p-6 relative">
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-yellow-400/10 flex items-center justify-center">
                        <Target className="w-4 h-4 text-yellow-400" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 pr-12">Jak nastavujeme reklamu</h3>
                      <p className="text-sm text-muted-foreground">
                        Efektivní cílená reklama pro přilákání nových zákazníků ve vašem okolí.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="p-6 relative">
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-yellow-400/10 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-yellow-400" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 pr-12">Jak zveřejňujeme obsah za vás</h3>
                      <p className="text-sm text-muted-foreground">
                        Měsíční plánování obsahu a automatické zveřejňování denního menu.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="p-6 relative">
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-yellow-400/10 flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-yellow-400" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 pr-12">Jak jsme nejlevnější na trhu</h3>
                      <p className="text-sm text-muted-foreground">
                        Díky automatizacím a umělé inteligenci jsme 10x levnější než marketingové agentury.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Badges Section */}
                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  <Card className="border-border bg-muted/30">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                        <Star className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Přes 100 spokojených zákazníků</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-muted/30">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                        <Star className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Nejlevnější a nejefektivnější řešení na trhu</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Testimonial Section */}
              <section>
                <Card className="border-border bg-muted/30">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-lg bg-background border border-border flex items-center justify-center flex-shrink-0 p-2">
                        <img 
                          src="/logos/logo_pivni_privstav.png" 
                          alt="Pivní přístav" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold mb-1">Iva Kuku, Majitelka Pivního přístavu</p>
                        <p className="text-sm text-muted-foreground italic">
                          "S Herocontent spolupracujeme už více než rok, nemusíme díky nim řešit sociální sítě a pravidelné reklamy nám zvýšili viditelně počet hostů"
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>
          </div>

          {/* Right Column - Form (Desktop) / Mobile Order 2 */}
          <div className="w-full lg:w-auto order-2 lg:sticky lg:top-24 flex-shrink-0">
            <Card className="border-2 border-yellow-400/50">
              <CardContent className="p-4 lg:p-6">
                {/* Free Content Image at Top */}
                <div className="mb-4">
                  <div className="w-full rounded-lg overflow-hidden flex items-center justify-center">
                    {/* Mobile image */}
                    <img
                      src="/images/showcases/Story showcase mobile.jpg"
                      alt="Ukázka 12 příspěvků pro sociální sítě"
                      className="w-full h-auto lg:hidden object-contain"
                      loading="lazy"
                    />
                    {/* Desktop image */}
                    <img
                      src="/images/showcases/story-showcase-combined.jpg"
                      alt="Ukázka 12 příspěvků pro sociální sítě"
                      className="hidden lg:block lg:w-auto lg:h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>

                <h2 className="text-lg lg:text-xl font-bold mb-4 leading-tight">Získejte ukázku obsahu na míru vašemu podniku</h2>
                
                <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="businessName">
                    Název vašeho gastro podniku <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="businessName"
                    placeholder="Název vašeho gastro podniku"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                    className="h-11"
                    required
                    autoComplete="organization"
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
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="h-11"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Váš e-mail"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`h-11 ${formFieldLoading === 'email' ? 'opacity-90' : ''}`}
                      required
                      autoComplete="email"
                      inputMode="email"
                    />
                    {formFieldLoading === 'email' && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="h-4 w-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                </div>
                {/* Privacy policy checkbox hidden */}

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

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold cursor-pointer"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Odesílám..." : "Odeslat žádost"}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Získejte 12 příspěvků zdarma pro vaše sítě
                  </p>
                </div>
              </form>
              </CardContent>
            </Card>
          </div>

          {/* Content Boxes and Testimonial - Mobile Order 3, Hidden on desktop (shown in left column) */}
          <div className="w-full lg:hidden order-3 space-y-12">
              {/* What We'll Cover Section */}
              <section>
                <h2 className="text-3xl lg:text-4xl font-bold mb-8">
                  Co vám ukážeme:
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <Card className="border-border">
                    <CardContent className="p-6 relative">
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-yellow-400/10 flex items-center justify-center">
                        <PenTool className="w-4 h-4 text-yellow-400" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 pr-12">Jak tvoříme obsah</h3>
                      <p className="text-sm text-muted-foreground">
                        Profesionální příspěvky, grafika a text pro Instagram a Facebook.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="p-6 relative">
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-yellow-400/10 flex items-center justify-center">
                        <Target className="w-4 h-4 text-yellow-400" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 pr-12">Jak nastavujeme reklamu</h3>
                      <p className="text-sm text-muted-foreground">
                        Efektivní cílená reklama pro přilákání nových zákazníků ve vašem okolí.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="p-6 relative">
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-yellow-400/10 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-yellow-400" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 pr-12">Jak zveřejňujeme obsah za vás</h3>
                      <p className="text-sm text-muted-foreground">
                        Měsíční plánování obsahu a automatické zveřejňování denního menu.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="p-6 relative">
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-yellow-400/10 flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-yellow-400" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 pr-12">Jak jsme nejlevnější na trhu</h3>
                      <p className="text-sm text-muted-foreground">
                        Díky automatizacím a umělé inteligenci jsme 10x levnější než marketingové agentury.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Badges Section */}
                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  <Card className="border-border bg-muted/30">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                        <Star className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Přes 100 spokojených zákazníků</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-muted/30">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                        <Star className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Nejlevnější a nejefektivnější řešení na trhu</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Testimonial Section */}
              <section>
                <Card className="border-border bg-muted/30">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-lg bg-background border border-border flex items-center justify-center flex-shrink-0 p-2">
                        <img 
                          src="/logos/logo_pivni_privstav.png" 
                          alt="Pivní přístav" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold mb-1">Iva Kuku, Majitelka Pivního přístavu</p>
                        <p className="text-sm text-muted-foreground italic">
                          "S Herocontent spolupracujeme už více než rok, nemusíme díky nim řešit sociální sítě a pravidelné reklamy nám zvýšili viditelně počet hostů"
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>
        </div>
      </main>
    </div>
  )
}
