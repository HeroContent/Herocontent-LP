import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Metadata } from "next"

interface BlogPost {
  id: string
  title: string
  category: string
  date: string
  readingTime: string
  content: string
}

// This would typically come from a CMS or database
const blogPosts: Record<string, BlogPost> = {
  "proc-restaurace-bez-socialnich-siti-ztraci-hosty": {
    id: "proc-restaurace-bez-socialnich-siti-ztraci-hosty",
    title: "Proč restaurace bez sociálních sítí ztrácí hosty",
    category: "Marketing",
    date: "10.12.2024",
    readingTime: "3",
    content: `<p>Mnoho restaurací stále podceňuje roli sociálních sítí. Přitom právě zde dnes zákazníci často rozhodují, kam půjdou na oběd nebo večeři. Restaurace bez aktivních sociálních sítí přichází o nové hosty každý den, aniž by si to uvědomovala.</p>

<p>Lidé si před návštěvou restaurace běžně kontrolují Facebook nebo Instagram. Pokud nenajdou aktuální fotky jídel, menu nebo informace o otevírací době, zvolí jiný podnik. Marketing restaurace na sociálních sítích tak přímo ovlivňuje návštěvnost.</p>

<p>Sociální sítě restaurace zároveň budují důvěru. Reálné fotky, reakce na komentáře a pravidelná komunikace ukazují, že podnik funguje a stará se o hosty. Neaktivní profil naopak působí dojmem, že je restaurace zavřená nebo nezajímavá.</p>

<p>Díky sociálním sítím může restaurace oslovit lidi v okolí pomocí polohy, lokálních hashtagů nebo jednoduché reklamy. To je jeden z nejlevnějších způsobů, jak přivést nové zákazníky ke stolu.</p>

<p>Bez sociálních sítí dnes restaurace ztrácí viditelnost, důvěru i příležitosti. Aktivní profil už není marketing navíc, ale základ.</p>`
  },
  "jaky-obsah-restauraci-privadi-nove-hosty": {
    id: "jaky-obsah-restauraci-privadi-nove-hosty",
    title: "Jaký obsah restauraci přivádí nové hosty",
    category: "Tipy",
    date: "12.11.2024",
    readingTime: "3",
    content: `<p>Majitelé restaurací často tápou, co mají na sociálních sítích zveřejňovat. Přitom platí jednoduché pravidlo: čím reálnější obsah, tím lepší výsledky. Zákazníci chtějí vidět skutečné jídlo a atmosféru, ne dokonalou reklamu.</p>

<p>Nejlépe fungují fotky jídel, krátká videa z kuchyně a denní menu. Tyto příspěvky mají přímý dopad na rozhodování hostů. Marketing restaurace na sociálních sítích je o inspiraci – lidé musí dostat chuť přijít.</p>

<p>Velkou hodnotu má i zákulisní obsah. Ukázky přípravy jídel, tým restaurace nebo běžný provoz působí autenticky a budují vztah se sledujícími. Sociální sítě restaurace by měly působit živě a lidsky.</p>

<p>Silným prvkem je také obsah od zákazníků. Sdílení fotek hostů nebo jejich označení zvyšuje důvěryhodnost a dosah příspěvků. Lidé se rádi inspirují zkušenostmi ostatních.</p>

<p>Správný obsah nemusí být složitý. Jednoduché, pravidelné a autentické příspěvky přinášejí restauraci nové hosty dlouhodobě.</p>`
  },
  "jak-casto-ma-restaurace-pridavat-prispevky": {
    id: "jak-casto-ma-restaurace-pridavat-prispevky",
    title: "Jak často má restaurace přidávat příspěvky",
    category: "Tipy",
    date: "08.10.2024",
    readingTime: "2",
    content: `<p>Jedna z nejčastějších otázek zní: kolik příspěvků je tak akorát. Odpověď je jasná – důležitější než množství je pravidelnost. Sociální sítě restaurace fungují nejlépe, když jsou aktivní dlouhodobě.</p>

<p>Ideální je 2–4 příspěvky týdně. Tento rozsah je zvládnutelný a zároveň dostatečný na to, aby si vás zákazníci pamatovali. Marketing restaurace na sociálních sítích by neměl být nárazový.</p>

<p>Velmi dobře fungují také Stories. Jsou rychlé, jednoduché a nevyžadují složitou přípravu. Denní menu, obsazená terasa nebo krátké video z kuchyně udrží restauraci v povědomí sledujících.</p>

<p>Důležité je sledovat reakce. Pokud některé příspěvky fungují lépe, vyplatí se je opakovat. Sociální sítě nejsou o náhodě, ale o postupném zlepšování.</p>

<p>Pravidelná aktivita zvyšuje dosah, důvěru i počet návštěv. Lepší je méně obsahu, ale stabilně.</p>`
  },
  "jak-ziskat-hosty-diky-lokalnimu-marketingu": {
    id: "jak-ziskat-hosty-diky-lokalnimu-marketingu",
    title: "Jak získat hosty díky lokálnímu marketingu",
    category: "Marketing",
    date: "10.09.2024",
    readingTime: "3",
    content: `<p>Pro restaurace je klíčové oslovit lidi v okolí. Právě zde mají sociální sítě obrovskou výhodu. Lokální marketing restaurace patří mezi nejefektivnější způsoby, jak zvýšit návštěvnost.</p>

<p>Základem je správně vyplněný profil s adresou, otevírací dobou a polohou. Díky tomu se restaurace zobrazuje lidem, kteří hledají podnik ve svém okolí.</p>

<p>Velkou roli hraje označování místa a používání lokálních hashtagů. Ty pomáhají zobrazit obsah lidem, kteří se pohybují poblíž. Sociální sítě restaurace se tak stávají digitální výlohou.</p>

<p>I malý rozpočet na reklamu může mít velký efekt. Jednoduchá propagace příspěvku v okolí restaurace často přivede nové hosty rychle a levně.</p>

<p>Lokální strategie funguje nejlépe, když je dlouhodobá. Restaurace, která je vidět ve svém okolí, má výraznou konkurenční výhodu.</p>`
  },
  "jak-zvladnout-socialni-site-bez-zbytecne-prace": {
    id: "jak-zvladnout-socialni-site-bez-zbytecne-prace",
    title: "Jak zvládnout sociální sítě bez zbytečné práce",
    category: "Tipy",
    date: "13.08.2024",
    readingTime: "3",
    content: `<p>Majitelé restaurací často nemají čas řešit marketing. To ale neznamená, že sociální sítě musí být stres. Stačí je zjednodušit a nastavit systém.</p>

<p>Nejlepší je vytvořit si několik typů příspěvků, které se budou opakovat. Například menu, jídla, atmosféra, akce a zákulisí. Díky tomu odpadá neustálé vymýšlení obsahu.</p>

<p>Velmi pomáhá plánování dopředu. Když si restaurace připraví obsah na týden nebo měsíc, marketing přestane být každodenní starostí. Sociální sítě restaurace pak fungují automaticky.</p>

<p>Důležité je mít realistická očekávání. Marketing restaurace na sociálních sítích je dlouhodobý proces, ne jednorázová kampaň. Výsledky přichází postupně.</p>

<p>Jednoduchý systém, pravidelnost a autenticita stačí k tomu, aby sociální sítě začaly restauraci pomáhat místo toho, aby ji zatěžovaly.</p>`
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts[slug]

  if (!post) {
    return {
      title: "Článek nenalezen - Blog - HeroContent",
    }
  }

  return {
    title: `${post.title} | Blog - HeroContent`,
    description: `Článek z blogu HeroContent: ${post.title}. ${post.category === "Marketing" ? "Marketing pro restaurace" : "Tipy pro gastro podniky"}.`,
    keywords: ["blog", "marketing pro restaurace", "sociální sítě pro restaurace", "gastro marketing", post.category.toLowerCase()],
    openGraph: {
      title: `${post.title} | Blog - HeroContent`,
      description: `Článek z blogu HeroContent o marketingu pro restaurace a správě sociálních sítí.`,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Blog - HeroContent`,
      description: `Článek z blogu HeroContent o marketingu pro restaurace.`,
    },
    alternates: {
      canonical: `https://herocontent.cz/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const post = blogPosts[slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zpět na blog
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article>
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <span className="text-yellow-400 font-medium">{post.category}</span>
              <div className="flex items-center gap-4">
                <span>{post.date}</span>
                <span>Minut čtení: {post.readingTime}</span>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div 
                className="prose prose-lg max-w-none prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </CardContent>
          </Card>
        </article>
      </main>
    </div>
  )
}

