import type {NextRequest} from "next/server";
import {Recipe} from "@/app/lib/models";
import {sql} from "@vercel/postgres";
import {revalidatePath} from "next/cache";
import {randomBytes} from "crypto";

export const dynamic = 'force-dynamic' // defaults to auto
export async function PUT(request: NextRequest) {
    const data: { id: string, user_id: string, recipe: Recipe } = await request.json()
    console.log(data)

    const columnValuePairs: string[] = [];
    for (let key of Object.keys(data.recipe)) {
        columnValuePairs.push(`${key}='${data.recipe[key]}'`)
    }
    const query = `UPDATE recipes SET ${columnValuePairs.join(',')} WHERE id='${data.id}' AND user_id='${data.user_id}'`;
    const updateRecipe = await sql.query<Recipe>(query);

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


