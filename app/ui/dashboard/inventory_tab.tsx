import Link from "next/link";
import {FaPlus} from "react-icons/fa";
import { GoVideo } from "react-icons/go";

export default function InventoryTab(){
    return <div className={"flex flex-col items-center"}>
        <h2 className={"text-black font-bold text-xl"}>Welcome to Foodplanet!</h2>

        <div className={"flex gap-4 mt-8"}>
            <Link
                href={"#"}
                className={"flex gap-2 items-center justify-center text-sm text-white font-normal px-4 py-2 rounded-md bg-main-green hover:bg-hover-main-green"}
            >
                <FaPlus className={"text-lg"}/>
                <span>Add ingredient to inventory</span>
            </Link>
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