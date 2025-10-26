import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FeaturedMentors from "@/components/FeaturedMentors";
import FeaturedCases from "@/components/FeaturedCases";
import DualCTA from "@/components/DualCTA";
import FAQ from "@/components/FAQ";
import { SEO } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <SEO
        title="Mentoria Solidária — Rede colaborativa de impacto"
        description="Conectamos mentores voluntários e iniciativas socioambientais para acelerar soluções alinhadas aos ODS."
      />
      <main role="main" className="bg-white text-neutral-900">
        <Hero />
        <section aria-labelledby="como-funciona" className="container px-4 sm:px-6">
          <HowItWorks />
        </section>
        <section aria-labelledby="mentores" className="container px-4 sm:px-6">
          <FeaturedMentors />
        </section>
        <section aria-labelledby="cases" className="container px-4 sm:px-6">
          <FeaturedCases />
        </section>
        <section className="container px-4 sm:px-6">
          <DualCTA />
        </section>
        <section aria-labelledby="duvidas" className="container px-4 sm:px-6 pb-24">
          <FAQ />
        </section>
      </main>
    </>
  );
}
