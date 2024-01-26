"use client";

import {Recipe, User} from "@/app/lib/models";
import {convertToHumanReadableTime} from "@/app/lib/utilities";
import {memo, useState} from "react";
import Title from "@/app/ui/recipes/recipe-page/title";
import Tags from "@/app/ui/recipes/recipe-page/tags";
import SearchBarIngredients from "@/app/ui/recipes/recipe-page/searchbar-ingrediens";
import RecipeItems from "@/app/ui/recipes/recipe-page/recipe-items";

interface Props {
    recipe: Recipe,
    user: User
}

export default function RecipePage({recipe, user}: Props) {
    const defaultInputs = {
        name: false,
        tags: false
    }
    const [editingInput, setEditingInput] = useState({
        ...defaultInputs
    })
    const [items, setItems] = useState(recipe.recipe_items || []);

    const onSearchChanged = (query: string) => {
        if (recipe.recipe_items) {
            setItems(recipe.recipe_items.filter(item => item.ingredient?.name.includes(query)))
        }
    }

    return <div className={"flex flex-col items-start"}>
        <div className={"flex justify-between items-end w-full flex-grow gap-8"}>
            <div className={"flex flex-col items-start"}>
                <Title
                    recipe={recipe}
                    editing={editingInput.name}
                    setEditing={(value) => setEditingInput({...defaultInputs, name: value})}
                />

                <Tags
                    recipe={recipe}
                    user={user}
                    setEditing={(value) => setEditingInput({...defaultInputs, tags: value})}
                    editing={editingInput.tags}
                />
            </div>

            <UpdatedDate updated_at={recipe.updated_at}/>
        </div>

        <SearchBarIngredients onSearchChanged={onSearchChanged}/>
        <div className={"flex gap-8 w-full mt-8"}>
            <RecipeItems items={items}/>
            <div className={"w-[300px] h-[500px] bg-main-gray"}></div>
        </div>
    </div>
}

const UpdatedDate = memo(function UpdatedDate({updated_at}: { updated_at: string }) {
    return <p className={"text-xs text-main-blue font-thin"}>
        Updated {convertToHumanReadableTime(Date.now() - parseInt(updated_at))}
    </p>
})