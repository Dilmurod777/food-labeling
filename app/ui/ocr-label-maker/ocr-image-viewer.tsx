import { Bbox, Word } from "tesseract.js";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

interface Props {
  file: File;
  words: Word[];
}

export default function OCRImageViewer({ file, words }: Props) {
  return (
    <div
      className={
        "relative flex h-96 w-96 items-start justify-start rounded-md border border-main-gray"
      }
    >
      {file && (
        <>
          <Image
            src={URL.createObjectURL(file)}
            alt="Uploaded"
            fill
            style={{ objectFit: "contain" }}
          />
          {words
            .filter((w) => w.confidence > 60)
            .map((word, index) => {
              const bbox = word.bbox;
              const confidence = word.confidence;
              const text = word.text;
              return (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    left: `${bbox.x0}px`,
                    top: `${bbox.y0}px`,
                    width: `${bbox.x1 - bbox.x0}px`,
                    height: `${bbox.y1 - bbox.y0}px`,
                    border: "2px solid red",
                  }}
                  title={`Text: ${text}, Confidence: ${confidence}`}
                ></div>
              );
            })}
        </>
      )}
    </div>
  );
}
