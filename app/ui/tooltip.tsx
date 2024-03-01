import { FaInfoCircle } from "react-icons/fa";
import Divider from "@/app/ui/divider";

interface Props {
  title: string | undefined;
  content: string | undefined;
}

export default function Tooltip({ title, content }: Props) {
  return (
    <div className={"relative"}>
      <FaInfoCircle className={"peer text-sm text-black"} />
      <div
        className={
          "absolute left-6 top-0 hidden h-full w-[300px] flex-col peer-hover:z-10 peer-hover:flex"
        }
      >
        <div
          className={
            "rounded-t-md border-l-[1px] border-r-[1px] border-t-[1px] border-[rgba(0,0,0,0.2)] bg-main-gray px-2 py-2 text-sm font-bold text-black"
          }
        >
          {title}
        </div>
        <Divider
          height={1}
          heightUnits={"px"}
          color={"rgba(0, 0, 0, 0.2)"}
          margin={0}
        />
        <div
          className={
            "rounded-b-md border-b-[1px] border-l-[1px] border-r-[1px] border-[rgba(0,0,0,0.2)] bg-white px-2 py-2 text-xs font-thin text-black"
          }
          dangerouslySetInnerHTML={{ __html: content || "" }}
        ></div>
      </div>
    </div>
  );
}
