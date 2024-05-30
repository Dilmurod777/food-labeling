"use client";

import AllPackagesImg from "@/public/images/packaging/all.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { LuPackage, LuPackageCheck } from "react-icons/lu";
import { RxDimensions } from "react-icons/rx";
import { MdOutlineDownloading } from "react-icons/md";
import { TbLayoutBoard } from "react-icons/tb";

export default function Content() {
  const router = useRouter();

  return (
    <div className={"flex h-full w-full flex-grow flex-col"}>
      <div
        className={
          "flex h-[700px] w-full items-center justify-center gap-2 bg-white"
        }
      >
        <div className={"flex w-96 flex-col items-center gap-8 text-center"}>
          <h1 className={"text-5xl/none font-bold"}>
            Fast and Easy Package Creation!
          </h1>
          <p className={"text-xl/none font-normal"}>
            Design your own package effortlessly with a real-time and free 3D
            editor — no waiting required!
          </p>

          <Button
            onClick={() => router.push("/packaging/models")}
            className={"w-fit bg-main-orange hover:bg-hover-main-orange"}
          >
            Get Started
          </Button>
        </div>

        <Image src={AllPackagesImg} alt={"All Packages"} width={600} />
      </div>

      <div
        className={
          "flex w-full flex-col items-center justify-center gap-12 bg-main-orange px-12 pb-16 pt-24"
        }
      >
        <div className={"flex items-start justify-center gap-8"}>
          <div
            className={"flex w-2/12 flex-col items-center gap-5 text-center"}
          >
            <LuPackageCheck className={"text-8xl text-white"} />
            <h1 className={"text-4xl/none font-bold"}>Step 1.</h1>
            <p className={"text-xl/none font-bold"}>Select package type</p>
            <p className={"text-sm/none"}>
              Choose a package that suits your product and intended use.
            </p>
          </div>

          <div
            className={"flex w-2/12 flex-col items-center gap-5 text-center"}
          >
            <RxDimensions className={"z-10 text-8xl text-white"} />
            <h1 className={"text-4xl/none font-bold"}>Step 2.</h1>
            <p className={"text-xl/none font-bold"}>Select size and quantity</p>
            <p className={"text-sm/none"}>
              Determine the box size and order quantity appropriate for the
              product size.
            </p>
          </div>

          <div
            className={"flex w-2/12 flex-col items-center gap-5 text-center"}
          >
            <TbLayoutBoard className={"z-10 text-8xl text-white"} />
            <h1 className={"text-4xl/none font-bold"}>Step 3.</h1>
            <p className={"text-xl/none font-bold"}>Design with the editor</p>
            <p className={"text-sm/none"}>
              Check your design in real time with 3D preview
            </p>
          </div>

          <div
            className={"flex w-2/12 flex-col items-center gap-5 text-center"}
          >
            <MdOutlineDownloading className={"z-10 text-8xl text-white"} />
            <h1 className={"text-4xl/none font-bold"}>Step 4.</h1>
            <p className={"text-xl/none font-bold"}>Export</p>
            <p className={"text-sm/none"}>
              Export your custom package as image or 3D model
            </p>
          </div>
        </div>

        <Button
          onClick={() => router.push("/packaging/models")}
          className={"w-fit bg-white text-main-orange hover:bg-gray-100"}
        >
          See all packages
        </Button>
      </div>
    </div>
  );
}
