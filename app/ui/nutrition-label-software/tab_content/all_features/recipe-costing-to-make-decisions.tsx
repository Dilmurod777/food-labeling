import Link from "next/link";
import {FaCheck} from "react-icons/fa";
import CostAnalysis from "@/public/images/cost-analysis.svg";
import Image from "next/image";

export default function RecipeCostingToMakeDecisions() {
    return <div className={"flex gap-8 items-center justify-center py-16 px-12"}>
        <div className={"flex flex-col items-start gap-4 w-1/2"}>
            <Link
                href={'/nutrition-label-software?page=3'}
                className={"font-normal text-4xl mb-8"}
            >Recipe costing to <strong>make decisions</strong></Link>

            <p className={"flex gap-2 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}> Input your ingredient and packaging costs</span>
            </p>

            <p className={"flex gap-2 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Quickly understand your cost breakdown</span>
            </p>

            <p className={"flex gap-2 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Make decisions on pricing and cost cutting</span>
            </p>
        </div>

        <Image
            src={CostAnalysis}
            alt={"Ingredient List"}
            className={"w-2/5"}
        />
    </div>
}