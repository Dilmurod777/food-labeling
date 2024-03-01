import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import MultipleDevices from "@/public/images/nutrition-label-software/multiple-devices.jpg";

export default function TotalAccessForYou() {
  return (
    <div
      className={"flex w-full items-center justify-center gap-24 px-12 py-12"}
    >
      <Image
        src={MultipleDevices}
        alt={"Multiple Devices"}
        className={"w-1/5"}
      />

      <div className={"flex w-2/5 flex-col items-start gap-4"}>
        <h2 className={"mb-8 text-4xl font-normal"}>
          <strong>Total access</strong> for you
        </h2>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Manage your recipes from any location
          </span>
        </p>

        <p className={"flex items-center gap-4"}>
          <FaCheck className={"text-2xl text-main-green"} />
          <span className={"text-lg font-thin text-black"}>
            Manage your recipes from any device
          </span>
        </p>
      </div>
    </div>
  );
}
