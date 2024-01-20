import Image from "next/image";
import FeaturesIngredientList from "@/public/images/nutrition-label-software/features-ingredient-list.png";
import {FaCheck} from "react-icons/fa";

export default function AutomaticIngredientList() {
    return <div className={"flex gap-24 items-center justify-center py-12 px-12"}>
        <div className={"flex flex-col items-start gap-4 w-2/5"}>
            <h2
                className={"font-normal text-4xl mb-8"}
            >Automatic <strong>ingredient lists</strong></h2>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Follows FDA and CFIA guidelines</span>
            </p>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Listed in descending weight order by default</span>
            </p>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Update all related recipes with one change</span>
            </p>
        </div>

        <Image
            src={FeaturesIngredientList}
            alt={"Features Ingredient List"}
            className={"w-1/6"}
        />
    </div>
}