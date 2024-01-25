import {Tag} from "@/app/lib/models";
import {getCurrentUser} from "@/app/lib/actions-user";
import {sql} from "@vercel/postgres";

export async function getByIds(ids: string[]): Promise<Tag[]> {
    try {
        const user = await getCurrentUser();
        if (!user) return [];
        const recipes = await sql<Tag>`SELECT * FROM tags WHERE user_id=${user.id} AND id IN (${ids.map(id => `'${id}'`).join(", ")}}`;

        if (recipes.rowCount == 0) return [];
        return recipes.rows;
    } catch (error) {
        console.error('Failed to fetch recipe:', error);
        return [];
    }
}