"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  category: string
  date: string
  readingTime: string
  excerpt: string
  content: string
}

const blogPosts: BlogPost[] = [
  {
    id: "proc-restaurace-bez-socialnich-siti-ztraci-hosty",
    title: "Proč restaurace bez sociálních sítí ztrácí hosty",
    category: "Marketing",
    date: "15. 1. 2025",
    readingTime: "3",
    excerpt: "Mnoho restaurací stále podceňuje roli sociálních sítí. Přitom právě zde dnes zákazníci často rozhodují, kam půjdou na oběd nebo večeři. Restaurace bez aktivních sociálních sítí přichází o nové hosty každý den, aniž by si to uvědomovala.",
    content: ""
  },
  {
    id: "jaky-obsah-restauraci-privadi-nove-hosty",
    title: "Jaký obsah restauraci přivádí nové hosty",
    category: "Tipy",
    date: "12. 1. 2025",
    readingTime: "3",
    excerpt: "Majitelé restaurací často tápou, co mají na sociálních sítích zveřejňovat. Přitom platí jednoduché pravidlo: čím reálnější obsah, tím lepší výsledky. Zákazníci chtějí vidět skutečné jídlo a atmosféru, ne dokonalou reklamu.",
    content: ""
  },
  {
    id: "jak-casto-ma-restaurace-pridavat-prispevky",
    title: "Jak často má restaurace přidávat příspěvky",
    category: "Tipy",
    date: "10. 1. 2025",
    readingTime: "2",
    excerpt: "Jedna z nejčastějších otázek zní: kolik příspěvků je tak akorát. Odpověď je jasná – důležitější než množství je pravidelnost. Sociální sítě restaurace fungují nejlépe, když jsou aktivní dlouhodobě.",
    content: ""
  },
  {
    id: "jak-ziskat-hosty-diky-lokalnimu-marketingu",
    title: "Jak získat hosty díky lokálnímu marketingu",
    category: "Marketing",
    date: "8. 1. 2025",
    readingTime: "3",
    excerpt: "Pro restaurace je klíčové oslovit lidi v okolí. Právě zde mají sociální sítě obrovskou výhodu. Lokální marketing restaurace patří mezi nejefektivnější způsoby, jak zvýšit návštěvnost.",
    content: ""
  },
  {
    id: "jak-zvladnout-socialni-site-bez-zbytecne-prace",
    title: "Jak zvládnout sociální sítě bez zbytečné práce",
    category: "Tipy",
    date: "5. 1. 2025",
    readingTime: "3",
    excerpt: "Majitelé restaurací často nemají čas řešit marketing. To ale neznamená, že sociální sítě musí být stres. Stačí je zjednodušit a nastavit systém.",
    content: ""
  }
]

export default function BlogPage() {
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Všechny články</h1>
        </div>

        {blogPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              Zatím zde nejsou žádné články. Zkuste to znovu později.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="hover:border-yellow-400 transition-colors cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-2xl lg:text-3xl mb-3">{post.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="text-yellow-400 font-medium">{post.category}</span>
                      <span>{post.date}</span>
                      <span>Minut čtení: {post.readingTime}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

