import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-md w-full text-center">
        <CardContent className="pt-12 pb-8 px-8">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Stránka nenalezena</h2>
          <p className="text-muted-foreground mb-8">
            Omlouváme se, stránka kterou hledáte neexistuje nebo byla přesunuta.
          </p>
          <div className="flex flex-col gap-4">
            <Button asChild className="bg-yellow-400 text-black hover:bg-yellow-500 cursor-pointer">
              <Link href="/">Zpět na hlavní stránku</Link>
            </Button>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/blog" className="text-yellow-400 hover:underline">
                Blog
              </Link>
              <Link href="/kariera" className="text-yellow-400 hover:underline">
                Kariéra
              </Link>
              <Link href="/registration" className="text-yellow-400 hover:underline">
                Vyzkoušet zdarma
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

