import RecipeEmpty from "@/app/ui/dashboard/recipes/recipe-empty";
import RecipeList from "@/app/ui/dashboard/recipes/recipe-list";
import IngredientEmpty from "@/app/ui/dashboard/recipes/ingredient-empty";
import IngredientList from "@/app/ui/dashboard/recipes/ingredient-list";
import * as recipeActions from "@/app/lib/actions-recipes";
import * as ingredientActions from "@/app/lib/actions-ingredients";
import {getCurrentUser} from "@/app/lib/actions-user";
import {redirect} from "next/navigation";
import Divider from "@/app/ui/divider";

export default async function Recipes() {
    const recipes = await recipeActions.getAll();
    const ingredients = await ingredientActions.getAll();

    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return <div className={"flex flex-col"}>
        {recipes.length === 0 && <RecipeEmpty user={user}/>}
        {recipes.length !== 0 && <RecipeList recipes={recipes} user={user}/>}

        <Divider margin={0} color={"#e7ecef"}/>

        {ingredients.length === 0 && <IngredientEmpty user={user}/>}
        {ingredients.length !== 0 && <IngredientList ingredients={ingredients} user={user}/>}
    </div>
}