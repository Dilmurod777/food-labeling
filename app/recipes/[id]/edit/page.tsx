import Form from "@/app/ui/recipes/form";
import {getById} from "@/app/lib/actions-recipes";
import {getCurrentUser} from "@/app/lib/actions-user";
import {redirect} from "next/navigation";
import Loading from "@/app/ui/loading";
import {Suspense} from "react";

export default async function Page({params}: { params: { id: string } }) {
    const user = await getCurrentUser();
    if (!user) redirect("/login");

    const recipe = await getById(params.id);
    if (!recipe) {
        return <div className={"w-full h-full flex items-center justify-center font-bold text-lg text-black"}>
            No such recipe was found.
        </div>
    }

    return <Suspense fallback={<Loading/>}>
        <Form recipe={recipe} user={user}/>
    </Suspense>
}