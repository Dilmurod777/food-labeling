import {Recipe, RecipeItem, Tag} from "@/app/lib/models";
import InputWrapper from "@/app/ui/ingredients/input-wrapper";

interface Props {
    recipe: Recipe,
    updateRecipe: (data: { [key: string]: string | number | RecipeItem[] | Tag[] }) => void
}

export default function RecipeAdvanced({recipe, updateRecipe}: Props) {
    const updateRecipeData = (param: string, value: string) => {
        let newValue = parseFloat(value);
        if (newValue < 0) newValue = 0;

        if (param == "serving-size-description-fr") {
            updateRecipe({
                serving_size_description_fr: newValue
            })
        }

        if (param == "description-ddf") {
            updateRecipe({
                description_ddf: newValue
            })
        }

        if (param == "sku") {
            updateRecipe({
                sku: newValue
            })
        }

        if (param == "preparation-instructions") {
            updateRecipe({
                preparation_instructions: newValue
            })
        }
    }

    return <div className={'flex flex-col gap-4 items-start relative'}>
        <InputWrapper
            title={"Suggested serving size (French)"}
            htmlFor={"recipe-serving-size-fr"}
            tooltip_enabled={true}
            tooltip_title={"Warning - advanced usage (ask us if you have questions)!"}
            tooltip_content={"For Canadian nutrition labels, you must provide information in both English and French.\n" +
                "<br><br>\n" +
                "The serving size should be the same amount (see\n" +
                "Canadian reference serving sizes),\n" +
                "but has to be translated into each language, so you have to enter in French as well as English.\n"}
        >
            <input
                type={"text"}
                className={"w-[300px] border-2 border-main-gray rounded-md px-2 py-1 text-sm"}
                defaultValue={recipe.serving_size_description_fr}
                placeholder={"e.g. pour/par 1 pièce"}
                onBlur={(e) => updateRecipeData("serving-size-description-fr", e.target.value)}
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        updateRecipeData("serving-size-description-fr", e.currentTarget.value)
                    }
                }}
            />
        </InputWrapper>

        <InputWrapper
            title={"Description for Dual Declaration Format"}
            htmlFor={"recipe-description-ddf"}
            tooltip_enabled={true}
            tooltip_title={"Warning - advanced usage (ask us if you have questions)!"}
            tooltip_content={"If you're using a dual declaration label you will have two columns - one that describes the\n" +
                "'as packaged' product, and one 'as prepared' (e.g. for a brownie mix and then the finished\n" +
                "product after you add eggs, butter, and bake it).\n" +
                "<br><br>\n" +
                "This value will be the title of that second column, and the first column will be your\n" +
                "Suggested Serving Size.\n"}
        >
            <input
                type={"text"}
                className={"w-[300px] border-2 border-main-gray rounded-md px-2 py-1 text-sm"}
                defaultValue={recipe.description_ddf}
                placeholder={"Baked"}
                onBlur={(e) => updateRecipeData("description-ddf", e.target.value)}
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        updateRecipeData("description-ddf", e.currentTarget.value)
                    }
                }}
            />
        </InputWrapper>

        <InputWrapper
            title={"SKU"}
            htmlFor={"recipe-sku"}
        >
            <input
                type={"text"}
                className={"w-[300px] border-2 border-main-gray rounded-md px-2 py-1 text-sm"}
                defaultValue={recipe.sku}
                placeholder={"1234-567-8901"}
                onBlur={(e) => updateRecipeData("sku", e.target.value)}
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        updateRecipeData("sku", e.currentTarget.value)
                    }
                }}
            />
        </InputWrapper>

        <InputWrapper
            title={"Preparation instructions"}
            htmlFor={"recipe-preparation-instruction"}
        >
            <textarea
                rows={10}
                className={"w-[300px] border-2 border-main-gray rounded-md px-2 py-1 text-sm"}
                defaultValue={recipe.sku}
                placeholder={"1. Mix wet ingredients in a bowl\n" +
                    "2. Combine with dry ingredients in pan\n" +
                    "3. Bake at 350 degrees for 25 minutes\n"}
                onBlur={(e) => updateRecipeData("preparation-instructions", e.target.value)}
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        updateRecipeData("preparation-instructions", e.currentTarget.value)
                    }
                }}
            />
        </InputWrapper>
    </div>
}