import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import CostAnalysis from "@/public/images/cost-analysis.svg";
import Image from "next/image";

export default function RecipeCostingToMakeDecisions() {
  return (
    <div
      className={"flex w-full items-center justify-center gap-8 px-12 py-12"}
    >
      <div className={"flex w-2/5 flex-col items-start gap-4"}>
        <Link
          href={"/nutrition-label-software?page=3"}
          className={"mb-8 text-4xl font-normal"}
        >
          Recipe costing to <strong>make decisions</strong>
        </Link>

        <p className={"flex items-center gap-2"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            {" "}
            Input your ingredient and packaging costs
          </span>
        </p>

        <p className={"flex items-center gap-2"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Quickly understand your cost breakdown
          </span>
        </p>

        <p className={"flex items-center gap-2"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Make decisions on pricing and cost cutting
          </span>
        </p>
      </div>

      <Image src={CostAnalysis} alt={"Ingredient List"} className={"w-2/5"} />
    </div>
  );
}
