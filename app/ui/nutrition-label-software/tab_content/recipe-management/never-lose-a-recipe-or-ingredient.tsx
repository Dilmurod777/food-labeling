import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import CloudGears from "@/public/images/nutrition-label-software/cloud-gears.png";

export default function NeverLoseARecipeOrIngredient() {
  return (
    <div
      className={"flex w-full items-center justify-center gap-24 px-12 py-12"}
    >
      <div className={"flex w-2/5 flex-col items-start gap-4"}>
        <h2 className={"mb-8 text-4xl font-normal"}>
          <strong>Never lose</strong> a recipe or ingredient
        </h2>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Data saved multiple times a day
          </span>
        </p>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Always backed up redundantly online
          </span>
        </p>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            If your computer crashes, everything is OK
          </span>
        </p>
      </div>

      <Image src={CloudGears} alt={"Cloud Gears"} className={"w-1/5"} />
    </div>
  );
}
