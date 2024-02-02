import {overflowText} from "@/app/lib/utilities";
import {FaRegEdit} from "react-icons/fa";
import {IRecipe, Recipe} from "@/app/lib/models";
import {useState} from "react";

interface Props {
    recipe: Recipe,
    updateRecipe: (data: IRecipe) => void
}

export default function Title({recipe, updateRecipe}: Props) {
    const [editing, setEditing] = useState(false)

    const updateRecipeName = (name: string) => {
        if (name.trim() !== "" && name != recipe.name) {
           updateRecipe({
               name: name
           })
        }

        setEditing(false);
    }

    return editing
        ? <input
            type="text"
            className={"w-[300px] rounded-md border-2 border-main-orange px-2 py-2 outline-0 h-[35px]"}
            onBlur={(e) => updateRecipeName(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    updateRecipeName(e.currentTarget.value)
                }
            }}
            maxLength={40}
            autoFocus={true}
            placeholder={recipe.name}
            defaultValue={recipe.name}
        />
        : <div className={"flex gap-4 items-center h-[35px]"}>
            <h2 className={"text-2xl text-black font-bold"}>{overflowText(recipe.name)}</h2>
            <FaRegEdit className={"text-main-orange text-2xl cursor-pointer"}
                       onClick={() => setEditing(true)}/>
        </div>

}