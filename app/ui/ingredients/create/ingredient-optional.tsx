import {Input} from "@/app/lib/interfaces";
import Tooltip from "@/app/ui/ingredients/tooltip";
import InputWrapper from "@/app/ui/ingredients/input-wrapper";

const inputs: Input[] = [
    {
        type: "number",
        text: "Magnesium (% FDA)",
        key: "ingredient-magnesium"
    },
    {
        type: "number",
        text: "Phosphorus (% FDA)",
        key: "ingredient-phosphorus"
    },
    {
        type: "number",
        text: "Zinc (% FDA)",
        key: "ingredient-zinc"
    },
    {
        type: "number",
        text: "Copper (% FDA)",
        key: "ingredient-copper"
    },
    {
        type: "number",
        text: "Manganese (% FDA)",
        key: "ingredient-manganese"
    },
    {
        type: "number",
        text: "Selenium (% FDA)",
        key: "ingredient-selenium"
    },
    {
        type: "number",
        text: "Thiamin (% FDA)",
        key: "ingredient-thiamin"
    },
    {
        type: "number",
        text: "Riboflavin (% FDA)",
        key: "ingredient-riboflavin"
    },
    {
        type: "number",
        text: "Niacin (% FDA)",
        key: "ingredient-niacin"
    },
    {
        type: "number",
        text: "Pantothenic Acid (% FDA)",
        key: "ingredient-pantothenic-acid"
    },
    {
        type: "number",
        text: "Vitamin B6 (% FDA)",
        key: "ingredient-vitamin-b6"
    },
    {
        type: "number",
        text: "Folate (% FDA)",
        key: "ingredient-folate"
    },
    {
        type: "number",
        text: "Vitamin B12 (% FDA)",
        key: "ingredient-vitamin-b12"
    },
    {
        type: "number",
        text: "Vitamin E (% FDA)",
        key: "ingredient-vitamin-e"
    },
    {
        type: "number",
        text: "Vitamin K (% FDA)",
        key: "ingredient-vitamin-k"
    },
    {
        type: "number",
        text: "Uncounted Fiber (per new FDA rules)",
        key: "ingredient-uncounted-fiber",
        tooltip_enabled: true,
        tooltip_title: "Uncounted Fiber",
        tooltip_content: "The FDA rules for the new labels (as of 2016) define fiber differently, so 'non beneficial' fiber such as bamboo fiber, soy fiber, pea fiber, wheat fiber, cotton seed fiber, sugar beet fiber, and oat fiber are not included in fiber (but still part of total carbohydrates). So for the new label we subtract this value to get to the fiber value on the label."
    },
    {
        type: "number",
        text: "Sugar Alcohol (grams)",
        key: "ingredient-sugar-alcohol"
    },
    {
        type: "number",
        text: "Monounsaturated Fat (grams)",
        key: "ingredient-monounsaturated-fat"
    },
    {
        type: "number",
        text: "Polyunsaturated Fat (grams)",
        key: "ingredient-polyunsaturated-fat"
    }
]

export default function IngredientOptional() {
    return <div className={"flex flex-col gap-2 w-full"}>
        <p className={"text-sm font-bold text-black mt-4"}>
            Optional Nutrients and Details - Include as Many as You Like
        </p>

        {inputs.map((input, i) => <InputWrapper
            key={`ingredient-optional-${i}`}
            title={input.text}
            htmlFor={input.key || `ingredient-optional-${i}`}
            required={input.required}
        >
            <div className={`flex gap-2 items-center justify-start peer relative z-0 hover:z-10`}>
                <input
                    type={input.type}
                    min={0}
                    className={"outline-0 w-1/2 text-xs rounded-md border-2 px-2 py-2 border-main-gray focus:border-main-blue"}
                    name={input.key || `ingredient-optional-${i}`}
                    id={input.key || `ingredient-optional-${i}`}
                />
            </div>
        </InputWrapper>)}
    </div>
}