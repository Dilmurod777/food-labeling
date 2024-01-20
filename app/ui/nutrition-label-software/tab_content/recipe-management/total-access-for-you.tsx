import {FaCheck} from "react-icons/fa";
import Image from "next/image";
import MultipleDevices from "@/public/images/nutrition-label-software/multiple-devices.jpg";

export default function TotalAccessForYou() {
    return <div className={"flex gap-24 items-center justify-center py-12 px-12"}>
        <Image
            src={MultipleDevices}
            alt={"Multiple Devices"}
            className={"w-1/5"}
        />

        <div className={"flex flex-col items-start gap-4 w-2/5"}>
            <h2
                className={"font-normal text-4xl mb-8"}
            ><strong>Total access</strong> for you</h2>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Manage your recipes from any location</span>
            </p>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Manage your recipes from any device</span>
            </p>
        </div>
    </div>
}