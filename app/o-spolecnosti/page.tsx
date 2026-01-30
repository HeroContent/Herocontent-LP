import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "O společnosti - HeroContent",
  description: "O společnosti Hero Content s.r.o.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function OSpolecnostiPage() {
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
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">O společnosti</h1>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="prose prose-lg max-w-none space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                HeroContent je startup zaměřený na pomoc restauracím růst pomocí efektivní správy sociálních sítí. 
                Využíváme umělou inteligenci k vytváření obsahu a automatizaci marketingových procesů, které pomáhají 
                restauracím oslovit nové zákazníky a zvýšit tržby.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                Naším cílem je umožnit majitelům restaurací soustředit se na to, v čem jsou nejlepší – na vaření 
                a péči o hosty – zatímco my se staráme o jejich online přítomnost a marketing.
              </p>

              <div className="mt-12 pt-8 border-t border-border">
                <h2 className="text-2xl font-semibold mb-6">Náš tým</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-full aspect-square max-w-[200px] mb-4 rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm">
                      <img
                        src="/images/founder-elisey.jpg"
                        alt="Elisey"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Elisey</h3>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-full aspect-square max-w-[200px] mb-4 rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm">
                      <img
                        src="/images/founder-david.jpg"
                        alt="David"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">David</h3>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-full aspect-square max-w-[200px] mb-4 rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm">
                      <img
                        src="/images/founder-anton.jpg"
                        alt="Anton"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Anton</h3>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

