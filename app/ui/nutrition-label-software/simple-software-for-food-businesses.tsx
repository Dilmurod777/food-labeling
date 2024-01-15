import Link from "next/link";

export default function SimpleSoftwareForFoodBusinesses() {
    return <div className={"flex flex-col py-16 px-16 bg-main-green text-white items-center justify-center"}>
        <div className={"w-3/4 flex flex-col items-start justify-center text-center"}>
            <h2 className={"text-5xl font-bold"}>
                Foodplanete: Simple Software for Food Businesses
            </h2>
            <p className={"my-6 font-thin text-lg"}>
                Join some of the most successful food brands in creating nutrition labels, costing your products, and tracking inventory on Foodplanet.
            </p>

            <div className={"flex justify-center gap-4 mt-4 w-full"}>
                <Link
                    href={"/"}
                    className={"flex items-center justify-center text-[1rem] text-main-green font-bold rounded-md bg-white px-12 py-4 hover:bg-gray-100"}
                >
                    Create your free label!
                </Link>
            </div>
        </div>
    </div>
}