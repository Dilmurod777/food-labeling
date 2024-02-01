"use client";

import Link from "next/link";
import {GoVideo} from "react-icons/go";
import {User} from "@/app/lib/models";
import CreateRecipesBtn from "@/app/ui/create-recipes-btn";

interface Props {
    user: User
}

export default function Empty({user}: Props) {
    return <div className={"flex flex-col items-center py-12"}>
        <h2 className={"text-black font-bold text-xl"}>Welcome to Foodplanet!</h2>

        <div className={"flex gap-4 mt-8"}>
            <CreateRecipesBtn user={user}/>
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