"use client"

export default function AppScreenshotsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .whatsapp-mockup::-webkit-scrollbar {
          display: none;
        }
        .whatsapp-mockup {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      ` }} />
      <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold">Podívejte se jak Herocontent funguje</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto pb-[calc(100vw*1.25)] md:pb-0">
          {/* Feature 1: Photo Editing */}
          <div className="aspect-[4/5] border border-border rounded-lg p-3">
            <div className="flex flex-col h-full">
            <div className="flex-[0.7] w-full rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm mb-3">
              <div className="w-full h-full grid grid-cols-2 gap-2 p-2">
                <div className="rounded overflow-hidden">
                  <img
                    src="/images/features/feature-1-photo-before.jpeg"
                    alt="Původní fotka před úpravou"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded overflow-hidden">
                  <img
                    src="/images/features/feature-1-photo-after.jpeg"
                    alt="Fotka po AI úpravě"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="flex-[0.3] flex flex-col min-h-[150px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-block p-2 bg-yellow-400/10 rounded-lg">
                  <svg
                    className="w-6 h-6 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Vylepšíme vaše fotky pomocí AI</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Možná si říkáte, že vlastní fotky si můžete nahrát sami. My ale vaše fotky upravíme do profesionální kvality, aby opravdu zaujali a to od drobného přesvětlení až po grafické příspěvky dle vaší preference.
              </p>
            </div>
            </div>
          </div>

          {/* Feature 2: Posts with Text */}
          <div className="aspect-[4/5] border border-border rounded-lg p-3">
            <div className="flex flex-col h-full">
            <div className="flex-[0.7] w-full rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm mb-3">
              <div className="w-full h-full grid grid-cols-2 gap-2 p-2">
                <div className="rounded overflow-hidden">
                  <img
                    src="/images/features/feature-2-post-chicken-burger.png"
                    alt="Instagram post - Chicken burger"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded overflow-hidden">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-label="Instagram reel vytvořený pomocí HeroContent AI"
                  >
                    <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%2810%29-6yCMygZ2zRGG95sljQZJUfNX1e1VIE.mp4" type="video/mp4" />
                    Váš prohlížeč nepodporuje video element.
                  </video>
                </div>
              </div>
            </div>
            <div className="flex-[0.3] flex flex-col min-h-[150px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-block p-2 bg-yellow-400/10 rounded-lg">
                  <svg
                    className="w-6 h-6 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Vytvoříme příspěvky i s texty</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Psát texty k příspěvkům je pro většinu podniků prostě otrava, nevíte co napsat a nechce se vám to řešit. Vyřešíme to za vás, přípravíme texty k příspěvkům, vkládáme grafiku do fotek a tvoříme Reels s textem.
              </p>
            </div>
            </div>
          </div>

          {/* Feature 3: Monthly Content */}
          <div className="aspect-[4/5] border border-border rounded-lg p-3">
            <div className="flex flex-col h-full">
            <div className="flex-[0.7] w-full rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm mb-3">
              <div className="w-full h-full grid grid-cols-2 gap-2 p-2">
                <div className="rounded overflow-hidden">
                  <div className="bg-[#e5ddd5] h-full w-full p-2 flex flex-col">
                    <div className="flex-1 w-full overflow-hidden whatsapp-mockup">
                      <div className="flex flex-col justify-end min-h-full space-y-1.5 pb-1.5">
                        <div className="flex items-start gap-1.5 w-full">
                          <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] font-bold text-black">HC</span>
                          </div>
                          <div className="flex flex-col items-start max-w-[75%]">
                            <div className="bg-white rounded-lg px-2 py-1.5 shadow-sm">
                              <p className="text-[10px] text-gray-800 m-0">Posíláme vám plán příspěvků na příští měsíc</p>
                            </div>
                            <span className="text-[8px] text-gray-500 mt-0.5">12:34</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5 w-full justify-end">
                          <div className="flex flex-col items-end max-w-[75%]">
                            <div className="bg-[#dcf8c6] rounded-lg px-2 py-1.5 shadow-sm">
                              <p className="text-[10px] text-gray-800 m-0">Schváleno</p>
                            </div>
                            <span className="text-[8px] text-gray-500 mt-0.5">12:35</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded overflow-hidden flex items-start justify-center">
                  <img
                    src="/images/features/feature-3-calendar.jpg"
                    alt="Kalendář příspěvků"
                    loading="lazy"
                    className="w-full h-full object-contain object-top"
                  />
                </div>
              </div>
            </div>
            <div className="flex-[0.3] flex flex-col min-h-[150px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-block p-2 bg-yellow-400/10 rounded-lg">
                  <svg
                    className="w-6 h-6 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Obsah na celý měsíc</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Mnoho podniků řeší sociální sítě stylem „když je čas". My vám jednou měsíčně pošleme všechny příspěvky v jednoduchm schvalovacím formuláři a vy se už jen sledujete, tak příspěvky zveřejňujeme.
              </p>
            </div>
            </div>
          </div>

          {/* Feature 4: Advertising */}
          <div className="aspect-[4/5] border border-border rounded-lg p-3">
            <div className="flex flex-col h-full">
            <div className="flex-[0.7] w-full rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm mb-3">
              <div className="w-full h-full grid grid-cols-2 gap-2 p-2">
                <div className="rounded overflow-hidden">
                  <div className="bg-[#e5ddd5] h-full w-full p-2 flex flex-col">
                    <div className="flex-1 w-full overflow-hidden whatsapp-mockup">
                      <div className="flex flex-col justify-end min-h-full space-y-1.5 pb-1.5">
                        <div className="flex items-start gap-1.5 w-full justify-end">
                          <div className="flex flex-col items-end max-w-[75%]">
                            <div className="bg-[#dcf8c6] rounded-lg px-2 py-1.5 shadow-sm">
                              <p className="text-[10px] text-gray-800 m-0">Příští týden máme u nás akci, udělejte mi na ni reklamu.</p>
                            </div>
                            <span className="text-[8px] text-gray-500 mt-0.5">12:34</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5 w-full">
                          <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] font-bold text-black">HC</span>
                          </div>
                          <div className="flex flex-col items-start max-w-[75%]">
                            <div className="bg-white rounded-lg px-2 py-1.5 shadow-sm">
                              <p className="text-[10px] text-gray-800 m-0">
                                Text: Tématika akce, doba trvání a více detailů<br />
                                Cílení: Okruh 1km od vašeho podniku<br />
                                Rozpočet: 500 Kč<br />
                                <span className="mt-1 block">Je to takto v pořádku?</span>
                              </p>
                            </div>
                            <span className="text-[8px] text-gray-500 mt-0.5">12:35</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5 w-full justify-end">
                          <div className="flex flex-col items-end max-w-[75%]">
                            <div className="bg-[#dcf8c6] rounded-lg px-2 py-1.5 shadow-sm">
                              <p className="text-[10px] text-gray-800 m-0">Ano</p>
                            </div>
                            <span className="text-[8px] text-gray-500 mt-0.5">12:36</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5 w-full">
                          <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] font-bold text-black">HC</span>
                          </div>
                          <div className="flex flex-col items-start max-w-[75%]">
                            <div className="bg-white rounded-lg px-2 py-1.5 shadow-sm">
                              <p className="text-[10px] text-gray-800 m-0">Skvěle, zasíláme vám reklamní příspěvek ke schválení</p>
                            </div>
                            <span className="text-[8px] text-gray-500 mt-0.5">12:37</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded overflow-hidden">
                  <video
                    src="/video/mock_ad.MP4"
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-label="Reklamní kampaň - vytvořená reklama"
                  />
                </div>
              </div>
            </div>
            <div className="flex-[0.3] flex flex-col min-h-[150px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-block p-2 bg-yellow-400/10 rounded-lg">
                  <svg
                    className="w-6 h-6 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Spustíme reklamy jedním potvrzením</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Placená reklama je nejrychlejší způsob, jak dostat vaše akce a nabídky k lidem, kteří o vás ještě neslyšeli. Všechno nastavíme za vás a pošleme vám jednoduchý návrh reklamy ke schválení.
              </p>
            </div>
            </div>
          </div>

          {/* Feature 5: Daily Menu */}
          <div className="aspect-[4/5] border border-border rounded-lg p-3">
            <div className="flex flex-col h-full">
            <div className="flex-[0.7] w-full rounded-lg overflow-hidden border-2 border-border bg-background shadow-sm mb-3">
              <div className="w-full h-full grid grid-cols-2 gap-2 p-2">
                <div className="rounded overflow-hidden">
                  <div className="bg-[#e5ddd5] h-full w-full p-2 flex flex-col">
                    <div className="flex-1 w-full overflow-hidden whatsapp-mockup">
                      <div className="flex flex-col justify-end min-h-full space-y-1.5 pb-1.5">
                        <div className="flex items-start gap-1.5 w-full justify-end">
                          <div className="flex flex-col items-end max-w-[75%]">
                            <div className="bg-[#dcf8c6] rounded-lg px-2 py-1.5 shadow-sm">
                              <p className="text-[10px] text-gray-800 m-0">Dnes máme na jídelníčku: Kuřecí vývar s celestýnskými nudlemi, Čevabčiči, brambory, hořčice 175 Kč, Kuřecí asijská směs, nudle 169 Kč, BBQ trhané maso se sýrem a hranolkami 175 Kč</p>
                            </div>
                            <span className="text-[8px] text-gray-500 mt-0.5">12:34</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5 w-full">
                          <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] font-bold text-black">HC</span>
                          </div>
                          <div className="flex flex-col items-start max-w-[75%]">
                            <div className="bg-white rounded-lg px-2 py-1.5 shadow-sm">
                              <p className="text-[10px] text-gray-800 m-0">Skvěle, vytvořili jsme vaše denní menu a zvěřejnili na Facebooku a Instagramu</p>
                            </div>
                            <span className="text-[8px] text-gray-500 mt-0.5">12:35</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded overflow-hidden">
                  <img
                    src="/images/features/feature-5-daily-menu.png"
                    alt="Automaticky vytvořené denní menu"
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
            <div className="flex-[0.3] flex flex-col min-h-[150px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-block p-2 bg-yellow-400/10 rounded-lg">
                  <svg
                    className="w-6 h-6 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Vždy aktuální denní menu na sítích</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Vezmeme ho z vašeho webu, ze zprávy nebo klidně z fotky zaslané na WhatsApp. Menu automaticky převedeme do přehledné grafiky a zveřejníme ho na sociálních sítích ve správný čas.
              </p>
            </div>
            </div>
          </div>
        </div>
      </main>
      </div>
    </>
  )
}

