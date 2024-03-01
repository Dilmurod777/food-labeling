import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import FlexibleDatabase from "@/public/images/nutrition-label-software/flexible-database.png";

export default function FlexibleDatabaseOfIngredients() {
  return (
    <div
      className={"flex w-full items-center justify-center gap-24 px-12 py-12"}
    >
      <div className={"flex w-2/5 flex-col items-start gap-4"}>
        <h2 className={"mb-8 text-4xl font-normal"}>
          <strong>Flexible database</strong> of ingredients
        </h2>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Easily search our database of ingredients
          </span>
        </p>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Create your own ingredients
          </span>
        </p>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Subrecipes - use a recipe in another recipe
          </span>
        </p>
      </div>

      <Image
        src={FlexibleDatabase}
        alt={"Flexible Database"}
        className={"w-1/6"}
      />
    </div>
  );
}
