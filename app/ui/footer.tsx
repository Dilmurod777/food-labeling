import Image from "next/image";
import Link from "next/link";
import {FaPhone, FaInstagram, FaTwitter, FaFacebook} from "react-icons/fa";
import {ReactNode} from "react";

interface ContactItem {
    text: string,
    icon: ReactNode,
    url: string
}

export default function Footer() {
    const contacts: ContactItem[] = [
        {
            text: "(844) 732-4725",
            icon: <FaPhone/>,
            url: "/"
        },
        {
            text: "@Foodplanetco",
            icon: <FaInstagram/>,
            url: "/"
        },
        {
            text: "@Foodplanet",
            icon: <FaTwitter/>,
            url: "/"
        },
        {
            text: "facebook.com/Foodplanet",
            icon: <FaFacebook/>,
            url: "/"
        }
    ]

    return <div className={"flex flex-col gap-12 py-12 px-24 bg-[#f9fafa]"}>
        <div className={"flex justify-between items-stretch"}>
            <div className={"flex flex-col items-start justify-center basis-1/4"}>
                <Image
                    src={"/logo.png"}
                    alt={"logo"}
                    width={100}
                    height={100}
                    priority
                />

                <div className={"flex flex-col gap-2 mt-2"}>
                    {contacts.map((item, i) => <Link
                        href={item.url}
                        key={`contact-info-${i}`}
                        className={"flex items-center gap-2 text-[#6c6f7c] text-sm"}
                    >
                        {item.icon}
                        <span>{item.text}</span>
                    </Link>)}
                </div>
            </div>

            <div className={"basis-1/4 flex flex-col items-end"}>
                <h4 className={"mb-4 font-bold color-[#16181e] text-lg"}>Company</h4>
                <Link
                    href={"/"}
                    className={"mb-4 text-[#6c6f7c] text-sm font-normal"}
                >About</Link>
                <Link
                    href={"/"}
                    className={"mb-4 text-[#6c6f7c] text-sm font-normal"}
                >Blog</Link>
                <Link
                    href={"/"}
                    className={"mb-4 text-[#6c6f7c] text-sm font-normal"}
                >Legal</Link>
                <Link
                    href={"/"}
                    className={"mb-4 text-[#6c6f7c] text-sm font-normal"}
                >Affiliates</Link>
            </div>
            <div className={"basis-1/4 flex flex-col items-end"}>
                <h4 className={"mb-4 font-bold color-[#16181e] text-lg"}>Resources</h4>
                <Link
                    href={"/"}
                    className={"mb-4 text-[#6c6f7c] text-sm font-normal"}
                >FAQ</Link>
                <Link
                    href={"/"}
                    className={"mb-4 text-[#6c6f7c] text-sm font-normal"}
                >Contact</Link>
                <Link
                    href={"/"}
                    className={"mb-4 text-[#6c6f7c] text-sm font-normal"}
                >Video Tutorials</Link>
                <Link
                    href={"/"}
                    className={"text-[#6c6f7c] text-sm font-normal"}
                >API</Link>
            </div>
            <div className={"basis-1/4 flex flex-col items-end"}>
                <h4 className={"mb-4 font-bold color-[#16181e] text-lg"}>Products</h4>
                <Link
                    href={"/"}
                    className={"mb-4 text-[#6c6f7c] text-sm font-normal"}
                >Nutrition Label Software</Link>
                <Link
                    href={"/"}
                    className={"mb-4 text-[#6c6f7c] text-sm font-normal"}
                >Inventory</Link>
                <Link
                    href={"/"}
                    className={"mb-4 text-[#6c6f7c] text-sm font-normal"}
                >Hire Labeling Expert</Link>
                <Link
                    href={"/"}
                    className={"text-[#6c6f7c] text-sm font-normal"}
                >Label Printing</Link>
            </div>
        </div>
        <div className={"flex items-center justify-end"}>
            <p className={"text-sm text-[#6c6f7c] font-normal"}>
                Copyright © 2011-2024 Foodplanet, LLC. All rights reserved.
            </p>
        </div>
    </div>
}