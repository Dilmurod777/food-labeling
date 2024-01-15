import Link from "next/link";

export default function TopHero() {
    return <div className={"flex flex-col py-16 px-16 bg-main-blue text-white items-center justify-center text-center"}>
        <div className={"w-3/5 flex flex-col items-center justify-center"}>
            <h2 className={"text-5xl font-bold"}>
                Nutrition Label Software
            </h2>
            <p className={"my-10 font-thin text-lg"}>
                With Foodplanet, you can use our nutrition labeling software to create nutrition labels for your products to comply with food
                regulations and grow your business.
                <br/>
                <br/>
                Foodplanet&apos;s team of labeling experts can review your nutrition labels to ensure key components are correct.
            </p>

            <div className={"flex gap-4 mt-6 w-full items-center justify-center"}>
                <Link
                    href={"/"}
                    className={"flex items-center justify-center text-[1rem] text-main-blue font-normal h-16 w-1/2 rounded-md bg-white hover:bg-gray-100"}
                >
                    <span>Create your <strong>free</strong> label!</span>
                </Link>
            </div>
        </div>
    </div>
}