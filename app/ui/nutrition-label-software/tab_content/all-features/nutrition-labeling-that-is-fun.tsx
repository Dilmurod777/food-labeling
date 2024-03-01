import Link from "next/link";
import { FaGears } from "react-icons/fa6";
import { PiPrinterFill } from "react-icons/pi";
import { BsLayoutWtf } from "react-icons/bs";
import IngredientLabeling from "@/public/images/ingredient-labeling.png";
import Image from "next/image";

export default function NutritionLabelingThatIsFun() {
  return (
    <div
      className={
        "flex w-full items-center justify-center gap-24 bg-main-gray px-12 py-12"
      }
    >
      <Image
        src={IngredientLabeling}
        alt={"Ingredient List"}
        className={"w-2/5"}
      />

      <div className={"flex w-2/5 flex-col items-start gap-6"}>
        <Link
          href={"/nutrition-label-software?page=2"}
          className={"mb-8 text-4xl font-normal"}
        >
          Nutrition labeling <strong>that&apos;s fun</strong>
        </Link>

        <p className={"flex items-center gap-2"}>
          <BsLayoutWtf className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Choose from our <strong>various label styles</strong>
          </span>
        </p>

        <p className={"flex items-center gap-2"}>
          <FaGears className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            <strong>Customize</strong> look, feel, and which nutrients to
            display
          </span>
        </p>

        <p className={"flex items-center gap-2"}>
          <PiPrinterFill className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Save and print your labels in <strong>flexible formats</strong>
          </span>
        </p>
      </div>
    </div>
  );
}
