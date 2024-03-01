import Link from "next/link";

export default function SignUpForFree() {
  return (
    <div
      className={
        "flex w-full items-center justify-center gap-10 bg-main-orange px-12 py-12 text-white"
      }
    >
      <div className={"flex w-2/5 flex-col items-start"}>
        <h2 className={"text-4xl font-bold"}>Sign up for free!</h2>
        <p className={"mt-10 text-sm font-thin"}>
          Let our software help with the boring nutrition and recipe management
          work and get back to what you really love.
        </p>
      </div>

      <div className={"flex w-2/5 gap-4"}>
        <Link
          href={"/"}
          className={
            "flex h-16 w-1/2 items-center justify-center rounded-md bg-white text-[1rem] font-bold text-main-orange hover:bg-gray-100"
          }
        >
          Build a Recipe
        </Link>
        <Link
          href={"/"}
          className={
            "flex h-16 w-1/2 items-center justify-center rounded-md bg-transparent text-[1rem] font-bold text-white " +
            "border-[1px] border-white hover:bg-white hover:text-main-orange"
          }
        >
          Try our Sample Label
        </Link>
      </div>
    </div>
  );
}
