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
  type: "standard" | "side-by-side-micronutrients";
  subtype?: "default" | "infant" | "children" | "pregnant";
  optionalFats: OptionalNutrient[];
  optionalMineralsVitamins: OptionalNutrient[];
}

export default function Vertical({
  product,
  labelState,
  type,
  subtype = "default",
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
              subtype,
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
        <p className={"pb-[1px] text-right text-sm font-bold"}>
          % Daily Value*
        </p>
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <p>
            <span className={"font-bold"}>Total Fat </span>
            {getTotalNutrients(product, "fat", true, subtype)}
            {getUnitByName("fat")}
          </p>
          <strong>{getDailyNutrients(product, "fat", true, subtype)}%</strong>
        </div>
        <hr className="border-gray-500" />
        <div className={"ml-4 flex items-center justify-between text-xs"}>
          <p>
            Saturated Fat{" "}
            {getTotalNutrients(product, "saturated-fat", true, subtype)}
            {getUnitByName("saturated-fat")}
          </p>
          <strong>
            {getDailyNutrients(product, "saturated-fat", true, subtype)}%
          </strong>
        </div>
        <hr className="border-gray-500" />
        <div className={"ml-4 flex items-center justify-between text-xs"}>
          <p>
            <i>Trans</i> Fat{" "}
            {getTotalNutrients(product, "trans-fat", true, subtype)}
            {getUnitByName("trans-fat")}
          </p>
        </div>
        {optionalFats.map((item, i) => {
          if (!item.enabled) return <Fragment />;
          return (
            <Fragment key={`optional-fat-${i}`}>
              <hr className="border-gray-500" />
              <div className={"ml-4 flex items-center justify-between text-xs"}>
                <p>{item.text}</p>
                {item.dvText && <strong>{item.dvText}</strong>}
              </div>
            </Fragment>
          );
        })}
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <p>
            <strong>Cholesterol</strong>{" "}
            {getTotalNutrients(product, "cholesterol", true, subtype)}
            {getUnitByName("cholesterol")}
          </p>
          <strong>
            {getDailyNutrients(product, "cholesterol", true, subtype)}%
          </strong>
        </div>
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <p>
            <strong>Sodium</strong>{" "}
            {getTotalNutrients(product, "sodium", true, subtype)}
            {getUnitByName("sodium")}
          </p>
          <strong>
            {getDailyNutrients(product, "sodium", true, subtype)}%
          </strong>
        </div>
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <p>
            <strong>Total Carbohydrate</strong>{" "}
            {getTotalNutrients(product, "carbohydrate", true, subtype)}
            {getUnitByName("carbohydrate")}
          </p>
          <strong>
            {getDailyNutrients(product, "carbohydrate", true, subtype)}%
          </strong>
        </div>
        <hr className="border-gray-500" />
        <div className={"ml-4 flex items-center justify-between text-xs"}>
          <p>
            Dietary Fiber{" "}
            {getTotalNutrients(product, "dietary-fiber", true, subtype)}
            {getUnitByName("dietary-fiber")}
          </p>
          <strong>
            {getDailyNutrients(product, "dietary-fiber", true, subtype)}%
          </strong>
        </div>
        <hr className="border-gray-500" />
        <div className={"ml-4 flex items-center justify-between text-xs"}>
          <p>
            Total Sugars {getTotalNutrients(product, "sugar", true, subtype)}
            {getUnitByName("sugar")}
          </p>
        </div>
        <hr className="border-gray-500" />
        <div className={"ml-8 flex items-center justify-between text-xs"}>
          <p>
            Includes {getTotalNutrients(product, "added-sugar", true, subtype)}
            {getUnitByName("added-sugar")} Added Sugars
          </p>
          <strong>
            {getDailyNutrients(product, "added-sugar", true, subtype)}%
          </strong>
        </div>
        {labelState?.sugar_alcohol_enabled && (
          <Fragment>
            <hr className="border-gray-500" />
            <div className={"ml-4 flex items-center justify-between text-xs"}>
              <p>
                Sugar Alcohol{" "}
                {getTotalNutrients(product, "sugar-alcohol", true, subtype)}
                {getUnitByName("sugar-alcohol")}
              </p>
            </div>
          </Fragment>
        )}
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <p>
            <strong>Protein</strong>{" "}
            {getTotalNutrients(product, "protein", true, subtype)}
            {getUnitByName("protein")}
          </p>
        </div>
      </div>

      {type == "standard" && (
        <div className={"border-t-8 border-black py-[1px] text-sm"}>
          <div className={"flex items-center justify-between text-xs"}>
            <p>
              Vitamin D {getTotalNutrients(product, "vitamin-d", true, subtype)}
              {getUnitByName("vitamin-d")}
            </p>
            <p>{getDailyNutrients(product, "vitamin-d", true, subtype)}%</p>
          </div>
          <hr className="border-gray-500" />
          <div className={"flex items-center justify-between text-xs"}>
            <p>
              Calcium {getTotalNutrients(product, "calcium", true, subtype)}
              {getUnitByName("calcium")}
            </p>
            <p>{getDailyNutrients(product, "calcium", true, subtype)}%</p>
          </div>
          <hr className="border-gray-500" />
          <div className={"flex items-center justify-between text-xs"}>
            <p>
              Iron {getTotalNutrients(product, "iron", true, subtype)}
              {getUnitByName("iron")}
            </p>
            <p>{getDailyNutrients(product, "iron", true, subtype)}%</p>
          </div>
          <hr className="border-gray-500" />
          <div className={"flex items-center justify-between text-xs"}>
            <p>
              Potassium {getTotalNutrients(product, "potassium", true, subtype)}
              {getUnitByName("potassium")}
            </p>
            <p>{getDailyNutrients(product, "potassium", true, subtype)}%</p>
          </div>
          {optionalMineralsVitamins.map((item, i) => {
            if (!item.enabled) return <Fragment />;

            return (
              <Fragment key={`optional-mineral-vitamin-${i}`}>
                <hr className="border-gray-500" />
                <div className={"flex items-center justify-between text-xs"}>
                  <p dangerouslySetInnerHTML={{ __html: item.text }} />
                  {item.dvText && <p>{item.dvText}</p>}
                </div>
              </Fragment>
            );
          })}
          <div
            className={"flex border-t-4 border-black pt-1 text-xs leading-none"}
          >
            <div className="pr-1">*</div>
            <div>
              The % Daily Value (DV) tells you how much a nutrient in a serving
              of food contributes to a daily diet. 2,000 calories a day is used
              for general nutrition advice.
            </div>
          </div>
        </div>
      )}

      {type == "side-by-side-micronutrients" && (
        <div className={"border-t-8 border-black py-[1px] text-sm"}>
          <div className={"flex items-center justify-between text-xs"}>
            <p className={"w-5/12"}>
              Vit. D {getTotalNutrients(product, "vitamin-d", true, subtype)}
              {getUnitByName("vitamin-d")}{" "}
              {getDailyNutrients(product, "vitamin-d", true, subtype)}%
            </p>
            <span>•</span>
            <p className={"w-6/12 text-right"}>
              Calcium {getTotalNutrients(product, "calcium", true, subtype)}
              {getUnitByName("calcium")}{" "}
              {getDailyNutrients(product, "calcium", true, subtype)}%
            </p>
          </div>
          <hr className="border-gray-500" />
          <div className={"flex items-center justify-between text-xs"}>
            <p className={"w-5/12"}>
              Iron {getTotalNutrients(product, "iron", true, subtype)}
              {getUnitByName("iron")}{" "}
              {getDailyNutrients(product, "iron", true, subtype)}%
            </p>
            <span>•</span>
            <p className={"w-6/12 text-right"}>
              Potas. {getTotalNutrients(product, "potassium", true, subtype)}
              {getUnitByName("potassium")}{" "}
              {getDailyNutrients(product, "potassium", true, subtype)}%
            </p>
          </div>
          {optionalMineralsVitamins
            .filter((item) => item.enabled)
            .reduce((result, item, index) => {
              const chunkIndex = Math.floor(index / 2);

              if (!result[chunkIndex]) {
                result[chunkIndex] = [];
              }

              result[chunkIndex].push(item);

              return result;
            }, [] as OptionalNutrient[][])
            .map((item, i) => {
              return (
                <Fragment key={`optional-mineral-vitamin-${i}`}>
                  <hr className="border-gray-500" />
                  <div className={"flex items-start justify-between text-xs"}>
                    <p
                      className={"w-5/12"}
                      dangerouslySetInnerHTML={{
                        __html: `${item[0].text} ${item[0].dvText}`,
                      }}
                    />
                    <span>•</span>
                    {item.length == 2 && (
                      <p
                        className={"w-6/12 text-right"}
                        dangerouslySetInnerHTML={{
                          __html: `${item[1].text} ${item[1].dvText}`,
                        }}
                      />
                    )}
                  </div>
                </Fragment>
              );
            })}
          <div
            className={"flex border-t-4 border-black pt-1 text-xs leading-none"}
          >
            <div className="pr-1">*</div>
            <div>
              The % Daily Value (DV) tells you how much a nutrient in a serving
              of food contributes to a daily diet. 2,000 calories a day is used
              for general nutrition advice.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
