import Image from "next/image";
import InventoryIllustration from "@/public/images/inventory-illustration.svg";
import Link from "next/link";
import {GoVideo} from "react-icons/go";

export default function TopHero() {
    return <div className={"flex flex-col items-center w-full px-12 pb-12"}>
        <h2 className={"text-4xl text-black font-bold mb-3"}>Simple Lot Tracing and Inventory Tracking</h2>
        <p className={"text-lg text-black font-bold"}>Automated FIFO lot tracing, inventory management, and production
            planning to run your business</p>

        <div className={"flex justify-center gap-16 mt-16"}>
            <Image
                src={InventoryIllustration}
                alt={"Inventory Illustration"}
                style={{
                    width: "35%",
                    objectFit: 'contain'
                }}
            />

            <div className={"flex flex-col w-1/2 text-xl items-center"}>
                <p className={"mb-3"}>If you&apos;re not doing lot tracing, you&apos;ve got problems. Food safety is
                    serious business and <strong>you
                        need the ability to quickly execute a recall.</strong> Foodplanet&apos;s inventory software
                    helps you do just that, scaling
                    with your
                    business (unlike paper or spreadsheets), and saving you time.</p>
                <p className={"mb-3"}>We help you run and grow your business too — <strong>tracking inventory and how
                    much it&apos;s
                    worth</strong>,
                    managing production, planning ahead for purchasing, and reporting.</p>
                <p><strong>With our cloud-based software, all this is a breeze.</strong> Provide role-based access to
                    staff, access it anywhere,
                    and
                    start managing your business like the pros.</p>

                <Link
                    href={"#"}
                    className={"flex items-center justify-center text-[1rem] text-main-green font-bold py-4 px-8 rounded-md bg-white " +
                        "border-[1px] border-main-green hover:bg-hover-main-green hover:text-white mt-12"}
                >
                    Start managing inventory like the pros!
                </Link>

                <p className={"italic text-lg my-6"}>or</p>

                <Link
                    href={"#"}
                    className={"flex items-center gap-2 text-main-blue hover:text-hover-main-blue"}
                >
                    <GoVideo className={"text-xl"}/>
                    Watch our Demo
                </Link>
            </div>
        </div>
    </div>
}