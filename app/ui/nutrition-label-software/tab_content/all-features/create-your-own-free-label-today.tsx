import Link from "next/link";

export default function CreateYourOwnFreeLabelToday() {
  return (
    <div
      className={
        "flex w-full items-center justify-center gap-24 bg-main-green px-12 py-12"
      }
    >
      <h2 className={"text-4xl font-bold text-white"}>
        Create your own free label today!
      </h2>

      <Link
        href={"/"}
        className={
          "mr-12 flex items-center justify-center rounded-md bg-white px-12 py-4 text-[1rem] font-normal text-main-green hover:bg-gray-100"
        }
      >
        <span>
          Create your <strong>free</strong> label now!
        </span>
      </Link>
    </div>
  );
}
