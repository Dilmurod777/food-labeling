"use client";

import Link from "next/link";
import {User} from "@/app/lib/models";
import {useFormState} from "react-dom";
import {logout} from "@/app/lib/actions-user";

export default function AuthenticatedButtons({user}: { user: User }) {
    const [errorMessage, dispatch] = useFormState(logout, undefined);

    return <div className={"flex items-center justify-center gap-2 h-full pt-3"}>
        <Link
            href={"/dashboard?tab=0"}
            className={"group flex items-center h-full text-black font-bold text-sm hover:bg-gray-50 px-3 rounded-md"}
        >
            <span className={"group-hover:text-sky-500"}>Recipes</span>
        </Link>

        <Link
            href={"/dashboard?tab=1"}
            className={"group flex items-center h-full text-black font-bold text-sm hover:bg-gray-50 px-3 rounded-md"}
        >
            <span className={"group-hover:text-sky-500"}>Inventory</span>
        </Link>

        <form action={dispatch}>
            <button
                className="flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-black text-sm font-bold hover:bg-gray-300">
                <div className="hidden md:block">Sign Out</div>
            </button>
        </form>
    </div>
}