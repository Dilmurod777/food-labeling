"use client";

import {
  Label,
  LabelOption,
  Product,
  ProductLabelState,
  User,
} from "@/app/lib/models";
import { useRouter } from "next/navigation";
import React, {
  createRef,
  Fragment,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import GeneralPage from "@/app/ui/products/general-page";
import IngredientStatementPage from "@/app/ui/products/ingredient-statement-page";
import LabelPage from "@/app/ui/products/label-page";
import { IoIosArrowBack } from "react-icons/io";
import { CiCircleList } from "react-icons/ci";
import { MdLabel, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { capitalize } from "@/app/lib/utilities";
import { IoMdCloudUpload } from "react-icons/io";
import { IoMdCloudDone } from "react-icons/io";
import { MdCloudSync } from "react-icons/md";
import { IoIosNutrition } from "react-icons/io";
import NutritionStatementPage from "@/app/ui/products/nutrition-statement-page";

interface Props {
  product: Product;
  user: User;
}

enum SavingState {
  Saved,
  Saving,
  NotSaved,
}

interface Step {
  name: string;
  icon: ReactNode;
}

export default function ProductEditPage({ product, user }: Props) {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const steps: Step[] = [
    { name: "General", icon: <FaGear /> },
    { name: "Ingredient Statement", icon: <IoIosNutrition /> },
    { name: "Nutrition Statement", icon: <CiCircleList /> },
    { name: "Label", icon: <MdLabel /> },
  ];
  const [savingState, setSavingState] = useState<SavingState>(
    SavingState.Saved,
  );
  const [_product, setProduct] = useState<Product>({ ...product });
  const selectedIngredientIndex = useRef<number>(0);
  const [label, setLabel] = useState<Label>(JSON.parse(product.label || "{}"));
  const options: LabelOption[] = [
    {
      name: "Nutrients Enabled",
      type: "wrapper",
      visible: false,
      children: [
        {
          key: "vitamin_a_enabled",
          type: "switch",
          value: false,
        },
        {
          key: "vitamin_c_enabled",
          type: "switch",
          value: false,
        },
        {
          key: "magnesium_enabled",
          type: "switch",
          value: false,
        },
        {
          key: "phosphorus_enabled",
          type: "switch",
          value: false,
        },
        {
          key: "zinc_enabled",
          type: "switch",
          value: false,
        },
        {
          key: "copper_enabled",
          type: "switch",
          value: false,
        },
        {
          key: "manganese_enabled",
          type: "switch",
          value: false,
        },
        {
          key: "selenium_enabled",
          type: "switch",
          value: false,
        },
        {
          key: "thiamin_enabled",
          type: "switch",
          value: false,
        },
        {
          key: "riboflavin_enabled",
          type: "switch",
          value: false,
        },
        {
          key: "niacin_enabled",
          type: "switch",
          value: false,
        },
        {
          key: "pantothenic_acid_enabled",
          type: "switch",
          value: false,
        },
        {
          key: "vitamin_b6_enabled",
          type: "switch",
          value: false,
        },
        {
          key: "folate_enabled",
          type: "switch",
          value: false,
        },
        {
          key: "vitamin_b12_enabled",
          type: "switch",
          value: false,
        },
        {
          key: "vitamin_e_enabled",
          type: "switch",
          value: false,
        },
        {
          key: "vitamin_k_enabled",
          type: "switch",
          value: false,
        },
        {
          key: "monounsaturated_fat_enabled",
          type: "switch",
          value: false,
        },
        {
          key: "polyunsaturated_fat_enabled",
          type: "switch",
          value: false,
        },
        {
          key: "sugar_alcohol_enabled",
          type: "switch",
          value: false,
        },
      ],
    },
    {
      name: "Product Info sections",
      type: "wrapper",
      visible: true,
      children: [
        {
          key: "show_brand",
          type: "checkbox",
          value: false,
        },
        {
          key: "show_product_name",
          type: "checkbox",
          value: false,
        },
        {
          key: "show_net_weight",
          type: "checkbox",
          value: false,
        },
        {
          key: "show_best_before",
          type: "checkbox",
          value: false,
        },
        {
          key: "show_ingredient_list",
          type: "checkbox",
          value: false,
        },
        {
          key: "show_allergens",
          type: "checkbox",
          value: false,
        },
        {
          key: "show_cross_contamination",
          type: "checkbox",
          value: false,
        },
        {
          key: "show_company",
          type: "checkbox",
          value: false,
        },
        {
          key: "show_country",
          type: "checkbox",
          value: false,
        },
        {
          key: "show_address",
          type: "checkbox",
          value: false,
        },
        {
          key: "show_prepare_instructions",
          type: "checkbox",
          value: false,
        },
        {
          key: "show_storage_instructions",
          type: "checkbox",
          value: false,
        },
      ],
    },
    {
      name: "Label style",
      type: "wrapper",
      visible: true,
      children: [
        {
          key: "show_in_ounce",
          type: "checkbox",
          value: false,
        },
        {
          key: "varied_servings",
          type: "checkbox",
          value: false,
        },
        {
          key: "justify_center",
          type: "checkbox",
          value: false,
        },
        {
          key: "make_lowercase",
          type: "checkbox",
          value: false,
        },
        {
          key: "make_titlecase",
          type: "checkbox",
          value: false,
        },
        {
          key: "show_ingredients_in_english",
          type: "checkbox",
          value: true,
        },
      ],
    },
  ];
  const [labelState, setLabelState] = useState<ProductLabelState>({});

  useEffect(() => {
    let initialState: ProductLabelState = {};
    const labelOptions = Object.keys(label.options || {});
    for (let section of options) {
      for (let subsection of section.children) {
        initialState[subsection.key] = labelOptions.includes(subsection.key)
          ? label.options[subsection.key]
          : subsection.value;
      }
    }

    setLabelState(initialState);
  }, []);

  const updateLabelState = (
    sectionIndex: number,
    subsectionIndex: number,
    value: boolean,
  ) => {
    const newLabelState: ProductLabelState = {
      ...labelState,
      [options[sectionIndex].children[subsectionIndex].key]: value,
    };
    const newLabel: Label = {
      ...label,
      options: newLabelState,
    };
    updateProduct({ label: JSON.stringify(newLabel) });
    setLabelState(newLabelState);
  };

  const updateProduct = (data: Partial<Product>) => {
    const newProduct = {
      ..._product,
      ...data,
      updated_at: Date.now().toString(),
    };
    setProduct(newProduct);
    setLabel(JSON.parse(newProduct.label));
    setSavingState(SavingState.NotSaved);
  };
  const saveRecipeToDB = async () => {
    if (savingState == SavingState.Saving) return;
    if (savingState == SavingState.Saved) return;

    setSavingState(SavingState.Saving);

    await fetch("/api/products", {
      method: "PUT",
      body: JSON.stringify(_product),
    });

    router.refresh();

    setSavingState(SavingState.Saved);
  };

  return (
    <div className={"mx-auto mt-6 flex h-full w-full flex-col px-8"}>
      <div className={"flex items-center justify-between"}>
        <div className={"flex items-center"}>
          <div
            className={
              "flex cursor-pointer items-center gap-2 rounded-md border-[1px] border-main-gray bg-white px-3 py-2 text-sm font-bold hover:bg-main-orange hover:text-white"
            }
            onClick={() => router.push("/dashboard")}
          >
            <IoIosArrowBack className={"text-lg"} />
            <span>Back to Dashboard</span>
          </div>

          <div
            className={
              "ml-4 flex items-center gap-4 border-l-2 border-main-orange pl-4"
            }
          >
            {steps.map((step, i) => (
              <Fragment key={`step-${i}`}>
                <div
                  className={`flex cursor-pointer items-center justify-center gap-1 rounded-md border-2 border-main-gray px-4 py-2 font-bold hover:border-main-orange hover:bg-main-orange hover:text-white ${i == stepIndex ? "border-main-orange bg-main-orange text-white" : ""}`}
                  onClick={() => setStepIndex(i)}
                >
                  <span className={"text-lg"}>{step.icon}</span>
                  <span className={"text-sm"}>
                    {capitalize(step.name, " ")}
                  </span>
                </div>

                {i != steps.length - 1 && (
                  <div
                    className={
                      "flex h-[5px] w-[20px] items-center justify-center rounded-full border-2 border-main-gray bg-main-gray text-main-gray"
                    }
                  />
                )}
              </Fragment>
            ))}
          </div>
        </div>

        <div
          className={
            `flex cursor-pointer items-center rounded-full border-2 px-2 py-2 text-lg hover:border-main-orange hover:text-main-orange ` +
            `${savingState == SavingState.NotSaved ? "border-main-orange text-main-orange " : ""}` +
            `${savingState == SavingState.Saving ? "animate-pulse border-main-orange text-main-orange " : ""}` +
            `${savingState == SavingState.Saved ? "border-main-gray text-main-gray" : ""}`
          }
          onClick={saveRecipeToDB}
        >
          {savingState == SavingState.NotSaved && <IoMdCloudUpload />}
          {savingState == SavingState.Saved && <IoMdCloudDone />}
          {savingState == SavingState.Saving && <MdCloudSync />}
        </div>
      </div>

      <div className={"h-full w-full py-8"}>
        {stepIndex == 0 && (
          <GeneralPage
            product={_product}
            user={user}
            updateProduct={updateProduct}
            selectIngredient={(index) => {
              selectedIngredientIndex.current = index;
              setStepIndex(1);
            }}
          />
        )}
        {stepIndex == 1 && (
          <IngredientStatementPage
            product={_product}
            updateProduct={updateProduct}
            initialActiveIndex={selectedIngredientIndex.current}
          />
        )}
        {stepIndex == 2 && (
          <NutritionStatementPage
            product={_product}
            updateProduct={updateProduct}
            labelState={labelState}
            updateLabelState={updateLabelState}
          />
        )}
        {stepIndex == 3 && (
          <LabelPage
            product={_product}
            label={label}
            updateProduct={updateProduct}
            options={options}
            labelState={labelState}
            updateLabelState={updateLabelState}
          />
        )}
      </div>
    </div>
  );
}
