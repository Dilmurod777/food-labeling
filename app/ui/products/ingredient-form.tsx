import FormInputWrapper from "@/app/ui/products/form-input-wrapper";
import { Ingredient } from "@/app/lib/models";
import { createRef, RefObject, useEffect, useRef, useState } from "react";
import { getFormattedFormInputTitle } from "@/app/lib/utilities";

interface Props {
  ingredient: Ingredient;
  updateItem: (data: Partial<Ingredient>) => void;
}

interface Input {
  type: "text" | "number";
  ref: RefObject<HTMLInputElement>;
  key: keyof Ingredient;
  label_text?: string;
}

export default function IngredientForm({ ingredient, updateItem }: Props) {
  const inputsData: { [key: keyof Ingredient]: Input } = {
    name: {
      type: "text",
      ref: createRef<HTMLInputElement>(),
      key: "name",
    },
    label_name: {
      type: "text",
      ref: createRef<HTMLInputElement>(),
      key: "label_name",
      label_text: "Shown on Label as",
    },
    weight: {
      type: "number",
      ref: createRef<HTMLInputElement>(),
      key: "weight",
      label_text: "Weight",
    },
  };

  useEffect(() => {
    for (let key of Object.keys(inputsData)) {
      const ref = inputsData[key].ref.current;
      if (ref) {
        ref.value = ingredient[key].toString();
      }
    }
  }, [ingredient]);

  const inputs = Object.keys(inputsData).map((key) => inputsData[key]);

  return (
    <div className={"flex w-full flex-auto flex-wrap"}>
      {inputs.map((input, i) => (
        <div key={`input-${i}`} className={`w-full pb-4 pr-6`}>
          <FormInputWrapper
            title={getFormattedFormInputTitle(
              input.label_text || input.key.toString(),
              !input.label_text,
            )}
            htmlFor={input.key.toString()}
          >
            <input
              ref={input.ref}
              type={input.type}
              id={input.key.toString()}
              className={
                "w-full rounded-md border-2 border-main-gray px-2 py-2 text-sm outline-none focus-within:border-main-orange"
              }
              defaultValue={ingredient[input.key].toString()}
              onFocus={(e) => e.target.select()}
              onBlur={(e) =>
                updateItem({
                  [input.key]: e.target.value.trim() || ingredient[input.key],
                })
              }
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  updateItem({
                    [input.key]:
                      e.currentTarget.value.trim() || ingredient[input.key],
                  });
                }
              }}
            />
          </FormInputWrapper>
        </div>
      ))}
    </div>
  );
}
