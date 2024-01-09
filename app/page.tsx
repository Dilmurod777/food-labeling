import Image from 'next/image'
import Header from "@/app/ui/main/header";
import TopHero from "@/app/ui/main/top_hero";

export default function Home() {
    return (
        <main className="flex min-h-screen bg-white justify-center">
            <Header/>
            <TopHero/>
        </main>
    )
}
