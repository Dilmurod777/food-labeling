import Image from "next/image";
import InventoryIllustration from "@/public/images/inventory-illustration.svg";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";

export default function MainInventory() {
  return (
    <div
      className={
        "flex w-full items-center justify-center gap-24 bg-main-gray px-12 py-12"
      }
    >
      <Image
        src={InventoryIllustration}
        alt={"Ingredient List"}
        className={"h-[420px]"}
      />

      <div className={"flex w-2/5 flex-col items-start gap-6"}>
        <Link href={"/inventory"} className={"mb-8 text-4xl font-normal"}>
          Inventory <strong>management</strong>
        </Link>

        <p className={"flex items-center gap-2"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Automatically update and trace inventory
          </span>
        </p>

        <p className={"flex items-center gap-2"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Plan for production and track income
          </span>
        </p>

        <p className={"flex items-center gap-2"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Handle recalls easily and efficiently
          </span>
        </p>
      </div>
    </div>
  );
}
