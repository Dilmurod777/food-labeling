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
  const inputsData: Input[][] = [
    [
      {
        type: "text",
        ref: createRef<HTMLInputElement>(),
        key: "name",
      },
    ],
    [
      {
        type: "text",
        ref: createRef<HTMLInputElement>(),
        key: "label_name",
        label_text: "Shown on Label as",
      },
      {
        type: "text",
        ref: createRef<HTMLInputElement>(),
        key: "label_name_kr",
        label_text: "Shown on Label (Korean) as",
      },
    ],
    [
      {
        type: "number",
        ref: createRef<HTMLInputElement>(),
        key: "weight",
        label_text: "Weight",
      },
    ],
  ];

  useEffect(() => {
    for (let inputArray of inputsData) {
      for (let input of inputArray) {
        const ref = input.ref.current;
        if (ref) {
          ref.value = ingredient[input.key]?.toString() || "";
        }
      }
    }
  }, [ingredient]);

  return (
    <div className={"flex w-full flex-col"}>
      {inputsData.map((inputArray, i) => (
        <div key={`input-wrapper-${i}`} className={"flex w-full"}>
          {inputArray.map((input, j) => (
            <div key={`input-${i}-${j}`} className={`flex-grow pb-4 pr-6`}>
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
                    "w-full rounded-md border-2 border-main-gray px-2 py-2 text-sm outline-none focus-within:border-main"
                  }
                  defaultValue={ingredient[input.key]?.toString() || ""}
                  onFocus={(e) => e.target.select()}
                  onBlur={(e) =>
                    updateItem({
                      [input.key]:
                        e.target.value.trim() || ingredient[input.key],
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
      ))}
    </div>
  );
}
