import Link from "next/link";
import { TbCloudLock } from "react-icons/tb";
import { PiDevices } from "react-icons/pi";
import { MdGroups } from "react-icons/md";

export default function RecipeManagementInTheCloud() {
  return (
    <div
      className={
        "flex w-full w-full flex-col items-center gap-16 px-12 py-12 text-secondary-gray"
      }
    >
      <Link
        href={"nutrition-label-software?page=5"}
        className={"text-normal text-4xl"}
      >
        Recipe management <strong>in the cloud</strong>
      </Link>

      <div
        className={"flex w-full items-center justify-center gap-24 text-center"}
      >
        <div className={"flex flex-col items-center gap-4"}>
          <TbCloudLock className={"text-8xl text-main-green"} />
          <p className={"text-thin text-xl"}>
            <strong>Safely and securely</strong>
            <br />
            backed up in the cloud
          </p>
        </div>

        <div className={"flex flex-col items-center gap-4"}>
          <PiDevices className={"text-8xl text-main-green"} />
          <p className={"text-thin text-xl"}>
            Access from anywhere
            <br />
            <strong>on any device</strong>
          </p>
        </div>

        <div className={"flex flex-col items-center gap-4"}>
          <MdGroups className={"text-8xl text-main-green"} />
          <p className={"text-thin text-xl"}>
            Easily <strong>share access</strong>
            <br />
            with colleagues
          </p>
        </div>
      </div>
    </div>
  );
}
