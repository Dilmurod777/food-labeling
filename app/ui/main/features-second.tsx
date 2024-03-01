import Image from "next/image";
import Link from "next/link";
import { GrLinkNext } from "react-icons/gr";

interface Feature {
  name: string;
  description: string;
  image_url: string;
  url: string;
  url_text: string;
}

export default function FeaturesSecond() {
  const features: Feature[] = [
    {
      name: "Ingredient lists in seconds",
      description:
        "Automatically full-form ingredient lists in seconds. Edit ingredient names after they've been put in descending weight order for you.",
      image_url: "timer.svg",
      url: "/",
      url_text: "Learn More About Ingredient Lists",
    },
    {
      name: "Inventory management",
      description:
        "Automatically update inventory levels. Easy lot tracking and traceability. Production reports even when you're not there.",
      image_url: "list.svg",
      url: "/",
      url_text: "Learn More About Inventory",
    },
    {
      name: "Recipe management in the cloud",
      description:
        "Your products are safely and securely backed up in the cloud, and you can access them from anywhere, on any device. Never lose a recipe or ingredient again!",
      image_url: "recipe-mgmt.svg",
      url: "/",
      url_text: "Learn More About Recipe Management\n",
    },
  ];

  return (
    <div
      className={"mx-auto my-0 flex w-full justify-between gap-16 px-12 py-12"}
    >
      {features.map((feature, i) => (
        <div
          key={`${feature.name.toLowerCase()}_${i}`}
          className={"flex flex-col justify-start"}
        >
          <div className={"relative h-[45px] w-[250px]"}>
            <Image
              src={`/images/features/${feature.image_url}`}
              alt={`${feature.name}`}
              height={45}
              width={150}
              style={{
                height: "100%",
                width: "fit-content",
                left: 0,
                objectFit: "contain",
              }}
            />
          </div>

          <p className={"py-4 text-xl font-bold text-black"}>{feature.name}</p>
          <p className={"text-sm font-light text-black"}>
            {feature.description}
          </p>

          <Link
            href={feature.url}
            className={
              "group mt-8 flex items-center text-lg font-normal text-main-green hover:text-hover-main-green"
            }
          >
            <span
              className={
                "mr-2 text-sm font-bold transition-all group-hover:mr-4"
              }
            >
              {feature.url_text}
            </span>
            <GrLinkNext />
          </Link>
        </div>
      ))}
    </div>
  );
}
