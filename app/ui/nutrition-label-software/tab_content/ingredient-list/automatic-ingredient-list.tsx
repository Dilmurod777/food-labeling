import Image from "next/image";
import FeaturesIngredientList from "@/public/images/nutrition-label-software/features-ingredient-list.png";
import { FaCheck } from "react-icons/fa";

export default function AutomaticIngredientList() {
  return (
    <div
      className={"flex w-full items-center justify-center gap-24 px-12 py-12"}
    >
      <div className={"flex w-2/5 flex-col items-start gap-4"}>
        <h2 className={"mb-8 text-4xl font-normal"}>
          Automatic <strong>ingredient lists</strong>
        </h2>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Follows FDA and CFIA guidelines
          </span>
        </p>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Listed in descending weight order by default
          </span>
        </p>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Update all related recipes with one change
          </span>
        </p>
      </div>

      <Image
        src={FeaturesIngredientList}
        alt={"Features Ingredient List"}
        className={"w-1/6"}
      />
    </div>
  );
}
