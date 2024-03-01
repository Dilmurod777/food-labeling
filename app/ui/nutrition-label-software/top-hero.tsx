import Link from "next/link";

export default function TopHero({
  mainText,
  secondaryText,
}: {
  mainText: string;
  secondaryText: string;
}) {
  return (
    <div
      className={
        "flex w-full flex-col items-center justify-center bg-main-orange px-12 py-16 text-center text-white"
      }
    >
      <div className={"flex flex-col items-center justify-center"}>
        <h2 className={"w-full text-5xl font-bold"}>{mainText}</h2>
        <p
          className={"my-10 w-3/5 text-lg font-thin"}
          dangerouslySetInnerHTML={{ __html: secondaryText }}
        ></p>

        <div className={"mt-6 flex w-full items-center justify-center gap-4"}>
          <Link
            href={"/"}
            className={
              "flex items-center justify-center rounded-md bg-white px-12 py-4 text-[1rem] font-normal text-main-orange hover:bg-gray-100"
            }
          >
            <span>
              Create your <strong>free</strong> label!
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
