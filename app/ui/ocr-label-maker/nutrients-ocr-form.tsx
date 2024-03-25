import { useState } from "react";
import { createWorker } from "tesseract.js";
import { OCRLanguage } from "@/app/lib/constants/label";
import { convertOCRLangToLabelLang } from "@/app/lib/utilities";
import levenshtein from "js-levenshtein";
import { getUnitByName } from "@/app/lib/constants/nutrients-units";
import { getDVByName } from "@/app/lib/constants/daily-value";
import { DefaultProduct, Product, User } from "@/app/lib/models";

interface Props {
  language: OCRLanguage;
  user: User;
}

interface SearchKeyword {
  dbKey: string;
  searchWords: string | string[];
  searchPosition: "before" | "after";
  value: number;
  disabled?: boolean;
}

export default function NutrientsOCRForm({ language, user }: Props) {
  const [file, setFile] = useState<File>();
  const [extracting, setExtracting] = useState(false);
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

  const nutrientsOCRHandler = async () => {
    if (!file) return;

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
    } finally {
      setExtracting(false);
    }
  };

  return <div></div>;
}
