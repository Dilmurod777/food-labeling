import Link from "next/link";
import Image from "next/image";

interface Entrepreneur {
  name: string;
  img_url: string;
  url: string;
}

export default function FoodEntrepreneurs() {
  const entrepreneurs: Entrepreneur[] = [
    {
      name: "Food Businesses",
      img_url: "food-biz.jpg",
      url: "/",
    },
    {
      name: "Nutritionists",
      img_url: "nutritionist.jpg",
      url: "/",
    },
    {
      name: "Schools",
      img_url: "school.jpg",
      url: "/",
    },
    {
      name: "Co-Packing",
      img_url: "copacker.jpg",
      url: "/",
    },
    {
      name: "Restaurants",
      img_url: "restaurant.jpg",
      url: "/",
    },
  ];

  return (
    <div
      className={
        "mx-auto my-0 flex w-full flex-col items-center px-12 py-24 text-center text-black"
      }
    >
      <h2 className={"text-4xl font-bold"}>
        Food entrepreneurs large and small rely on Foodplanet!
      </h2>
      <p className={"my-14 text-xl font-bold"}>
        Click on an industry to learn more.
      </p>
      <div className={"flex w-full items-center justify-between gap-10"}>
        {entrepreneurs.map((entrepreneur, i) => (
          <Link
            key={`${entrepreneur.name}_${i}`}
            href={entrepreneur.url}
            className={
              "group flex h-[275px] w-[225px] flex-col transition-all hover:scale-[1.05]"
            }
            style={{
              boxShadow: "0 0.5em 1em -0.125em #0a0a0a1a, 0 0 0 1px #0a0a0a05",
            }}
          >
            <div className={"relative h-[80%] w-full"}>
              <Image
                src={`/images/entrepreneurs/${entrepreneur.img_url}`}
                alt={entrepreneur.name}
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <div
              className={
                "flex h-[20%] w-full items-center justify-center font-bold text-main-blue group-hover:text-hover-main-blue"
              }
            >
              {entrepreneur.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
