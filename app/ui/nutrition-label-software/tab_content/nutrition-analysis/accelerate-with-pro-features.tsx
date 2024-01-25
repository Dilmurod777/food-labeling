import {FaCheck} from "react-icons/fa";
import Image from "next/image";
import ProFeatures from "@/public/images/nutrition-label-software/pro-features.png";

export default function AccelerateWithProFeatures() {
    return <div className={"flex gap-24 items-center justify-center py-12 w-full px-12"}>
        <div className={"flex flex-col items-start gap-4 w-2/5"}>
            <h2
                className={"font-normal text-4xl mb-8"}
            ><strong>Accelerate</strong> with pro features</h2>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Shortcut searches for your ingredients</span>
            </p>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Copy and scale recipes in one click</span>
            </p>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Subrecipes as ingredients</span>
            </p>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>More on the way based on your feedback!</span>
            </p>
        </div>

        <Image
            src={ProFeatures}
            alt={"Pro Features"}
            className={"w-1/6"}
        />
    </div>
}