import Image from "next/image";
import CustomLabel from "@/public/images/nutrition-label-software/custom-label.png";
import {FaCheck} from "react-icons/fa";

export default function CustomizeForYourProduct(){
    return <div className={"flex gap-24 items-center justify-center py-12 px-12"}>
        <Image
            src={CustomLabel}
            alt={"Custom Label"}
            className={"w-1/6"}
        />

        <div className={"flex flex-col items-start gap-4 w-2/5"}>
            <h2
                className={"font-normal text-4xl mb-8"}
            ><strong>Customize</strong> for your product</h2>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Simple guidelines for what to customize</span>
            </p>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Move sections, resize, and change colors</span>
            </p>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Add and remove optional nutrients on the fly</span>
            </p>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Download individual nutrition labels or as a batch</span>
            </p>
        </div>
    </div>
}