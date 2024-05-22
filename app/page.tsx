"use client";

import TopHero from "@/app/ui/main/top-hero";
import Features from "@/app/ui/main/features";
import FAQ from "@/app/ui/main/faq";
import React from "react";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <TopHero />
      <Features />
      <FAQ />
    </div>
  );
}
