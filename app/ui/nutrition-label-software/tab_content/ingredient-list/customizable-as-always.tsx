import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import CustomIngredientList from "@/public/images/nutrition-label-software/custom-ingredient-list.png";

export default function CustomizableAsAlways() {
  return (
    <div
      className={"flex w-full items-center justify-center gap-24 px-12 py-12"}
    >
      <Image
        src={CustomIngredientList}
        alt={"Custom Ingredient List"}
        className={"w-1/6"}
      />

      <div className={"flex w-2/5 flex-col items-start gap-4"}>
        <h2 className={"mb-8 text-4xl font-normal"}>
          <strong>Customizable</strong> as always
        </h2>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            {" "}
            Control how ingredients show on labels
          </span>
        </p>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Remove or aggregate optional ingredients (e.g. water, spices)
          </span>
        </p>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Bilingual lists for Canadian labels
          </span>
        </p>
      </div>
    </div>
  );
}
