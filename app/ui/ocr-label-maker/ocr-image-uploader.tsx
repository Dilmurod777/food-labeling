import { useRef } from "react";
import Image from "next/image";

interface Props {
  uploadHandler: (file: File) => void;
  size: number;
}

export default function OCRImageUploader({ uploadHandler, size }: Props) {
  return (
    <div className={"flex flex-col gap-3"} style={{ width: `${size}px` }}>
      <label
        htmlFor="dropzone-file"
        className="flex h-16 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:bg-main-gray"
      >
        <div className="flex items-center justify-center gap-4 px-6 py-5">
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
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Only PNG, JPG.
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                uploadHandler(e.target.files[0]);
              }
            }}
          />
        </div>
      </label>
    </div>
  );
}
