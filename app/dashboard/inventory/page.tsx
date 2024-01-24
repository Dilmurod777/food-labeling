import {Ingredient} from "@/app/lib/models";
import {getAll} from "@/app/lib/actions-ingredients";
import IngredientList from "@/app/ui/dashboard/inventory/ingredient-list";
import Empty from "@/app/ui/dashboard/inventory/empty";
import {getCurrentUser} from "@/app/lib/actions-user";

interface StateProps {
    loading: boolean,
    ingredients: Ingredient[]
}

export default async function Inventory() {
    const ingredients = await getAll();
    const user = await getCurrentUser();

    if (ingredients.length == 0) return <Empty/>
    return <IngredientList ingredients={ingredients} user={user}/>
}