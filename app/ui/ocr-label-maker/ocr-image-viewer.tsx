import React, { createRef, useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import { Word } from "@/app/lib/ocr";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  const [showTextInBoxes, setShowTextInBoxes] = useState(false);
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

  const isOverflown = ({
    clientWidth,
    clientHeight,
    scrollWidth,
    scrollHeight,
  }: {
    clientWidth: number;
    clientHeight: number;
    scrollWidth: number;
    scrollHeight: number;
  }) => scrollWidth > clientWidth || scrollHeight > clientHeight;

  const resizeText = ({
    element,
    elements,
    minSize = 10,
    maxSize = 512,
    step = 1,
    unit = "px",
  }: {
    element: HTMLElement;
    elements: HTMLElement[];
    minSize: number;
    maxSize: number;
    step: number;
    unit: string;
  }) => {
    (elements || [element]).forEach((el) => {
      let i = minSize;
      let overflow = false;

      const parent = el.parentNode;
      if (!parent) return;

      while (!overflow && i < maxSize) {
        el.style.fontSize = `${i}${unit}`;
        overflow = isOverflown(parent as HTMLElement);

        if (!overflow) i += step;
      }

      el.style.fontSize = `${i - step}${unit}`;
    });
  };

  if (loading) return;

  return (
    <div
      className={
        "relative flex select-none items-start justify-start rounded-md border border-main-gray"
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
          {/*<div*/}
          {/*  className={"absolute right-2 top-2 z-40 cursor-pointer text-2xl"}*/}
          {/*  onClick={() => setShowTextInBoxes(!showTextInBoxes)}*/}
          {/*>*/}
          {/*  {showTextInBoxes && <FaEyeSlash className={"text-white"} />}*/}
          {/*  {!showTextInBoxes && <FaEye className={"text-black"} />}*/}
          {/*</div>*/}
          {words.length > 0 && showTextInBoxes && (
            <div
              className={
                "absolute bottom-0 left-0 right-0 top-0 bg-black opacity-65"
              }
            ></div>
          )}
          {words.map((word, index) => {
            const bbox = word.box;
            const text = word.text.replaceAll("###", "/");

            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: `${imageData.startX + bbox[0].x * imageData.ratio}px`,
                  top: `${imageData.startY + bbox[0].y * imageData.ratio}px`,
                  width: `${(bbox[1].x - bbox[0].x) * imageData.ratio}px`,
                  height: `${(bbox[1].y - bbox[0].y) * imageData.ratio}px`,
                  border: "1px solid red",
                  containerType: "size",
                }}
                title={text}
                onClick={() => selectBoxHandler(word.text.split("###")[0])}
                className={"flex items-center justify-start"}
              >
                {showTextInBoxes && (
                  <div
                    className={
                      "box-text text-left text-xs/none tracking-tighter text-white"
                    }
                  >
                    {text.toLowerCase()}
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
