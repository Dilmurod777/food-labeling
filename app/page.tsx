import Header from "@/app/ui/main/header";
import TopHero from "@/app/ui/main/top_hero";
import TrustedBusinesses from "@/app/ui/main/trusted_businesses";
import Features from "@/app/ui/main/features";
import Divider from "@/app/ui/divider";

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen bg-white">
            <Header/>
            <TopHero/>
            <TrustedBusinesses/>
            <Divider margin={1.5} marginUnits={"rem"} height={2} heightUnits={"px"} color={"#f2f7fb"}/>
            <Features/>
        </main>
    )
}
