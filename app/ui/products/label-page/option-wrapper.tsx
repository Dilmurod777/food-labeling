import { capitalize } from "@/app/lib/utilities";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { ReactNode } from "react";

interface Props {
  activeIndex: number;
  index: number;
  text: string;
  onClick: () => void;
  children: ReactNode;
}

export default function OptionWrapper({
  children,
  activeIndex,
  index,
  text,
  onClick,
}: Props) {
  return (
    <div className={"flex select-none flex-col"}>
      <div
        className={
          "flex cursor-pointer items-center justify-between rounded-t-md bg-main-orange px-4 py-3 text-white *:leading-none hover:bg-hover-main-orange"
        }
        onClick={() => onClick()}
      >
        <span className={"text-base font-bold"}>{capitalize(text, " ")}</span>
        {activeIndex != index && <IoIosArrowForward className={"text-xl"} />}
        {activeIndex == index && <IoIosArrowDown className={"text-xl"} />}
      </div>

      {children}
    </div>
  );
}
