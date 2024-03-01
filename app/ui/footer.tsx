import Image from "next/image";
import Link from "next/link";
import { FaPhone, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { ReactNode } from "react";

interface ContactItem {
  text: string;
  icon: ReactNode;
  url: string;
}

export default function Footer() {
  const contacts: ContactItem[] = [
    {
      text: "(844) 732-4725",
      icon: <FaPhone />,
      url: "/",
    },
    {
      text: "@Foodplanetco",
      icon: <FaInstagram />,
      url: "/",
    },
    {
      text: "@Foodplanet",
      icon: <FaTwitter />,
      url: "/",
    },
    {
      text: "facebook.com/Foodplanet",
      icon: <FaFacebook />,
      url: "/",
    },
  ];

  return (
    <div className={"flex w-full flex-col gap-12 bg-main-gray px-12 py-12"}>
      <div className={"flex items-stretch justify-between"}>
        <div className={"flex basis-1/4 flex-col items-start justify-center"}>
          <Image
            src={"/logo.png"}
            alt={"logo"}
            width={100}
            height={100}
            priority
          />

          <div className={"mt-2 flex flex-col gap-2"}>
            {contacts.map((item, i) => (
              <Link
                href={item.url}
                key={`contact-info-${i}`}
                className={"flex items-center gap-2 text-sm text-[#6c6f7c]"}
              >
                {item.icon}
                <span>{item.text}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className={"flex basis-1/4 flex-col items-end"}>
          <h4 className={"color-[#16181e] mb-4 text-lg font-bold"}>Company</h4>
          <Link
            href={"/"}
            className={"mb-4 text-sm font-normal text-[#6c6f7c]"}
          >
            About
          </Link>
          <Link
            href={"/"}
            className={"mb-4 text-sm font-normal text-[#6c6f7c]"}
          >
            Blog
          </Link>
          <Link
            href={"/"}
            className={"mb-4 text-sm font-normal text-[#6c6f7c]"}
          >
            Legal
          </Link>
          <Link
            href={"/"}
            className={"mb-4 text-sm font-normal text-[#6c6f7c]"}
          >
            Affiliates
          </Link>
        </div>
        <div className={"flex basis-1/4 flex-col items-end"}>
          <h4 className={"color-[#16181e] mb-4 text-lg font-bold"}>
            Resources
          </h4>
          <Link
            href={"/"}
            className={"mb-4 text-sm font-normal text-[#6c6f7c]"}
          >
            FAQ
          </Link>
          <Link
            href={"/"}
            className={"mb-4 text-sm font-normal text-[#6c6f7c]"}
          >
            Contact
          </Link>
          <Link
            href={"/"}
            className={"mb-4 text-sm font-normal text-[#6c6f7c]"}
          >
            Video Tutorials
          </Link>
          <Link href={"/"} className={"text-sm font-normal text-[#6c6f7c]"}>
            API
          </Link>
        </div>
        <div className={"flex basis-1/4 flex-col items-end"}>
          <h4 className={"color-[#16181e] mb-4 text-lg font-bold"}>Products</h4>
          <Link
            href={"/"}
            className={"mb-4 text-sm font-normal text-[#6c6f7c]"}
          >
            Nutrition Label Software
          </Link>
          <Link
            href={"/"}
            className={"mb-4 text-sm font-normal text-[#6c6f7c]"}
          >
            Inventory
          </Link>
          <Link
            href={"/"}
            className={"mb-4 text-sm font-normal text-[#6c6f7c]"}
          >
            Hire Labeling Expert
          </Link>
          <Link href={"/"} className={"text-sm font-normal text-[#6c6f7c]"}>
            Label Printing
          </Link>
        </div>
      </div>
      <div className={"flex items-center justify-end"}>
        <p className={"text-sm font-normal text-[#6c6f7c]"}>
          Copyright © 2011-2024 Foodplanet, LLC. All rights reserved.
        </p>
      </div>
    </div>
  );
}
