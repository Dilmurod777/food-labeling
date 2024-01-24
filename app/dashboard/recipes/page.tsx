"use client";

import {Recipe} from "@/app/lib/models";
import Empty from "@/app/ui/dashboard/recipes/empty";
import {v4 as uuidv4} from 'uuid';
import {useRouter} from "next/navigation";
import RecipeList from "@/app/ui/dashboard/recipes/recipe-list";
import {addRecipeToLS, getRecipesFromLS} from "@/app/lib/actions-localstorage";
import {useState} from "react";

export default function Recipes() {
    const [recipes, setRecipes] = useState(getRecipesFromLS());
    const router = useRouter()

    const onCreateNewRecipe = () => {
        // const newRecipe: Recipe = {
        //     description_ddf: "Desc " + (Math.random() + 1).toString(36),
        //     id: uuidv4(),
        //     ingredient_list: "",
        //     label_id: "",
        //     name: "Name " + (Math.random() + 1).toString(36),
        //     net_weight: 0,
        //     net_weight_unit: 0,
        //     packages: 0,
        //     preparation_instructions: "",
        //     serving_per_package: 0,
        //     serving_size: "",
        //     serving_size_fr: "",
        //     sku: "",
        //     tags: "",
        //     updated_at: Date.now().toString(),
        //     waste: 0
        // };
        // addRecipeToLS(newRecipe);
        // router.push(`/recipes/${newRecipe.id}/edit`)
        // router.push(`/ingredients/new`)
    }

    if (recipes.length == 0) return <Empty onCreateNewRecipe={onCreateNewRecipe}/>

    return <RecipeList onCreateNewRecipe={onCreateNewRecipe}/>
}