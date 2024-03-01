import { Product, ProductLabelState } from "@/app/lib/models";
import Title from "@/app/ui/products/title";
import Tags from "@/app/ui/products/tags";
import FormInputWrapper from "@/app/ui/products/form-input-wrapper";
import { createRef, RefObject } from "react";
import { getFormattedFormInputTitle } from "@/app/lib/utilities";
import { getUnitByName } from "@/app/lib/constants/nutrients-units";

interface Props {
  product: Product;
  updateProduct: (data: Partial<Product>) => void;
  labelState: ProductLabelState;
  updateLabelState: (
    sectionIndex: number,
    subsectionIndex: number,
    value: boolean,
  ) => void;
}

interface Input {
  type: "text" | "number";
  ref: RefObject<HTMLInputElement>;
  key: keyof Product;
  label_text?: string;
  required: boolean;
  unit: string;
}

export default function NutritionStatementPage({
  product,
  updateProduct,
  labelState,
  updateLabelState,
}: Props) {
  const requiredInputKeys = [
    "calories",
    "fat",
    "saturated_fat",
    "trans_fat",
    "cholesterol",
    "sodium",
    "carbohydrate",
    "dietary_fiber",
    "sugar",
    "added_sugar",
    "protein",
    "vitamin_d",
    "calcium",
    "iron",
    "potassium",
  ];
  const nonRequiredInputKeys = [
    "vitamin_a",
    "vitamin_c",
    "magnesium",
    "phosphorus",
    "zinc",
    "copper",
    "manganese",
    "selenium",
    "thiamin",
    "riboflavin",
    "niacin",
    "pantothenic_acid",
    "vitamin_b6",
    "folate",
    "vitamin_b12",
    "vitamin_e",
    "vitamin_k",
    "monounsaturated_fat",
    "polyunsaturated_fat",
    "sugar_alcohol",
  ];

  const renamedInputKeys: { [key: string]: string } = {
    niacin: "vitamin b3",
    pantothenic_acid: "vitamin b5",
  };

  const requiredInputs: { [key: string]: Input } = requiredInputKeys.reduce(
    (obj, v) => ({
      ...obj,
      [v]: {
        type: "number",
        ref: createRef<HTMLInputElement>(),
        key: v,
        required: true,
        unit: getUnitByName(v),
      },
    }),
    {},
  );

  const nonRequiredInputs: { [key: string]: Input } =
    nonRequiredInputKeys.reduce(
      (obj, v) => ({
        ...obj,
        [v]: {
          type: "number",
          ref: createRef<HTMLInputElement>(),
          key: v,
          required: false,
          unit: getUnitByName(v),
        },
      }),
      {},
    );

  const updateInputHandler = (
    key: string,
    value: string,
    isRequired: boolean,
  ) => {
    let numericValue = parseFloat(value.trim() || "-1");

    if (numericValue < 0) {
      let ref = isRequired
        ? requiredInputs[key].ref.current
        : nonRequiredInputs[key].ref.current;
      if (ref) {
        ref.value = "0";
      }
      numericValue = 0;
    }

    updateProduct({
      ...product,
      [key]: numericValue,
    });
  };
  // ${!isRequired && "[&>*:nth-last-child(-n+3)]:col-span-2"}
  const renderInputsList = (inputs: Input[], isRequired: boolean) => {
    return (
      <div
        className={`grid w-full ${isRequired ? "grid-cols-5" : "grid-cols-6"} auto-cols-auto gap-4`}
      >
        {inputs.map((input, i) => {
          const key = Object.keys(renamedInputKeys).includes(
            input.key.toString(),
          )
            ? renamedInputKeys[input.key.toString()]
            : input.key.toString();
          const title = input.label_text || key;

          return (
            <div key={`input-${i}`}>
              <FormInputWrapper
                title={
                  getFormattedFormInputTitle(title, !input.label_text) +
                  `${input.unit && ` (${input.unit})`}`
                }
                htmlFor={input.key.toString()}
                toggleEnabled={!isRequired}
                toggleValue={!!labelState[`${input.key}_enabled`]}
                toggleHandler={(value) => {
                  updateLabelState(0, i, value);
                }}
              >
                <input
                  ref={input.ref}
                  type={input.type}
                  step={0.1}
                  min={0}
                  id={input.key.toString()}
                  className={
                    "w-full rounded-md border-2 border-main-gray px-2 py-2 text-sm outline-none focus-within:border-main-orange"
                  }
                  defaultValue={product[input.key].toString()}
                  onFocus={(e) => e.target.select()}
                  onBlur={(e) =>
                    updateInputHandler(
                      input.key.toString(),
                      e.target.value,
                      isRequired,
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      updateInputHandler(
                        input.key.toString(),
                        e.currentTarget.value,
                        isRequired,
                      );
                    }
                  }}
                />
              </FormInputWrapper>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={"flex w-full flex-grow flex-col gap-4"}>
      <div className={"flex w-full flex-col items-start"}>
        <Title
          recipe={product}
          updateProduct={updateProduct}
          editable={false}
        />

        <Tags recipe={product} updateProduct={updateProduct} editable={false} />
      </div>

      <hr className={"border-main-orange"} />

      {renderInputsList(Object.values(requiredInputs), true)}

      <hr className={"border-main-orange"} />

      {renderInputsList(Object.values(nonRequiredInputs), false)}
    </div>
  );
}
