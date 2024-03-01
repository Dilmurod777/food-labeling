import Image from "next/image";
import CustomLabel from "@/public/images/nutrition-label-software/custom-label.png";
import { FaCheck } from "react-icons/fa";

export default function CustomizeForYourProduct() {
  return (
    <div
      className={"flex w-full items-center justify-center gap-24 px-12 py-12"}
    >
      <Image src={CustomLabel} alt={"Custom Label"} className={"w-1/6"} />

      <div className={"flex w-2/5 flex-col items-start gap-4"}>
        <h2 className={"mb-8 text-4xl font-normal"}>
          <strong>Customize</strong> for your product
        </h2>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Simple guidelines for what to customize
          </span>
        </p>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Move sections, resize, and change colors
          </span>
        </p>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Add and remove optional nutrients on the fly
          </span>
        </p>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Download individual nutrition labels or as a batch
          </span>
        </p>
      </div>
    </div>
  );
}
