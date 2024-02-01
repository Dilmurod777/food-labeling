import {IoCloseCircleSharp} from "react-icons/io5";
import {FaPlus, FaTags} from "react-icons/fa";
import {useState} from "react";
import {Recipe, RecipeItem, Tag, User} from "@/app/lib/models";

interface Props {
    recipe: Recipe,
    updateRecipe: (data: { [key: string]: string | Tag[] | RecipeItem[] }) => void
}

const TAG_COLORS = ["#D04848", "#F3B95F", "#FDE767", "#6895D2", "#FE7A36", "#3652AD", "#280274", "#E9F6FF"];

export default function Tags({recipe, updateRecipe}: Props) {
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
                <IoCloseCircleSharp className={"text-white text-sm cursor-pointer"} onClick={() => removeTag(tag)}/>
            </div>)}
        </div>
        {
            editing
                ? <div className={"relative h-[25px]"}>
                    <input
                        type="text"
                        className={"peer rounded-md border-2 border-main-blue pl-6 pr-1 py-1 w-[200px] outline-0 text-xs"}
                        onBlur={(e) => addTag(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                addTag(e.currentTarget.value)
                            }
                        }}
                        autoFocus={true}
                        placeholder={"my tag"}
                    />
                    <FaTags className={"absolute text-sm text-main-blue left-2 top-1/2 mt-[2px]"} style={{transform: "translateY(-50%)"}}/>
                </div>
                : tags.length
                    ? <FaPlus className={"text-lg text-main-blue cursor-pointer"}
                              onClick={() => setEditing(true)}/>
                    : <div className={"flex gap-2 items-center mt-2 cursor-pointer"}
                           onClick={() => setEditing(true)}>
                        <FaTags className={"text-lg text-main-blue"}/>
                        <span className={"text-sm text-main-blue"}>Add Tags...</span>
                    </div>
        }
    </div>
}