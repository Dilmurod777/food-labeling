import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import IngredientList from "@/public/images/ingredient-list.png";
import Image from "next/image";

export default function NutritionAnalysisMadeEasy() {
  return (
    <div
      className={"flex w-full items-center justify-center gap-24 px-12 py-12"}
    >
      <div className={"flex w-2/5 flex-col items-start gap-4"}>
        <Link
          href={"/nutrition-label-software?page=1"}
          className={"mb-8 text-4xl font-normal"}
        >
          Nutrition analysis <strong>made easy</strong>
        </Link>

        <p className={"flex items-center gap-2"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Choose from our ingredients or create your own
          </span>
        </p>

        <p className={"flex items-center gap-2"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Modify amounts quickly and easily
          </span>
        </p>

        <p className={"flex items-center gap-2"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Make big or small batches
          </span>
        </p>
      </div>

      <Image src={IngredientList} alt={"Ingredient List"} className={"w-2/5"} />
    </div>
  );
}
