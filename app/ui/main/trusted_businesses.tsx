import Image from "next/image";
import Link from "next/link";


interface Business {
    image_url: string,
    url: string
}

interface BusinessRow {
    items: Business[]
}

export default function TrustedBusinesses() {
    const businesses: BusinessRow[] = [
        {
            "items": [
                {
                    "image_url": "magnolia-baker.svg",
                    "url": "/"
                },
                {
                    "image_url": "union-kitchen.png",
                    "url": "/"
                },
            ]
        },
        {
            "items": [
                {
                    "image_url": "harney-and-sons.png",
                    "url": "/"
                },
                {
                    "image_url": "sakara.svg",
                    "url": "/"
                },
                {
                    "image_url": "lesser-evil.png",
                    "url": "/"
                },
            ]
        }
    ]

    const rowHeight = 200;

    return <div
        className={"flex flex-col items-center"}
    >
        <p
            className={"text-main-blue font-bold text-2xl"}
        >Trusted by thousands of food businesses for over a decade</p>

        <div className={`flex flex-col w-full mt-6 h-[${rowHeight * businesses.length}px]`}>
            {businesses.map((row, j) => <div
                key={`image-row-${j}`}
                className={`flex justify-center mb-3 w-full h-[${rowHeight}px]`}
            >
                {row.items.map((business, i) => <Link
                    key={`${business}_${i}`}
                    href={`${business.url}`}
                    className={`w-1/4 h-full relative`}
                >
                    <Image
                        src={`/images/businesses/${business.image_url}`}
                        alt={business.image_url}
                        fill
                        sizes={`auto`}
                        style={{
                            objectFit: "scale-down"
                        }}
                    />
                </Link>)}
            </div>)}
        </div>
    </div>
}