import {Input} from "@/app/lib/interfaces";
import Tooltip from "@/app/ui/ingredients/tooltip";
import InputWrapper from "@/app/ui/ingredients/input-wrapper";

const inputs: Input[] = [
    {
        type: "number",
        text: "Calories",
        key: "ingredient-calories",
        required: true,
    },
    {
        type: "number",
        text: "Fat (grams)",
        key: "ingredient-fats",
        required: true,
    },
    {
        type: "number",
        text: "Saturated Fat (grams)",
        key: "ingredient-saturated-fat",
        required: true,
    },
    {
        type: "number",
        text: "Trans Fat (grams)",
        key: "ingredient-trans-fat",
        required: true,
    },
    {
        type: "number",
        text: "Cholesterol (mg)",
        key: "ingredient-cholesterol",
        required: true,
    },
    {
        type: "number",
        text: "Sodium (mg)",
        key: "ingredient-sodium",
        required: true,
    },
    {
        type: "number",
        text: "Carbohydrate (grams)",
        key: "ingredient-carbohydrate",
        required: true,
    },
    {
        type: "number",
        text: "Dietary Fiber (grams)",
        key: "ingredient-dietary-fiber",
        required: true,
    },
    {
        type: "number",
        text: "Sugar (grams)",
        key: "ingredient-sugar",
        required: true,
    },
    {
        type: "number",
        text: "Added Sugar (grams)",
        key: "ingredient-added-sugar",
        required: true,
    },
    {
        type: "number",
        text: "Protein (grams)",
        key: "ingredient-protein",
        required: true,
    }
]

export default function IngredientNutrients() {
    return <div className={"flex flex-col gap-2 w-full"}>
        <p className={"text-sm font-bold text-black mt-4"}>
            The descriptions and weights below are what you&apos;ll use to edit the quantities in your recipes.
        </p>

        {inputs.map((input, i) => <InputWrapper
            key={`ingredient-nutrient-${i}`}
            title={input.text}
            htmlFor={input.key || `ingredient-nutrient-${i}`}
            required={input.required}
        >
            <div className={`flex gap-2 items-center justify-start peer relative z-0 hover:z-10`}>
                <input
                    type={input.type}
                    min={0}
                    className={"outline-0 w-1/2 text-xs rounded-md border-2 px-2 py-2 border-main-gray focus:border-main-blue"}
                    name={input.key || `ingredient-nutrient-${i}`}
                    id={input.key || `ingredient-nutrient-${i}`}
                    required
                />
            </div>
        </InputWrapper>)}
    </div>
}