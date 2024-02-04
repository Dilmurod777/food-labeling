import {RecipeItem} from "@/app/lib/models";
import {useState} from "react";
import {IngredientLabelLanguage} from "@/app/lib/constants";
import {convertSpiceFlavor} from "@/app/lib/utilities";

interface Props {
    items: RecipeItem[]
}

export default function IngredientListPreview({items}: Props) {
    const [currentLabelPreviewType, setCurrentLabelPreviewType] = useState(IngredientLabelLanguage.English)
    const labelPreviewTypes: { [key: string]: IngredientLabelLanguage } = {
        "FDA": IngredientLabelLanguage.English,
        "Canada": IngredientLabelLanguage.Canada,
        "French": IngredientLabelLanguage.French
    }

    const sugarItems = items.filter(item => item.canada_sugar);
    const noSugarItems = items.filter(item => !item.canada_sugar);

    const getItemValue = (item: RecipeItem, spiceFlavorEnabled: boolean): string => {
        switch (currentLabelPreviewType) {
            case IngredientLabelLanguage.English: {
                let value = item.ingredient?.list_name || item.ingredient?.name || "";
                if (spiceFlavorEnabled) {
                    return convertSpiceFlavor(item.spice_flavor, currentLabelPreviewType) || value;
                }

                return value;
            }
            case IngredientLabelLanguage.Canada: {
                let value = item.ingredient?.list_name || item.ingredient?.name || "";
                if (spiceFlavorEnabled) {
                    return convertSpiceFlavor(item.spice_flavor, currentLabelPreviewType) || value;
                }

                return value;
            }
            case IngredientLabelLanguage.French: {
                let value = item.ingredient?.list_name_fr || item.ingredient?.list_name || item.ingredient?.name || "";
                if (spiceFlavorEnabled) {
                    return convertSpiceFlavor(item.spice_flavor, currentLabelPreviewType) || value;
                }

                return value;
            }
        }
    }

    const getItems = (): string => {
        let result = "";

        switch (currentLabelPreviewType) {
            case IngredientLabelLanguage.English:
                result += "INGREDIENTS: ";
                result += items.map(item => getItemValue(item, true)).join(", ");
                break;
            case IngredientLabelLanguage.Canada:
                result += "INGREDIENTS: ";

                if (sugarItems.length != 0) {
                    result += "SUGARS (" + sugarItems.map(item => getItemValue(item, false)).join(", ") + ")";
                }

                if (sugarItems.length != 0 && noSugarItems.length != 0) {
                    result += ", "
                }

                if (noSugarItems.length != 0) {
                    result += noSugarItems.map(item => getItemValue(item, true)).join(", ");
                }

                break;
            case IngredientLabelLanguage.French:
                result += "INGRÉDIENTS: ";

                if (sugarItems.length != 0) {
                    result += "SUCRES (" + sugarItems.map(item => getItemValue(item, false)).join(", ") + ")";
                }

                if (sugarItems.length != 0 && noSugarItems.length != 0) {
                    result += ", "
                }

                if (noSugarItems.length != 0) {
                    result += noSugarItems.map(item => getItemValue(item, true)).join(", ");
                }

                break;
        }

        return result;
    }

    return <div className={"w-3/12 flex flex-col gap-3 border-[1px] border-main-gray bg-[#fafafa] py-3 px-3 rounded-md"}>
        <h2 className={"text-xl text-black font-bold"}>Ingredient List Preview</h2>
        <div className={"w-full flex items-center justify-center border-solid border-b-[1px] border-main-gray"}>
            {Object.keys(labelPreviewTypes).map((type, i) => {
                const isActive = labelPreviewTypes[type] == currentLabelPreviewType;

                return <div
                    key={`label-preview-type-${i}`}
                    className={`px-4 py-2 text-base font-thin text-black cursor-pointer border-b-[1px] border-main-gray ${isActive && "text-main-blue border-main-blue"} hover:border-main-blue`}
                    onClick={() => setCurrentLabelPreviewType(labelPreviewTypes[type])}
                >
                    {type}
                </div>
            })}
        </div>
        <div className={"border-2 border-black bg-white py-2 px-2 text-base font-thin text-black uppercase"}>
            {getItems()}
        </div>
    </div>
}