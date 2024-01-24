import {getById} from "@/app/lib/actions-ingredients";
import Link from "next/link";
import Form from "@/app/ui/ingredients/view/form";

export default async function View({params}: { params: { id: string } }) {
    const ingredient = await getById(params.id);

    if (!ingredient) return (
        <div className={"w-full h-full flex items-center justify-center text-lg font-bold text-black"}>
            No such ingredient was found
        </div>
    )

    return <div className={"w-3/4 flex flex-col gap-6 items-start mx-auto my-0 py-6"}>
        <div className={"flex flex-col gap-2"}>
            <h2 className={"text-2xl font-bold text-black"}>
                {ingredient.name} - Nutrition facts
            </h2>

            <Link
                href={`/ingredients/${ingredient.id}/edit`}
                className={"text-sm font-normal text-main-blue hover:text-main-blue"}
            >
                Edit Ingredient
            </Link>
        </div>

        <div className={"flex gap-12"}>
            <div className={"w-[300px] h-[500px] bg-main-gray"}></div>
            <Form ingredient={ingredient}/>
        </div>
    </div>
}