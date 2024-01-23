"use client";

import {Recipe} from "@/app/lib/models";
import {convertToHumanReadableTime} from "@/app/lib/utilities";
import {useState} from "react";
import Title from "@/app/ui/recipes/recipe-edit-page/title";
import Tags from "@/app/ui/recipes/recipe-edit-page/tags";
import SearchBarIngredients from "@/app/ui/recipes/recipe-edit-page/searchbar-ingrediens";

export default function RecipeEditPage({recipe}: { recipe: Recipe }) {
    const defaultInputs = {
        name: false,
        tags: false
    }
    const [editingInput, setEditingInput] = useState({
        ...defaultInputs
    })

    return <div className={"flex flex-col items-start"}>
        <div className={"flex justify-between items-end w-full"}>
            <div className={"flex flex-col items-start"}>
                <Title
                    recipe={recipe}
                    editing={editingInput.name}
                    setEditing={(value) => setEditingInput({...defaultInputs, name: value})}
                />

                <Tags
                    recipe={recipe}
                    setEditing={(value) => setEditingInput({...defaultInputs, tags: value})}
                    editing={editingInput.tags}
                />
            </div>

            <p className={"text-xs text-main-blue font-thin"}>Updated {convertToHumanReadableTime(Date.now() - parseInt(recipe.updated_at))} ago</p>
        </div>
        <div className={"relative"}>
            <SearchBarIngredients/>
        </div>
    </div>
}