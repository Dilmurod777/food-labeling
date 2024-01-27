import {FaInfoCircle} from "react-icons/fa";
import Divider from "@/app/ui/divider";

interface Props {
    title: string | undefined,
    content: string | undefined
}

export default function Tooltip({title, content}: Props) {
    return <div className={"relative"}>
        <FaInfoCircle className={"text-sm text-black peer"}/>
        <div className={"absolute hidden w-[300px] h-full flex-col top-0 left-6 peer-hover:flex peer-hover:z-10"}>
            <div
                className={"px-2 py-2 font-bold text-sm text-black bg-main-gray rounded-t-md border-t-[1px] border-l-[1px] border-r-[1px] border-[rgba(0,0,0,0.2)]"}>
                {title}
            </div>
            <Divider height={1} heightUnits={"px"} color={"rgba(0, 0, 0, 0.2)"} margin={0}/>
            <div
                className={"px-2 py-2 font-thin text-xs text-black bg-white rounded-b-md border-b-[1px] border-l-[1px] border-r-[1px] border-[rgba(0,0,0,0.2)]"}
                dangerouslySetInnerHTML={{__html: content || ""}}
            >
            </div>
        </div>
    </div>
}