import Image from "next/image";
import Link from "next/link";

interface Business {
  image_url: string;
  url: string;
}

interface BusinessRow {
  items: Business[];
}

export default function TrustedBusinesses() {
  const businesses: BusinessRow[] = [
    {
      items: [
        {
          image_url: "magnolia-baker.svg",
          url: "/",
        },
        {
          image_url: "union-kitchen.png",
          url: "/",
        },
      ],
    },
    {
      items: [
        {
          image_url: "harney-and-sons.png",
          url: "/",
        },
        {
          image_url: "sakara.svg",
          url: "/",
        },
        {
          image_url: "lesser-evil.png",
          url: "/",
        },
      ],
    },
  ];

  const rowHeight = 200;

  return (
    <div className={"flex w-full flex-col items-center px-12"}>
      <p className={"text-2xl font-bold text-main-blue"}>
        Trusted by thousands of food businesses for over a decade
      </p>

      <div
        className={`mt-6 flex w-full flex-col`}
        style={{ height: `${rowHeight * businesses.length}px` }}
      >
        {businesses.map((row, j) => (
          <div
            key={`image-row-${j}`}
            className={`mb-3 flex w-full justify-center`}
            style={{ height: `${rowHeight}px` }}
          >
            {row.items.map((business, i) => (
              <Link
                key={`${business}_${i}`}
                href={`${business.url}`}
                className={`relative w-1/4`}
                style={{ height: `${rowHeight}px` }}
              >
                <Image
                  src={`/images/businesses/${business.image_url}`}
                  alt={business.image_url}
                  fill
                  sizes={`auto`}
                  style={{
                    objectFit: "scale-down",
                  }}
                />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
