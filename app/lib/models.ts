export type User = {
    id: string,
    name: string,
    email: string,
    password: string
}

interface IRecipe {
    [key: string]: string | number | RecipeItem[] | Tag[] | undefined;
}

export interface Recipe extends IRecipe {
    id: string,
    user_id: string,
    name: string,
    updated_at: string
    ingredient_list: string, // json of RecipeItem ids
    recipe_items?: RecipeItem[],
    tag_ids: string, // json of Tag ids
    tags?: Tag[],
    waste?: number,
    net_weight?: number,
    net_weight_unit?: number,
    packages?: number,
    serving_size_description?: string,
    serving_size_description_fr?: string,
    serving_per_package?: number,
    label_id: string,
    description_ddf: string,
    sku: string,
    preparation_instructions: string,
    unit_packaging_cost: number,
    batch_labor_cost: number,
    batch_overhead_cost: number,
    margin: number,
    distributor_margin: number,
    broker_margin: number,
    retailer_margin: number
}

export type Tag = {
    id: string,
    name: string,
    user_id: string
}

export type RecipeItem = {
    id: string,
    recipe_id: string,
    ingredient_id: string,
    ingredient: Ingredient,
    price: number,
    quantity: number,
    unit: number,
    shipping: number,
    waste: number,
    label_text: string,
    spice_flavor: number,
    canada_sugar: boolean
}

export type Label = {
    id: string,
    type: string,
    allergens: string, // json of allergen ids
    business_name_address: string,
    options: string // dictionary of possible options
}

export interface Ingredient {
    id: string,
    user_id: string,
    type: string,
    subtype: string,
    name: string,
    updated_at: string,
    brand?: string,
    list_name?: string,
    data_source?: string,
    visibility?: string,
    serving_size_description: string,
    serving_size: string,
    calories: string,
    fat: string,
    saturated_fat: string,
    trans_fat: string,
    cholesterol: string,
    sodium: string,
    carbohydrate: string,
    dietary_fiber: string,
    sugar: string,
    added_sugar: string,
    protein: string,
    vitamin_d?: string,
    calcium?: string,
    iron?: string,
    potassium?: string,
    vitamin_a?: string,
    vitamin_c?: string,
    magnesium?: string,
    phosphorus?: string,
    zinc?: string,
    copper?: string,
    manganese?: string,
    selenium?: string,
    thiamin?: string,
    riboflavin?: string,
    niacin?: string,
    pantothenic_acid?: string,
    vitamin_b6?: string,
    folate?: string,
    vitamin_b12?: string,
    vitamin_e?: string,
    vitamin_k?: string,
    uncounted_fiber?: string,
    sugar_alcohol?: string,
    monounsaturated_fat?: string,
    polyunsaturated_fat?: string
}

export function RecipeGetProperty(recipe: Recipe | undefined, key: string): string | number | undefined | RecipeItem[] | Tag[] {
    if (!recipe) return undefined;

    switch (key) {
        case "id":
            return recipe.id;
        case "user_id":
            return recipe.user_id;
        case "name":
            return recipe.name;
        case "updated_at":
            return recipe.updated_at;
        case "ingredient_list":
            return recipe.ingredient_list;
        case "recipe_items":
            return recipe.recipe_items;
        case "tag_ids":
            return recipe.tag_ids;
        case "tags":
            return recipe.tags;
        case "waste":
            return recipe.waste;
        case "net_weight":
            return recipe.net_weight;
        case "net_weight_unit":
            return recipe.net_weight_unit;
        case "packages":
            return recipe.packages;
        case "serving_size_description":
            return recipe.serving_size_description;
        case "serving_size_description_fr":
            return recipe.serving_size_description_fr;
        case "serving_per_package":
            return recipe.serving_per_package;
        case "label_id":
            return recipe.label_id;
        case "description_ddf":
            return recipe.description_ddf;
        case "sku":
            return recipe.sku;
        case "preparation_instructions":
            return recipe.preparation_instructions;
        case "unit_packaging_cost":
            return recipe.unit_packaging_cost;
        case "batch_labor_cost":
            return recipe.batch_labor_cost;
        case "batch_overhead_cost":
            return recipe.batch_overhead_cost;
        case "margin":
            return recipe.margin;
        case "distributor_margin":
            return recipe.distributor_margin;
        case "broker_margin":
            return recipe.broker_margin;
        case "retailer_margin":
            return recipe.retailer_margin;
    }
}

export function IngredientGetProperty(ingredient: Ingredient | undefined, key: string): string | undefined {
    if (!ingredient) return undefined;

    switch (key) {
        case "id":
            return ingredient.id;
        case "type":
            return ingredient.type;
        case "subtype":
            return ingredient.subtype;
        case "name":
            return ingredient.name;
        case "updated_at":
            return ingredient.updated_at;
        case "brand":
            return ingredient.brand;
        case "list_name":
            return ingredient.list_name;
        case "data_source":
            return ingredient.data_source;
        case "visibility":
            return ingredient.visibility;
        case "serving_size_description":
            return ingredient.serving_size_description;
        case "serving_size":
            return ingredient.serving_size;
        case "calories":
            return ingredient.calories;
        case "fat":
            return ingredient.fat;
        case "saturated_fat":
            return ingredient.saturated_fat;
        case "trans_fat":
            return ingredient.trans_fat;
        case "cholesterol":
            return ingredient.cholesterol;
        case "sodium":
            return ingredient.sodium;
        case "carbohydrate":
            return ingredient.carbohydrate;
        case "dietary_fiber":
            return ingredient.dietary_fiber;
        case "sugar":
            return ingredient.sugar;
        case "added_sugar":
            return ingredient.added_sugar;
        case "protein":
            return ingredient.protein;
        case "vitamin_d":
            return ingredient.vitamin_d;
        case "calcium":
            return ingredient.calcium;
        case "iron":
            return ingredient.iron;
        case "potassium":
            return ingredient.potassium;
        case "vitamin_a":
            return ingredient.vitamin_a;
        case "vitamin_c":
            return ingredient.vitamin_c;
        case "magnesium":
            return ingredient.magnesium;
        case "phosphorus":
            return ingredient.phosphorus;
        case "copper":
            return ingredient.copper;
        case "manganese":
            return ingredient.manganese;
        case "selenium":
            return ingredient.selenium;
        case "thiamin":
            return ingredient.thiamin;
        case "riboflavin":
            return ingredient.riboflavin;
        case "niacin":
            return ingredient.niacin;
        case "pantothenic_acid":
            return ingredient.pantothenic_acid;
        case "vitamin_b6":
            return ingredient.vitamin_b6;
        case "folate":
            return ingredient.folate;
        case "vitamin_b12":
            return ingredient.vitamin_b12;
        case "vitamin_e":
            return ingredient.vitamin_e;
        case "vitamin_k":
            return ingredient.vitamin_k;
        case "uncounted_fiber":
            return ingredient.uncounted_fiber;
        case "sugar_alcohol":
            return ingredient.sugar_alcohol;
        case "monounsaturated_fat":
            return ingredient.monounsaturated_fat;
        case "polyunsaturated_fat":
            return ingredient.polyunsaturated_fat;
    }
}