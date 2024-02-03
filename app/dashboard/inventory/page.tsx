import {getAll} from "@/app/lib/actions-ingredients";
import IngredientList from "@/app/ui/dashboard/recipes/ingredient-list";
import IngredientEmpty from "@/app/ui/dashboard/recipes/ingredient-empty";
import {getCurrentUser} from "@/app/lib/actions-user";
import {redirect} from "next/navigation";

export default async function Inventory() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return <div className={"w-full h-full flex items-center justify-center text-lg font-bold text-black"}>
        Inventory empty.
    </div>
}