import {ReactNode} from "react";

interface Props {
    title: string,
    htmlFor: string,
    required?: boolean,
    children: ReactNode
}

export default function InputWrapper({children, title, htmlFor, required}: Props) {
    return <div className={"flex flex-col gap-1 w-full"}>
        <label htmlFor={htmlFor} className={`text-lg font-thin text-black my-1 ${required && "after:content-['*'] after:ml-0.5 after:text-red-500"}`}>{title}</label>
        {children}
    </div>
}