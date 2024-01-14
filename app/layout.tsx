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

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={merriweather.className}>
        <Header/>
        {children}
        <Footer/>
        </body>
        </html>
    )
}
