import Link from "next/link";

export default function NotAuthenticatedButtons() {
    return <div className={"flex items-center justify-center gap-2 h-full pt-3"}>
        <Link
            key={"login"}
            href={"/login"}
            className={"flex items-center h-3/4 text-black font-bold text-base hover:bg-gray-50 px-7 rounded-md"}
        >Log in</Link>

        <Link
            key={"signup"}
            href={"/signup"}
            className={"flex items-center h-3/5 text-white font-bold text-base bg-main-green hover:bg-hover-main-green px-7 rounded-md"}
        >Sign up</Link>
    </div>
}