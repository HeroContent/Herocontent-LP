import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Obchodní podmínky - HeroContent",
  description: "Obchodní podmínky poskytování marketingových služeb společnosti Hero Content s.r.o.",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="https://herocontent.cz" 
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center mb-6"
          >
            ← Zpět na hlavní stránku
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Obchodní podmínky poskytování marketingových služeb společnosti Hero Content s.r.o.
          </h1>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Úvodní ustanovení</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                <strong>1.1.</strong> Tyto obchodní podmínky upravují podmínky poskytování marketingových služeb společností <strong>Hero Content s.r.o.</strong>, IČO: <strong>21318255</strong>, se sídlem <strong>Korunní 2569/108, Vinohrady, 101 00 Praha</strong>, e-mail: <a href="mailto:welcome@herocontent.ai" className="text-yellow-400 hover:underline">welcome@herocontent.ai</a>, zapsanou u Městského soudu v Praze (dále jen „Poskytovatel").
              </p>
              <p>
                <strong>1.2.</strong> Klient, který si objedná marketingové služby Poskytovatele, potvrzuje, že se s těmito obchodními podmínkami seznámil a souhlasí s nimi (dále jen „Objednatel").
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Předmět služeb</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                <strong>2.1.</strong> Poskytovatel se zavazuje poskytovat Objednateli marketingové služby v rozsahu sjednaném mezi smluvními stranami. Objednatel se zavazuje za tyto služby uhradit sjednanou cenu.
              </p>
              <p>
                <strong>2.2.</strong> Plněním se rozumí zejména:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>tvorba a správa obsahu pro sociální sítě Objednatele (zejména Instagram a Facebook),</li>
                <li>příprava a publikace příspěvků a Stories dle rozsahu sjednaného ve spolupráci,</li>
                <li>vytváření krátkých videí (Reels) z dodaných materiálů nebo prostřednictvím AI nástrojů,</li>
                <li>příprava a zveřejňování denního menu či jiného pravidelného obsahu v grafické formě,</li>
                <li>správa a základní nastavení reklamních kampaní (Meta Ads – Facebook, Instagram) zaměřených zejména na lokální dosah,</li>
                <li>návrh a tvorba grafických šablon a vizuálů příspěvků,</li>
                <li>komunikace a koordinace spolupráce prostřednictvím dohodnutých kanálů (např. WhatsApp, e-mail),</li>
                <li>pravidelné reportování výsledků a doporučení pro zlepšení výkonu profilu.</li>
              </ul>
              <p>
                <strong>2.3.</strong> Všechny výše uvedené výstupy budou vytvořeny v případě, že Objednatel poskytne Poskytovateli dostatek materiálů (např. fotografie, videa, informace o nabídce, menu, akce či změny). Pokud podklady nebudou dodány, Poskytovatel není povinen výstupy nahrazovat jinými formami obsahu.
              </p>
              <p>
                <strong>2.4.</strong> Konkrétní počet příspěvků, Stories a dalších výstupů je stanoven dle sjednaného rozsahu spolupráce. Pokud není mezi stranami dohodnuto jinak, platí následující běžná cenová a výstupová struktura:
              </p>
              <div className="bg-muted/50 p-6 rounded-lg my-4">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Tarif Standard – 2 950 Kč / měsíc</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>8 příspěvků</li>
                    <li>15 stories</li>
                    <li>2 příspěvky nebo stories na přání</li>
                    <li>1 reklamní kampaň</li>
                    <li>2 sociální sítě jednoho podniku (Facebook, Instagram)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Tarif Premium – 4 450 Kč / měsíc</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>12 příspěvků</li>
                    <li>30 stories</li>
                    <li>4 příspěvky nebo stories na přání</li>
                    <li>2 AI Reels videa</li>
                    <li>2 reklamní kampaně</li>
                    <li>2 sociální sítě jednoho podniku (Facebook, Instagram)</li>
                  </ul>
                </div>
              </div>
              <p>
                <strong>2.5.</strong> Výše uvedené rozsahy a počty jsou orientační a mohou se lišit dle aktuálních podkladů, sezónnosti či domluvy mezi Poskytovatelem a Objednatelem.
              </p>
              <p>
                <strong>2.6.</strong> Poskytovatel vytváří a publikuje obsah výhradně v souladu s dodanými podklady a pokyny Objednatele.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Práva a povinnosti stran</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                <strong>3.1.</strong> Objednatel je povinen zajistit Poskytovateli součinnost potřebnou pro poskytování služeb, zejména poskytnout přístupy k účtům na sociálních sítích, informace, podklady a materiály (např. fotografie, logo, texty, popisky menu, firemní údaje).
              </p>
              <p className="ml-4">
                V případě, že Objednatel neposkytne potřebnou součinnost a z tohoto důvodu není možné služby v dohodnutém rozsahu nebo kvalitě dodat, nevzniká Objednateli nárok na vrácení již uhrazené ceny ani její části.
              </p>
              <p>
                <strong>3.2.</strong> Poskytovatel poskytuje služby s odbornou péčí a dle pokynů Objednatele. Objednatel bere na vědomí, že výsledky marketingových aktivit nelze garantovat a závisí i na faktorech mimo kontrolu Poskytovatele (např. algoritmy platforem, chování uživatelů, sezónní vlivy).
              </p>
              <p>
                <strong>3.3.</strong> Pokud při poskytování služeb vzniknou autorská díla (např. fotografie, videa, texty, grafiky, příspěvky na sociální sítě či jiné výstupy), uděluje Poskytovatel Objednateli nevýhradní, časově a územně neomezenou licenci k jejich využití po dobu trvání spolupráce. Po ukončení spolupráce zůstávají Objednateli práva k již uhrazeným výstupům.
              </p>
              <p className="ml-4">
                Poskytovatel tímto předává Objednateli právo tato díla využívat pro vlastní marketingové a propagační účely, a to ve všech formách a na všech komunikačních kanálech, kde byla nebo mohou být publikována. Objednatel je oprávněn tato díla dále upravovat, sdílet či využívat i po ukončení spolupráce, pokud byla plně uhrazena.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Cena a platební podmínky</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                <strong>4.1.</strong> Cena služeb je stanovena dle nabídky, která je Objednateli sdělena prostřednictvím telefonické komunikace a potvrzena prostřednictvím platební brány. Cena je uvedena v korunách českých. Poskytovatel není plátcem DPH, a proto se k ceně DPH nepřipočítává.
              </p>
              <p>
                <strong>4.2.</strong> Platba za služby probíhá předem, převodem na účet Poskytovatele nebo prostřednictvím online platební brány.
              </p>
              <p>
                <strong>4.3.</strong> Nebude-li platba provedena včas, není Poskytovatel povinen služby poskytovat ani zahájit nové období plnění.
              </p>
              <p>
                <strong>4.4.</strong> Služby jsou poskytovány formou měsíčního předplatného. Objednatel může své předplatné kdykoli zrušit, a to nejpozději do posledního pracovního dne před dnem obnovení měsíčního členství. Výpověď lze učinit e-mailem nebo zprávou na WhatsApp na kontakty uvedené v úvodním ustanovení.
              </p>
              <p>
                <strong>4.5.</strong> V případě, že Objednatel ukončí spolupráci v průběhu již uhrazeného období, nemá nárok na vrácení poměrné části ceny.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Mlčenlivost</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                <strong>5.1.</strong> Obě strany se zavazují zachovávat mlčenlivost o všech informacích, které si v rámci spolupráce sdělí a které mají povahu důvěrných informací.
              </p>
              <p>
                <strong>5.2.</strong> Tato povinnost trvá i po ukončení spolupráce.
              </p>
              <p>
                <strong>5.3.</strong> Mlčenlivost se nevztahuje na informace, které:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>jsou veřejně dostupné,</li>
                <li>byly druhé straně známy dříve, než byly sděleny,</li>
                <li>byly získány od třetí osoby bez povinnosti mlčenlivosti,</li>
                <li>musí být sděleny ze zákona nebo na základě rozhodnutí orgánu veřejné moci.</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Odpovědnost</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                <strong>6.1.</strong> Poskytovatel odpovídá za to, že poskytne služby s odbornou péčí a v dohodnutém rozsahu.
              </p>
              <p>
                <strong>6.2.</strong> Poskytovatel nenese odpovědnost za přímé či nepřímé škody způsobené výsledky marketingových aktivit, technickými výpadky platforem třetích stran nebo neúplnou součinností Objednatele.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Ukončení spolupráce</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                <strong>7.1.</strong> Spolupráci lze ukončit kdykoli písemnou výpovědí.
              </p>
              <p>
                <strong>7.2.</strong> Výpověď je účinná od 1. dne následujícího po jejím doručení druhé straně. Za doručenou se považuje i výpověď zaslaná e-mailem nebo prostřednictvím WhatsApp.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Závěrečná ustanovení</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                <strong>8.1.</strong> Tyto obchodní podmínky se řídí právním řádem České republiky, zejména zákonem č. 89/2012 Sb., občanský zákoník.
              </p>
              <p>
                <strong>8.2.</strong> Poskytovatel si vyhrazuje právo obchodní podmínky jednostranně měnit. O změně bude Objednatel informován e-mailem nebo jiným vhodným způsobem nejméně 7 dnů před nabytím účinnosti změny.
              </p>
            </div>
          </section>

          {/* Contact Info */}
          <div className="bg-muted/50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4">Kontakt</h2>
            <p className="text-foreground mb-2">
              <strong>E-mail:</strong> <a href="mailto:welcome@herocontent.ai" className="text-yellow-400 hover:underline">welcome@herocontent.ai</a>
            </p>
            <p className="text-foreground mb-0">
              <strong>Adresa:</strong> Hero Content s.r.o., Korunní 2569/108, Vinohrady, 101 00 Praha, Česká republika
            </p>
          </div>

          {/* Back button */}
          <div className="mt-12 pt-8 border-t">
            <Button asChild className="bg-yellow-400 text-black hover:bg-yellow-500">
              <Link href="https://herocontent.cz">Zpět na hlavní stránku</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
