import { useRef, useState } from "react";
import { OCRLanguage } from "@/app/lib/constants/label";
import { Word } from "@/app/lib/ocr";
import OCRImageUploader from "@/app/ui/ocr-label-maker/ocr-image-uploader";
import OCRExtractButton from "@/app/ui/ocr-label-maker/ocr-extract-button";
import OCRImageViewer from "@/app/ui/ocr-label-maker/ocr-image-viewer";
import OCRIngredientsList from "@/app/ui/ocr-label-maker/ocr-ingredients-list";
import { Ingredient } from "@/app/lib/models";
import {
  ConvertBase64ToFile,
  convertOCRLangToLabelLang,
} from "@/app/lib/utilities";

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
  const [wordBoxes, setWordBoxes] = useState<Word[]>([]);

  const imageSize = 500;
  const inputRef = useRef<HTMLInputElement>(null);

  const ocrHandler = async () => {
    if (!fileUploaded) return;

    // SAtJQoRUSafwxl14oYPiZ1XGqXEigdUMAbOp7rUHL4JCxkmK69xnWbKI9Sb5WOV3

    setExtracting(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(fileUploaded);

      reader.onload = async () => {
        if (!reader.result) return;

        const formData = new FormData();
        formData.append("image", fileUploaded);

        const response = await fetch("/api/ocr", {
          method: "POST",
          body: formData,
        });

        let { words, image }: { words: Word[]; image: string } =
          await response.json();

        // if (image) {
        //   setFileUploaded(ConvertBase64ToFile(image));
        // }

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
              words[i].text = words[i].text == w ? w : `${words[i].text}/${w}`;
              return words[i];
            });
          }

          setWordBoxes(words);
        }

        setExtracting(false);
      };
    } catch {
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
