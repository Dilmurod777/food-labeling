import Image from "next/image"
import MenuItems from "@/app/ui/main/menu_items";
import Link from "next/link";
import {User} from "@/app/lib/models";
import NotAuthenticatedButtons from "@/app/ui/main/auth_buttons/not_authenticated_buttons";
import AuthenticatedButtons from "@/app/ui/main/auth_buttons/authenticated_buttons";

export default function Header({user}: { user: User | undefined }) {
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
                    priority
                />
            </Link>

            <MenuItems/>
        </div>

        {!user && <NotAuthenticatedButtons/>}
        {user && <AuthenticatedButtons user={user}/>}
    </nav>
}