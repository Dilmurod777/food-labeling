import Link from "next/link";

export default function SignUpForFree() {
    return <div className={"flex p-16 bg-main-blue text-white items-center justify-center gap-10"}>
        <div className={"w-2/5 flex flex-col items-start"}>
            <h2 className={"text-4xl font-bold"}>
                Sign up for free!
            </h2>
            <p className={"mt-10 font-thin text-sm"}>
                Let our software help with the boring nutrition and recipe management work and get back to what you really love.
            </p>
        </div>

        <div className={"flex gap-4 w-2/5"}>
            <Link
                href={"/"}
                className={"flex items-center justify-center text-[1rem] text-main-blue font-bold h-16 w-1/2 rounded-md bg-white hover:bg-gray-100"}
            >
                Build a Recipe
            </Link>
            <Link
                href={"/"}
                className={"flex items-center justify-center text-[1rem] text-white font-bold h-16 w-1/2 rounded-md bg-transparent " +
                    "border-[1px] border-white hover:bg-white hover:text-main-blue"}
            >
                Try our Sample Label
            </Link>
        </div>
    </div>
}