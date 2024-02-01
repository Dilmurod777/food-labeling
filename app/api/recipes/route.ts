import type {NextRequest} from "next/server";
import {Recipe} from "@/app/lib/models";
import {sql} from "@vercel/postgres";

export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: NextRequest) {
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