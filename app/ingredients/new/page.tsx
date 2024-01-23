"use client";

import Link from "next/link";
import {LuFileVideo} from "react-icons/lu";
import {useFormState} from "react-dom";
import {create} from "@/app/lib/actions-ingredients";
import IngredientType from "@/app/ui/ingredients/create/ingredient-type";

export default function Page() {
    const [_, dispatch] = useFormState(create, undefined);

    return <div className={"flex flex-col w-3/4 mx-auto my-10 gap-6"}>
        <div className={"flex flex-col gap-4"}>
            <h2 className={"text-3xl font-bold text-black"}>New ingredient</h2>
            <p className={"text-sm font-thin text-black"}>
                <span className={"font-bold"}>Note:</span> Custom ingredients will be denoted as &quot;unverified&quot; until they are reviewed by
                Foodplanet staff (and
                users if
                the
                ingredient is
                &quot;public&quot;), but they will still be available for your recipes - it is mainly a warning to other users that the data
                hasn&apos;t
                been confirmed.
            </p>
            <p className={"text-sm font-thin text-black"}>
                Ideally, you should use unrounded nutrition fact information from your distributor/supplier, but you can also use data from an
                ingredient&apos;s nutrition fact label (this data is already rounded, but is OK if no other options are available).
            </p>
        </div>

        <div className={"flex flex-col gap-2"}>
            <div className={"flex justify-between items-center"}>
                <h3 className={"text-2xl font-bold text-black"}>Required Ingredient Details</h3>

                <Link
                    href={"#"}
                    className={"flex items-center justify-center gap-2 py-2 px-2 text-white text-xs font-thin bg-main-green hover:bg-hover-main-green rounded-md"}
                >
                    <LuFileVideo className={'text-sm'}/>
                    <span>Video Tutorial</span>
                </Link>
            </div>

            <form className={"flex flex-col gap-2 items-start"} action={dispatch}>
                <IngredientType/>

                <button
                    type={"submit"}
                    className={"flex items-center justify-center gap-2 py-2 px-2 text-white text-xs font-thin bg-main-green hover:bg-hover-main-green rounded-md mt-6"}
                >
                    Create Ingredient
                </button>
            </form>
        </div>
    </div>
}