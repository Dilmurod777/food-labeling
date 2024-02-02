import {getAll} from "@/app/lib/actions-ingredients";
import IngredientList from "@/app/ui/dashboard/inventory/ingredient-list";
import Empty from "@/app/ui/dashboard/inventory/empty";
import {getCurrentUser} from "@/app/lib/actions-user";
import {redirect} from "next/navigation";

export default async function Inventory() {
    const ingredients = await getAll();
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    if (ingredients.length == 0) return <Empty user={user}/>

    return <IngredientList ingredients={ingredients} user={user}/>
}