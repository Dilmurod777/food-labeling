import Link from "next/link";

export default function CustomerServiceToDieFor() {
  return (
    <div
      className={
        "flex w-full flex-col items-center justify-center bg-main-green px-12 py-16 text-white"
      }
    >
      <div className={"flex w-3/5 flex-col items-start"}>
        <h2 className={"text-5xl font-bold"}>Customer service to die for</h2>
        <p className={"my-4 text-lg font-thin"}>
          Get advice from nutrition and labeling experts who will answer your
          questions in minutes, not days.
        </p>

        <div className={"mt-4 flex w-full gap-4"}>
          <Link
            href={"/"}
            className={
              "flex h-16 w-1/2 items-center justify-center rounded-md bg-white text-[1rem] font-bold text-main-green hover:bg-gray-100"
            }
          >
            Create a Label
          </Link>
          <Link
            href={"/"}
            className={
              "flex h-16 w-1/2 items-center justify-center rounded-md bg-transparent text-[1rem] font-bold text-white " +
              "border-[1px] border-white hover:bg-white hover:text-main-green"
            }
          >
            Hire an Expert
          </Link>
        </div>
      </div>
    </div>
  );
}
