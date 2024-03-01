import Link from "next/link";

export default function SimpleSoftwareForFoodBusinesses() {
  return (
    <div
      className={
        "flex flex-col items-center justify-center bg-main-orange px-16 py-16 text-white"
      }
    >
      <div
        className={
          "flex w-full flex-col items-start justify-center px-12 text-center"
        }
      >
        <h2 className={"text-5xl font-bold"}>
          Foodplanete: Simple Software for Food Businesses
        </h2>
        <p className={"my-6 text-lg font-thin"}>
          Join some of the most successful food brands in creating nutrition
          labels, costing your products, and tracking inventory on Foodplanet.
        </p>

        <div className={"mt-4 flex w-full justify-center gap-4"}>
          <Link
            href={"/"}
            className={
              "flex items-center justify-center rounded-md bg-white px-12 py-4 text-[1rem] font-bold text-main-orange hover:bg-gray-100"
            }
          >
            Create your free label!
          </Link>
        </div>
      </div>
    </div>
  );
}
