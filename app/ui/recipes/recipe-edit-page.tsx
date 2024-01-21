"use client";

import {FaRegEdit} from "react-icons/fa";
import {FaTags} from "react-icons/fa";
import {IoCloseCircleSharp} from "react-icons/io5";
import {FaPlus} from "react-icons/fa";

import {Recipe, Tag} from "@/app/lib/models";
import {convertToHumanReadableTime, overflowText} from "@/app/lib/utilities";
import {useState} from "react";
import {updateRecipeInLS} from "@/app/lib/actions-localstorage";

export default function RecipeEditPage({recipe}: { recipe: Recipe }) {
    const defaultInputs = {
        name: false,
        tags: false
    }
    const [editingInput, setEditingInput] = useState({
        ...defaultInputs
    })

    const [tags, setTags] = useState<string[]>(JSON.parse(recipe.tags || "[]"))

    const updateRecipeName = (name: string) => {
        if (name.trim() !== "") {
            recipe.name = name;
            updateRecipeInLS(recipe);
        }

        setEditingInput({
            ...defaultInputs,
            name: false
        })
    }

    const updateTags = (newTagName: string) => {
        newTagName = newTagName.trim().toLowerCase();
        if (newTagName !== "" && !tags.includes(newTagName)) {
            recipe.tags = JSON.stringify([
                ...tags,
                newTagName
            ])
            setTags([...tags, newTagName]);
            updateRecipeInLS(recipe);
        }

        setEditingInput({
            ...defaultInputs,
            name: false
        })
    }

    const removeTags = (tagName: string) => {
        const newTags = tags.filter(tag => tag != tagName);
        recipe.tags = JSON.stringify(newTags)
        setTags([...newTags]);
        updateRecipeInLS(recipe);
    }

    const tagColors = ["#D04848", "#F3B95F", "#FDE767", "#6895D2", "#FE7A36", "#3652AD", "#280274", "#E9F6FF"];
    return <div className={"flex flex-col items-start"}>
        <div className={"flex justify-between items-end w-full"}>
            <div className={"flex flex-col items-start"}>
                {
                    editingInput.name
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
                            <FaRegEdit className={"text-main-blue text-3xl cursor-pointer"}
                                       onClick={() => setEditingInput({...defaultInputs, name: true})}/>
                        </div>
                }

                <div className={"flex gap-2 mt-2 items-center"}>
                    <div className={"flex gap-1"}>
                        {tags.map((tag, i) => <div
                            key={`tag-${i}`}
                            className={`rounded-lg py-1 px-1 flex gap-1 h-[25px] items-center justify-center`}
                            style={{backgroundColor: tagColors[i % tagColors.length]}}
                        >
                            <span className={"text-white text-xs font-thin"}>{tag}</span>
                            <IoCloseCircleSharp className={"text-white text-sm cursor-pointer"} onClick={() => removeTags(tag)}/>
                        </div>)}
                    </div>
                    {
                        editingInput.tags
                            ? <div className={"relative h-[25px]"}>
                                <input
                                    type="text"
                                    className={"peer rounded-md border-2 border-main-blue pl-6 pr-1 py-1 w-[200px] outline-0 text-xs"}
                                    onBlur={(e) => updateTags(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            updateTags(e.currentTarget.value)
                                        }
                                    }}
                                    autoFocus={true}
                                    placeholder={"my tag"}
                                />
                                <FaTags className={"absolute text-sm text-main-blue left-2 top-1/2 mt-[2px]"} style={{transform: "translateY(-50%)"}}/>
                            </div>
                            : tags.length
                                ? <FaPlus className={"text-lg text-main-blue cursor-pointer"}
                                          onClick={() => setEditingInput({...defaultInputs, tags: true})}/>
                                : <div className={"flex gap-2 items-center mt-2 cursor-pointer"}
                                       onClick={() => setEditingInput({...defaultInputs, tags: true})}>
                                    <FaTags className={"text-lg text-main-blue"}/>
                                    <span className={"text-sm text-main-blue"}>Add Tags...</span>
                                </div>
                    }
                </div>
            </div>

            <p className={"text-xs text-main-blue font-thin"}>Updated {convertToHumanReadableTime(Date.now() - parseInt(recipe.updated_at))} ago</p>
        </div>
    </div>
}