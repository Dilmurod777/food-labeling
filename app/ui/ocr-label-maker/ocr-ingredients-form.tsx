import { useRef, useState } from "react";
import { createWorker } from "tesseract.js";
import { OCRLanguage, Word } from "@/app/lib/constants/label";
import OCRImageUploader from "@/app/ui/ocr-label-maker/ocr-image-uploader";
import OCRExtractButton from "@/app/ui/ocr-label-maker/ocr-extract-button";
import OCRImageViewer from "@/app/ui/ocr-label-maker/ocr-image-viewer";
import OCRIngredientsList from "@/app/ui/ocr-label-maker/ocr-ingredients-list";
import { Ingredient } from "@/app/lib/models";
import { SimpleImage } from "simple-image";

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

    // SAtJQoRUSafwxl14oYPiZ1XGqXEigdUMAbOp7rUHL4JCxkmK69xnWbKI9Sb5WOV3

    setExtracting(true);

    const reader = new FileReader();
    reader.readAsDataURL(fileUploaded);

    reader.onload = async () => {
      const token =
        "SAtJQoRUSafwxl14oYPiZ1XGqXEigdUMAbOp7rUHL4JCxkmK69xnWbKI9Sb5WOV3";
      const response = await fetch(
        `https://backend.scandocflow.com/v1/api/documents/extract?access_token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "ocr",
            lang: "kor",
            files: [
              {
                title: "test.png",
                src: reader.result,
              },
            ],
          }),
        },
      );

      const data = await response.json();
      const words = data?.documents[0]?.textAnnotation?.Pages[0]?.Words;

      if (words) {
        const result = words.map((w: any) => ({
          text: w.Text,
          box: w.Outline,
          confidence: Math.ceil(w.Confidence * 100),
        }));

        setWords(result);
      }

      setExtracting(false);
    };

    // setExtracting(true);
    //
    // try {
    //   const worker = await createWorker(language);
    //
    //   const simpleImage = new SimpleImage(fileUploaded);
    //   await simpleImage.ready;
    //
    //   for (let pixel of simpleImage.pixels) {
    //     // get the pixel's RGB values
    //     let red = pixel.red;
    //     let green = pixel.green;
    //     let blue = pixel.blue;
    //     // Calculate the average value
    //     let average = (red + green + blue) / 3;
    //     // Assign this average vale to the pixel's RGB values
    //     pixel.red = average;
    //     pixel.green = average;
    //     pixel.blue = average;
    //   }
    //
    //   let response = await fetch(simpleImage.toDataURL());
    //   let blob = await response.blob();
    //   let file = new File([blob], "File name", { type: "image/png" });
    //
    //   const result = await worker.recognize(
    //     URL.createObjectURL(file),
    //     { rotateAuto: true },
    //     {
    //       text: true,
    //       blocks: true,
    //       box: true,
    //     },
    //   );
    //
    //   const words = result.data.words;
    //   setWords(words);
    //
    //   await worker.terminate();
    // } finally {
    //   setExtracting(false);
    // }
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
