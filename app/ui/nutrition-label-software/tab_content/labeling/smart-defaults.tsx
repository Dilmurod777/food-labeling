import {FaCheck} from "react-icons/fa";
import Image from "next/image";
import LabelSamples from "@/public/images/label-samples.svg";

export default function SmartDefaults(){
    return <div className={"flex gap-24 items-center justify-center py-12 px-12"}>
        <div className={"flex flex-col items-start gap-4 w-2/5"}>
            <h2
                className={"font-normal text-4xl mb-8"}
            ><strong>Smart defaults</strong> simplify your day</h2>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>All the major label styles</span>
            </p>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>All the right fonts, colors and spacing</span>
            </p>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Designer and user-friendly formats</span>
            </p>
        </div>

        <Image
            src={LabelSamples}
            alt={"Label Samples"}
            className={"w-1/5"}
        />
    </div>
}