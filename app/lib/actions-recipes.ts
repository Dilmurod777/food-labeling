'use server';

import type {Recipe, User} from "@/app/lib/models";
import {sql} from "@vercel/postgres";
import {getCurrentUser} from "@/app/lib/actions-user";


export async function getAllRecipes(email: string): Promise<Recipe[] | undefined> {
    try {
        const user = await getCurrentUser();
        if (!user) return [];
        const recipes = await sql<Recipe>`SELECT * FROM recipes WHERE user_id=${user.id}`;
        return recipes.rows;
    } catch (error) {
        console.error('Failed to fetch recipes:', error);
        throw new Error('Failed to fetch recipes.');
    }
}