import {Input} from "@/app/lib/interfaces";
import Tooltip from "@/app/ui/tooltip";
import InputWrapper from "@/app/ui/ingredients/input-wrapper";

const inputs: Input[] = [
    {
        type: "number",
        text: "Vitamin D (% FDA)",
        key: "ingredient-vitamin-d"
    },
    {
        type: "number",
        text: "Calcium (% FDA)",
        key: "ingredient-calcium"
    },
    {
        type: "number",
        text: "Iron (% FDA)",
        key: "ingredient-iron"
    },
    {
        type: "number",
        text: "Potassium (% FDA)",
        key: "ingredient-potassium"
    },
    {
        type: "number",
        text: "Vitamin A (% FDA)",
        key: "ingredient-vitamin-a"
    },
    {
        type: "number",
        text: "Vitamin C (% FDA)",
        key: "ingredient-vitamin-c"
    }
]

export default function IngredientVitaminsMinerals() {
    return <div className={"flex flex-col gap-2 w-full"}>
        <p className={"text-sm font-bold text-black mt-4"}>
            To finish your ingredient, enter vitamins/minerals:
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
                />
            </div>
        </InputWrapper>)}
    </div>
}