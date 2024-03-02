"use client";

import { useFormState } from "react-dom";
import { login } from "@/app/lib/actions-user";
import { Lato } from "next/font/google";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import Divider from "@/app/ui/divider";
import Link from "next/link";
import FormButton from "@/app/ui/auth_button";

const lato = Lato({ weight: ["300", "400", "700", "900"], subsets: ["latin"] });

export default function Login() {
  const [errorMessage, dispatch] = useFormState(login, undefined);

  return (
    <div className={`h-full w-full py-12 ${lato.className}`}>
      <form action={dispatch} className="mx-auto my-0 w-1/2">
        <h1 className={`mb-3 text-3xl font-bold`}>Log in</h1>
        <p className={"mt-5 text-lg font-normal text-[#6c6f7c]"}>
          Manage your recipes, labels, costs, and inventory!
        </p>
        <div className="mt-12 w-full">
          <div className={"relative text-gray-400 focus-within:text-gray-800"}>
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
        </div>

        <FormButton text={"Log in"} />

        {errorMessage && (
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="text-sm text-red-500">{errorMessage}</p>
          </div>
        )}

        <Divider
          height={1}
          heightUnits={"px"}
          margin={1.5}
          marginUnits={"rem"}
          color={"#f2f7fb"}
        />

        <Link
          href={"/signup"}
          className={"text-sm text-main-blue hover:text-hover-main-blue"}
        >
          Not registered? Sign up
        </Link>
      </form>
    </div>
  );
}
