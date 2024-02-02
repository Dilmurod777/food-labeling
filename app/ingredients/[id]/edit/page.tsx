import Link from "next/link";
import {LuFileVideo} from "react-icons/lu";
import FullForm from "@/app/ui/ingredients/full_form";
import {getById} from "@/app/lib/actions-ingredients";

export default async function Page({params}: { params: { id: string } }) {
    const ingredient = await getById(params.id);

    if (!ingredient) {
        return <div className={"w-full h-full flex items-center justify-center"}>
            No such ingredient found.
        </div>
    }

    return <div className={"flex flex-col w-full px-12 mx-auto my-10 gap-6"}>
        <div className={"flex flex-col gap-4"}>
            <h2 className={"text-3xl font-bold text-black"}>Editing ingredient</h2>
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

            <FullForm ingredient={ingredient}/>
        </div>
    </div>
}