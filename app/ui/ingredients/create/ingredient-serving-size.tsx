import InputWrapper from "@/app/ui/ingredients/input-wrapper";
import {Ingredient} from "@/app/lib/models";

interface Props{
    ingredient?: Ingredient;
}

export default function IngredientServingSize({ingredient}: Props) {
    return <div className={"flex flex-col gap-2 w-full"}>
        <InputWrapper
            title={"Serving Size Description"}
            htmlFor={"ingredient-serving-size-description"}
            required
            tooltip_enabled={true}
            tooltip_title={"Serving Size Description"}
            tooltip_content={"The (descriptive) serving size that the nutrition info is based on. Sometimes it's per 100 grams, other times it's per 2 tbsp, or 1 oz. The nutrition label or spec sheet will list the serving size that the nutrition information is based on, and that's what you enter here."}
        >
            <select
                defaultValue={parseInt(ingredient?.serving_size_description || "0")}
                name={"ingredient-serving-size-description"}
                id={"ingredient-serving-size-description"}
                className={"px-2 py-1 text-sm text-left border-main-gray border-2 rounded-md *:text-sm w-1/2"}
            >
                <option value={0}>100 grams</option>
                <option value={1}>1 tbsdds</option>
                <option value={2}>1 lb</option>
                <option value={3}>1 gram</option>
                <option value={4}>1 oz</option>
                <option value={5}>1 kg</option>
            </select>
        </InputWrapper>

        <InputWrapper
            title={"Serving Size Weight (in grams) "}
            htmlFor={"ingredient-serving-size-weight"}
            required
            tooltip_enabled={true}
            tooltip_title={"Serving Size Weight"}
            tooltip_content={"The actual weight of the serving size you entered above. So if the nutrition info is per 100 grams, you'd enter '100' here (without the quotes). This value is usually listed in parenthesis next to the descriptive serving size. If it's per 2 tbsp, that's usually around 30 grams. For 1 oz, that 28 grams."}
        >
            <input
                type="number"
                min={0}
                className={"outline-0 w-1/2 text-xs rounded-md border-2 px-2 py-2 border-main-gray focus:border-main-blue"}
                placeholder={"e.g. 40"}
                name={"ingredient-serving-size"}
                id={"ingredient-serving-size"}
                defaultValue={parseInt(ingredient?.serving_size || "0")}
            />
        </InputWrapper>
    </div>
}