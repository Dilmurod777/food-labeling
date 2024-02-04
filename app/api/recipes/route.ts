import type {NextRequest} from "next/server";
import {Ingredient, Recipe, RecipeItem} from "@/app/lib/models";
import {sql} from "@vercel/postgres";
import {revalidatePath} from "next/cache";
import * as recipeActions from "@/app/lib/actions-recipes";
import * as ingredientActions from "@/app/lib/actions-ingredients";

export const dynamic = 'force-dynamic' // defaults to auto
export async function PUT(request: NextRequest) {
    const {id, user_id, ...recipe}: Recipe = await request.json()

    let filtered_recipe_items: RecipeItem[] = [];
    for (let item of JSON.parse(recipe.recipe_items || "[]")) {
        const ingredient: Ingredient = item.ingredient;
        delete item.ingredient;
        await ingredientActions.update({
            id: ingredient.id,
            list_name: ingredient.list_name || "",
            list_name_fr: ingredient.list_name_fr || ""
        } as Ingredient);

        filtered_recipe_items.push({...item});
    }
    recipe.recipe_items = JSON.stringify(filtered_recipe_items);

    const columnValuePairs: string[] = [];
    for (let key of Object.keys(recipe)) {
        columnValuePairs.push(`${key}='${recipe[key]}'`)
    }
    const query = `UPDATE recipes SET ${columnValuePairs.join(',')} WHERE id='${id}' AND user_id='${user_id}'`;
    const updateRecipe = await sql.query<Recipe>(query);

    revalidatePath("/dashboard/recipes");
    revalidatePath("/dashboard");

    return Response.json(updateRecipe)
}

export async function POST(request: NextRequest) {
    const id = await recipeActions.create(await request.json())

    return Response.json({id: id})
}


