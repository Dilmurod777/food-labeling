import Link from "next/link";

export default function SignUpForFree() {
  return (
    <div
      className={
        "flex w-full items-center justify-center gap-16 bg-main-orange px-12 py-12"
      }
    >
      <div className={"flex w-2/5 flex-col gap-8"}>
        <h2 className={"text-5xl font-bold text-white"}>Sign up for free!</h2>
        <p className={"text-lg font-normal text-white"}>
          Let our software help with the boring nutrition and recipe management
          work and get back to what you really love
        </p>
      </div>

      <div className={"flex-start flex gap-4"}>
        <Link
          href={"/"}
          className={
            "flex items-center justify-center rounded-md bg-white px-12 py-4 text-[1rem] font-bold text-main-orange hover:bg-gray-100"
          }
        >
          <span>Build a recipe</span>
        </Link>
        <Link
          href={"/"}
          className={
            "flex items-center justify-center px-8 py-4 text-[1rem] font-bold text-white " +
            "rounded-md border-[1px] border-white bg-transparent hover:bg-white hover:text-main-orange"
          }
        >
          <span>Try our sample label!</span>
        </Link>
      </div>
    </div>
  );
}
