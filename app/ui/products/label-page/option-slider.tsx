import { useState } from "react";

interface Props {
  index: number;
  text: string;
  value: number;
  minValue: number;
  maxValue: number;
  onChange: (value: boolean) => void;
}

export default function OptionSlider({
  index,
  text,
  value,
  minValue,
  maxValue,
  onChange,
}: Props) {
  return (
    <div className={"flex flex-col gap-2 p-3 text-sm"}>
      <p>{text.charAt(0).toUpperCase() + text.slice(1)}</p>
      <p className={"text-center text-xs"}>{value}</p>
      <div className={"relative mt-2 h-[20px] bg-red-200"}>
        <div
          className={
            "absolute top-1/2 h-[15px] w-full -translate-y-1/2 bg-main-gray"
          }
        />
        <div className={"absolute h-[20px] w-[20px]"} />
      </div>
    </div>
  );
}
