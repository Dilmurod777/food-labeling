import Link from "next/link";
import { TbCloudLock } from "react-icons/tb";
import { PiDevices } from "react-icons/pi";
import { MdGroups } from "react-icons/md";

export default function RecipeManagementInTheCloud() {
    return <div className={"flex flex-col items-center w-full gap-16 py-12 w-full px-12 text-secondary-gray"}>
        <Link
            href={"nutrition-label-software?page=5"}
            className={"text-4xl text-normal"}
        >
            Recipe management <strong>in the cloud</strong>
        </Link>

        <div className={"flex justify-center items-center gap-24 w-full text-center"}>
            <div className={"flex flex-col items-center gap-4"}>
                <TbCloudLock className={"text-8xl text-main-green"}/>
                <p className={"text-xl text-thin"}><strong>Safely and securely</strong><br/>backed up in the cloud</p>
            </div>

            <div className={"flex flex-col items-center gap-4"}>
                <PiDevices className={"text-8xl text-main-green"}/>
                <p className={"text-xl text-thin"}>Access from anywhere<br/><strong>on any device</strong></p>
            </div>

            <div className={"flex flex-col items-center gap-4"}>
                <MdGroups className={"text-8xl text-main-green"}/>
                <p className={"text-xl text-thin"}>Easily <strong>share access</strong><br/>with colleagues</p>
            </div>
        </div>
    </div>
}