import type {Metadata} from 'next'
import {Merriweather} from 'next/font/google'
import './globals.css'
import React from "react";
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";

const merriweather = Merriweather({weight: ["300", "400", "700", "900"], subsets: ['latin']})

export const metadata: Metadata = {
    title: 'FoodPlanet',
    description: 'Food Planet - food labeing application',
}

export default async function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={merriweather.className + " relative flex flex-col h-screen"}>
        <Header/>
        <main className={"flex-grow"}>
            {children}
        </main>
        <Footer/>
        </body>
        </html>
    )
}
