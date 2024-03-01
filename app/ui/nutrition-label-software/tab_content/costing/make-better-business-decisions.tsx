import Image from "next/image";
import CostDecisions from "@/public/images/nutrition-label-software/cost-decisions.png";
import { FaCheck } from "react-icons/fa";

export default function MakeBetterBusinessDecisions() {
  return (
    <div
      className={"flex w-full items-center justify-center gap-24 px-12 py-12"}
    >
      <Image src={CostDecisions} alt={"Cost Decisions"} className={"w-1/6"} />

      <div className={"flex w-2/5 flex-col items-start gap-4"}>
        <h2 className={"mb-8 text-4xl font-normal"}>
          Make <strong>better business</strong> decisions
        </h2>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Price your product based on costs and margins
          </span>
        </p>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Find low-hanging fruit for cutting costs, not corners
          </span>
        </p>
      </div>
    </div>
  );
}
