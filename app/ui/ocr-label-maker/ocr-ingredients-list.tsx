import { Ingredient } from "@/app/lib/models";
import { RefObject, useRef } from "react";
import { MdDelete } from "react-icons/md";

interface Props {
  ingredients: Ingredient[];
  addIngredient: (text: string) => void;
  removeIngredient: (index: number) => void;
  inputRef: RefObject<HTMLInputElement>;
}

export default function OCRIngredientsList({
  ingredients,
  addIngredient,
  removeIngredient,
  inputRef,
}: Props) {
  const nameMaxLength = 50;

  return (
    <div className={"flex w-full flex-grow flex-col gap-2"}>
      <div className={"flex w-full flex-grow gap-4"}>
        <input
          ref={inputRef}
          className={
            "w-full rounded-md border border-main-gray px-4 py-2 outline-none focus-visible:border-main-orange"
          }
        />

        <div
          className={
            "flex cursor-pointer items-center justify-center rounded-md bg-main-orange px-4 py-2 font-bold text-white hover:bg-hover-main-orange"
          }
          onClick={() => {
            if (!inputRef.current) return;

            addIngredient(inputRef.current?.value ?? "");
            inputRef.current.value = "";
          }}
        >
          Add
        </div>
      </div>

      <div className={"flex flex-grow flex-col gap-2"}>
        {ingredients.map((item, i) => (
          <div
            key={`ingredient-${i}`}
            className={
              "relative flex gap-2 border border-main-gray bg-white px-2 py-1 pr-12 text-sm"
            }
          >
            <span>{item.name.slice(0, nameMaxLength)}</span>
            <div
              className={
                "absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-2xl text-red-500 hover:text-red-600"
              }
              onClick={() => removeIngredient(i)}
            >
              <MdDelete />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
