import {IRecipe, Recipe, RecipeItem} from "@/app/lib/models";
import Title from "@/app/ui/recipes/recipe-page/title";
import Tags from "@/app/ui/recipes/recipe-page/tags";
import {useState} from "react";
import Link from "next/link";
import IngredientListPreview from "@/app/ui/recipes/ingredient-statement-page/ingredient-list-preview";
import {IngredientFlavor, IngredientLabelLanguage} from "@/app/lib/constants";
import {LuFileVideo} from "react-icons/lu";
import {CSVLink} from "react-csv";
import {capitalize, getIngredientListPreviewRowValue} from "@/app/lib/utilities";

interface Props {
    recipe: Recipe,
    updateRecipe: (data: IRecipe) => void
}

export default function IngredientStatementPage({recipe, updateRecipe}: Props) {
    const [items, _] = useState<RecipeItem[]>(JSON.parse(recipe.recipe_items || "[]"))
    const [labelTextLangType, setLabelTextLangType] = useState(IngredientLabelLanguage.English)

    if (items.length == 0) {
        return <div className={"w-full h-full flex items-center justify-center text-lg font-bold text-black"}>
            No ingredients in the recipe.
        </div>
    }

    const getDownloadData = () => {
        const rows = items.map(item => [
            item.ingredient.name,
            item.ingredient.list_name,
            IngredientFlavor[parseInt(item.spice_flavor)],
            item.canada_sugar ? "TRUE" : "FALSE",
            item.ingredient.list_name_fr
        ])

        return [
            [recipe.name],
            [],
            ["Ingredient", "Displayed As", "Spice/Flavor", "Canada Sugar", "Displayed As French"],
            ...rows,
            [],
            ["FDA Ingredient List", capitalize(getIngredientListPreviewRowValue(items, IngredientLabelLanguage.English))],
            ["Canada Ingredient List", capitalize(getIngredientListPreviewRowValue(items, IngredientLabelLanguage.Canada))],
            ["Canada French Ingredient List", capitalize(getIngredientListPreviewRowValue(items, IngredientLabelLanguage.French))],
        ]
    }

    return <div className={"flex flex-col gap-6 w-full flex-grow"}>
        <div className={"w-full flex flex-col items-start"}>
            <Title
                recipe={recipe}
                updateRecipe={updateRecipe}
                editable={false}
            />

            <Tags
                recipe={recipe}
                updateRecipe={updateRecipe}
                editable={false}
            />
        </div>

        <div className={"flex gap-6 items-start"}>
            <table className={"flex-grow"}>
                <thead>
                <tr className={"*:text-left *:px-2 *:py-2 border-b-2 border-main-gray"}>
                    <th>Ingredient</th>
                    <th className={"w-5/12"}>Show on Label as
                        <span className={"inline-block w-8"}/>
                        <span
                            className={`${labelTextLangType == IngredientLabelLanguage.English ? "text-black cursor-default" : "text-main-blue hover:text-hover-main-blue cursor-pointer"}`}
                            onClick={() => setLabelTextLangType(IngredientLabelLanguage.English)}>English</span>
                        &nbsp;/&nbsp;
                        <span
                            className={`${labelTextLangType == IngredientLabelLanguage.French ? "text-black cursor-default" : "text-main-blue hover:text-hover-main-blue cursor-pointer"}`}
                            onClick={() => setLabelTextLangType(IngredientLabelLanguage.French)}>French</span>
                    </th>
                    <th className={"w-1/12"}>Spice/flavor</th>
                    <th className={"w-2/12"}>Canada sugar</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, i) => <tr
                    key={`ingredient-item-${i}`}
                    className={"*:text-left *:text-sm *:px-2 *:py-2 even:bg-main-gray *:h-[40px] *:align-top"}
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
                        {labelTextLangType == IngredientLabelLanguage.English && (
                            <textarea
                                defaultValue={item.ingredient?.list_name || ""}
                                name="show-label-eng"
                                id={`show-label-eng-${i}`}
                                className={"w-full h-[40px] border-[1px] min-h-[40px] border-main-gray rounded-md outline-0 px-1 py-1"}
                                onBlur={(e) => {
                                    const newItems = [...items];
                                    newItems[i].ingredient.list_name = e.target.value;
                                    updateRecipe({
                                        recipe_items: JSON.stringify(newItems)
                                    })
                                }}
                            />
                        )}
                        {labelTextLangType == IngredientLabelLanguage.French && (
                            <textarea
                                defaultValue={item.ingredient?.list_name_fr || ""}
                                name="show-label-fr"
                                id={`show-label-fr-${i}`}
                                className={"w-full h-[40px] border-[1px] min-h-[40px] border-main-gray rounded-md outline-0 px-1 py-1"}
                                onBlur={(e) => {
                                    const newItems = [...items];
                                    newItems[i].ingredient.list_name_fr = e.target.value;
                                    updateRecipe({
                                        recipe_items: JSON.stringify(newItems)
                                    })
                                }}
                            />
                        )}
                    </td>
                    <td>
                        <select
                            name={`spicy-flavor-${i}`}
                            id={`spicy-flavor-${i}`}
                            className={"border-[1px] border-main-gray rounded-md outline-0 px-1 py-1 h-[40px]"}
                            defaultValue={item.spice_flavor}
                            onChange={(e) => {
                                const newItems = [...items];
                                newItems[i].spice_flavor = e.target.value;
                                updateRecipe({
                                    recipe_items: JSON.stringify(newItems)
                                })
                            }}
                        >
                            <option value={IngredientFlavor.None.toString()}></option>
                            <option value={IngredientFlavor.Spice.toString()}>Spice</option>
                            <option value={IngredientFlavor.Flavor.toString()}>Flavor</option>
                            <option value={IngredientFlavor.NaturalFlavor.toString()}>Natural Flavor</option>
                            <option value={IngredientFlavor.ArtificialFlavor.toString()}>Artificial Flavor</option>
                            <option value={IngredientFlavor.ArtificialColor.toString()}>Artificial Color</option>
                            <option value={IngredientFlavor.SpiceColoring.toString()}>Spice & Coloring</option>
                        </select>
                    </td>
                    <td>
                        <input
                            type="checkbox"
                            name={`canada-sugar-${i}`}
                            id={`canada-sugar-${i}`}
                            defaultChecked={item.canada_sugar}
                            onChange={(e) => {
                                const newItems = [...items];
                                newItems[i].canada_sugar = e.target.checked;
                                updateRecipe({
                                    recipe_items: JSON.stringify(newItems)
                                })
                            }}
                        />
                    </td>
                </tr>)}
                </tbody>
            </table>

            <IngredientListPreview items={items}/>
        </div>

        <div className={"flex gap-4 justify-end items-center py-4"}>
            <CSVLink
                data={getDownloadData()}
                className={'flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm text-main-blue font-normal cursor-pointer border-2 border-main-blue hover:text-white hover:bg-main-blue'}
                filename={`${recipe.name} ingredient list.csv`}
            >Download me</CSVLink>

            <div
                className={'flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm text-main-blue font-normal cursor-pointer border-2 border-main-blue hover:text-white hover:bg-main-blue'}
                onClick={() => {
                }}
            >
                <LuFileVideo/>
                <span>Tutorial</span>
            </div>
        </div>
    </div>
}