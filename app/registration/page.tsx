"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { trackRegistrationFormOpen, trackRegistrationComplete } from "@/lib/analytics"

// User app URL - update this to match your user app URL
const USER_APP_URL = process.env.NEXT_PUBLIC_USER_APP_URL || "http://localhost:3001"

// Suggested SEO title: "Vyzkoušejte HeroContent zdarma - Správa sociálních sítí pro restaurace"
// Suggested SEO description: "Zaregistrujte svou restauraci a začněte využívat profesionální správu Instagramu a reklamy. První konzultace zdarma."

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    restaurantName: "",
    website: "",
    facebook: "",
    instagram: "",
    phone: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showError, setShowError] = useState(false)

  // Track when registration form page is viewed
  useEffect(() => {
    trackRegistrationFormOpen()
  }, [])

  const validatePhoneNumber = (phone: string): string | null => {
    if (!phone.trim()) {
      return "Telefonní číslo je povinné"
    }

    // Remove spaces and dashes for validation
    const cleanedPhone = phone.replace(/\s+/g, "").replace(/-/g, "")

    // Check if it starts with +420 (Czech) or +421 (Slovak)
    if (!cleanedPhone.startsWith("+420") && !cleanedPhone.startsWith("+421")) {
      return "Telefonní číslo musí začínat +420 (Česká republika) nebo +421 (Slovensko)"
    }

    let digits = ""

    // Check Czech number format: +420 followed by 9 digits
    if (cleanedPhone.startsWith("+420")) {
      digits = cleanedPhone.substring(4) // Get digits after +420
      if (!/^\d+$/.test(digits)) {
        return "Telefonní číslo může obsahovat pouze číslice po kódu +420"
      }
      if (digits.length !== 9) {
        return "Telefonní číslo musí mít 9 číslic po kódu +420 (celkem 13 znaků)"
      }
    }

    // Check Slovak number format: +421 followed by 9 digits
    if (cleanedPhone.startsWith("+421")) {
      digits = cleanedPhone.substring(4) // Get digits after +421
      if (!/^\d+$/.test(digits)) {
        return "Telefonní číslo může obsahovat pouze číslice po kódu +421"
      }
      if (digits.length !== 9) {
        return "Telefonní číslo musí mít 9 číslic po kódu +421 (celkem 13 znaků)"
      }
    }

    // Check for obviously fake numbers
    if (digits) {
      // Check if all digits are the same (111111111, 222222222, etc.)
      if (/^(\d)\1{8}$/.test(digits)) {
        return "Zadejte prosím platné telefonní číslo"
      }

      // Check if all zeros (000000000)
      if (digits === "000000000") {
        return "Zadejte prosím platné telefonní číslo"
      }

      // Check for sequential ascending (123456789)
      let isSequentialAsc = true
      for (let i = 1; i < digits.length; i++) {
        if (parseInt(digits[i]) !== parseInt(digits[i - 1]) + 1) {
          isSequentialAsc = false
          break
        }
      }
      if (isSequentialAsc) {
        return "Zadejte prosím platné telefonní číslo"
      }

      // Check for sequential descending (987654321)
      let isSequentialDesc = true
      for (let i = 1; i < digits.length; i++) {
        if (parseInt(digits[i]) !== parseInt(digits[i - 1]) - 1) {
          isSequentialDesc = false
          break
        }
      }
      if (isSequentialDesc) {
        return "Zadejte prosím platné telefonní číslo"
      }

      // Check for repeated patterns (123123123, 111222333, etc.)
      // Check 3-digit pattern repeated 3 times
      if (digits.length === 9) {
        const pattern3 = digits.substring(0, 3)
        if (digits === pattern3 + pattern3 + pattern3) {
          return "Zadejte prosím platné telefonní číslo"
        }
      }
    }

    return null
  }

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    
    // Validate phone number in real-time
    if (field === "phone") {
      const phoneError = validatePhoneNumber(value)
      if (phoneError) {
        setErrors((prev) => ({ ...prev, [field]: phoneError }))
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[field]
          return newErrors
        })
      }
    } else if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
    setShowError(false)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.restaurantName.trim()) {
      newErrors.restaurantName = "Název restaurace je povinný"
    }

    const phoneError = validatePhoneNumber(formData.phone)
    if (phoneError) {
      newErrors.phone = phoneError
    }

    if (!formData.website.trim() && !formData.facebook.trim() && !formData.instagram.trim()) {
      newErrors.social = "Alespoň jeden odkaz (web nebo sociální síť) je povinný"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isFormValid =
    formData.restaurantName.trim() && 
    formData.phone.trim() &&
    !validatePhoneNumber(formData.phone) &&
    (formData.website.trim() || formData.facebook.trim() || formData.instagram.trim())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) {
      setShowError(true)
      return
    }
    if (validateForm()) {
      // TODO: Call your registration API to complete registration
      console.log("Complete form submitted:", formData)
      
      // Track successful registration completion
      trackRegistrationComplete(formData.restaurantName)
      
      // After successful registration, redirect to user app
      // You can pass user info or auth token via query params
      const params = new URLSearchParams({
        phone: formData.phone,
        restaurantName: formData.restaurantName,
        registered: "true"
      })
      window.location.href = `${USER_APP_URL}?${params.toString()}`
    }
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
            <p className="text-gray-700 leading-relaxed">
              Na základě odkazů na váš web, Google Maps a sociální sítě lépe pochopíme váš podnik, nabídku i styl komunikace.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Čím více zdrojů a fotografií od vás budeme mít, tím přesnější a kvalitnější ukázky obsahu vám dokážeme připravit.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Z těchto podkladů vám následně zdarma připravíme ukázku obsahu, konkrétně 12 příspěvků vytvořených na míru vašemu podniku.
            </p>
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

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base font-semibold text-gray-900">
                Telefonní číslo <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+420 XXX XXX XXX nebo +421 XXX XXX XXX"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className={`h-12 bg-gray-50 border-gray-200 ${errors.phone ? "border-red-500" : ""}`}
                required
              />
              {errors.phone ? (
                <p className="text-sm text-red-500">{errors.phone}</p>
              ) : (
                <p className="text-sm text-gray-500">
                  Zadejte číslo ve formátu +420 nebo +421 následované 9 číslicemi
                </p>
              )}
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
                  Vyplňte název restaurace, telefonní číslo a alespoň jeden odkaz (web nebo sociální síť)
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-red-500 rotate-45" />
                </div>
              )}
            </div>

            <p className="text-xs text-center text-gray-500 leading-relaxed">
              Souhlasím s{" "}
              <Link href="/obchodni-podminky" className="text-yellow-400 hover:underline">
                podmínkami licenční smlouvy
              </Link>{" "}
              a se{" "}
              <Link href="/zasady-ochrany-osobnich-udaju" className="text-yellow-400 hover:underline">
                zásadami ochrany osobních údajů
              </Link>.
            </p>
          </form>
        </section>
      </div>
    </main>
  )
}

