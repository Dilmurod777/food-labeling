import Link from "next/link";

export default function NotAuthenticatedButtons() {
  return (
    <div className={"flex h-full items-center justify-center gap-2 pt-3"}>
      <Link
        key={"login"}
        href={"/login"}
        className={
          "flex h-3/4 items-center rounded-md px-7 text-base font-bold text-black hover:bg-gray-50"
        }
      >
        Log in
      </Link>

      <Link
        key={"signup"}
        href={"/signup"}
        className={
          "flex h-3/5 items-center rounded-md bg-main px-7 text-base font-bold text-white hover:bg-hover-main"
        }
      >
        Sign up
      </Link>
    </div>
  );
}
