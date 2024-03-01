"use client";

import { useFormState } from "react-dom";
import { signup } from "@/app/lib/actions-user";
import { Lato } from "next/font/google";
import { MdEmail } from "react-icons/md";
import { FaLock, FaUser } from "react-icons/fa";
import Divider from "@/app/ui/divider";
import Link from "next/link";
import FormButton from "@/app/ui/auth_button";

const lato = Lato({ weight: ["300", "400", "700", "900"], subsets: ["latin"] });

export default function Signup() {
  const [errorMessage, dispatch] = useFormState(signup, undefined);

  return (
    <div className={`h-full w-full py-12 ${lato.className}`}>
      <form action={dispatch} className="mx-auto my-0 w-1/2">
        <h1 className={`mb-3 text-3xl font-bold`}>Sign up for Foodplanet</h1>
        <p className={"mt-5 text-lg font-normal text-[#6c6f7c]"}>
          For food entrepreneurs, by food entrepreneurs. Get started now!
        </p>
        <div className="mt-12 w-full">
          <div className={"relative text-gray-400 focus-within:text-gray-800"}>
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              required
            />

            <FaUser
              className={"absolute left-3 top-1/2 text-lg"}
              style={{
                transform: "translateY(-50%)",
              }}
            />
          </div>
          <div
            className={"relative mt-4 text-gray-400 focus-within:text-gray-800"}
          >
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
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
          <div
            className={"relative mt-4 text-gray-400 focus-within:text-gray-800"}
          >
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              required
              minLength={6}
            />

            <FaLock
              className={"absolute left-3 top-1/2 text-lg"}
              style={{
                transform: "translateY(-50%)",
              }}
            />
          </div>
          <div className={"mt-4"}>
            <label className={"flex gap-2"}>
              <input id="terms_agreement" type="checkbox" required />
              <span className={"text-sm"}>
                I agree to the Foodpanel
                <Link
                  href={"/"}
                  className={"text-main-blue hover:text-hover-main-blue"}
                >
                  {" "}
                  Terms and Conditions
                </Link>
              </span>
            </label>
          </div>
        </div>

        <FormButton text={"Sign up"} />

        {errorMessage && typeof errorMessage == "string" && (
          <div
            className="mt-2 flex flex-col items-start gap-y-0"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage.split("\n").map((message, i) => (
              <p key={`message-${i}`} className="text-sm text-red-500">
                {message.trim()}
              </p>
            ))}
          </div>
        )}

        <Divider
          height={1}
          heightUnits={"px"}
          margin={1.5}
          marginUnits={"rem"}
          color={"#f2f7fb"}
        />

        <div className={"flex items-center gap-1 text-sm"}>
          Already registered?
          <Link
            href={"/signup"}
            className={"text-main-blue hover:text-hover-main-blue"}
          >
            Log In here.
          </Link>
        </div>
      </form>
    </div>
  );
}
