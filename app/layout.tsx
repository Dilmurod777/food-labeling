import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";
import React, { Suspense } from "react";
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import Loading from "@/app/ui/loading";

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FoodPlanet",
  description: "Food Planet - food labeing application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          merriweather.className +
          " relative flex h-screen flex-col tracking-wide"
        }
        style={{ lineHeight: "0.5" }}
      >
        <Header />
        <main className={"flex flex-grow bg-[#fafafa]"}>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
        <Footer />
      </body>
    </html>
  );
}
