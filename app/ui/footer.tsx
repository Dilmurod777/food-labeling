import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { FaLocationDot } from "react-icons/fa6";

interface ContactItem {
  text: string;
  icon: ReactNode;
  url: string;
}

export default function Footer() {
  const contacts: ContactItem[] = [
    {
      text: "100 Inha-ro, Michuhol-gu, Incheon",
      icon: <FaLocationDot />,
      url: "/",
    },
  ];

  return (
    <div className={"flex w-full flex-col gap-12 bg-main-gray px-12 py-12"}>
      <div className={"flex items-stretch justify-between"}>
        <div className={"flex basis-1/4 flex-col items-start justify-center"}>
          <Image
            src={"/logo-3.png"}
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
                className={"flex items-center gap-2 text-sm text-black"}
              >
                <span className={"text-xl text-main"}>{item.icon}</span>
                <span>{item.text}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className={"flex basis-1/4 flex-col items-end"}>
          <h4 className={"color-[#16181e] mb-4 text-lg font-bold"}>Products</h4>
          <Link
            href={"/dashboard"}
            className={"mb-4 text-sm font-normal text-[#6c6f7c]"}
          >
            Label Maker
          </Link>
          <Link
            href={"/ocr-label-maker"}
            className={"mb-4 text-sm font-normal text-[#6c6f7c]"}
          >
            OCR Label maker
          </Link>
          <Link
            href={"/packaging"}
            className={"mb-4 text-sm font-normal text-[#6c6f7c]"}
          >
            Packaging
          </Link>
        </div>
      </div>
    </div>
  );
}
