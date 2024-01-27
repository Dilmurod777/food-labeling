import InputWrapper from "@/app/ui/ingredients/input-wrapper";
import {Recipe, RecipeItem, Tag} from "@/app/lib/models";

interface Props {
    recipe: Recipe,
    updateRecipe: (data: { [key: keyof Recipe]: string | number | RecipeItem[] | Tag[] }) => void
}

export default function RecipePackaging({recipe, updateRecipe}: Props) {
    const updateRecipeData = (param: string, value: string) => {
        let newValue = parseFloat(value);
        if (newValue < 0) newValue = 0;

        if (param == "waste") {
            updateRecipe({
                waste: newValue
            })
        }

        if (param == "net-weight") {
            updateRecipe({
                net_weight: newValue
            })
        }

        if (param == "packages") {
            updateRecipe({
                packages: newValue
            })
        }

        if (param == "serving-size-description") {
            updateRecipe({
                serving_size_description: newValue
            })
        }

        if (param == "serving-per-package") {
            updateRecipe({
                serving_per_package: newValue
            })
        }
    }

    return <div className={'flex flex-col gap-4 items-start relative'}>
        <InputWrapper
            title={"Overall recipe waste (%)"}
            htmlFor={"recipe-waste"}
            tooltip_enabled={true}
            tooltip_title={"Warning - advanced usage (ask us if you have questions)!"}
            tooltip_content={"The counterpart to the ingredient level waste % in the table above, waste can be set for\n" +
                "individual ingredients and/or the whole recipe.\n" +
                "<br><br>\n" +
                "Recipe waste set here will be applied to <b>every ingredient</b>, which means it will be\n" +
                "applied <b>in addition to</b> any waste set on individual ingredients in the table above.\n"}
        >
            <input
                type={"number"}
                min={0}
                className={"w-[300px] border-2 border-main-gray rounded-md px-2 py-1 text-sm"}
                defaultValue={recipe.waste}
                onBlur={(e) => updateRecipeData("waste", e.target.value)}
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        updateRecipeData("waste", e.currentTarget.value)
                    }
                }}
            />
        </InputWrapper>

        <InputWrapper
            title={"Net weight per package (grams)"}
            htmlFor={"recipe-net-weight-per-package"}
            tooltip_enabled={true}
            tooltip_title={"Warning - advanced usage (ask us if you have questions)!"}
            tooltip_content={"To create a proper label, we need to know how much product is in each package, either in" +
                "weight or volume (excluding the packaging)." +
                "<br><br>" +
                "If it's 100 grams, enter 100 and select grams. If it's 12 fluid ounces, enter 12 and select" +
                "fluid ounces." +
                "<br><br>" +
                "Note: this is PER PACKAGE, not per recipe or serving. This will show up on the Serving Size" +
                "line (divided by the number of servings per package) in parenthesis. If you're not sure," +
                "leave it as 0 for now and come back to this later."}
        >
            <input
                type={"number"}
                min={0}
                className={"w-[300px] border-2 border-main-gray rounded-md px-2 py-1 text-sm"}
                defaultValue={recipe.net_weight}
                onBlur={(e) => updateRecipeData("net-weight", e.target.value)}
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        updateRecipeData("net-weight", e.currentTarget.value)
                    }
                }}
            />
        </InputWrapper>

        <InputWrapper
            title={"How many packages does this recipe make?"}
            htmlFor={"recipe-packages"}
            tooltip_enabled={true}
            tooltip_title={"Warning - advanced usage (ask us if you have questions)!"}
            tooltip_content={"The packages per recipe is how many packages (or units, bottles, or however you describe the\n" +
                "saleable item) this recipe makes (assuming no waste - i.e. the full recipe goes toward\n" +
                "finished product).\n" +
                "<br><br>\n" +
                "If your recipe makes 20 candy bars and you package each one individually, you would enter 20.\n" +
                "If your recipe makes 20 candy bars and you sell them in packs of 2, then you would enter 10.\n"}
        >
            <input
                type={"number"}
                min={0}
                className={"w-[300px] border-2 border-main-gray rounded-md px-2 py-1 text-sm"}
                defaultValue={recipe.packages}
                onBlur={(e) => updateRecipeData("packages", e.target.value)}
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        updateRecipeData("packages", e.currentTarget.value)
                    }
                }}
            />
        </InputWrapper>

        <InputWrapper
            title={"Suggested serving size"}
            htmlFor={"recipe-serving-size-description"}
            tooltip_enabled={true}
            tooltip_title={"Warning - advanced usage (ask us if you have questions)!"}
            tooltip_content={"The suggested serving is the amount of food customarily consumed per sitting by a person 4\n" +
                "years of age or older. It is usually descriptive, e.g. 1 cup, 1 tbsp, 1 piece, 1 cookie,\n" +
                "etc.\n" +
                "<br><br>\n" +
                "Usually, your best judgment will prevail, but the\n" +
                "FDA has actual guidelines for the new format\n" +
                "as well as the old FDA label format that you should review\n" +
                "if you're not sure what your serving size is.\n"}
        >
            <input
                type={"text"}
                className={"w-[300px] border-2 border-main-gray rounded-md px-2 py-1 text-sm"}
                defaultValue={recipe.serving_size_description}
                onBlur={(e) => updateRecipeData("serving-size-description", e.target.value)}
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        updateRecipeData("serving-size-description", e.currentTarget.value)
                    }
                }}
            />
        </InputWrapper>

        <InputWrapper
            title={"How many servings are in each package?"}
            htmlFor={"recipe-serving-size-per-package"}
            tooltip_enabled={true}
            tooltip_title={"Warning - advanced usage (ask us if you have questions)!"}
            tooltip_content={"This is the number of servings that EACH PACKAGE of your product has.\n" +
                "<br><br>\n" +
                "If each package has 20 cookies and a serving is 1 cookie, then there are 20 servings per\n" +
                "package. If your recipe makes 2 packages and each package will have 10 cookies in it, then\n" +
                "there are 10 servings per package.\n" +
                "<br><br>\n" +
                "If you put in a non-round number (e.g. 2.2), the label will round it and add the word 'about'\n" +
                "to the servings per container statement.\n"}
        >
            <input
                type={"number"}
                min={0}
                className={"w-[300px] border-2 border-main-gray rounded-md px-2 py-1 text-sm"}
                defaultValue={recipe.serving_per_package}
                onBlur={(e) => updateRecipeData("serving-per-package", e.target.value)}
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        updateRecipeData("serving-per-package", e.currentTarget.value)
                    }
                }}
            />
        </InputWrapper>
    </div>
}