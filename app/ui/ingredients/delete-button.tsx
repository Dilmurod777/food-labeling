import {MdDelete} from "react-icons/md";
import {useFormStatus} from "react-dom";

export default function DeleteButton() {
    const {pending} = useFormStatus();

    return <button
        type={'submit'}
        className={"group cursor-pointer flex gap-1 items-center"}
    >
        <MdDelete
            className={"text-lg text-red-500"}
        />
        <span className={"text-sm font-bold group-hover:text-red-500"}>
            {pending ? "Deleting..." : "Delete"}
        </span>
    </button>
}