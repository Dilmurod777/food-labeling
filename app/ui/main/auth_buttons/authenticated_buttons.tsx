"use client";

import Link from "next/link";
import { User } from "@/app/lib/models";
import { useFormState } from "react-dom";
import { logout } from "@/app/lib/actions-user";

export default function AuthenticatedButtons({ user }: { user: User }) {
  const [errorMessage, dispatch] = useFormState(logout, undefined);

  return (
    <div
      className={
        "flex h-full items-center justify-center gap-2 pt-3 text-lg font-bold text-black"
      }
    >
      <Link
        href={"/dashboard/products"}
        className={
          "group flex h-full items-center rounded-md px-3 hover:bg-gray-50"
        }
      >
        <span className={"group-hover:text-main-orange"}>My Products</span>
      </Link>

      {/*<Link*/}
      {/*    href={"/dashboard/inventory"}*/}
      {/*    className={"group flex items-center h-full hover:bg-gray-50 px-3 rounded-md"}*/}
      {/*>*/}
      {/*    <span className={"group-hover:text-main-orange"}>Inventory</span>*/}
      {/*</Link>*/}

      <form action={dispatch}>
        <button className="flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm hover:bg-gray-300">
          <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
    </div>
  );
}
