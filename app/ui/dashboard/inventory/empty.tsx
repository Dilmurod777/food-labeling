"use client";

import {FaPlus} from "react-icons/fa";
import Link from "next/link";
import {GoVideo} from "react-icons/go";
import { useRouter} from "next/navigation";

export default function Empty() {
    const router = useRouter();

    return <div className={"flex flex-col items-center py-12"}>
        <h2 className={"text-black font-bold text-xl"}>Welcome to Foodplanet!</h2>

        <div className={"flex gap-4 mt-8"}>
            <div
                onClick={() => router.push("/ingredients/create")}
                className={"flex gap-2 items-center justify-center text-sm text-white font-normal px-4 py-2 rounded-md bg-main-green hover:bg-hover-main-green cursor-pointer"}
            >
                <FaPlus className={"text-lg"}/>
                <span>Add ingredient to inventory</span>
            </div>
            <Link
                href={"#"}
                className={"flex gap-2 items-center justify-center text-sm text-main-blue font-normal px-4 py-2 rounded-md bg-white " +
                    "hover:bg-hover-main-blue hover:text-white border-[2px] border-main-blue"}
            >
                <GoVideo className={"text-lg"}/>
                <span>Tutorial</span>
            </Link>
        </div>
    </div>
}