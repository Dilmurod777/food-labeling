import Image from "next/image";
import InventoryIllustration from "@/public/images/inventory-illustration.svg";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
export default function MainInventory() {
    return <div className={"flex items-center justify-center gap-24 py-12 w-full px-12 bg-main-gray"}>
        <Image
            src={InventoryIllustration}
            alt={"Ingredient List"}
            className={"h-[420px]"}
        />

        <div className={"flex flex-col items-start gap-6 w-2/5"}>
            <Link
                href={'/inventory'}
                className={"font-normal text-4xl mb-8"}
            >Inventory <strong>management</strong></Link>

            <p className={"flex gap-2 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Automatically update and trace inventory</span>
            </p>

            <p className={"flex gap-2 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Plan for production and track income</span>
            </p>

            <p className={"flex gap-2 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Handle recalls easily and efficiently</span>
            </p>
        </div>
    </div>
}