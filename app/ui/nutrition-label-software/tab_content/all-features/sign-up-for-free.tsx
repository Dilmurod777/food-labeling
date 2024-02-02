import Link from "next/link";

export default function SignUpForFree() {
    return <div className={"flex justify-center items-center bg-main-orange gap-16 w-full px-12 py-12"}>
        <div className={"flex flex-col gap-8 w-2/5"}>
            <h2 className={"text-5xl font-bold text-white"}>Sign up for free!</h2>
            <p className={"text-lg font-normal text-white"}>
                Let our software help with the boring nutrition and recipe management work and get back to what you really love
            </p>
        </div>

        <div className={"flex flex-start gap-4"}>
            <Link
                href={"/"}
                className={"flex items-center justify-center text-[1rem] text-main-orange font-bold px-12 py-4 rounded-md bg-white hover:bg-gray-100"}
            >
                <span>Build a recipe</span>
            </Link>
            <Link
                href={"/"}
                className={"flex items-center justify-center text-[1rem] text-white font-bold px-8 py-4 " +
                    "rounded-md bg-transparent hover:bg-white hover:text-main-orange border-[1px] border-white"}
            >
                <span>Try our sample label!</span>
            </Link>
        </div>
    </div>
}