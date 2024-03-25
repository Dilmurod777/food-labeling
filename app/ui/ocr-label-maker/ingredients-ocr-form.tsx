import { useState } from "react";
import { Bbox, createWorker, Word } from "tesseract.js";
import { LabelLanguage, OCRLanguage } from "@/app/lib/constants/label";
import OCRImageUploader from "@/app/ui/ocr-label-maker/ocr-image-uploader";
import OCRExtractButton from "@/app/ui/ocr-label-maker/ocr-extract-button";
import { convertOCRLangToLabelLang } from "@/app/lib/utilities";
import OCRImageViewer from "@/app/ui/ocr-label-maker/ocr-image-viewer";

interface Props {
  language: OCRLanguage;
}

export default function IngredientsOCRForm({ language }: Props) {
  const [fileUploaded, setFileUploaded] = useState<File>();
  const [extracting, setExtracting] = useState(false);
  const [words, setWords] = useState<Word[]>([]);

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

      // let text = result.data.text.replaceAll(/\s+/g, " ");
      // if (language != OCRLanguage.English) {
      //   const translation = await fetch("/api/translate", {
      //     method: "POST",
      //     body: JSON.stringify({
      //       text: text,
      //       target: LabelLanguage.English,
      //       source: convertOCRLangToLabelLang(language),
      //     }),
      //   });
      //   text = await translation.json();
      // }

      await worker.terminate();
    } finally {
      setExtracting(false);
    }
  };

  return (
    <div className={"flex items-center gap-4"}>
      <div className={"flex flex-col gap-2"}>
        <OCRImageUploader
          uploadHandler={(file) => {
            setFileUploaded(file);
            setWords([]);
          }}
        />
        {fileUploaded && <OCRImageViewer file={fileUploaded} words={words} />}
      </div>
      <OCRExtractButton
        extracting={extracting}
        fileUploaded={!!fileUploaded}
        clickHandler={ocrHandler}
      />
    </div>
  );
}
