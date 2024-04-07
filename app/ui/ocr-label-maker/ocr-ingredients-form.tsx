import { useRef, useState } from "react";
import { createWorker, Word } from "tesseract.js";
import { OCRLanguage } from "@/app/lib/constants/label";
import OCRImageUploader from "@/app/ui/ocr-label-maker/ocr-image-uploader";
import OCRExtractButton from "@/app/ui/ocr-label-maker/ocr-extract-button";
import OCRImageViewer from "@/app/ui/ocr-label-maker/ocr-image-viewer";
import OCRIngredientsList from "@/app/ui/ocr-label-maker/ocr-ingredients-list";
import { Ingredient } from "@/app/lib/models";

interface Props {
  language: OCRLanguage;
  ingredients: Ingredient[];
  setIngredients: (i: Ingredient[]) => void;
}

export default function OcrIngredientsForm({
  language,
  ingredients,
  setIngredients,
}: Props) {
  const [fileUploaded, setFileUploaded] = useState<File>();
  const [extracting, setExtracting] = useState(false);
  const [words, setWords] = useState<Word[]>([]);

  const imageSize = 500;
  const inputRef = useRef<HTMLInputElement>(null);

  const ocrHandler = async () => {
    if (!fileUploaded) return;
    setExtracting(true);

    try {
      const worker = await createWorker(language);
      const result = await worker.recognize(
        URL.createObjectURL(fileUploaded),
        { rotateAuto: true },
        {
          imageColor: true,
          imageGrey: true,
          imageBinary: true,
          box: true,
          blocks: true,
        },
      );

      const words = result.data.words;
      setWords(words);

      await worker.terminate();
    } finally {
      setExtracting(false);
    }
  };

  const selectBoxHandler = (word: string) => {
    if (!inputRef.current) return;

    inputRef.current.value = (inputRef.current.value + ` ${word}`).trim();
  };

  const addIngredient = (text: string) => {
    if (text.trim().length == 0) return;

    setIngredients([
      ...ingredients,
      {
        name: text,
        label_name: text,
        label_name_kr: "",
        weight: 0,
      },
    ]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(
      ingredients.slice(0, index).concat(ingredients.slice(index + 1)),
    );
  };

  return (
    <div className={"flex flex-col gap-2"}>
      <h2 className={"text-2xl font-bold"}>Ingredients</h2>
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
        <OCRIngredientsList
          ingredients={ingredients}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
          inputRef={inputRef}
        />
      </div>
    </div>
  );
}
