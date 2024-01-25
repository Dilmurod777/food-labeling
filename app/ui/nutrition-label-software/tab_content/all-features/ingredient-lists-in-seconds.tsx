import Link from "next/link";
import Divider from "@/app/ui/divider";
import Image from "next/image";
import LabelSamples from "@/public/images/label-samples.svg";

export default function IngredientListsInSeconds() {
    return <div className={"flex items-center justify-center gap-16 py-8 w-full px-12 bg-main-gray text-secondary-gray"}>
        <div className={"flex flex-col items-start w-3/5"}>
            <Link
                href={"/nutrition-label-software?page=4"}
                className={"text-5xl font-normal"}
            >Ingredient lists <strong>in seconds</strong></Link>

            <Divider height={8} heightUnits={"px"} width={100} widthUnits={"px"} color={"#00a734"} margin={2.5} marginUnits={"rem"}/>

            <p className={"text-xl text-black font-thin"}>Automatically create ingredient lists following FDA and CFIA guidelines in seconds. Edit
                ingredient
                names after they&apos;ve been put
                in descending weight order for you, and customize the look and feel on your labels.</p>
        </div>

        <Image
            src={LabelSamples}
            alt={"Label samples"}
            width={400}
            height={500}
            style={{
                objectFit: "scale-down"
            }}
        />
    </div>
}