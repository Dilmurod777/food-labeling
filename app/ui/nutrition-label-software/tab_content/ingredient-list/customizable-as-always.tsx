import {FaCheck} from "react-icons/fa";
import Image from "next/image";
import CustomIngredientList from "@/public/images/nutrition-label-software/custom-ingredient-list.png";

export default function CustomizableAsAlways() {
    return <div className={"flex gap-24 items-center justify-center py-12 w-full px-12"}>
        <Image
            src={CustomIngredientList}
            alt={"Custom Ingredient List"}
            className={"w-1/6"}
        />

        <div className={"flex flex-col items-start gap-4 w-2/5"}>
            <h2
                className={"font-normal text-4xl mb-8"}
            ><strong>Customizable</strong> as always</h2>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}> Control how ingredients show on labels</span>
            </p>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Remove or aggregate optional ingredients (e.g. water, spices)</span>
            </p>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Bilingual lists for Canadian labels</span>
            </p>
        </div>
    </div>
}