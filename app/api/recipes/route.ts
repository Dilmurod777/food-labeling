import type {NextRequest} from "next/server";
import {Recipe, RecipeItem} from "@/app/lib/models";
import {sql} from "@vercel/postgres";
import {revalidatePath} from "next/cache";
import {randomBytes} from "crypto";

export const dynamic = 'force-dynamic' // defaults to auto
export async function PUT(request: NextRequest) {
    const {id, user_id, ...recipe}: Recipe = await request.json()

    let filtered_recipe_items: RecipeItem[] = [];
    for (let item of JSON.parse(recipe.recipe_items || "[]")) {
        delete item.ingredient;
        filtered_recipe_items.push({...item})
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
    const {id, ...data}: Recipe = await request.json()
    data.name = "Recipe " + randomBytes(10).toString('hex');

    const query = `INSERT INTO recipes (${Object.keys(data).join(',')}) VALUES (${Object.values(data).map(item => `'${item}'`).join(',')}) RETURNING id`;
    const recipe = await sql.query<Recipe>(query);
    if (recipe.rowCount == 0) return Response.json(-1);

    revalidatePath("/dashboard/recipes");
    revalidatePath("/dashboard");

    return Response.json({
        id: recipe.rows[0]?.id || -1
    })
}


