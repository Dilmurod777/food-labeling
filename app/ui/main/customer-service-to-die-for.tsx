import Link from "next/link";

export default function CustomerServiceToDieFor() {
    return <div className={"flex flex-col py-16 w-full px-12 bg-main-green text-white items-center justify-center"}>
        <div className={"w-3/5 flex flex-col items-start"}>
            <h2 className={"text-5xl font-bold"}>
                Customer service to die for
            </h2>
            <p className={"my-4 font-thin text-lg"}>
                Get advice from nutrition and labeling experts who will answer your questions in minutes, not days.
            </p>

            <div className={"flex gap-4 mt-4 w-full"}>
                <Link
                    href={"/"}
                    className={"flex items-center justify-center text-[1rem] text-main-green font-bold h-16 w-1/2 rounded-md bg-white hover:bg-gray-100"}
                >
                    Create a Label
                </Link>
                <Link
                    href={"/"}
                    className={"flex items-center justify-center text-[1rem] text-white font-bold h-16 w-1/2 rounded-md bg-transparent " +
                        "border-[1px] border-white hover:bg-white hover:text-main-green"}
                >
                    Hire an Expert
                </Link>
            </div>
        </div>
    </div>
}