import Image from "next/image";
import FeaturesCosting from "@/public/images/nutrition-label-software/features-costing.png";
import { FaCheck } from "react-icons/fa";

export default function UnderstandYourCosts() {
  return (
    <div
      className={"flex w-full items-center justify-center gap-24 px-12 py-12"}
    >
      <div className={"flex w-2/5 flex-col items-start gap-4"}>
        <h2 className={"mb-8 text-4xl font-normal"}>
          <strong>Understand</strong> your costs
        </h2>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            See product cost by batch and package
          </span>
        </p>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Learn if your main costs are labor, ingredients, packaging, or
            overhead
          </span>
        </p>
      </div>

      <Image
        src={FeaturesCosting}
        alt={"Features costing"}
        className={"w-1/6"}
      />
    </div>
  );
}
