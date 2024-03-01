import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import IntuitiveInterface from "@/public/images/nutrition-label-software/intuitive-nutrition-interface.png";

export default function IntuitiveInterfaceToEditRecipes() {
  return (
    <div
      className={"flex w-full items-center justify-center gap-24 px-12 py-12"}
    >
      <Image
        src={IntuitiveInterface}
        alt={"Intuitive Interface"}
        className={"w-1/6"}
      />

      <div className={"flex w-2/5 flex-col items-start gap-4"}>
        <h2 className={"mb-8 text-4xl font-normal"}>
          <strong>Intuitive interface</strong> to edit recipes
        </h2>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Search and preview ingredients
          </span>
        </p>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Easily add, remove, and edit your recipe
          </span>
        </p>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Convenient tips and videos for explanation
          </span>
        </p>
      </div>
    </div>
  );
}
