import Image from "next/image";
import Link from "next/link";

import { FaRegPlayCircle } from "react-icons/fa";

export default function TopHero() {
  return (
    <div className={"mx-auto my-0 flex h-[650px] w-full items-center px-12"}>
      <div className={"flex flex-1 flex-col justify-center"}>
        <p className={"mb-6 text-4xl font-bold text-black"}>
          Create Your Own <br />
          Nutrition Fact Labels
        </p>
        <p className={"text-lg font-thin text-black"}>
          Our nutrition label generator makes it easy to create FDA and
          CFIA-compliant labels from anywhere. Recipe costing and inventory to
          improve your business.
        </p>
        <div className={"my-12 flex gap-4"}>
          <Link
            href={"/"}
            className={
              "flex h-16 items-center justify-center rounded-md bg-main-orange px-8 text-[1rem] font-bold text-white hover:bg-hover-main-orange"
            }
          >
            Create a Free Label
          </Link>
          <Link
            href={"/"}
            className={
              "flex h-16 items-center justify-center rounded-md bg-white px-8 text-[1rem] font-bold text-main-orange " +
              "border-[1px] border-main-orange hover:bg-hover-main-orange hover:text-white"
            }
          >
            Try Our Sample Label
          </Link>
        </div>
        <Link
          href={"/"}
          className={
            "flex items-center text-main-blue hover:text-hover-main-blue"
          }
        >
          <FaRegPlayCircle size={18} />
          <span className={"ml-2"}>How does Foodplanet work?</span>
        </Link>
      </div>
      <div className={"flex flex-1 items-center justify-center"}>
        <Image
          src={"/images/label-samples.svg"}
          alt={"Label samples"}
          width={520}
          height={550}
        />
      </div>
    </div>
  );
}
