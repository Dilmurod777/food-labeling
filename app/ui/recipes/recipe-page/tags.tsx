import {IoCloseCircleSharp} from "react-icons/io5";
import {FaPlus, FaTags} from "react-icons/fa";
import {useState} from "react";
import {IRecipe, Recipe} from "@/app/lib/models";
import {TAG_COLORS} from "@/app/lib/constants";

interface Props {
    recipe: Recipe,
    updateRecipe: (data: IRecipe) => void,
    editable?: boolean
}

export default function Tags({recipe, updateRecipe, editable = true}: Props) {
    const [editing, setEditing] = useState(false);
    const [tags, setTags] = useState<string[]>(JSON.parse(recipe.tags || "[]"));

    const addTag = (newTagName: string) => {
        if (newTagName !== "" && tags.filter(t => t == newTagName).length == 0) {
            const newTags = [...tags, newTagName];
            updateRecipe({
                tags: JSON.stringify(newTags)
            });
            setTags(newTags)
        }

        setEditing(false);
    }

    const removeTag = (name: string) => {
        if (tags.length) {
            const newTags = tags.filter(tag => tag != name);
            updateRecipe({
                tags: JSON.stringify(newTags)
            });
            setTags(newTags);
        }
    }

    return <div className={"flex gap-2 mt-2 items-center"}>
        <div className={"flex gap-1"}>
            {tags.map((tag, i) => <div
                key={`tag-${i}`}
                className={`rounded-lg py-1 px-1 flex gap-1 h-[25px] items-center justify-center`}
                style={{backgroundColor: TAG_COLORS[i % TAG_COLORS.length]}}
            >
                <span className={"text-white text-xs font-thin"}>{tag}</span>
                {editable && <IoCloseCircleSharp className={"text-white text-sm cursor-pointer"} onClick={() => removeTag(tag)}/>}
            </div>)}
        </div>
        {editable && (
            editing
                ? <div className={"relative h-[25px]"}>
                    <input
                        type="text"
                        className={"peer rounded-md border-2 border-main-orange pl-6 pr-1 py-1 w-[200px] h-full outline-0 text-xs"}
                        onBlur={(e) => addTag(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                addTag(e.currentTarget.value)
                            }
                        }}
                        autoFocus={true}
                        placeholder={"my tag"}
                    />
                    <FaTags className={"absolute text-sm text-main-orange left-2 top-1/2 mt-[2px]"} style={{transform: "translateY(-50%)"}}/>
                </div>
                : tags.length
                    ? <FaPlus className={"text-lg text-main-orange cursor-pointer"}
                              onClick={() => setEditing(true)}/>
                    : <div className={"h-[25px] flex gap-2 items-center cursor-pointer"}
                           onClick={() => setEditing(true)}>
                        <FaTags className={"text-lg text-main-orange"}/>
                        <span className={"text-sm text-main-orange"}>Add Tags...</span>
                    </div>
        )}
    </div>
}