import {RecipeItem} from "@/app/lib/models";
import {getCurrentUser} from "@/app/lib/actions-user";
import {sql} from "@vercel/postgres";

export async function getByIds(ids: string[]): Promise<RecipeItem[]> {
    try {
        const user = await getCurrentUser();
        if (!user) return [];

        const sql_ids = ids.map(id => `'${id}'`).join(", ");
        const recipeItems = await sql<RecipeItem>`SELECT * FROM recipe_items WHERE user_id=${user.id} AND id IN (${sql_ids}}`;

        if (recipeItems.rowCount == 0) return [];
        return recipeItems.rows;
    } catch (error) {
        console.error('Failed to fetch recipeItems by Ids:', error);
        return [];
    }
}