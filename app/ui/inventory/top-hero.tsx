import Image from "next/image";
import InventoryIllustration from "@/public/images/inventory-illustration.svg";
import Link from "next/link";
import { GoVideo } from "react-icons/go";

export default function TopHero() {
  return (
    <div className={"flex w-full flex-col items-center px-12 pb-12"}>
      <h2 className={"mb-3 text-4xl font-bold text-black"}>
        Simple Lot Tracing and Inventory Tracking
      </h2>
      <p className={"text-lg font-bold text-black"}>
        Automated FIFO lot tracing, inventory management, and production
        planning to run your business
      </p>

      <div className={"mt-16 flex justify-center gap-16"}>
        <Image
          src={InventoryIllustration}
          alt={"Inventory Illustration"}
          style={{
            width: "35%",
            objectFit: "contain",
          }}
        />

        <div className={"flex w-1/2 flex-col items-center text-xl"}>
          <p className={"mb-3"}>
            If you&apos;re not doing lot tracing, you&apos;ve got problems. Food
            safety is serious business and{" "}
            <strong>you need the ability to quickly execute a recall.</strong>{" "}
            Foodplanet&apos;s inventory software helps you do just that, scaling
            with your business (unlike paper or spreadsheets), and saving you
            time.
          </p>
          <p className={"mb-3"}>
            We help you run and grow your business too —{" "}
            <strong>tracking inventory and how much it&apos;s worth</strong>,
            managing production, planning ahead for purchasing, and reporting.
          </p>
          <p>
            <strong>
              With our cloud-based software, all this is a breeze.
            </strong>{" "}
            Provide role-based access to staff, access it anywhere, and start
            managing your business like the pros.
          </p>

          <Link
            href={"#"}
            className={
              "flex items-center justify-center rounded-md bg-white px-8 py-4 text-[1rem] font-bold text-main-green " +
              "mt-12 border-[1px] border-main-green hover:bg-hover-main-green hover:text-white"
            }
          >
            Start managing inventory like the pros!
          </Link>

          <p className={"my-6 text-lg italic"}>or</p>

          <Link
            href={"#"}
            className={
              "flex items-center gap-2 text-main-blue hover:text-hover-main-blue"
            }
          >
            <GoVideo className={"text-xl"} />
            Watch our Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
