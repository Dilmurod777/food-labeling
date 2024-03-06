"use client";

import { useState } from "react";
import { User } from "@/app/lib/models";
import FormSubmitBtn from "@/app/ui/form-submit-btn";
import Image from "next/image";
import { createWorker } from "tesseract.js";

interface Props {
  user: User;
}

export default function SubmitForm({ user }: Props) {
  const [error, setError] = useState("");
  const [file, setFile] = useState<File>();

  const fileUploadHandler = (files: FileList | null) => {
    console.log(files);
    if (!files || files.length == 0) {
      setError("No file selected. Try again.");
      return;
    }

    setFile(files[0]);
  };

  const ocrHandler = async () => {
    if (!file) return;

    const worker = await createWorker("eng");
    const ret = await worker.recognize(URL.createObjectURL(file));
    console.log(ret.data.text);
    await worker.terminate();
  };

  return (
    <div
      className={
        "flex flex-grow flex-col items-center justify-center gap-3 px-24 py-12"
      }
    >
      <div className="flex w-full flex-grow items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex h-16 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:bg-main-gray"
        >
          <div className="flex items-center justify-center gap-4 pb-6 pt-5">
            <svg
              className="h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <div className={"flex flex-col items-center gap-0"}>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Only PNG, JPG.
              </p>
            </div>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(e) => fileUploadHandler(e.target.files)}
          />
        </label>
      </div>

      <div className={"flex items-center justify-center text-center"}>
        <p className={"text-sm font-bold text-red-500"}>{error}</p>
      </div>

      {file && (
        <div className={"flex flex-col items-center gap-6"}>
          <div
            className={"bg-red relative h-96 w-96 border-2 border-main-gray"}
          >
            <Image
              src={URL.createObjectURL(file)}
              alt={"upload-image-preview"}
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>

          <div
            onClick={() => ocrHandler()}
            className={
              "cursor-pointer rounded-md bg-main-orange px-12 py-2 text-white hover:bg-hover-main-orange"
            }
          >
            Extract
          </div>
        </div>
      )}
    </div>
  );
}
