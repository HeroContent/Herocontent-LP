import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Odhlášení z odběru | HeroContent",
  description: "Byli jste úspěšně odhlášeni z našeho e-mailového rozesílání.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function UnsubscribePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-md w-full text-center border-yellow-400/20">
        <CardContent className="pt-12 pb-8 px-8">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-16 h-16 text-yellow-400" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Odhlášení potvrzeno</h1>
          
          <p className="text-muted-foreground mb-4">
            Byli jste úspěšně odhlášeni z našeho e-mailového rozesílání.
          </p>
          
          <p className="text-sm text-muted-foreground mb-8">
            Již od nás nebudete dostávat žádné marketingové e-maily. Pokud jste se odhlásili omylem, můžete se kdykoli znovu přihlásit přes naši webovou stránku.
          </p>
          
          <div className="flex flex-col gap-3">
            <Button asChild className="bg-yellow-400 text-black hover:bg-yellow-500 cursor-pointer">
              <Link href="/">Zpět na hlavní stránku</Link>
            </Button>
            
            <Button asChild variant="outline" className="cursor-pointer">
              <Link href="mailto:support@herocontent.ai">Kontaktovat podporu</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
