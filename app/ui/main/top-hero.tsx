import Image from "next/image";
import Link from "next/link";

import VerticalStandard from "@/public/images/labels/vertical-standard.png";
import VerticalDualLanguageKR from "@/public/images/labels/vertical-dual-language-kr.png";
import VerticalDualLanguageES from "@/public/images/labels/vertical-dual-language-es.png";
import TabularStandard from "@/public/images/labels/tabular-standard.png";
import LinearStandard from "@/public/images/labels/linear-standard.png";

export default function TopHero() {
  return (
    <div
      className={
        "relative mx-auto my-0 flex h-[650px] w-full flex-col items-center justify-start overflow-hidden bg-main px-12 pb-6 pt-12"
      }
    >
      <h2 className={"text-center text-6xl/none font-bold text-white"}>
        Generate Your Own
        <br />
        Nutrition Labels
      </h2>

      <p
        className={"mt-4 w-[500px] text-center text-base font-thin text-white"}
      >
        Our generator for nutrition labels is designed to guarantee alignment
        with the stringent standards set forth by both the FDA and CFIA,
        ensuring full compliance with all requirements.
      </p>

      <Image
        src={VerticalStandard}
        alt={"vertical-standard"}
        width={400}
        className={
          "absolute -bottom-[40%] -left-4 z-0 rotate-12 transition-all hover:-bottom-[38%]"
        }
      />

      <Image
        src={VerticalDualLanguageES}
        alt={"vertical-dual-language-es"}
        width={500}
        className={
          "-rotate-4 absolute -bottom-6 right-6 z-0 -rotate-6 transition-all hover:-bottom-2"
        }
      />

      <Image
        src={VerticalDualLanguageKR}
        alt={"vertical-dual-language-kr"}
        width={500}
        className={
          "-rotate-4 absolute -bottom-12 -right-2 z-0 -rotate-6 transition-all hover:-bottom-8"
        }
      />

      <Image
        src={LinearStandard}
        alt={"linear-standard"}
        width={500}
        className={
          "-rotate-4 absolute -bottom-12 right-1/2 z-0 -rotate-6 transition-all hover:-bottom-8"
        }
      />

      <Image
        src={TabularStandard}
        alt={"tabular-standard"}
        width={500}
        className={
          "-rotate-4 absolute -bottom-6 right-1/2 z-0 translate-x-2/3 rotate-6 transition-all hover:-bottom-4"
        }
      />
    </div>
  );
}
