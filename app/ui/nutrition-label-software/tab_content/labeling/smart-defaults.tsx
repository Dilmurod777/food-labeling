import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import LabelSamples from "@/public/images/label-samples.svg";

export default function SmartDefaults() {
  return (
    <div
      className={"flex w-full items-center justify-center gap-24 px-12 py-12"}
    >
      <div className={"flex w-2/5 flex-col items-start gap-4"}>
        <h2 className={"mb-8 text-4xl font-normal"}>
          <strong>Smart defaults</strong> simplify your day
        </h2>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            All the major label styles
          </span>
        </p>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            All the right fonts, colors and spacing
          </span>
        </p>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Designer and user-friendly formats
          </span>
        </p>
      </div>

      <Image src={LabelSamples} alt={"Label Samples"} className={"w-1/5"} />
    </div>
  );
}
