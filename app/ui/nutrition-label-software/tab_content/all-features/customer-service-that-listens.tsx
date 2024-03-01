import Link from "next/link";
import Divider from "@/app/ui/divider";
import { MdMarkChatRead } from "react-icons/md";

export default function CustomerServiceThatListens() {
  return (
    <div
      className={
        "flex w-full items-center justify-center gap-16 bg-white px-12 py-12 text-secondary-gray"
      }
    >
      <MdMarkChatRead className={"text-[14rem] text-main-orange"} />

      <div className={"flex w-3/5 flex-col items-start"}>
        <Link
          href={"/nutrition-label-software?page=4"}
          className={"text-4xl font-normal"}
        >
          Customer service <strong>that listens</strong>
        </Link>

        <Divider
          height={8}
          heightUnits={"px"}
          width={100}
          widthUnits={"px"}
          color={"#fb9e1c"}
          margin={2.5}
          marginUnits={"rem"}
        />

        <p className={"text-lg font-thin text-black"}>
          Real people who’ve created thousands of labels answering your phone,
          email, and chat questions in real time. We take your feedback and
          build it into Foodplanet.
        </p>
      </div>
    </div>
  );
}
