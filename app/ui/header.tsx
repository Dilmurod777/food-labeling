import Image from "next/image";
import MenuItems from "@/app/ui/main/menu_items";
import Link from "next/link";
import { User } from "@/app/lib/models";
import NotAuthenticatedButtons from "@/app/ui/main/auth_buttons/not_authenticated_buttons";
import AuthenticatedButtons from "@/app/ui/main/auth_buttons/authenticated_buttons";
import { getCurrentUser } from "@/app/lib/actions-user";

export default async function Header() {
  const user = await getCurrentUser();

  return (
    <nav className={"mx-auto my-0 flex w-full justify-between  px-12 py-2"}>
      <div className={"flex h-full justify-start gap-3"}>
        <Link href={"/"} className={"mr-3 flex items-center justify-center"}>
          <Image
            src={"/logo.png"}
            alt={"Logo"}
            width={80}
            height={80}
            priority
          />
        </Link>

        <MenuItems />
      </div>

      {!user && <NotAuthenticatedButtons />}
      {user && <AuthenticatedButtons user={user} />}
    </nav>
  );
}
