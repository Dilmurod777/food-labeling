import { OptionalNutrient, Product, ProductLabelState } from "@/app/lib/models";
import {
  capitalize,
  convertNetWeightToOz,
  getDailyNutrients,
  getRoundedValue,
  getTotalNutrients,
  roundByRule,
} from "@/app/lib/utilities";
import { getUnitByName } from "@/app/lib/constants/nutrients-units";
import { Fragment } from "react";
import { NET_WEIGHT_UNIT } from "@/app/lib/constants/product";

interface Props {
  product: Product;
  labelState?: ProductLabelState;
  optionalFats: OptionalNutrient[];
  optionalMineralsVitamins: OptionalNutrient[];
}

export default function VerticalSimplified({
  product,
  labelState,
  optionalFats,
  optionalMineralsVitamins,
}: Props) {
  const net_weight = Math.round(
    product.net_weight / product.serving_per_package,
  );
  const serving_size = product.serving_size
    ? labelState?.show_in_ounce
      ? `${product.serving_size} (${convertNetWeightToOz(product)}oz)`
      : `${product.serving_size} (${net_weight}${product.net_weight_unit || NET_WEIGHT_UNIT.G})`
    : labelState?.show_in_ounce
      ? `${net_weight}${product.net_weight_unit || NET_WEIGHT_UNIT.G} (${convertNetWeightToOz(product)}oz)`
      : `${net_weight}${product.net_weight_unit || NET_WEIGHT_UNIT.G}`;

  const lowAmountOptionalMineralsVitamins = optionalMineralsVitamins
    .map((item) => item.key)
    .concat(["vitamin-d", "calcium", "iron", "potassium"])
    .map((item) =>
      parseFloat(getTotalNutrients(product, item)) > 0 ? item : "",
    )
    .filter((item) => item.length)
    .join(", ");

  return (
    <div
      className={`h-full w-full flex-grow border-[1px] border-black p-2 text-left normal-case leading-none tracking-wide`}
    >
      <p className={"pb-1 text-2xl font-black leading-none text-black"}>
        Nutrition Facts
      </p>
      <div className={"h-[0.5px] w-full bg-gray-500"} />
      <p className={"pb-[3px] pt-[2px] text-sm leading-none"}>
        {labelState?.varied_servings
          ? "Varied"
          : (product.serving_per_package !=
            Math.floor(product.serving_per_package)
              ? "About "
              : "") +
            roundByRule(
              product.serving_per_package,
              "serving_per_package",
              "default",
            )}{" "}
        {product.serving_per_package > 1 ? "servings" : "serving"} per container
      </p>
      <div
        className={
          "mb-1 flex justify-between border-b-8 border-black pb-1 font-bold"
        }
      >
        <p>Serving size</p>
        <p>{serving_size}</p>
      </div>
      <div
        className={
          "relative flex w-full items-end justify-between font-extrabold"
        }
      >
        <div>
          <div className="text-sm font-bold leading-none">
            Amount per serving
          </div>
          <div className="text-2xl">Calories</div>
        </div>
        <div className="absolute bottom-0 right-0 text-3xl">
          {getTotalNutrients(product, "calories")}
        </div>
      </div>
      <div className={"border-t-4 border-black py-[1px] text-sm"}>
        <p className={"pb-[1px] text-right text-sm font-bold"}>% DV*</p>
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <p>
            <span className={"font-bold"}>Total Fat </span>
            {getTotalNutrients(product, "fat")}
            {getUnitByName("fat")}
          </p>
          <strong>{getDailyNutrients(product, "fat")}%</strong>
        </div>
        <hr className="border-gray-500" />
        <div className={"ml-4 flex items-center justify-between text-xs"}>
          <p>
            Sat. Fat {getTotalNutrients(product, "saturated-fat")}
            {getUnitByName("saturated-fat")}
          </p>
          <strong>{getDailyNutrients(product, "saturated-fat")}%</strong>
        </div>
        <hr className="border-gray-500" />
        <div className={"ml-4 flex items-center justify-between text-xs"}>
          <p>
            <i>Trans</i> Fat {getTotalNutrients(product, "trans-fat")}
            {getUnitByName("trans-fat")}
          </p>
        </div>
        <hr className="border-gray-500" />
        <div className={"ml-4 flex items-center justify-between text-xs"}>
          <p>
            Polyunsat. Fat {getTotalNutrients(product, "polyunsaturated-fat")}
            {getUnitByName("polyunsaturated-fat")}
          </p>
        </div>
        <hr className="border-gray-500" />
        <div className={"ml-4 flex items-center justify-between text-xs"}>
          <p>
            Monounsat. Fat {getTotalNutrients(product, "monounsaturated-fat")}
            {getUnitByName("monounsaturated-fat")}
          </p>
        </div>
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <p>
            <strong>Sodium</strong> {getTotalNutrients(product, "sodium")}
            {getUnitByName("sodium")}
          </p>
          <strong>{getDailyNutrients(product, "sodium")}%</strong>
        </div>
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <p>
            <strong>Total Carb.</strong>{" "}
            {getTotalNutrients(product, "carbohydrate")}
            {getUnitByName("carbohydrate")}
          </p>
          <strong>{getDailyNutrients(product, "carbohydrate")}%</strong>
        </div>
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <p>
            <strong>Protein</strong> {getTotalNutrients(product, "protein")}
            {getUnitByName("protein")}
          </p>
        </div>
      </div>

      <div className={"border-t-8 border-black text-xs/none"}>
        {lowAmountOptionalMineralsVitamins.length > 0 && (
          <div className={"py-[1px]"}>
            Not a significant source of {lowAmountOptionalMineralsVitamins}
          </div>
        )}
        <hr className="border-gray-500" />
        <div className={"flex pt-[1px]"}>
          <div className="pr-1">*</div>
          <div>% DV = %Daily Value</div>
        </div>
      </div>
    </div>
  );
}
