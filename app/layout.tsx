import type {Metadata} from 'next'
import {Merriweather} from 'next/font/google'
import './globals.css'
import React from "react";
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import {auth} from "@/auth";
import {getUser} from "@/app/lib/actions";

const merriweather = Merriweather({weight: ["300", "400", "700", "900"], subsets: ['latin']})

export const metadata: Metadata = {
    title: 'FoodPlanet',
    description: 'Food Planet - food labeing application',
}

export default async function RootLayout({children}: { children: React.ReactNode }) {
    const session = await auth();
    const userFromDB = await getUser(session?.user?.email || "");

    return (
        <html lang="en">
        <body className={merriweather.className}>
        <Header user={userFromDB}/>
        {children}
        <Footer/>
        </body>
        </html>
    )
}
