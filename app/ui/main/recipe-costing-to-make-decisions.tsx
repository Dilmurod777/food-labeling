import Image from "next/image";
import CostAnalysis from "@/public/images/cost-analysis.svg";
import Link from "next/link";
import { GrLinkNext } from "react-icons/gr";
import Divider from "@/app/ui/divider";

export default function RecipeCostingToMakeDecisions() {
  return (
    <div
      className={
        "flex w-full items-center justify-between bg-[#f3f7fb] px-12 py-12 text-black"
      }
    >
      <div className={"h-full w-1/2 px-12 py-6"}>
        <Image
          src={CostAnalysis}
          alt={"Ingredient List"}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      <div
        className={"flex w-1/2 flex-col items-start justify-center px-12 py-3"}
      >
        <h2 className={"mb-6 text-5xl font-bold"}>
          Recipe costing to make decisions
        </h2>
        <p className={"text-lg font-normal"}>
          Input your ingredient and packaging costs to quickly understand your
          cost breakdown. Make decisions on pricing and cost-cutting easy.
        </p>
        <Link
          href={"/"}
          className={"group mt-12 flex items-center text-lg font-normal"}
        >
          <span
            className={"mr-2 text-lg font-bold transition-all group-hover:mr-4"}
          >
            Learn More About Recipe Costing
          </span>
          <GrLinkNext />
        </Link>

        <Divider
          height={2}
          heightUnits={"px"}
          margin={3}
          marginUnits={"rem"}
          color={"#f2f7fb"}
        />

        {/*<blockquote className={"border-l-main-green border-l-[5px] py-5 px-6"}>*/}
        {/*    <p className={"mb-4 text-lg font-normal"}>*/}
        {/*        &quot;I simply love the user interface and ability to track an ingredient&apos;s cost to calculate the recipe cost. Doing that myself was always a real headache.&quot;*/}
        {/*    </p>*/}
        {/*    <p className={"font-bold text-lg"}>James Spence</p>*/}
        {/*    <span className={"bold-thin text-sm"}>Owner, Unique Tastes Bakery</span>*/}
        {/*</blockquote>*/}
      </div>
    </div>
  );
}
