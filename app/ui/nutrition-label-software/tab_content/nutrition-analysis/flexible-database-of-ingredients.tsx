import Link from "next/link";
import {FaCheck} from "react-icons/fa";
import Image from "next/image";
import FlexibleDatabase from "@/public/images/nutrition-label-software/flexible-database.png";

export default function FlexibleDatabaseOfIngredients() {
    return <div className={"flex gap-24 items-center justify-center py-12 px-12"}>
        <div className={"flex flex-col items-start gap-4 w-2/5"}>
            <h2
                className={"font-normal text-4xl mb-8"}
            ><strong>Flexible database</strong> of ingredients</h2>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Easily search our database of ingredients</span>
            </p>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Create your own ingredients</span>
            </p>

            <p className={"flex gap-4 items-center"}>
                <FaCheck className={"text-2xl text-main-green"}/>
                <span className={"text-lg font-thin text-black"}>Subrecipes - use a recipe in another recipe</span>
            </p>
        </div>

        <Image
            src={FlexibleDatabase}
            alt={"Flexible Databaset"}
            className={"w-1/6"}
        />
    </div>
}