"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft, Mail } from "lucide-react"

interface JobPosition {
  id: string
  title: string
  department: string
}

const jobAds: Record<string, {
  title: string
  department: string
  content: {
    aboutUs: string[]
    responsibilities: string[]
    requirements: string[]
    nextSteps: string
  }
}> = {
  "specialista-zakaznicke-podpory": {
    title: "Specialista zákaznické podpory",
    department: "Zákaznická podpora",
    content: {
      aboutUs: [
        "Budujeme AI platformu, která bude schopna spravovat sociální sítě desítkám tisíc restaurací po celém světě.",
        "Jsme zainvestovaný startup. Aktuálně ladíme produkt v Česku v malém, efektivním týmu, ale v blízké době nás čeká expanze do USA a výrazný růst firmy i týmu. Teď je ideální chvíle naskočit a růst spolu s námi.",
        "Pracujeme plně remote a hodnotíme podle výsledků, ne podle odsezených hodin. Dáváme lidem důvěru a odpovědnost, bez které remote spolupráce nemůže fungovat."
      ],
      responsibilities: [
        "Onboarding nových klientů a jejich provedení prvním nastavením služby",
        "Poskytování marketingové i technické podpory během onboardingu i následné spolupráce",
        "Aktivní řešení klientských problémů na callu nebo conference callu",
        "Zajištění toho, aby klienti službu chápali, správně ji používali a viděli její reálný přínos"
      ],
      requirements: [
        "Juniora nebo mediora, který má ambice a chce růst spolu s firmou",
        "Zkušenost v customer care/ success, account managementu nebo digitálním marketingu (například social media specialists)",
        "Výhoda je základní znalost marketingu, CRMka a digitálních nástrojů",
        "Česky nebo slovensky mluvícího kandidáta s dobrou znalostí angličtiny minimálně B2",
        "Drive řešit klientské problémy samostatně, ať už jsou marketingové, technické nebo operativní",
        "Někoho, kdo chce zlepšovat procesy a nebojí se je sám navrhovat a tvořit"
      ],
      nextSteps: "Pošli svoje CV a napiš, proč s tebou chceme pracovat. Klidně použij AI, ale prodej se prosím."
    }
  }
}

const jobPositions: JobPosition[] = [
  {
    id: "specialista-zakaznicke-podpory",
    title: "Specialista zákaznické podpory",
    department: "Zákaznická podpora"
  }
]

export default function KarieraPage() {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null)

  const selectedJob = selectedJobId ? jobAds[selectedJobId] : null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zpět na hlavní stránku
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Kariéra</h1>
          <p className="text-xl text-muted-foreground">
            Přidej se k našemu týmu a pomoz nám měnit způsob, jak restaurace spravují své sociální sítě.
          </p>
        </div>

        {!selectedJob ? (
          <>
            <h2 className="text-2xl font-semibold mb-6">Otevřené pozice</h2>
            <div className="space-y-4">
              {jobPositions.map((job) => (
                <Card 
                  key={job.id}
                  className="cursor-pointer hover:border-yellow-400 transition-colors"
                  onClick={() => setSelectedJobId(job.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <CardDescription>{job.department}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div>
            <Button
              variant="ghost"
              onClick={() => setSelectedJobId(null)}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zpět na seznam pozic
            </Button>

            <Card>
              <CardHeader>
                <CardTitle className="text-3xl mb-2">{selectedJob.title}</CardTitle>
                <CardDescription>{selectedJob.department}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Co děláme:</h3>
                  <ul className="space-y-3">
                    {selectedJob.content.aboutUs.map((point, index) => (
                      <li key={index} className="text-muted-foreground leading-relaxed">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Co bys dělal/a ty:</h3>
                  <ul className="space-y-2">
                    {selectedJob.content.responsibilities.map((responsibility, index) => (
                      <li key={index} className="text-muted-foreground leading-relaxed flex items-start">
                        <span className="text-yellow-400 mr-2">•</span>
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Koho hledáme:</h3>
                  <ul className="space-y-2">
                    {selectedJob.content.requirements.map((requirement, index) => (
                      <li key={index} className="text-muted-foreground leading-relaxed flex items-start">
                        <span className="text-yellow-400 mr-2">•</span>
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Jaké jsou next steps:</h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedJob.content.nextSteps}</p>
                </div>

                <div className="pt-6 border-t">
                  <Button
                    asChild
                    className="w-full sm:w-auto bg-yellow-400 text-black hover:bg-yellow-500 font-semibold"
                  >
                    <a href="mailto:welcome@herocontent.ai?subject=Přihláška - Specialista zákaznické podpory">
                      <Mail className="w-4 h-4 mr-2" />
                      Poslat přihlášku
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

