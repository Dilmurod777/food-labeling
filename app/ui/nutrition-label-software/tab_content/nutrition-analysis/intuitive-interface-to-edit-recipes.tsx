import {FaCheck} from "react-icons/fa";
import Image from "next/image";
import IntuitiveInterface from "@/public/images/nutrition-label-software/intuitive-nutrition-interface.png";

export default function IntuitiveInterfaceToEditRecipes() {
    return <div className={"flex gap-24 items-center justify-center py-12 px-12"}>
        <Image
            src={IntuitiveInterface}
            alt={"Intuitive Interface"}
            className={"w-1/6"}
        />

        <div className={"flex flex-col items-start gap-4 w-2/5"}>
            <h2
                className={"font-normal text-4xl mb-8"}
            ><strong>Intuitive interface</strong> to edit recipes</h2>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Search and preview ingredients</span>
            </p>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Easily add, remove, and edit your recipe</span>
            </p>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Convenient tips and videos for explanation</span>
            </p>
        </div>
    </div>
}