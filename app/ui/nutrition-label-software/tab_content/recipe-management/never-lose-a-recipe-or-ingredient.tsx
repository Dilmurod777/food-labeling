import {FaCheck} from "react-icons/fa";
import Image from "next/image";
import CloudGears from "@/public/images/nutrition-label-software/cloud-gears.png";

export default function NeverLoseARecipeOrIngredient() {
    return <div className={"flex gap-24 items-center justify-center py-12 px-12"}>
        <div className={"flex flex-col items-start gap-4 w-2/5"}>
            <h2
                className={"font-normal text-4xl mb-8"}
            ><strong>Never lose</strong> a recipe or ingredient</h2>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Data saved multiple times a day</span>
            </p>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Always backed up redundantly online</span>
            </p>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>If your computer crashes, everything is OK</span>
            </p>
        </div>

        <Image
            src={CloudGears}
            alt={"Cloud Gears"}
            className={"w-1/5"}
        />
    </div>
}