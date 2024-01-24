import Tooltip from "@/app/ui/tooltip";
import {Input} from "@/app/lib/interfaces";
import InputWrapper from "@/app/ui/ingredients/input-wrapper";
import {Ingredient} from "@/app/lib/models";

const inputs: Input[] = [
    {
        type: "radio",
        key: "ingredient-type",
        value: "0",
        checked: true,
        text: "Food Ingredient",
        tooltip_enabled: true,
        tooltip_title: "What's a Food Ingredient?",
        tooltip_content: "Most ingredients are 'Food Ingredients'. If you use it in your recipe, it's a food ingredient. Non-food ingredients are mainly used for costing (ingredients like packaging materials, labor), allowing you to create a full bill of materials."
    },
    {
        type: 'radio',
        key: "ingredient-type",
        value: "1",
        text: "Non-Food Ingredient (Labor, Packaging, etc.)",
        tooltip_enabled: true,
        tooltip_title: "What's a Non-Food Ingredient?",
        tooltip_content: "Non-food ingredients are mainly used for costing (ingredients like packaging materials, labor), allowing you to create a full bill of materials. If you create a non-food ingredient, we'll automatically configure certain fields, setting it as a private ingredient, and removing nutrient data.",
        children: [
            {
                type: 'radio',
                key: "ingredient-subtype",
                value: "1-0",
                checked: true,
                text: "Labor (hourly)",
                tooltip_enabled: true,
                tooltip_title: "What are Hourly Ingredients?",
                tooltip_content: "Non-food ingredients come in two flavors - hourly and per unit. You typically pay for labor on an hourly basis, so that would be an hourly non-food ingredient. So would equipment that you rent. Or a commercial kitchen you pay for by the hour."
            },
            {
                type: 'radio',
                key: "ingredient-subtype",
                value: "1-1",
                text: "Packaging",
                tooltip_enabled: true,
                tooltip_title: "What are Non-Hourly Ingredients?",
                tooltip_content: "Non-food ingredients come in two flavors - hourly and per unit. You typically pay for things like packaging on a per-unit basis, so that is a per unit non-food ingredient."
            },
            {
                type: 'radio',
                key: "ingredient-subtype",
                value: "1-2",
                text: "Other (hourly)",
                tooltip_enabled: true,
                tooltip_title: "What are Hourly Ingredients?",
                tooltip_content: "Non-food ingredients come in two flavors - hourly and per unit. You typically pay for labor on an hourly basis, so that would be an hourly non-food ingredient. So would equipment that you rent. Or a commercial kitchen you pay for by the hour."
            },
            {
                type: 'radio',
                key: "ingredient-subtype",
                value: "1-3",
                text: "Other (per unit)",
                tooltip_enabled: true,
                tooltip_title: "What are Non-Hourly Ingredients?",
                tooltip_content: "Non-food ingredients come in two flavors - hourly and per unit. You typically pay for things like packaging on a per-unit basis, so that is a per unit non-food ingredient."
            },
            {
                type: "paragraph",
                text: "(Non-Food Ingredients will always be private.)"
            }
        ]
    }
]

interface Props{
    ingredient?: Ingredient;
}

export default async function IngredientType({ingredient}: Props) {
    return <InputWrapper title={"Ingredient Type"} htmlFor={"ingredient-type"} required>
        {inputs.map((input, i) => <div
            key={`input-${i}`}
            className={`flex flex-col gap-1`}
        >
            <div className={`flex gap-2 items-center justify-start peer relative z-0 hover:z-10`}>
                <input
                    type={input.type}
                    id={`${input.key}-${input.value}`}
                    name={input.key}
                    value={input.value}
                    className={`${input.key}-${input.value}`}
                    defaultChecked={ingredient ? ingredient.type == input.value : input.checked}
                />
                <label htmlFor={`${input.key}-${input.value}`} className={"text-xs text-black font-normal"}>{input.text}</label>
                {input.tooltip_enabled && <Tooltip title={input.tooltip_title} content={input.tooltip_content}/>}
            </div>

            <div
                className={"flex flex-col gap-1 opacity-0 h-0 overflow-hidden peer-has-[:checked]:opacity-100 peer-has-[:checked]:h-full peer-has-[:checked]:overflow-visible"}>
                {input.children?.map((child, j) => {
                    if (child.type == "paragraph") {
                        return <p
                            key={`input-${i}-child-${j}`}
                            className={"text-xs text-black font-thin ml-6"}>
                            {child.text}
                        </p>
                    }

                    return <div
                        key={`input-${i}-child-${j}`}
                        className={"flex fit gap-2 items-center justify-start ml-6 relative z-0 hover:z-10"}
                    >
                        <input
                            type={child.type}
                            id={`${child.key}-${child.value}`}
                            name={child.key}
                            value={child.value}
                            defaultChecked={ingredient ? ingredient.subtype == child.value : child.checked}
                        />
                        <label htmlFor={`${child.key}-${child.value}`} className={"text-xs text-black font-normal"}>{child.text}</label>
                        {child.tooltip_enabled && <Tooltip title={child.tooltip_title} content={child.tooltip_content}/>}
                    </div>
                })}
            </div>
        </div>)}
    </InputWrapper>
}