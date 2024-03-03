"use client";

import TopHero from "@/app/ui/main/top-hero";
import Features from "@/app/ui/main/features";
import FAQ from "@/app/ui/main/faq";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <TopHero />
      <Features />
      <FAQ />
    </div>
  );
}
