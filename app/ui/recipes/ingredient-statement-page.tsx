import {IRecipe, Recipe, RecipeItem} from "@/app/lib/models";
import Title from "@/app/ui/recipes/recipe-page/title";
import Tags from "@/app/ui/recipes/recipe-page/tags";
import {useState} from "react";
import Link from "next/link";

interface Props {
    recipe: Recipe,
    updateRecipe: (data: IRecipe) => void
}

enum LabelNameType {English, French, Canada}

export default function IngredientStatementPage({recipe, updateRecipe}: Props) {
    const [items, setItems] = useState<RecipeItem[]>(JSON.parse(recipe.recipe_items || "[]"))
    const [labelTextLangType, setLabelTextLangType] = useState(LabelNameType.English)
    const [labelTextPreviewType, setLabelTextPreviewType] = useState(LabelNameType.English)

    if(items.length == 0){
        return <div className={"w-full h-full flex items-center justify-center text-lg font-bold text-black"}>
            No ingredients in the recipe.
        </div>
    }

    return <div className={"flex flex-col gap-4 w-full flex-grow"}>
        <div className={"w-full flex flex-col items-start"}>
            <Title
                recipe={recipe}
                updateRecipe={updateRecipe}
            />

            <Tags
                recipe={recipe}
                updateRecipe={updateRecipe}
            />
        </div>

        <div className={"flex gap-6 items-start"}>
            <table className={"w-full"}>
                <thead>
                <tr className={"*:text-left *:px-2 *:py-2 border-b-2 border-main-gray"}>
                    <th>Ingredient</th>
                    <th className={"w-4/12"}>Show on Label as
                        <span className={"inline-block w-8"}/>
                        <span className={"text-main-blue hover:text-hover-main-blue cursor-pointer"}
                              onClick={() => setLabelTextLangType(LabelNameType.English)}>English</span>
                        &nbsp;/&nbsp;
                        <span className={"text-main-blue hover:text-hover-main-blue cursor-pointer"}
                              onClick={() => setLabelTextLangType(LabelNameType.French)}>French</span>
                    </th>
                    <th className={"w-1/12"}>Spice/flavor</th>
                    <th className={"w-2/12"}>Canada sugar</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, i) => <tr
                    key={`ingredient-item-${i}`}
                    className={"*:text-left *:text-sm *:px-2 *:py-2 even:bg-main-gray *:h-[40px]"}
                >
                    <td>
                        <Link
                            href={`/recipes/${item.ingredient_id}/view`}
                            className={"text-main-blue hover:text-hover-main-blue"}
                            target={"_blank"}
                        >
                            {item.ingredient?.name || "no-name"}
                        </Link>
                    </td>
                    <td>
                        {labelTextLangType == LabelNameType.English && (
                            <textarea
                                defaultValue={item.ingredient?.list_name || ""}
                                name="show-label-eng"
                                id={`show-label-eng-${i}`}
                                className={"w-full h-full border-[1px] min-h-[40px] border-main-gray rounded-md outline-0 px-1 py-1"}
                            />
                        )}
                        {labelTextLangType == LabelNameType.French && (
                            <textarea
                                defaultValue={item.ingredient?.list_name_fr || ""}
                                name="show-label-fr"
                                id={`show-label-fr-${i}`}
                                className={"w-full h-full border-[1px] min-h-[40px] border-main-gray rounded-md outline-0 px-1 py-1"}
                            />
                        )}
                    </td>
                    <td>
                        <select
                            name={`spicy-flavor-${i}`}
                            id={`spicy-flavor-${i}`}
                            className={"border-[1px] border-main-gray rounded-md outline-0 px-1 py-1 h-[40px]"}
                        >
                            <option value="0"></option>
                            <option value="1">Spice</option>
                            <option value="2">Flavor</option>
                            <option value="3">Natural Flavor</option>
                            <option value="4">Artificial Flavor</option>
                            <option value="5">Artificial Color</option>
                            <option value="6">Spice & Coloring</option>
                        </select>
                    </td>
                    <td>
                        <input
                            type="checkbox"
                            name={`canada-sugar-${i}`}
                            id={`canada-sugar-${i}`}
                        />
                    </td>
                </tr>)}
                </tbody>
            </table>
            <div className={"flex flex-col gap-3 border-[1px] border-secondary-gray bg-main-gray py-3 px-3"}>
                <h2 className={"text-xl text-black font-bold"}>Ingredient List Preview</h2>
            </div>
        </div>
    </div>
}