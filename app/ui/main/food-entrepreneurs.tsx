import Link from "next/link";
import Image from "next/image";

interface Entrepreneur {
    name: string,
    img_url: string,
    url: string
}

export default function FoodEntrepreneurs() {
    const entrepreneurs: Entrepreneur[] = [
        {
            name: "Food Businesses",
            img_url: "food-biz.jpg",
            url: "/"
        },
        {
            name: "Nutritionists",
            img_url: "nutritionist.jpg",
            url: "/"
        },
        {
            name: "Schools",
            img_url: "school.jpg",
            url: "/"
        },
        {
            name: "Co-Packing",
            img_url: "copacker.jpg",
            url: "/"
        },
        {
            name: "Restaurants",
            img_url: "restaurant.jpg",
            url: "/"
        }
    ]

    return <div className={"w-[90%] mx-auto my-0 py-24 text-black flex flex-col items-center text-center"}>
        <h2 className={"font-bold text-4xl"}>
            Food entrepreneurs large and small rely on ReciPal!
        </h2>
        <p className={"text-xl font-bold my-14"}>
            Click on an industry to learn more.
        </p>
        <div className={"flex w-full justify-between gap-10 items-center"}>
            {entrepreneurs.map((entrepreneur, i) => <Link
                key={`${entrepreneur.name}_${i}`}
                href={entrepreneur.url}
                className={"group flex flex-col w-[225px] h-[275px] hover:scale-[1.05] transition-all"}
                style={{
                    boxShadow: "0 0.5em 1em -0.125em #0a0a0a1a, 0 0 0 1px #0a0a0a05"
                }}
            >
                <div className={"w-full h-[80%] relative"}>
                    <Image
                        src={`/images/entrepreneurs/${entrepreneur.img_url}`}
                        alt={entrepreneur.name}
                        fill
                        style={{
                            objectFit: "cover"
                        }}
                    />
                </div>
                <div className={"w-full h-[20%] flex items-center justify-center font-bold text-main-blue group-hover:text-hover-main-blue"}>
                    {entrepreneur.name}
                </div>
            </Link>)}
        </div>
    </div>
}