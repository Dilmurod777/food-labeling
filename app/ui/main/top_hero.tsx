import Image from "next/image";
import Link from "next/link";

import {FaRegPlayCircle} from "react-icons/fa";

export default function TopHero() {
    return <div className={"flex items-center h-[650px] w-4/5 mx-auto my-0"}>
        <div className={"flex flex-1 flex-col justify-center"}>
            <p className={"text-4xl text-black font-bold mb-6"}>
                Create Your Own <br/>Nutrition Fact Labels
            </p>
            <p className={"text-lg text-black font-thin"}>
                Our nutrition label generator makes it easy to create FDA and CFIA-compliant labels from anywhere.
                Recipe costing and inventory to
                improve your business.
            </p>
            <div className={"flex gap-4 my-12"}>
                <Link
                    href={"/"}
                    className={"flex items-center justify-center text-[1rem] text-white font-bold h-16 px-8 rounded-md bg-main-green hover:bg-hover-main-green"}
                >
                    Create a Free Label
                </Link>
                <Link
                    href={"/"}
                    className={"flex items-center justify-center text-[1rem] text-main-green font-bold h-16 px-8 rounded-md bg-white " +
                        "border-[1px] border-main-green hover:bg-hover-main-green hover:text-white"}
                >
                    Try Our Sample Label
                </Link>
            </div>
            <Link
                href={"/"}
                className={"flex items-center text-main-blue hover:text-hover-main-blue"}
            >
                <FaRegPlayCircle size={18}/>
                <span className={"ml-2"}>
                    How does Foodplanet work?
                </span>
            </Link>
        </div>
        <div className={"flex flex-1 items-center justify-center"}>
            <Image
                src={"/images/label-samples.svg"}
                alt={"Label samples"}
                width={520}
                height={550}
            />
        </div>
    </div>
}