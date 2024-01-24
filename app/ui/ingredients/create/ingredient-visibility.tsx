import Tooltip from "@/app/ui/tooltip";
import {Input} from "@/app/lib/interfaces";
import InputWrapper from "@/app/ui/ingredients/input-wrapper";

const inputs: Input[] = [
    {
        type: "radio",
        key: "ingredient-visibility",
        value: "0",
        checked: true,
        text: "Private Ingredient",
        tooltip_enabled: true,
        tooltip_title: "What's a Private Ingredient?",
        tooltip_content: "Private ingredients can only be found and added to recipes by you. Most ingredients can be public, but if an ingredient is proprietary or its name wouldn't mean anything to another user (e.g. 'Momma's chips'), then it should be probably be private."
    },
    {
        type: 'radio',
        key: "ingredient-visibility",
        value: "1",
        text: "Public Ingredient",
        tooltip_enabled: true,
        tooltip_title: "What's a Public Ingredient?",
        tooltip_content: "Public ingredients can be found and added to recipes by other users, however you're the only one who can edit the ingredient details below. Most ingredients can be public. If an ingredient name wouldn't mean anything to another user (e.g. 'Momma's chips'), then it should be probably be private, or if it's a duplicate of another ingredient already in the database.",
    }
]

export default function IngredientVisibility() {
    return <InputWrapper title={"Sharing Settings"} htmlFor={"ingredient-visibility"} required>
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
                    defaultChecked={input.checked}
                />
                <label htmlFor={`${input.key}-${input.value}`} className={"text-xs text-black font-normal"}>{input.text}</label>
                {input.tooltip_enabled && <Tooltip title={input.tooltip_title} content={input.tooltip_content}/>}
            </div>
        </div>)}
    </InputWrapper>
}