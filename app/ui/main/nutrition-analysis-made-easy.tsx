import Image from "next/image";
import Link from "next/link";
import { GrLinkNext } from "react-icons/gr";
import IngredientListImage from "@/public/images/ingredient-list.png";
import Divider from "@/app/ui/divider";

export default function NutritionAnalysisMadeEasy() {
  return (
    <div
      className={
        "flex w-full items-center justify-between bg-main-orange px-12 py-12 text-white"
      }
    >
      <div className={"h-full w-1/2 px-12 py-6"}>
        <Image
          src={IngredientListImage}
          alt={"Ingredient List"}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      <div
        className={"flex w-1/2 flex-col items-start justify-center px-12 py-3"}
      >
        <h2 className={"mb-6 text-5xl font-bold"}>
          Nutrition analysis made easy
        </h2>
        <p className={"text-lg font-normal"}>
          Choose from our database or add your own ingredients. Modify amounts
          quickly and easily. Enter recipes as big or small batches.
        </p>
        <Link
          href={"/"}
          className={"group mt-12 flex items-center text-lg font-normal"}
        >
          <span
            className={"mr-2 text-lg font-bold transition-all group-hover:mr-4"}
          >
            Learn More About Nutrition Analysis
          </span>
          <GrLinkNext />
        </Link>

        <Divider
          height={2}
          heightUnits={"px"}
          margin={1}
          marginUnits={"rem"}
          color={"#f2f7fb"}
        />

        {/*<blockquote className={"border-l-main-green border-l-[5px] py-5 px-6"}>*/}
        {/*    <p className={"mb-4 text-lg font-normal"}>*/}
        {/*        &quot;Food analysis was not a task I wanted to take on, but it turned out to be straightforward with*/}
        {/*        Foodplanet.&quot;*/}
        {/*    </p>*/}
        {/*    <p className={"font-bold text-lg"}>Mary Mentzer</p>*/}
        {/*    <span className={"bold-thin text-sm"}>Owner, Eat Drink & Meet Mary</span>*/}
        {/*</blockquote>*/}
      </div>
    </div>
  );
}
