import Link from "next/link";

export default function CreateYourOwnFreeLabelToday(){
    return <div className={"flex justify-center items-center bg-main-green gap-24 px-28 py-12"}>
        <h2 className={"text-4xl font-bold text-white"}>Create your own free label today!</h2>

        <Link
            href={"/"}
            className={"flex items-center justify-center text-[1rem] text-main-green font-normal px-12 py-4 rounded-md bg-white hover:bg-gray-100 mr-12"}
        >
            <span>Create your <strong>free</strong> label now!</span>
        </Link>
    </div>
}