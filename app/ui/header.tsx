import Image from "next/image"
import MenuItems from "@/app/ui/menu_items";
import Link from "next/link";
import AuthButtons from "@/app/ui/auth_buttons";

export default function Header() {
    return <div className={"w-4/5 h-20 flex justify-between"}>
        <div className={"flex justify-start gap-3 h-full"}>
            <Link
                href={"/"}
                className={"flex items-center justify-center mr-5"}
            >
                <Image
                    src={"/logo.svg"}
                    alt={"Logo"}
                    width={150}
                    height={100}
                />
            </Link>

            <MenuItems/>
        </div>

        <AuthButtons/>
    </div>
}