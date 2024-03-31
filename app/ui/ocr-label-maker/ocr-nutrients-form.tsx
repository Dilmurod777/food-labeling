import { useState } from "react";
import { createWorker, Word } from "tesseract.js";
import { OCRLanguage } from "@/app/lib/constants/label";
import { convertOCRLangToLabelLang } from "@/app/lib/utilities";
import levenshtein from "js-levenshtein";
import { getUnitByName } from "@/app/lib/constants/nutrients-units";
import { getDVByName } from "@/app/lib/constants/daily-value";
import { DefaultProduct, Product, User } from "@/app/lib/models";
import { searchWords } from "@/app/lib/ocr";
import OCRImageUploader from "@/app/ui/ocr-label-maker/ocr-image-uploader";
import OCRImageViewer from "@/app/ui/ocr-label-maker/ocr-image-viewer";
import OCRExtractButton from "@/app/ui/ocr-label-maker/ocr-extract-button";

interface Props {
  language: OCRLanguage;
  user: User;
}

export default function OcrNutrientsForm({ language, user }: Props) {
  const [fileUploaded, setFileUploaded] = useState<File>();
  const [extracting, setExtracting] = useState(false);
  const [words, setWords] = useState<Word[]>([]);

  const imageSize = 500;

  const ocrHandler = async () => {
    if (!fileUploaded) return;

    setExtracting(true);

    try {
      const worker = await createWorker(language);
      const result = await worker.recognize(URL.createObjectURL(fileUploaded));

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

  const selectBoxHandler = (word: string) => {
    console.log(word);
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
              setWords([]);
            }}
            size={imageSize}
          />
          {fileUploaded && (
            <OCRImageViewer
              file={fileUploaded}
              words={words}
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
      </div>
    </div>
  );
}
