export type User = {
    id: string,
    name: string,
    email: string,
    password: string,
    recipes?: string, // json of Recipe ids
}

export type Recipe = {
    id: string,
    name: string,
    updated_at: string
    ingredient_list: string, // json of IngredientItem ids
    tags: string, // json of Tag ids
    waste: string,
    net_weight: string,
    net_weight_unit: string,
    packages: string,
    serving_size: string,
    serving_size_fr: string,
    serving_per_package: string,
    label_id: string,
    description_ddf: string,
    sku: string,
    preparation_instructions: string
}

export type Tag = {
    id: string,
    name: string,
    user_id: string
}

export type RecipeItem = {
    id: string,
    ingredient_id: string,
    ingredient_name: string,
    quantity: string,
    unit: string,
    waste: string,
    label_text: string,
    spice_flavor: string
    canada_sugar: boolean
}

export type Label = {
    id: string,
    type: string,
    allergens: string, // json of allergen ids
    business_name_address: string,
}

export type Ingredient = {
    id: string,
    type: string,
    name: string,
    updated_at: string,
    brand?: string,
    ingredient_list_name?: string,
    data_source?: string,
    public?: boolean,
    serving_size_description: string,
    serving_size: string,
    calories: number,
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