import { OptionalNutrient, Product, ProductLabelState } from "@/app/lib/models";
import {
  convertNetWeightToOz,
  getDailyNutrients,
  getTotalNutrients,
  roundByRule,
} from "@/app/lib/utilities";
import { getUnitByName } from "@/app/lib/constants/nutrients-units";
import { Fragment } from "react";
import { NET_WEIGHT_UNIT } from "@/app/lib/constants/product";

interface Props {
  product: Product;
  labelState?: ProductLabelState;
  type: "standard" | "simplified";
  optionalFats: OptionalNutrient[];
  optionalMineralsVitamins: OptionalNutrient[];
}

export default function Tabular({
  product,
  labelState,
  optionalMineralsVitamins,
  optionalFats,
  type,
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
      className={`flex h-full flex-grow gap-2 border-[1px] border-black px-1 pb-1 pt-2 text-left normal-case leading-none tracking-normal`}
    >
      <div className={"w-40"}>
        <p className={"pb-1 text-2xl font-black leading-none text-black"}>
          Nutrition Facts
        </p>
        <div className={"h-[0.5px] w-full bg-gray-500"} />
        <p className={"pb-[3px] pt-[2px] text-xs leading-none"}>
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
          {product.serving_per_package > 1 ? "servings" : "serving"} per
          container
        </p>
        <div className={"flex flex-col pb-1 text-sm font-bold leading-none"}>
          <p>Serving size</p>
          <p>{serving_size}</p>
        </div>
        <div className={"h-[0.5px] w-full bg-gray-500"} />
        <div
          className={
            "relative flex w-full items-end justify-between font-extrabold"
          }
        >
          <div>
            <p className="sm">Calories</p>
            <p className={"text-xs"}>per serving</p>
          </div>
          <div className="bottom-0 right-0 text-3xl">
            {getTotalNutrients(product, "calories")}
          </div>
        </div>
      </div>
      <div className={"flex w-96 flex-col"}>
        <div className={"flex gap-2"}>
          <div className={"w-52 border-b-4 border-black text-xs"}>
            <div
              className={
                "flex items-center justify-between border-b-4 border-black pb-[1px] text-[9px] font-bold leading-none"
              }
            >
              <p>Amount/serving</p>
              <p>% Daily Value*</p>
            </div>
            <div className={"flex items-center justify-between py-[1px]"}>
              <p>
                <span className={"font-bold"}>Total Fat </span>
                {getTotalNutrients(product, "fat")}
                {getUnitByName("fat")}
              </p>
              <strong>{getDailyNutrients(product, "fat")}%</strong>
            </div>
            <hr className="border-gray-500" />
            <div className={"ml-2 flex items-center justify-between py-[1px]"}>
              <p>
                {type == "standard" ? "Saturated Fat" : "Sat. Fat"}{" "}
                {getTotalNutrients(product, "saturated-fat")}
                {getUnitByName("saturated-fat")}
              </p>
              <strong>{getDailyNutrients(product, "saturated-fat")}%</strong>
            </div>
            <hr className="border-gray-500" />
            <div className={"ml-2 flex items-center justify-between py-[1px]"}>
              <p>
                <i>Trans</i> Fat {getTotalNutrients(product, "trans-fat")}
                {getUnitByName("trans-fat")}
              </p>
            </div>
            {optionalFats.map((item, i) => {
              if (!item.enabled) return <Fragment />;

              return (
                <Fragment key={`optional-fat-${i}`}>
                  <hr className="border-gray-500" />
                  <div
                    className={
                      "ml-2 flex items-center justify-between py-[1px]"
                    }
                  >
                    <p
                      dangerouslySetInnerHTML={{
                        __html: `${
                          type == "standard"
                            ? item.text
                            : item.text
                                .replace("Polyunsaturated", "Polyunsat.")
                                .replace("Monounsaturated", "Monounsat.")
                        }`,
                      }}
                    />
                    {item.dvText && (
                      <strong
                        dangerouslySetInnerHTML={{ __html: item.dvText }}
                      />
                    )}
                  </div>
                </Fragment>
              );
            })}
            <hr className="border-gray-500" />
            <div className={"flex items-center justify-between py-[1px]"}>
              <p>
                <strong>Cholesterol</strong>{" "}
                {getTotalNutrients(product, "cholesterol")}
                {getUnitByName("cholesterol")}
              </p>
              <strong>{getDailyNutrients(product, "cholesterol")}%</strong>
            </div>
            <hr className="border-gray-500" />
            <div className={"flex items-center justify-between py-[1px]"}>
              <p>
                <strong>Sodium</strong> {getTotalNutrients(product, "sodium")}
                {getUnitByName("sodium")}
              </p>
              <strong>{getDailyNutrients(product, "sodium")}%</strong>
            </div>
          </div>
          <div className={"w-52 border-b-4 border-black text-xs"}>
            <div
              className={
                "flex items-center justify-between border-b-4 border-black pb-[1px] text-[9px] font-bold leading-none"
              }
            >
              <p>Amount/serving</p>
              <p>% Daily Value*</p>
            </div>
            <div
              className={"flex items-center justify-between py-[1px] text-xs"}
            >
              <p>
                <strong>
                  {type == "standard" ? "Total Carbohydrate" : "Total Carb."}
                </strong>{" "}
                {getTotalNutrients(product, "carbohydrate")}
                {getUnitByName("carbohydrate")}
              </p>
              <strong>{getDailyNutrients(product, "carbohydrate")}%</strong>
            </div>
            <hr className="border-gray-500" />
            <div
              className={
                "ml-2 flex items-center justify-between py-[1px] text-xs"
              }
            >
              <p>
                Dietary Fiber {getTotalNutrients(product, "dietary-fiber")}
                {getUnitByName("dietary-fiber")}
              </p>
              <strong>{getDailyNutrients(product, "dietary-fiber")}%</strong>
            </div>
            <hr className="border-gray-500" />
            <div
              className={
                "ml-2 flex items-center justify-between py-[1px] text-xs"
              }
            >
              <p>
                Total Sugars {getTotalNutrients(product, "sugar")}
                {getUnitByName("sugar")}
              </p>
            </div>
            <hr className="border-gray-500" />
            <div
              className={
                "ml-4 flex items-center justify-between py-[1px] text-xs"
              }
            >
              <p>
                Includes {getTotalNutrients(product, "added-sugar")}
                {getUnitByName("added-sugar")} Added Sugars
              </p>
              <strong>{getDailyNutrients(product, "added-sugar")}%</strong>
            </div>
            {labelState?.sugar_alcohol_enabled && (
              <Fragment>
                <hr className="border-gray-500" />
                <div
                  className={
                    "ml-2 flex items-center justify-between py-[1px] text-xs"
                  }
                >
                  <p>
                    Sugar Alcohol {getTotalNutrients(product, "sugar-alcohol")}
                    {getUnitByName("sugar-alcohol")}
                  </p>
                </div>
              </Fragment>
            )}
            <hr className="border-gray-500" />
            <div
              className={"flex items-center justify-between py-[1px] text-xs"}
            >
              <p>
                <strong>Protein</strong> {getTotalNutrients(product, "protein")}
                {getUnitByName("protein")}
              </p>
            </div>
          </div>
        </div>
        {type == "standard" && (
          <div className={"py-1 text-xs/none"}>
            Vitamin D {getTotalNutrients(product, "vitamin-d")}
            {getUnitByName("vitamin-d")}{" "}
            {getDailyNutrients(product, "vitamin-d")}% • Calcium{" "}
            {getTotalNutrients(product, "calcium")}
            {getUnitByName("calcium")} {getDailyNutrients(product, "vitamin-d")}
            % • Iron {getTotalNutrients(product, "iron")}
            {getUnitByName("iron")} {getDailyNutrients(product, "vitamin-d")}%
            <br />
            Potassium {getTotalNutrients(product, "potassium")}
            {getUnitByName("potassium")}{" "}
            {getDailyNutrients(product, "potassium")}%
            {optionalMineralsVitamins
              .filter((item) => item.enabled)
              .map((item, i) => (
                <Fragment key={`optional-minerals-vitamins-${i}`}>
                  &nbsp;•&nbsp;
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `${item.text} ${item.dvText}`,
                    }}
                  />
                </Fragment>
              ))}
          </div>
        )}

        {type == "simplified" &&
          lowAmountOptionalMineralsVitamins.length > 0 && (
            <div className={"py-1 text-xs/none"}>
              Not a significant source of {lowAmountOptionalMineralsVitamins}
            </div>
          )}
      </div>
    </div>
  );
}
