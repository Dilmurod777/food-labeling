import {ReactNode} from "react";
import Tooltip from "@/app/ui/tooltip";

interface Props {
    title: string,
    htmlFor: string,
    required?: boolean,
    children: ReactNode,
    tooltip_enabled?: boolean,
    tooltip_title?: string,
    tooltip_content?: string
}

export default function InputWrapper({children, title, htmlFor, required, tooltip_enabled, tooltip_title, tooltip_content}: Props) {
    return <div className={`flex flex-col gap-1 w-full peer`}>
        <div className={"flex gap-2 items-center"}>
            <label
                htmlFor={htmlFor}
                className={`text-sm font-thin text-black my-0.5 ${required && `after:content-['*'] after:ml-0.5 after:text-red-500`}`}
            >
                {title}
            </label>
            {tooltip_enabled && <Tooltip title={tooltip_title} content={tooltip_content}/>}
        </div>
        {children}
    </div>
}