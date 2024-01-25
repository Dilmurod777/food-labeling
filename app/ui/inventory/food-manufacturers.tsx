import {ReactNode} from "react";
import Image, {StaticImageData} from "next/image"
import EnricoBiscotti from "@/public/images/inventory/enrico-biscotti-alpha.png";
import PieInTheSky from "@/public/images/inventory/pie-in-the-sky-alpha.png";
import GrassFeather from "@/public/images/inventory/the-grass-feather-alpha.png";
import VirginiaChutney from "@/public/images/inventory/virginia-chutney-alpha.png";
import FrozenGarden from "@/public/images/inventory/frozen-garden-alpha.png";
import Pops from "@/public/images/inventory/pops-alpha.png";

interface Manufacturer {
    image: StaticImageData,
    feedback: string,
    author: string,
    job: string | null,
    company: string
}

export default function FoodManufacturers() {
    const items: Manufacturer[] = [
        {
            image: EnricoBiscotti,
            feedback: "I know that this is the software that will make our 30 year old company more successful.",
            author: "Larry Lagattuta",
            job: "CEO",
            company: "Enrico Biscotti"
        },
        {
            image: PieInTheSky,
            feedback: "I love the recall section and how easy it is to find everything from a particular lot.",
            author: "Tyffany Price",
            job: "Director of Operations",
            company: "Pie in the Sky Bakery"
        },
        {
            image: GrassFeather,
            feedback: "We're a meals company and this is just enough to make us dangerous!",
            author: "Jeff Smith",
            job: "Owner",
            company: "The Grass Feather"
        },
        {
            image: VirginiaChutney,
            feedback: "I love the production runs - knowing how much I need of each ingredient, including labor and packaging, and closing production runs to automatically update inventory.",
            author: "Tracy Turner",
            job: "Head of Production",
            company: "Virginia Chutney"
        },
        {
            image: FrozenGarden,
            feedback: "I love production plans and being able to plan weeks in advance with ingredient and purchasing requirements.",
            author: "Allyson Straka",
            job: "CEO",
            company: "Frozen Garden"
        },
        {
            image: Pops,
            feedback: "We started using it for inventory, but it's also integral for documenting recipes and running things on the floor.",
            author: "Jennifer Yancey",
            job: null,
            company: "D & D Foods"
        }
    ]

    return <div className={"flex flex-wrap justify-between items-center py-12 w-full px-12 bg-main-blue gap-2"}>
        {items.map((item, i) => <div
            key={`manufacturer-${i}`}
            className={"flex flex-col items-center gap-4 w-[30%] text-center"}
        >
            <Image
                src={item.image}
                alt={item.company}
                width={148}
                height={148}
            />

            <p className={"text-sm italic font-thin text-white"}>&#10077;{item.feedback}&#10078;</p>
            <p className={"text-xs font-thin text-white"}>
                - {item.author}, {item.author ? `${item.author}, ${item.company}` : item.company}
            </p>
        </div>)}
    </div>
}