import { ReactNode } from "react";
import Tooltip from "@/app/ui/tooltip";
import { Simulate } from "react-dom/test-utils";
import toggle = Simulate.toggle;

interface Props {
  title: string;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
  tooltipEnabled?: boolean;
  tooltipTitle?: string;
  tooltipContent?: string;
  toggleEnabled?: boolean;
  toggleValue?: boolean;
  toggleHandler?: (value: boolean) => void;
}

export default function FormInputWrapper({
  children,
  title,
  htmlFor,
  required,
  tooltipEnabled,
  tooltipTitle,
  tooltipContent,
  toggleEnabled,
  toggleValue,
  toggleHandler,
}: Props) {
  return (
    <div className={`peer flex w-full flex-col gap-1`}>
      <div className={"flex items-center gap-2 px-1"}>
        <label
          htmlFor={htmlFor}
          className={`my-0.5 text-xs font-bold text-black ${required && `after:ml-0.5 after:text-red-500 after:content-['*']`}`}
        >
          {title}
        </label>
        {tooltipEnabled && (
          <Tooltip title={tooltipTitle} content={tooltipContent} />
        )}
        {toggleEnabled && (
          <label className="inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              tabIndex={-1}
              defaultChecked={!!toggleValue}
              className="peer sr-only"
              onChange={(e) => toggleHandler && toggleHandler(e.target.checked)}
            />
            <div className="peer relative h-4 w-7 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-3 after:w-3 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800" />
          </label>
        )}
      </div>
      {children}
    </div>
  );
}
