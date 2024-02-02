import Link from "next/link";

export default function TopHero({mainText, secondaryText}: { mainText: string, secondaryText: string }) {
    return <div className={"flex flex-col py-16 w-full px-12 bg-main-orange text-white items-center justify-center text-center"}>
        <div className={"flex flex-col items-center justify-center"}>
            <h2 className={"text-5xl font-bold w-full"}>
                {mainText}
            </h2>
            <p className={"my-10 font-thin text-lg w-3/5"} dangerouslySetInnerHTML={{__html: secondaryText}}></p>

            <div className={"flex gap-4 mt-6 w-full items-center justify-center"}>
                <Link
                    href={"/"}
                    className={"flex items-center justify-center text-[1rem] text-main-orange font-normal px-12 py-4 rounded-md bg-white hover:bg-gray-100"}
                >
                    <span>Create your <strong>free</strong> label!</span>
                </Link>
            </div>
        </div>
    </div>
}