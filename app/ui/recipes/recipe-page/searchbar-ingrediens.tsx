import {FaSearch} from "react-icons/fa";
import {FaSliders} from "react-icons/fa6";
import {debounce} from "@/app/lib/utilities";

interface Props {
    onSearchChanged: (value: string) => void
}

export default function SearchBarIngredients({onSearchChanged}: Props) {
    const onChangeHandler = debounce((value: string) => onSearchChanged(value))

    return <div className={"relative text-main-gray focus-within:text-secondary-gray w-full mt-6"}>
        <input
            type="text"
            className={"w-full py-2 pl-10 pr-16 rounded-3xl border-main-gray border-2 text-sm text-secondary-gray"}
            name={"search"}
            placeholder={"Search an ingredient to add to your recipe"}
            onChange={(e) => onChangeHandler(e.target.value)}
        />
        <FaSearch className={"text-lg absolute left-3 top-1/2 -translate-y-1/2"}/>

        <div
            className={"w-12 flex items-center justify-center absolute top-0 bottom-0 right-0 rounded-tr-3xl rounded-br-3xl bg-main-blue hover:bg-hover-main-blue cursor-pointer"}
        >
            <FaSliders className={'text-white text-lg'}/>
        </div>
    </div>
}