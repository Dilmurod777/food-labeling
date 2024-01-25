import Image from "next/image";
import CostDecisions from "@/public/images/nutrition-label-software/cost-decisions.png";
import {FaCheck} from "react-icons/fa";

export default function MakeBetterBusinessDecisions() {
    return <div className={"flex gap-24 items-center justify-center py-12 w-full px-12"}>
        <Image
            src={CostDecisions}
            alt={"Cost Decisions"}
            className={"w-1/6"}
        />

        <div className={"flex flex-col items-start gap-4 w-2/5"}>
            <h2
                className={"font-normal text-4xl mb-8"}
            >Make <strong>better business</strong> decisions</h2>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Price your product based on costs and margins</span>
            </p>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Find low-hanging fruit for cutting costs, not corners</span>
            </p>
        </div>
    </div>
}