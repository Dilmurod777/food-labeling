"use client";

import {useFormState, useFormStatus} from 'react-dom';
import {authenticate} from '@/app/lib/actions';
import {Lato} from 'next/font/google'
import {MdEmail} from "react-icons/md";
import {FaLock} from "react-icons/fa";
import {useRef} from "react";
import Divider from "@/app/ui/divider";
import Link from "next/link";

const lato = Lato({weight: ["300", "400", "700", "900"], subsets: ['latin']})

export default function Signup() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    const {pending} = useFormStatus();
    const emailIcon = useRef<HTMLElement>(null)

    return <div className={`w-full h-full py-12 ${lato.className}`}>
        <form
            action={dispatch}
            className="w-1/2 my-0 mx-auto"
        >
            <h1 className={`mb-3 text-3xl font-bold`}>
                Sign up for Foodplanet
            </h1>
            <p className={"mt-5 font-normal text-[#6c6f7c] text-lg"}>
                For food entrepreneurs, by food entrepreneurs. Get started now!
            </p>
            <div className="w-full mt-12">
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
                        ref={emailIcon}
                        className={"absolute text-lg left-3 top-1/2"}
                        style={{
                            transform: "translateY(-50%)"
                        }}
                    />
                </div>
                <div className={"relative text-gray-400 focus-within:text-gray-800 mt-4"}>
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
                        ref={emailIcon}
                        className={"absolute text-lg left-3 top-1/2"}
                        style={{
                            transform: "translateY(-50%)"
                        }}
                    />
                </div>
                <div className={"mt-4"}>
                    <label className={"flex gap-2"}>
                        <input
                            id="terms_agreement"
                            type="checkbox"
                            name="terms_agreement"
                            required
                        />
                        <span className={"text-sm"}>
                            I agree to the Foodpanel
                            <Link href={"/"} className={"text-main-blue hover:text-hover-main-blue"}> Terms and Conditions</Link>
                        </span>
                    </label>
                </div>
            </div>
            <button
                type={"submit"}
                className="mt-4 bg-main-green rounded-md py-2 px-6 text-white cursor-pointer"
                aria-disabled={pending}
                disabled={!pending}
            >
                Sign up
            </button>
            {errorMessage && (<div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                <p className="text-sm text-red-500">{errorMessage}</p>
            </div>)}

            <Divider height={1} heightUnits={"px"} margin={1.5} marginUnits={"rem"} color={"#f2f7fb"}/>

            <div className={"flex gap-1 items-center text-sm"}>
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
}
