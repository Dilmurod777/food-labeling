import Link from "next/link";
import { FaGears } from "react-icons/fa6";
import { PiPrinterFill } from "react-icons/pi";
import { BsLayoutWtf } from "react-icons/bs";
import IngredientLabeling from "@/public/images/ingredient-labeling.png";
import Image from "next/image";

export default function NutritionLabelingThatIsFun() {
    return <div className={"flex items-center justify-center gap-24 py-16 px-28 bg-main-gray"}>
        <Image
            src={IngredientLabeling}
            alt={"Ingredient List"}
            className={"w-2/5"}
        />

        <div className={"flex flex-col items-start gap-6 w-2/5"}>
            <Link
                href={'/nutrition-label-software?page=2'}
                className={"font-normal text-4xl mb-8"}
            >Nutrition labeling <strong>that&apos;s fun</strong></Link>

            <p className={"flex gap-2 items-center"}>
                <BsLayoutWtf className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Choose from our <strong>various label styles</strong></span>
            </p>

            <p className={"flex gap-2 items-center"}>
                <FaGears className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}><strong>Customize</strong> look, feel, and which nutrients to display</span>
            </p>

            <p className={"flex gap-2 items-center"}>
                <PiPrinterFill className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Save and print your labels in <strong>flexible formats</strong></span>
            </p>
        </div>
    </div>
}