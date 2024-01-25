import Link from "next/link";

export default function CustomerServiceThatDelivers() {
    return <div className={"flex flex-col pb-8 w-full px-12 items-center gap-4"}>
        <h2 className={"text-4xl font-bold text-black"}>Customer service that delivers</h2>
        <p className={"text-lg font-normal text-black text-center"}>
            Advice from production and operations experts<br/>
            Questions answered in minutes, not days<br/>
            Provide feedback and see it realized
        </p>

        <div className={"flex flex-col gap-2 items-center mt-6"}>
            <Link
                href={"#"}
                className={"flex items-center justify-center text-[1rem] text-white font-bold py-4 px-8 rounded-md bg-main-green " +
                    "hover:bg-hover-main-green"}
            >
                Start managing inventory like the pros!
            </Link>
            <span className={"text-secondary-gray italic"}>or</span>
            <Link
                href={"#"}
                className={"text-lg font-bold text-main-blue hover:text-hover-main-blue"}
            >
                Schedule a Chat
            </Link>
        </div>
    </div>
}