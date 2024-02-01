import Empty from "@/app/ui/dashboard/recipes/empty";
import RecipeList from "@/app/ui/dashboard/recipes/recipe-list";
import {getAll} from "@/app/lib/actions-recipes";
import {getCurrentUser} from "@/app/lib/actions-user";
import {redirect} from "next/navigation";

export default async function Recipes() {
    const recipes = await getAll();
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    if (recipes.length == 0) return <Empty user={user}/>

    return <RecipeList recipes={recipes} user={user}/>
}