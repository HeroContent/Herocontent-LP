import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - HeroContent | Marketing pro restaurace a gastro podniky",
  description: "Blog o marketingu pro restaurace, správě sociálních sítí pro gastro podniky a efektivních marketingových strategiích. Tipy, návody a nejnovější trendy v oboru.",
  keywords: ["blog", "marketing pro restaurace", "sociální sítě pro restaurace", "gastro marketing", "marketingová agentura pro gastro"],
  openGraph: {
    title: "Blog - HeroContent",
    description: "Blog o marketingu pro restaurace a správě sociálních sítí pro gastro podniky",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - HeroContent",
    description: "Blog o marketingu pro restaurace a správě sociálních sítí pro gastro podniky",
  },
  alternates: {
    canonical: "https://herocontent.ai/blog",
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
