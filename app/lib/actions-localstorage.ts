import {Ingredient, Recipe, Tag} from "@/app/lib/models";

const RECIPE_KEY: string = "recipes";
const TAG_KEY: string = "recipes";
const INGREDIENT_KEY: string = "recipes";

export function getRecipesFromLS(): Recipe[] {
    if (typeof window === 'undefined') return [];

    return JSON.parse(localStorage.getItem(RECIPE_KEY) || "[]");
}

export function getRecipeByIdFromLS(id: string): Recipe | null {
    if (typeof window === 'undefined') return null;

    const recipes: Recipe[] = JSON.parse(localStorage.getItem(RECIPE_KEY) || "[]")
    const recipe = recipes.filter(recipe => recipe.id == id);

    return recipe.length ? recipe[0] : null;
}

export function addRecipeToLS(recipe: Recipe) {
    if (typeof window === 'undefined') return;

    const recipes = getRecipesFromLS();
    recipes.push(recipe);
    localStorage.setItem(RECIPE_KEY, JSON.stringify(recipes));
}

export function updateRecipeInLS(recipe: Recipe) {
    if (typeof window === 'undefined') return;

    const recipes = getRecipesFromLS();

    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].id == recipe.id) {
            recipes[i] = {
                ...recipe,
                updated_at: Date.now().toString()
            };
        }
    }

    localStorage.setItem(RECIPE_KEY, JSON.stringify(recipes));
}

export function getTagsFromLS(): Tag[] {
    if (typeof window === 'undefined') return [];

    return JSON.parse(localStorage.getItem(TAG_KEY) || "[]");
}

export function getIngredientsFromLS(): Ingredient[] {
    if (typeof window === 'undefined') return [];

    return JSON.parse(localStorage.getItem(INGREDIENT_KEY) || "[]");
}