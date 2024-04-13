import { useState } from "react";
import { createWorker } from "tesseract.js";
import { OCRLanguage, Word } from "@/app/lib/constants/label";
import { convertOCRLangToLabelLang } from "@/app/lib/utilities";
import levenshtein from "js-levenshtein";
import { getUnitByName } from "@/app/lib/constants/nutrients-units";
import { getDVByName } from "@/app/lib/constants/daily-value";
import { DefaultProduct, Product, User } from "@/app/lib/models";
import OCRImageUploader from "@/app/ui/ocr-label-maker/ocr-image-uploader";
import OCRImageViewer from "@/app/ui/ocr-label-maker/ocr-image-viewer";
import OCRExtractButton from "@/app/ui/ocr-label-maker/ocr-extract-button";
import { SearchKeyword } from "@/app/lib/ocr";
import OCRNutrientsList from "@/app/ui/ocr-label-maker/ocr-nutrients-list";

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
              const currentWord = wordTexts.slice(i, i + count).join(" ");
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
              searchKeywords[i].searchPositions.forEach((position) => {
                const valueIndex =
                  position == "after" ? indexes[0] + count : indexes[0] - 1;

                if (valueIndex >= 0 && valueIndex < wordTexts.length) {
                  const value = wordTexts[valueIndex].replaceAll(
                    getUnitByName(searchKeywords[i].dbKey),
                    "",
                  );

                  if ("0123456789".includes(value[0])) {
                    searchKeywords[i].value = value.endsWith("%")
                      ? (parseFloat(
                          getDVByName(searchKeywords[i].dbKey, "default"),
                        ) *
                          parseFloat(value)) /
                        100
                      : parseFloat(value);

                    setSearchKeywords(searchKeywords);
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
    searchKeyword.value = Number.parseFloat(word);

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
