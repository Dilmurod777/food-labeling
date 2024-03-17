"use client";

import { useState } from "react";
import { User } from "@/app/lib/models";
import FormSubmitBtn from "@/app/ui/form-submit-btn";
import Image from "next/image";
import { createWorker } from "tesseract.js";
import { calculateHammingDistance } from "@/app/lib/utilities";
import levenshtein from "js-levenshtein";
import { getUnitByName } from "@/app/lib/constants/nutrients-units";
import { getDVByName } from "@/app/lib/constants/daily-value";

interface Props {
  user: User;
}

enum TaskType {
  Ingredients,
  Nutrients,
}

export default function SubmitForm({ user }: Props) {
  const [error, setError] = useState("");
  const [ingredientsFile, setIngredientsFile] = useState<File>();
  const [nutrientsFile, setNutrientsFile] = useState<File>();
  const [ingredients, setIngredients] = useState<string[]>([]);

  const fileUploadHandler = (files: FileList | null, taskType: TaskType) => {
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

    const worker = await createWorker("eng");
    const result = await worker.recognize(URL.createObjectURL(ingredientsFile));

    const lines = result.data.lines;

    await worker.terminate();
  };

  const nutrientsOCRHandler = async () => {
    if (!nutrientsFile) return;

    const worker = await createWorker("eng");
    const result = await worker.recognize(URL.createObjectURL(nutrientsFile));

    const lines = result.data.lines;
    const searchWords: { [key: string]: number } = {
      calories: 0,
      total_fat: 0,
      saturated_fat: 0,
      cholesterol: 0,
      sodium: 0,
      total_carbohydrates: 0,
      dietary_fiber: 0,
      total_sugars: 0,
      protein: 0,
      vitamin_a: 0,
      vitamin_c: 0,
      calcium: 0,
      iron: 0,
    };

    lines.forEach((line) => {
      for (let searchWord of Object.keys(searchWords)) {
        const formattedSearchWord = searchWord
          .toLowerCase()
          .replaceAll("_", " ");
        const count = formattedSearchWord.split(" ").length;
        const indexes = line.words.reduce<number[]>((acc, word, i) => {
          const currentWord = line.words
            .slice(i, i + count)
            .map((w) => w.text)
            .join(" ");
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

        if (indexes.length > 0 && line.words.length > indexes[0] + count) {
          const value = line.words[indexes[0] + count].text.replaceAll(
            getUnitByName(searchWord),
            "",
          );
          console.log(searchWord, value);
          if ("0123456789".includes(value[0])) {
            searchWords[searchWord] = value.endsWith("%")
              ? (parseFloat(getDVByName(searchWord, "default")) *
                  parseFloat(value)) /
                100
              : parseFloat(value);
          }
        }
      }
    });

    await worker.terminate();
  };

  return (
    <div className={"flex w-full flex-col gap-4 px-12 py-12"}>
      <div className={"flex w-full items-start gap-12"}>
        <div className={"flex w-96 flex-col items-center justify-center gap-3"}>
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

          {ingredientsFile && (
            <div className={"flex w-full flex-col items-center gap-6"}>
              <div
                className={
                  "bg-red relative h-96 w-full border-2 border-main-gray"
                }
              >
                <Image
                  src={URL.createObjectURL(ingredientsFile)}
                  alt={"upload-image-preview"}
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>

              <div
                onClick={() => ingredientsOCRHandler()}
                className={
                  "cursor-pointer rounded-md bg-main-orange px-12 py-3 text-base font-bold text-white hover:bg-hover-main-orange"
                }
              >
                Extract
              </div>
            </div>
          )}
        </div>

        <div className={"flex flex-col gap-2"}>
          <h2 className={"text-lg font-bold text-black"}>Ingredients</h2>

          <div></div>
        </div>
      </div>
    </div>
  );
}
