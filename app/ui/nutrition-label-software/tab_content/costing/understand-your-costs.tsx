import Image from "next/image";
import FeaturesCosting from "@/public/images/nutrition-label-software/features-costing.png";
import {FaCheck} from "react-icons/fa";

export default function UnderstandYourCosts() {
    return <div className={"flex gap-24 items-center justify-center py-12 w-full px-12"}>
        <div className={"flex flex-col items-start gap-4 w-2/5"}>
            <h2
                className={"font-normal text-4xl mb-8"}
            ><strong>Understand</strong> your costs</h2>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>See product cost by batch and package</span>
            </p>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Learn if your main costs are labor, ingredients, packaging, or overhead</span>
            </p>
        </div>

        <Image
            src={FeaturesCosting}
            alt={"Features costing"}
            className={"w-1/6"}
        />
    </div>
}