"use client";

import { useState } from "react";
import { DefaultProduct, Ingredient, Product, User } from "@/app/lib/models";
import {
  GetOCRLanguage,
  Language,
  OCRLanguage,
} from "@/app/lib/constants/label";
import { useRouter } from "next/navigation";
import OcrIngredientsForm from "@/app/ui/ocr-label-maker/ocr-ingredients-form";
import OcrNutrientsForm from "@/app/ui/ocr-label-maker/ocr-nutrients-form";
import OCRLanguageSelect from "@/app/ui/ocr-label-maker/ocr-language-select";
import OCRSaveButton from "@/app/ui/ocr-label-maker/ocr-save-button";
import { SearchKeyword } from "@/app/lib/ocr";

interface Props {
  user: User;
}

export default function SubmitForm({ user }: Props) {
  const [saving, setSaving] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const router = useRouter();
  const [language, setLanguage] = useState(OCRLanguage.Korean);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [searchKeywords, setSearchKeywords] = useState<SearchKeyword[]>([
    {
      dbKey: "serving_per_package",
      value: 1,
      searchPositions: ["before"],
      searchWords: ["servings per container"],
    },
    {
      dbKey: "calories",
      searchWords: ["calories", "kcal", "cal"],
      searchPositions: ["after", "before"],
      value: 0,
    },
    {
      dbKey: "fat",
      searchWords: ["total fat", "fat"],
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "saturated_fat",
      searchWords: "saturated fat",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "trans_fat",
      searchWords: "trans fat",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "polyunsaturated_fat",
      searchWords: "polyunsaturated fat",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "monounsaturated_fat",
      searchWords: "monounsaturated fat",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "cholesterol",
      searchWords: "cholesterol",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "sodium",
      searchWords: ["sodium", "salt"],
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "carbohydrate",
      searchWords: ["total carbohydrate", "carbohydrate"],
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "dietary_fiber",
      searchWords: ["dietary fiber"],
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "sugar",
      searchWords: ["total sugars", "sugars"],
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "added_sugar",
      searchWords: "added sugars",
      searchPositions: ["before"],
      value: 0,
    },
    {
      dbKey: "sugar_alcohol",
      searchWords: "sugar alcohol",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "protein",
      searchWords: "protein",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "vitamin_d",
      searchWords: "vitamin d",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "calcium",
      searchWords: "calcium",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "iron",
      searchWords: "iron",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "potassium",
      searchWords: "potassium",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "vitamin_a",
      searchWords: "vitamin a",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "vitamin_c",
      searchWords: "vitamin c",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "thiamin",
      searchWords: "thiamin",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "riboflavin",
      searchWords: "riboflavin",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "niacin",
      searchWords: "niacin",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "vitamin_b6",
      searchWords: "vitamin b6",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "folate",
      searchWords: "folate",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "vitamin_b12",
      searchWords: "vitamin b12",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "vitamin_e",
      searchWords: "vitamin e",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "vitamin_k",
      searchWords: "vitamin k",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "phosphorus",
      searchWords: "phosphorus",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "magnesium",
      searchWords: "magnesium",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "zinc",
      searchWords: "zinc",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "selenium",
      searchWords: "selenium",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "manganese",
      searchWords: "manganese",
      searchPositions: ["after"],
      value: 0,
    },
    {
      dbKey: "copper",
      searchWords: "copper",
      searchPositions: ["after"],
      value: 0,
    },
  ]);

  const saveHandler = async () => {
    setSaving(true);
    const product: Product = JSON.parse(JSON.stringify(DefaultProduct));
    product.user_id = user.id;

    const translatedIngredients: Ingredient[] = [];

    if (ingredients.length > 0) {
      const response = await fetch("/api/translate", {
        method: "POST",
        body: JSON.stringify({
          text: ingredients.map((item) => item.name).join("\n"),
          source: Language.Korean,
          target: Language.English,
        }),
      });
      const data: string = await response.json();
      data.split("\n").forEach((item, i) => {
        translatedIngredients.push({
          name: item,
          label_name: item,
          label_name_kr: ingredients[i].name,
          weight: 0,
        });
      });
    }

    product.items = JSON.stringify(translatedIngredients);

    searchKeywords.forEach((searchKeyword) => {
      product[searchKeyword.dbKey] = searchKeyword.value;
    });

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(product),
      });

      const { id } = await response.json();
      if (!id || id == "-1") {
        router.push("/dashboard");
      } else {
        router.push(`/products/${id}/edit`);
      }
    } finally {
      // setSaving(false);
    }
  };

  return (
    <div
      className={
        "relative flex flex-grow flex-col items-start justify-start gap-3 px-24 py-12"
      }
    >
      <OCRLanguageSelect defaultLanguage={language} onChange={setLanguage} />
      <hr className={"w-full border border-main-orange"} />
      <OcrIngredientsForm
        language={language}
        ingredients={[...ingredients]}
        setIngredients={setIngredients}
      />
      <hr className={"w-full border border-main-orange"} />
      <OcrNutrientsForm
        language={language}
        user={user}
        searchKeywords={[...searchKeywords]}
        setSearchKeywords={setSearchKeywords}
      />
      <OCRSaveButton saving={saving} clickHandler={saveHandler} />

      {saving && (
        <div
          role="status"
          className={
            "absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center gap-4 bg-secondary-gray opacity-80"
          }
        >
          <svg
            aria-hidden="true"
            className="h-8 w-8 animate-spin fill-main-orange text-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="text-white">Saving...</span>
        </div>
      )}
    </div>
  );
}
