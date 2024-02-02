import Image from "next/image";
import Link from "next/link";
import CloudSvg from "@/public/images/features/cloud.svg";
import IngredientsSvg from "@/public/images/features/ingredients.svg";
import CostSvg from "@/public/images/features/cost.svg";
import HelpSvg from "@/public/images/features/help.svg";

interface Feature {
    name: string,
    description: string,
    image_url: string,
    url: string
}

export default function FeaturesFirst() {
    const features: Feature[] = [
        {
            name: "Cloud Saves",
            description: "Store your recipes securely in the cloud",
            image_url: CloudSvg,
            url: "/"
        },
        {
            name: "Ingredients Database",
            description: "Search our database, or add your own ingredients",
            image_url: IngredientsSvg,
            url: "/"
        },
        {
            name: "Cost Calculations",
            description: "Calculate recipe costs and price your product",
            image_url: CostSvg,
            url: "/"
        },
        {
            name: "Expert Help",
            description: "Labeling experts to answer questions and hire for help",
            image_url: HelpSvg,
            url: "/"
        }
    ]

    return <div className={"flex justify-between gap-24 w-full px-12 mx-auto my-0 py-16 bg-main-gray"}>
        {features.map((feature, i) => <Link
            href={feature.url}
            key={`${feature.name.toLowerCase()}_${i}`}
            className={"flex flex-col justify-start"}
        >
            <div className={"h-[45px] w-[250px] relative"}>
                <Image
                    src={feature.image_url}
                    alt={`${feature.name}`}
                    style={{
                        width: "fit-content",
                        left: 0,
                        objectFit: "contain"
                    }}
                />
            </div>

            <p className={"text-black font-bold py-4 text-xl"}>{feature.name}</p>
            <p className={"text-black font-light text-lg"}>{feature.description}</p>
        </Link>)}
    </div>
}