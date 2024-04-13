import { useState } from "react";
import { createWorker } from "tesseract.js";
import { OCRLanguage, Word } from "@/app/lib/constants/label";
import {
  convertOCRLangToLabelLang,
  levenshteinDistance,
  damerauLevenshteinDistance,
  jaroWinklerDistance,
} from "@/app/lib/utilities";
import { getUnitByName } from "@/app/lib/constants/nutrients-units";
import { getDVByName } from "@/app/lib/constants/daily-value";
import { DefaultProduct, Product, User } from "@/app/lib/models";
import OCRImageUploader from "@/app/ui/ocr-label-maker/ocr-image-uploader";
import OCRImageViewer from "@/app/ui/ocr-label-maker/ocr-image-viewer";
import OCRExtractButton from "@/app/ui/ocr-label-maker/ocr-extract-button";
import { SearchKeyword } from "@/app/lib/ocr";
import OCRNutrientsList from "@/app/ui/ocr-label-maker/ocr-nutrients-list";
import { forEach } from "jszip";

interface Props {
  language: OCRLanguage;
  user: User;
  searchKeywords: SearchKeyword[];
  setSearchKeywords: (sk: SearchKeyword[]) => void;
}

export default function OcrNutrientsForm({
  language,
  user,
  searchKeywords,
  setSearchKeywords,
}: Props) {
  const [fileUploaded, setFileUploaded] = useState<File>();
  const [extracting, setExtracting] = useState(false);
  const [wordBoxes, setWordBoxes] = useState<Word[]>([]);
  const [selectedNutrient, setSelectedNutrient] = useState(-1);

  const imageSize = 500;

  const ocrHandler = async () => {
    if (!fileUploaded) return;

    setExtracting(true);

    const reader = new FileReader();
    reader.readAsDataURL(fileUploaded);

    reader.onload = async () => {
      const response = await fetch("/api/ocr", {
        method: "POST",
        body: JSON.stringify({
          image: (reader.result as string).split(",")[1],
        }),
      });

      let words: Word[] = await response.json();
      if (words != null && words.length > 0) {
        let text = words.map((w) => w.text).join("###");

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
          words = text.split("###").map((w, i) => {
            words[i].text = w;
            return words[i];
          });
        }

        setWordBoxes(words);

        const wordTexts = words.map((w) => w.text);
        for (let i in searchKeywords) {
          if (searchKeywords[i].disabled) continue;

          const formattedSearchWords: string[] =
            typeof searchKeywords[i].searchWords == "string"
              ? [searchKeywords[i].searchWords as string]
              : (searchKeywords[i].searchWords as string[]);

          formattedSearchWords.forEach((word) => {
            const formattedSearchWord = word.toLowerCase();
            const count = formattedSearchWord.split(" ").length;
            const indexes = wordTexts.reduce<number[]>((acc, word, i) => {
              const currentWord = wordTexts
                .slice(i, i + count)
                .join(" ")
                .toLowerCase();
              const maxLength = Math.max(
                currentWord.length,
                formattedSearchWord.length,
              );
              const distance = jaroWinklerDistance(
                currentWord,
                formattedSearchWord,
              );
              if (distance > 0.8) {
                acc.push(i);
              }

              return acc;
            }, []);

            if (indexes.length > 0) {
              searchKeywords[i].searchPositions.forEach((position) => {
                const wordsThatHaveValue =
                  position == "after"
                    ? wordTexts.slice(indexes[0], indexes[0] + count + 1)
                    : wordTexts.slice(indexes[0] - 1, indexes[0] + 1);

                const splitWordsThatHaveValue = wordsThatHaveValue
                  .join(" ")
                  .split(" ");

                for (let w of splitWordsThatHaveValue) {
                  if ("0123456789".includes(w[0])) {
                    const value = w.split(
                      getUnitByName(searchKeywords[i].dbKey),
                    );
                    if (value.length == 2) {
                      searchKeywords[i].value = parseFloat(value[0]);
                      break;
                    } else {
                      searchKeywords[i].value = value[0].endsWith("%")
                        ? (parseFloat(
                            getDVByName(searchKeywords[i].dbKey, "default"),
                          ) *
                            parseFloat(value[0])) /
                          100
                        : parseFloat(value[0]);
                      break;
                    }
                  }
                }
              });
            }
          });
        }
      }

      setExtracting(false);
    };
  };

  const selectBoxHandler = (word: string) => {
    const searchKeyword = searchKeywords[selectedNutrient];

    word.split(" ").forEach((w) => {
      if ("0123456789".includes(w[0])) {
        searchKeyword.value = Number.parseFloat(w);
      }
    });

    setSearchKeywords([
      ...searchKeywords.slice(0, selectedNutrient),
      searchKeyword,
      ...searchKeywords.slice(selectedNutrient + 1),
    ]);
  };

  const updateValue = (index: number, value: number) => {
    searchKeywords[index].value = value;
    setSearchKeywords(searchKeywords);
  };

  return (
    <div className={"flex flex-col gap-2"}>
      <h2 className={"text-2xl font-bold"}>Nutrients</h2>
      <div className={"flex w-full items-start justify-between gap-4"}>
        <div
          className={"flex flex-col gap-2"}
          style={{ width: `${imageSize}px` }}
        >
          <OCRImageUploader
            uploadHandler={(file) => {
              setFileUploaded(file);
              setWordBoxes([]);
            }}
            size={imageSize}
          />
          {fileUploaded && (
            <OCRImageViewer
              file={fileUploaded}
              words={wordBoxes}
              selectBoxHandler={selectBoxHandler}
              size={imageSize}
            />
          )}
        </div>
        <OCRExtractButton
          extracting={extracting}
          fileUploaded={!!fileUploaded}
          clickHandler={ocrHandler}
        />
        <OCRNutrientsList
          searchKeywords={[...searchKeywords]}
          updateValue={updateValue}
          selectedNutrient={selectedNutrient}
          setSelectedNutrient={(key) => setSelectedNutrient(key)}
        />
      </div>
    </div>
  );
}
