import { MdEmail } from "react-icons/md";
import Link from "next/link";

export default function EmailFreeCourse() {
  return (
    <div className={"flex w-full flex-col items-center gap-8 px-12 py-12"}>
      <div className={"flex flex-col items-center gap-4 text-center"}>
        <p className={"text-lg font-bold text-black"}>
          Want to learn more about inventory management? Join our free 5 email
          course!
        </p>
        <p className={"text-lg font-normal text-black"}>
          We&apos;ll cover lot tracing and FSMA compliance, managing cash,
          analyzing sales,
          <br />
          and more to help run and grow your food business.
        </p>
      </div>

      <div className={"flex flex-col items-center gap-2"}>
        <form action={"#"} className="mx-auto mb-2 mt-0">
          <div className="mt-12 flex w-full items-center justify-center gap-2">
            <div
              className={"relative text-gray-400 focus-within:text-gray-800"}
            >
              <input
                className="peer block w-[400px] rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                required
              />

              <MdEmail
                className={"absolute left-3 top-1/2 text-lg"}
                style={{
                  transform: "translateY(-50%)",
                }}
              />
            </div>

            <button
              className="cursor-pointer rounded-md bg-main-green px-6 py-4 text-white hover:bg-hover-main-green"
              disabled={true}
            >
              Learn Inventory from the Pros
            </button>
          </div>
        </form>

        <p className={"text-xs font-thin text-black"}>
          Your information will not be shared.
        </p>
        <p className={"text-xs font-thin text-black"}>
          This site is protected by reCAPTCHA and the Google
          <Link
            href={"https://policies.google.com/privacy"}
            className={"text-main-blue hover:text-hover-main-blue"}
            target={"_blank"}
          >
            {" "}
            Privacy Policy{" "}
          </Link>
          and
          <Link
            href={"https://policies.google.com/terms"}
            className={"text-main-blue hover:text-hover-main-blue"}
            target={"_blank"}
          >
            {" "}
            Terms of Service{" "}
          </Link>
          apply.
        </p>
      </div>
    </div>
  );
}
