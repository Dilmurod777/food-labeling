'use client';

import {useFormStatus} from "react-dom";

interface Props {
    text: string,
    loading_text?: string,
    classes?: string
}

export default function FormButton({
                                       text,
                                       loading_text = "Loading...",
                                       classes = "mt-4 bg-main-green rounded-md py-2 px-6 text-white cursor-pointer hover:bg-hover-main-green"
                                   }: Props) {
    const {pending} = useFormStatus()

    return <button
        className={classes}
        aria-disabled={pending}
    >
        {pending ? loading_text : text}
    </button>
}