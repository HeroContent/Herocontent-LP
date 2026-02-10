import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Zásady ochrany osobních údajů - HeroContent",
  description: "Zásady ochrany osobních údajů společnosti Hero Content s.r.o.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="https://herocontent.ai" 
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center mb-6"
          >
            ← Zpět na hlavní stránku
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Zásady ochrany osobních údajů
          </h1>
          <p className="text-muted-foreground">
            Poslední aktualizace: 21. ledna 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <div className="bg-muted/50 p-6 rounded-lg mb-8">
            <p className="text-foreground leading-relaxed mb-0">
              Společnost <strong>Hero Content s.r.o.</strong>, IČO: <strong>21318255</strong>, se sídlem <strong>Korunní 2569/108, Vinohrady, 101 00 Praha</strong> (dále jen „Poskytovatel", „my", „nás" nebo „naše"), provozuje webovou stránku <strong>herocontent.ai</strong> (dále jen „Služba").
            </p>
            <p className="text-foreground leading-relaxed mb-0 mt-4">
              Tyto Zásady ochrany osobních údajů informují o způsobu, jakým shromažďujeme, používáme a chráníme osobní údaje při využívání našich služeb.
            </p>
            <p className="text-foreground leading-relaxed mb-0 mt-4">
              Využíváním Služby souhlasíte se shromažďováním a používáním údajů v souladu s těmito zásadami. Pokud s těmito zásadami nesouhlasíte, prosíme, abyste naši Službu nepoužívali.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Shromažďování a použití informací</h2>
            <p className="text-foreground leading-relaxed mb-4">
              Při využívání naší Služby po vás můžeme požadovat poskytnutí určitých osobních údajů, které lze použít pro kontaktování nebo identifikaci. Tyto údaje mohou zahrnovat mimo jiné:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>jméno a příjmení,</li>
              <li>e-mailovou adresu,</li>
              <li>IP adresu a identifikátory zařízení,</li>
              <li>údaje o využívání služby (např. aktivita, zobrazené stránky, čas návštěvy).</li>
            </ul>
            <p className="text-foreground leading-relaxed mt-4 mb-0">
              Tyto údaje shromažďujeme pro účely:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground mt-2">
              <li>poskytování a zlepšování našich služeb,</li>
              <li>identifikace a komunikace s klienty,</li>
              <li>zpracování objednávek a plateb,</li>
              <li>zasílání důležitých informací o službě,</li>
              <li>analýzy a zlepšování kvality uživatelského zážitku.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Logovací údaje</h2>
            <p className="text-foreground leading-relaxed mb-4">
              Při návštěvě našich webových stránek váš prohlížeč automaticky odesílá technické informace („Log Data"), které mohou obsahovat:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>IP adresu vašeho zařízení,</li>
              <li>typ a verzi prohlížeče,</li>
              <li>navštívené stránky, datum a čas návštěvy, dobu strávenou na stránkách a další statistiky.</li>
            </ul>
            <p className="text-foreground leading-relaxed mt-4 mb-0">
              Tyto informace používáme k analýze provozu webu a zlepšování funkčnosti Služby.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Cookies</h2>
            <p className="text-foreground leading-relaxed mb-4">
              Naše Služba používá soubory cookies – malé textové soubory ukládané ve vašem zařízení. Cookies nám pomáhají analyzovat návštěvnost, personalizovat obsah a zlepšovat uživatelský zážitek.
            </p>
            <p className="text-foreground leading-relaxed mb-0">
              Můžete nastavit svůj prohlížeč tak, aby všechny cookies odmítal nebo vás upozornil, když je cookie odesílána. Pokud se rozhodnete cookies odmítnout, některé části naší Služby nemusí fungovat správně.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Poskytovatelé služeb</h2>
            <p className="text-foreground leading-relaxed mb-0">
              Můžeme využívat třetí osoby (např. poskytovatele platebních bran, analytických nebo komunikačních nástrojů), které nám pomáhají provozovat naši Službu. Tyto subjekty mají přístup pouze k těm osobním údajům, které nezbytně potřebují pro plnění svých úkolů, a jsou smluvně vázány mlčenlivostí a povinností údaje chránit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Bezpečnost údajů</h2>
            <p className="text-foreground leading-relaxed mb-0">
              Bezpečnost vašich osobních údajů je pro nás důležitá. Přijímáme přiměřená technická a organizační opatření k ochraně vašich dat před ztrátou, zneužitím nebo neoprávněným přístupem. Přestože usilujeme o maximální ochranu, žádná metoda přenosu nebo elektronického ukládání dat není stoprocentně bezpečná.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Přenos do zahraničí</h2>
            <p className="text-foreground leading-relaxed mb-0">
              Vaše osobní údaje mohou být přeneseny a uchovány na serverech mimo území České republiky nebo Evropské unie, kde mohou platit odlišné zákony o ochraně osobních údajů. Využíváním naší Služby vyjadřujete souhlas s takovým přenosem, pokud je nezbytný pro fungování našich služeb (např. hosting, e-mail, analytické nástroje).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Odkazy na jiné weby</h2>
            <p className="text-foreground leading-relaxed mb-0">
              Naše Služba může obsahovat odkazy na jiné webové stránky, které nejsou provozovány námi. Nemáme kontrolu nad obsahem ani zásadami ochrany osobních údajů těchto stránek a neneseme za ně odpovědnost. Doporučujeme proto se s jejich zásadami seznámit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Ochrana dětí</h2>
            <p className="text-foreground leading-relaxed mb-0">
              Naše Služba není určena osobám mladším 13 let. Nevědomě neshromažďujeme osobní údaje dětí. Pokud se dozvíme, že jsme omylem získali údaje dítěte mladšího 13 let, neprodleně je odstraníme.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Vaše práva</h2>
            <p className="text-foreground leading-relaxed mb-4">
              V souladu s nařízením GDPR (EU) 2016/679 máte následující práva:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>právo na přístup k osobním údajům,</li>
              <li>právo na opravu nebo výmaz,</li>
              <li>právo vznést námitku proti zpracování,</li>
              <li>právo na omezení zpracování,</li>
              <li>právo na přenositelnost údajů,</li>
              <li>právo podat stížnost u dozorového orgánu (Úřad pro ochranu osobních údajů, <a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline">www.uoou.cz</a>).</li>
            </ul>
            <p className="text-foreground leading-relaxed mt-4 mb-0">
              Svá práva můžete uplatnit prostřednictvím e-mailu na adrese <a href="mailto:welcome@herocontent.ai" className="text-yellow-400 hover:underline">welcome@herocontent.ai</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Změny těchto zásad</h2>
            <p className="text-foreground leading-relaxed mb-0">
              Tyto Zásady mohou být čas od času aktualizovány. O změně vás informujeme zveřejněním nové verze na této stránce. Doporučujeme zásady pravidelně kontrolovat. Změny nabývají účinnosti okamžikem zveřejnění.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">11. Soulad se zákonem</h2>
            <p className="text-foreground leading-relaxed mb-0">
              Osobní údaje můžeme zveřejnit, pokud to vyžaduje zákon nebo orgán veřejné moci, nebo pokud je to nezbytné k ochraně práv, majetku či bezpečnosti Poskytovatele nebo uživatelů.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">12. Kontakt</h2>
            <p className="text-foreground leading-relaxed mb-4">
              V případě dotazů týkajících se těchto Zásad nás můžete kontaktovat na:
            </p>
            <div className="bg-muted/50 p-6 rounded-lg">
              <p className="text-foreground mb-2">
                <strong>E-mail:</strong> <a href="mailto:welcome@herocontent.ai" className="text-yellow-400 hover:underline">welcome@herocontent.ai</a>
              </p>
              <p className="text-foreground mb-0">
                <strong>Adresa:</strong> Hero Content s.r.o., Korunní 2569/108, Vinohrady, 101 00 Praha, Česká republika
              </p>
            </div>
          </section>

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
