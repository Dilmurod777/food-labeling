import Image from "next/image";
import Link from "next/link";

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
            image_url: "cloud.svg",
            url: "/"
        },
        {
            name: "Ingredients Database",
            description: "Search our database, or add your own ingredients",
            image_url: "ingredients.svg",
            url: "/"
        },
        {
            name: "Cost Calculations",
            description: "Calculate recipe costs and price your product",
            image_url: "cost.svg",
            url: "/"
        },
        {
            name: "Expert Help",
            description: "Labeling experts to answer questions and hire for help",
            image_url: "help.svg",
            url: "/"
        }
    ]

    return <div className={"flex justify-between gap-24 w-[90%] mx-auto my-0 py-16"}>
        {features.map((feature, i) => <Link
            href={feature.url}
            key={`${feature.name.toLowerCase()}_${i}`}
            className={"flex flex-col justify-start"}
        >
            <div className={"h-[45px] w-[250px] relative"}>
                <Image
                    src={`/images/features/${feature.image_url}`}
                    alt={`${feature.name}`}
                    height={45}
                    width={150}
                    style={{
                        height: "100%",
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