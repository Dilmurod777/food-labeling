"use client";

import { useState } from "react";
import { DefaultProduct, Product, User } from "@/app/lib/models";
import Image from "next/image";
import { createWorker, Lang } from "tesseract.js";
import levenshtein from "js-levenshtein";
import { getUnitByName } from "@/app/lib/constants/nutrients-units";
import { getDVByName } from "@/app/lib/constants/daily-value";
import { GetOCRLanguage, OCRLanguage } from "@/app/lib/constants/label";
import * as actionsProducts from "@/app/lib/actions-products";
import { useRouter } from "next/navigation";
import { convertOCRLangToLabelLang } from "@/app/lib/utilities";

interface Props {
  user: User;
}

interface SearchKeyword {
  dbKey: string;
  searchWords: string | string[];
  searchPosition: "before" | "after";
  value: number;
  disabled?: boolean;
}

export default function SubmitForm({ user }: Props) {
  const [error, setError] = useState("");
  const [file, setFile] = useState<File>();
  const [language, setLanguage] = useState(OCRLanguage.English);
  const [extracting, setExtracting] = useState(false);
  const router = useRouter();
  const searchWords: SearchKeyword[] = [
    {
      dbKey: "serving_per_package",
      value: 1,
      searchPosition: "before",
      searchWords: ["servings per container"],
    },
    {
      dbKey: "calories",
      searchWords: "calories",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "fat",
      searchWords: "total fat",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "saturated_fat",
      searchWords: "saturated fat",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "trans_fat",
      searchWords: "trans fat",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "polyunsaturated_fat",
      searchWords: "polyunsaturated fat",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "monounsaturated_fat",
      searchWords: "monounsaturated fat",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "cholesterol",
      searchWords: "cholesterol",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "sodium",
      searchWords: "sodium",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "carbohydrate",
      searchWords: "total carbohydrate",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "dietary_fiber",
      searchWords: "dietary fiber",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "sugar",
      searchWords: ["total sugars", "sugars"],
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "added_sugar",
      searchWords: "added sugars",
      searchPosition: "before",
      value: 0,
    },
    {
      dbKey: "sugar_alcohol",
      searchWords: "sugar alcohol",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "protein",
      searchWords: "protein",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "vitamin_d",
      searchWords: "vitamin d",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "calcium",
      searchWords: "calcium",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "iron",
      searchWords: "iron",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "potassium",
      searchWords: "potassium",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "vitamin_a",
      searchWords: "vitamin a",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "vitamin_c",
      searchWords: "vitamin c",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "thiamin",
      searchWords: "thiamin",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "riboflavin",
      searchWords: "riboflavin",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "niacin",
      searchWords: "niacin",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "vitamin_b6",
      searchWords: "vitamin b6",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "folate",
      searchWords: "folate",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "vitamin_b12",
      searchWords: "vitamin b12",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "vitamin_e",
      searchWords: "vitamin e",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "vitamin_k",
      searchWords: "vitamin k",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "phosphorus",
      searchWords: "phosphorus",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "magnesium",
      searchWords: "magnesium",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "zinc",
      searchWords: "zinc",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "selenium",
      searchWords: "selenium",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "manganese",
      searchWords: "manganese",
      searchPosition: "after",
      value: 0,
    },
    {
      dbKey: "copper",
      searchWords: "copper",
      searchPosition: "after",
      value: 0,
    },
  ];

  const fileUploadHandler = (files: FileList | null) => {
    if (!files || files.length == 0) {
      setError("No file selected. Try again.");
      return;
    }

    switch (taskType) {
      case TaskType.Ingredients:
        setIngredientsFile(files[0]);
        break;
      case TaskType.Nutrients:
        setNutrientsFile(files[0]);
        break;
    }
  };

  const ingredientsOCRHandler = async () => {
    if (!ingredientsFile) return;

    setExtracting(true);

    try {
      const worker = await createWorker(language);
      const result = await worker.recognize(URL.createObjectURL(file));

      let text = result.data.lines
        .map((line) => line.words.map((w) => w.text).join(" "))
        .join("\n");

      if (language != OCRLanguage.English) {
        const translation = await fetch("/api/translate", {
          method: "POST",
          body: JSON.stringify({
            text: text,
            target: "en",
            source: convertOCRLangToLabelLang(language).toString(),
          }),
        });

        text = await translation.json();
      }

      const lines = text.split("\n");

      lines.forEach((line) => {
        const words = line.split(" ");
        for (let i in searchWords) {
          if (searchWords[i].disabled) continue;

          const formattedSearchWords: string[] =
            typeof searchWords[i].searchWords == "string"
              ? [searchWords[i].searchWords as string]
              : (searchWords[i].searchWords as string[]);

          formattedSearchWords.forEach((word) => {
            const formattedSearchWord = word.toLowerCase();
            const count = formattedSearchWord.split(" ").length;
            const indexes = words.reduce<number[]>((acc, word, i) => {
              const currentWord = words.slice(i, i + count).join(" ");
              const maxLength = Math.max(
                currentWord.length,
                formattedSearchWord.length,
              );
              const distance = levenshtein(
                currentWord.padEnd(maxLength, "-"),
                formattedSearchWord.padEnd(maxLength, "-"),
              );
              if (distance < formattedSearchWord.length * 0.3) {
                acc.push(i);
              }

              return acc;
            }, []);

            if (indexes.length > 0) {
              const valueIndex =
                searchWords[i].searchPosition == "after"
                  ? indexes[0] + count
                  : indexes[0] - 1;

              if (valueIndex >= 0 && valueIndex < words.length) {
                const value = words[valueIndex].replaceAll(
                  getUnitByName(searchWords[i].dbKey),
                  "",
                );

                if ("0123456789".includes(value[0])) {
                  searchWords[i].value = value.endsWith("%")
                    ? (parseFloat(
                        getDVByName(searchWords[i].dbKey, "default"),
                      ) *
                        parseFloat(value)) /
                      100
                    : parseFloat(value);
                }
              }
            }
          });
        }
      });

      const data = searchWords.reduce<Product>(
        (obj, item) => {
          obj[item.dbKey] = item.value;
          return obj;
        },
        JSON.parse(JSON.stringify(DefaultProduct)),
      );
      data.user_id = user.id;
      data.updated_at = Date.now().toString();

      await worker.terminate();
      const id = await actionsProducts.create(data);

      if (id == "-1") {
        router.push("/dashboard");
      } else {
        router.push(`/products/${id}/edit`);
      }
    } finally {
      setExtracting(false);
    }
  };

  return (
    <div
      className={
        "relative flex flex-grow flex-col items-center justify-center gap-3 px-24 py-12"
      }
    >
      <div className="flex w-full flex-grow items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex h-16 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:bg-main-gray"
        >
          <div className="flex items-center justify-center gap-4 pb-6 pt-5">
            <svg
              className="h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <div className={"flex flex-col items-center gap-0"}>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Only PNG, JPG.
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(e) =>
                fileUploadHandler(e.target.files, TaskType.Ingredients)
              }
            />
          </label>

          <div className={"flex items-center justify-center text-center"}>
            <p className={"text-sm font-bold text-red-500"}>{error}</p>
          </div>

          <div className={"flex w-full items-center justify-center gap-4"}>
            <select
              className={
                "w-fit border-[1px] border-main-gray px-3 py-2 outline-none"
              }
              onChange={(e) => setLanguage(GetOCRLanguage(e.target.value))}
              defaultValue={language}
            >
              <option value={OCRLanguage.English}>English</option>
              <option value={OCRLanguage.Korean}>Korean</option>
              <option value={OCRLanguage.Spanish}>Spanish</option>
              <option value={OCRLanguage.French}>French</option>
              <option value={OCRLanguage.Russian}>Russian</option>
            </select>

            <div
              onClick={() => ocrHandler()}
              className={
                "cursor-pointer rounded-md bg-main-orange px-12 py-3 text-base font-bold text-white hover:bg-hover-main-orange"
              }
            >
              Extract
            </div>
          </div>
        </div>
      )}

      {extracting && (
        <div
          className={
            "absolute bottom-0 left-0 right-0 top-0 z-[5] flex items-center justify-center bg-gray-400/50"
          }
        >
          <div role="status">
            <svg
              aria-hidden="true"
              className="h-12 w-12 animate-spin fill-main-orange text-white"
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
          </div>
        </div>

        <div className={"flex flex-col gap-2"}>
          <h2 className={"text-lg font-bold text-black"}>Ingredients</h2>

          <div></div>
        </div>
      </div>
    </div>
  );
}
