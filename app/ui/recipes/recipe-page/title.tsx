import {overflowText} from "@/app/lib/utilities";
import {FaRegEdit} from "react-icons/fa";
import {Recipe} from "@/app/lib/models";

interface Props {
    recipe: Recipe,
    editing: boolean,
    setEditing: (value: boolean) => void
}

export default function Title({editing, recipe, setEditing}: Props) {
    const updateRecipeName = (name: string) => {
        if (name.trim() !== "") {
            recipe.name = name;
        }

        setEditing(false);
    }

    return editing
        ? <input
            type="text"
            className={"rounded-md border-2 border-main-blue px-2 py-2 w-full outline-0 h-[35px]"}
            onBlur={(e) => updateRecipeName(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    updateRecipeName(e.currentTarget.value)
                }
            }}
            autoFocus={true}
            placeholder={recipe.name}
        />
        : <div className={"flex gap-4 items-center h-[35px]"}>
            <h2 className={"text-2xl text-black font-bold"}>{overflowText(recipe.name)}</h2>
            <FaRegEdit className={"text-main-blue text-2xl cursor-pointer"}
                       onClick={() => setEditing(true)}/>
        </div>

}