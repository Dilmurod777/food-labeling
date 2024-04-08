import { Bbox } from "tesseract.js";
import React, { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import { Word } from "@/app/lib/constants/label";

interface Props {
  file: File;
  words: Word[];
  selectBoxHandler: (word: string) => void;
  size: number;
}

interface ImageData {
  ratio: number;
  url: string;
  startX: number;
  startY: number;
  width: number;
  height: number;
}

export default function OCRImageViewer({
  file,
  words,
  selectBoxHandler,
  size,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState<ImageData>({
    ratio: 1,
    url: "",
    startX: 0,
    startY: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setLoading(true);

    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = () => {
      const maxDimension = Math.max(image.width, image.height);
      const ratio = size / maxDimension;

      setImageData({
        ...imageData,
        url: image.src,
        ratio: ratio,
        width: image.width * ratio,
        height: image.height * ratio,
        startX: (size - image.width * ratio) / 2,
        startY: (size - image.height * ratio) / 2,
      });

      setLoading(false);
    };
  }, [file, words]);

  if (loading) return;

  return (
    <div
      className={
        "relative flex items-start justify-start rounded-md border border-main-gray"
      }
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {file && (
        <>
          <NextImage
            src={imageData.url}
            alt="Uploaded"
            fill
            style={{ objectFit: "contain" }}
          />
          {words
            .filter((w) => w.confidence > 60)
            .map((word, index) => {
              const bbox = word.box;
              const confidence = word.confidence;
              const text = word.text;
              return (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    left: `${imageData.startX + bbox[0] * imageData.width}px`,
                    top: `${imageData.startY + bbox[1] * imageData.height}px`,
                    width: `${(bbox[4] - bbox[0]) * imageData.width}px`,
                    height: `${(bbox[5] - bbox[1]) * imageData.height}px`,
                    border: "2px solid red",
                  }}
                  title={`Text: ${text}, Confidence: ${confidence}`}
                  onClick={() => selectBoxHandler(word.text)}
                ></div>
              );
            })}
        </>
      )}
    </div>
  );
}
