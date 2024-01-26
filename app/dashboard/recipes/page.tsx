import Empty from "@/app/ui/dashboard/recipes/empty";
import RecipeList from "@/app/ui/dashboard/recipes/recipe-list";
import {getAll} from "@/app/lib/actions-recipes";
import {getCurrentUser} from "@/app/lib/actions-user";

export default async function Recipes() {
    const recipes = await getAll();
    const user = await getCurrentUser();

    if (recipes.length == 0) return <Empty/>

    return <RecipeList recipes={recipes} user={user}/>
}