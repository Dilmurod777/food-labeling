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
    waste: number,
    net_weight: number,
    net_weight_unit: number,
    packages: number,
    serving_size: string,
    serving_size_fr: string,
    serving_per_package: number,
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
    quantity: number,
    unit: number,
    waste: number,
    label_text: string,
    spice_flavor: number
    canada_sugar: boolean
}

export type Label = {
    id: string,
    type: number,
    allergens: string, // json of allergen ids
    business_name_address: string,
}

export type Ingredient = {
    id: string,
    type: number,
    name: string,
    brand?: string,
    ingredient_list_name?: string,
    data_source: string,
    private: boolean,
    calories: number,
    fat: number,
    saturated_fat: number,
    trans_fat: number,
    cholesterol: number,
    sodium: number,
    carbohydrate: number,
    dietary_fiber: number,
    sugar: number,
    added_sugar: number,
    protein: number,
    vitamin_d: number,
    calcium: number,
    iron: number,
    potassium: number,
    vitamin_a: number,
    vitamin_c: number,
    magnesium: number,
    phosphorus: number,
    zinc: number,
    copper: number,
    manganese: number,
    selenium: number,
    thiamin: number,
    riboflavin: number,
    niacin: number,
    pantothenic_acid: number,
    vitamin_b6: number,
    folate: number,
    vitamin_b12: number,
    vitamin_e: number,
    vitamin_k: number,
    uncounted_fiber: number,
    sugar_alcohol: number,
    monounsaturated_fat: number,
    polyunsaturated_fat: number,
    serving_size: number,
    serving_size_units: number,
}