import Link from "next/link";
import {FaCheck} from "react-icons/fa";
import IngredientList from "@/public/images/ingredient-list.png";
import Image from "next/image";

export default function NutritionAnalysisMadeEasy() {
    return <div className={"flex gap-8 items-center justify-center py-16 px-12"}>
        <div className={"flex flex-col items-start gap-4 w-1/2"}>
            <Link
                href={'/nutrition-label-software?page=1'}
                className={"font-normal text-4xl mb-8"}
            >Nutrition analysis <strong>made easy</strong></Link>

            <p className={"flex gap-2 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Choose from our ingredients or create your own</span>
            </p>

            <p className={"flex gap-2 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Modify amounts quickly and easily</span>
            </p>

            <p className={"flex gap-2 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Make big or small batches</span>
            </p>
        </div>

        <Image
            src={IngredientList}
            alt={"Ingredient List"}
            className={"w-2/5"}
        />
    </div>
}