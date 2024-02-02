import Image from "next/image";
import IngredientLabeling from "@/public/images/ingredient-labeling.png";
import Link from "next/link";
import {GrLinkNext} from "react-icons/gr";
import Divider from "@/app/ui/divider";

export default function NutritionLabelingThatIsFun() {
    return <div className={"bg-white text-black py-12 w-full px-12 flex items-center justify-between"}>
        <div className={"flex flex-col items-start justify-center px-12 py-3 w-1/2"}>
            <h2 className={"text-5xl mb-6 font-bold"}>
                Nutrition labeling that&apos;s flexible
            </h2>
            <p className={"text-lg font-normal"}>
                Choose from a variety of label styles. Customize your look, feel, and which nutrients to display. Save
                and print your label in flexible formats.
            </p>
            <Link
                href={"/"}
                className={"group flex items-center text-lg font-normal mt-12 text-main-green hover:text-hover-main-green"}
            >
                <span
                    className={"mr-2 group-hover:mr-4 transition-all font-bold text-lg"}
                >
                    Learn More About Nutrition Labeling
                </span>
                <GrLinkNext/>
            </Link>

            {/*<Divider height={2} heightUnits={"px"} margin={3} marginUnits={"rem"} color={"#f2f7fb"}/>*/}

            {/*<blockquote className={"border-l-main-green border-l-[5px] py-5 px-6"}>*/}
            {/*    <p className={"mb-4 text-lg font-normal"}>*/}
            {/*        &quot;So many of our small businesses struggle to get nutrition labels done, this is a much needed*/}
            {/*        resource that we&apos;ll be incorporating into our curriculum.&quot;*/}
            {/*    </p>*/}
            {/*    <p className={"font-bold text-lg"}>Leticia</p>*/}
            {/*    <span className={"bold-thin text-sm"}>Program Developer, La Cocina Incubator</span>*/}
            {/*</blockquote>*/}
        </div>

        <div className={"px-12 py-6 w-[45%] h-full"}>
            <Image
                src={IngredientLabeling}
                alt={"Ingredient Labeling"}
                style={{
                    height: '100%',
                    width: "100%",
                    objectFit: "contain",
                    boxShadow: "0 0.5em 1em -0.125em #0a0a0a33, 0 0 0 1px #0a0a0a0a"
                }}
            />
        </div>
    </div>
}