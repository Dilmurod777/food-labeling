import Image from "next/image"
import MenuItems from "@/app/ui/main/menu_items";
import Link from "next/link";
import AuthButtons from "@/app/ui/main/auth_buttons";

export default function Header() {
    return <nav className={"my-0 mx-auto w-3/4 h-20 flex justify-between"}>
        <div className={"flex justify-start gap-3 h-full"}>
            <Link
                href={"/"}
                className={"flex items-center justify-center mr-3"}
            >
                <Image
                    src={"/logo.png"}
                    alt={"Logo"}
                    width={80}
                    height={80}
                />
            </Link>

            <MenuItems/>
        </div>

        <AuthButtons/>
    </nav>
}