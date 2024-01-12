import Header from "@/app/ui/main/header";
import TopHero from "@/app/ui/main/top_hero";
import TrustedBusinesses from "@/app/ui/main/trusted_businesses";

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen bg-white">
            <Header/>
            <TopHero/>
            <TrustedBusinesses/>
        </main>
    )
}
