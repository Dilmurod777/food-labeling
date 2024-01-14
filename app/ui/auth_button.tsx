'use client';

import {useFormStatus} from "react-dom";

export default function AuthButton({text}: { text: string }) {
    const {pending} = useFormStatus()

    return <button
        className="mt-4 bg-main-green rounded-md py-2 px-6 text-white cursor-pointer hover:bg-hover-main-green"
        aria-disabled={pending}
    >
        {pending ? "Loading... " : text}
    </button>
}