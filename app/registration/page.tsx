"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check } from "lucide-react"
import Link from "next/link"

// User app URL - update this to match your user app URL
const USER_APP_URL = process.env.NEXT_PUBLIC_USER_APP_URL || "http://localhost:3001"

// Suggested SEO title: "Vyzkoušejte HeroContent zdarma - Správa sociálních sítí pro restaurace"
// Suggested SEO description: "Zaregistrujte svou restauraci a začněte využívat profesionální správu Instagramu a reklamy. První konzultace zdarma."

export default function RegistrationPage() {
  const [step, setStep] = useState<"details" | "phone">("details")
  const [codeSent, setCodeSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [formData, setFormData] = useState({
    restaurantName: "",
    businessType: "",
    website: "",
    facebook: "",
    instagram: "",
    phone: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showError, setShowError] = useState(false)

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
    setShowError(false)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.restaurantName.trim()) {
      newErrors.restaurantName = "Název restaurace je povinný"
    }

    if (!formData.website.trim() && !formData.facebook.trim() && !formData.instagram.trim()) {
      newErrors.social = "Alespoň jeden odkaz (web nebo sociální síť) je povinný"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isFormValid =
    formData.restaurantName.trim() && 
    (formData.website.trim() || formData.facebook.trim() || formData.instagram.trim())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) {
      setShowError(true)
      return
    }
    if (validateForm()) {
      setStep("phone")
    }
  }

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.phone.trim()) {
      setShowError(true)
      return
    }
    console.log("Sending verification code to:", formData.phone)
    setCodeSent(true)
    setShowError(false)
  }

  const handleCodeVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!verificationCode.trim()) {
      setShowError(true)
      return
    }
    
    // TODO: Call your registration API to verify code and complete registration
    console.log("Complete form submitted:", formData, "Code:", verificationCode)
    
    // After successful registration, redirect to user app
    // You can pass user info or auth token via query params
    const params = new URLSearchParams({
      phone: formData.phone,
      restaurantName: formData.restaurantName,
      registered: "true"
    })
    window.location.href = `${USER_APP_URL}?${params.toString()}`
  }

  if (step === "phone") {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="grid md:grid-cols-2 min-h-screen">
          {/* Left side - Benefits */}
          <section className="bg-white p-8 md:p-16 flex flex-col justify-center">
            <Link 
              href="/" 
              className="text-sm text-gray-600 hover:text-gray-900 inline-flex items-center mb-8 self-start"
            >
              ← Zpět na hlavní stránku
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-balance">
              Ověření přes
              <br />
              <span className="text-yellow-400">WhatsApp</span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed text-pretty">
              Pro dokončení registrace potřebujeme ověřit vaše telefonní číslo.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-black" />
                </div>
                <p className="text-gray-700 leading-relaxed">Zadejte své telefonní číslo.</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-black" />
                </div>
                <p className="text-gray-700 leading-relaxed">Pošleme vám přihlašovací kód přes WhatsApp.</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-black" />
                </div>
                <p className="text-gray-700 leading-relaxed">Zadáte kód a můžete začít používat HeroContent.</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-black" />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Toto číslo budeme používat pro komunikaci ohledně vašeho účtu.
                </p>
              </div>
            </div>
          </section>

          {/* Right side - Phone Form */}
          <section className="bg-white p-8 md:p-16 flex flex-col justify-center border-l border-gray-200">
            {!codeSent ? (
              <form onSubmit={handlePhoneSubmit} className="space-y-6 max-w-md mx-auto w-full pt-0">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base font-semibold text-gray-900">
                    Telefonní číslo <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+420 XXX XXX XXX"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="h-12 bg-gray-50 border-gray-200"
                    autoFocus
                    required
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Na toto číslo vám pošleme přihlašovací kód přes WhatsApp, kterým dokončíte registraci.
                  </p>
                </div>

                <div className="relative">
                  <Button
                    type="submit"
                    className="w-full h-12 bg-yellow-400 text-black hover:bg-yellow-500 font-semibold text-base"
                  >
                    Odeslat přihlašovací kód
                  </Button>
                  {showError && (
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-red-500 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap shadow-lg">
                      Vyplňte prosím své telefonní číslo
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-red-500 rotate-45" />
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="text-sm text-gray-600 hover:text-gray-900 underline w-full text-center"
                >
                  ← Vrátit se zpět
                </button>
              </form>
            ) : (
              <form onSubmit={handleCodeVerification} className="space-y-6 max-w-md mx-auto w-full">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base font-semibold text-gray-900">
                    Telefonní číslo
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    className="h-12 bg-gray-100 border-gray-200"
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="code" className="text-base font-semibold text-gray-900">
                    Ověřovací kód <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="Zadejte 6-místný kód"
                    value={verificationCode}
                    onChange={(e) => {
                      setVerificationCode(e.target.value)
                      setShowError(false)
                    }}
                    className="h-12 bg-gray-50 border-gray-200 text-center text-2xl tracking-widest font-mono"
                    maxLength={6}
                    autoFocus
                    required
                  />
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Kód byl odeslán na WhatsApp číslo {formData.phone}
                  </p>
                </div>

                <div className="relative">
                  <Button
                    type="submit"
                    className="w-full h-12 bg-yellow-400 text-black hover:bg-yellow-500 font-semibold text-base"
                  >
                    Ověřit a dokončit registraci
                  </Button>
                  {showError && (
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-red-500 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap shadow-lg">
                      Vyplňte prosím ověřovací kód
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-red-500 rotate-45" />
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCodeSent(false)
                    setVerificationCode("")
                  }}
                  className="text-sm text-gray-600 hover:text-gray-900 underline w-full text-center"
                >
                  ← Změnit telefonní číslo
                </button>
              </form>
            )}
          </section>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="grid md:grid-cols-2 min-h-screen">
        {/* Left side - Benefits */}
        <section className="bg-white p-8 md:p-16 flex flex-col justify-center">
          <Link 
            href="/" 
            className="text-sm text-gray-600 hover:text-gray-900 inline-flex items-center mb-8 self-start"
          >
            ← Zpět na hlavní stránku
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-balance">
            Vyzkoušejte
            <br />
            <span className="text-yellow-400">HeroContent</span>
          </h1>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-4 h-4 text-black" />
              </div>
              <p className="text-gray-700 leading-relaxed">Získáme základní přehled o vašem podniku, nabídce a stylu komunikace.</p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-4 h-4 text-black" />
              </div>
              <p className="text-gray-700 leading-relaxed">Připravíme se na hovor tak, abychom neřešili obecné věci, ale šli rovnou k věci.</p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-4 h-4 text-black" />
              </div>
              <p className="text-gray-700 leading-relaxed">Přizpůsobíme HeroContent vašemu typu restaurace a cílovým hostům.</p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-4 h-4 text-black" />
              </div>
              <p className="text-gray-700 leading-relaxed">
                Vygenerujeme pro vás konkrétní ukázku obsahu na míru vašemu podniku.
              </p>
            </div>
          </div>
        </section>

        {/* Right side - Form */}
        <section className="bg-white p-8 md:p-16 flex flex-col justify-center border-l border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto w-full pt-0">
            <div className="space-y-2">
              <Label htmlFor="restaurantName" className="text-base font-semibold text-gray-900">
                Název restaurace <span className="text-red-500">*</span>
              </Label>
              <Input
                id="restaurantName"
                placeholder="např. Restaurace U zlatého lva"
                value={formData.restaurantName}
                onChange={(e) => updateField("restaurantName", e.target.value)}
                className={`h-12 bg-gray-50 border-gray-200 ${errors.restaurantName ? "border-red-500" : ""}`}
                autoFocus
                required
              />
              {errors.restaurantName && <p className="text-sm text-red-500">{errors.restaurantName}</p>}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-gray-700 leading-relaxed">
                Potřebujeme alespoň jeden z odkazů níže, ale pro nejlepší výsledky prosím vyplňte všechny odkazy.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="text-base font-semibold text-gray-900">
                Odkaz na web
              </Label>
              <Input
                id="website"
                type="text"
                placeholder="https://www.vase-restaurace.cz"
                value={formData.website}
                onChange={(e) => updateField("website", e.target.value)}
                className="h-12 bg-gray-50 border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="facebook" className="text-base font-semibold text-gray-900">
                Odkaz na Facebook
              </Label>
              <Input
                id="facebook"
                type="text"
                placeholder="https://www.facebook.com/vase-restaurace"
                value={formData.facebook}
                onChange={(e) => updateField("facebook", e.target.value)}
                className="h-12 bg-gray-50 border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram" className="text-base font-semibold text-gray-900">
                Odkaz na Instagram
              </Label>
              <Input
                id="instagram"
                type="text"
                placeholder="https://www.instagram.com/vase_restaurace"
                value={formData.instagram}
                onChange={(e) => updateField("instagram", e.target.value)}
                className="h-12 bg-gray-50 border-gray-200"
              />
              {errors.social && <p className="text-sm text-red-500">{errors.social}</p>}
            </div>

            <div className="relative">
              <Button
                type="submit"
                className="w-full h-12 bg-yellow-400 text-black hover:bg-yellow-500 font-semibold text-base"
              >
                Vyzkoušet HeroContent
              </Button>
              {showError && (
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-red-500 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap shadow-lg">
                  Vyplňte název restaurace a alespoň jeden odkaz (web nebo sociální síť)
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-red-500 rotate-45" />
                </div>
              )}
            </div>

            <p className="text-xs text-center text-gray-500 leading-relaxed">
              Souhlasím s podmínkami licenční smlouvy a se zásadami ochrany osobních údajů.
            </p>
          </form>
        </section>
      </div>
    </main>
  )
}

