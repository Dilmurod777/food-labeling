import { OptionalNutrient, Product, ProductLabelState } from "@/app/lib/models";
import {
  convertNetWeightToOz,
  convertParamToTitle,
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
  optionalFats: OptionalNutrient[];
  optionalMineralsVitamins: OptionalNutrient[];
}

export default function TabularDualColumn({
  product,
  labelState,
  optionalMineralsVitamins,
  optionalFats,
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

  const getRow = (
    param: string,
    topBorder = 1,
    leftSpacing = 0,
    titleBold: boolean = true,
    dvEnabled: boolean = true,
    dvBold: boolean = true,
  ) => {
    return (
      <div
        className={`flex items-stretch gap-2 *:items-start *:text-xs`}
        key={`row-${param}`}
      >
        <div
          className={`${titleBold ? "font-bold" : "font-normal"} w-1/3`}
          dangerouslySetInnerHTML={{ __html: convertParamToTitle(param, true) }}
          style={{
            paddingLeft: leftSpacing + "rem",
            borderTop: `${topBorder}px solid black`,
          }}
        />
        <div
          className={`flex w-1/3 items-center justify-between`}
          style={{
            borderTop: `${topBorder}px solid black`,
          }}
        >
          <span className={"text-left"}>
            {getTotalNutrients(product, param)}
            {getUnitByName(param)}
          </span>
          {dvEnabled && (
            <span
              className={`${dvBold ? "font-bold" : "font-normal"} w-1/3 text-right`}
            >
              {getDailyNutrients(product, param)}%
            </span>
          )}
        </div>

        <div
          className={`flex w-1/3 items-center justify-between`}
          style={{
            borderTop: `${topBorder}px solid black`,
          }}
        >
          <span className={"text-left"}>
            {getTotalNutrients(product, param, false)}
            {getUnitByName(param)}
          </span>
          {dvEnabled && (
            <span
              className={`${dvBold ? "font-bold" : "font-normal"} w-1/3 text-right`}
            >
              {getDailyNutrients(product, param, false)}%
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`flex h-full w-[950px] flex-grow gap-2 border-[1px] border-black px-1 pb-1 pt-2 text-left normal-case leading-none tracking-normal`}
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
          className={"relative mt-[1px] flex w-full flex-col font-extrabold"}
        >
          <div className="text-xl/none">Calories</div>
          <div className={"flex leading-none"}>
            <div className={"flex flex-col"}>
              <div className="bottom-0 right-0 text-3xl/none">
                {getTotalNutrients(product, "calories")}
              </div>
              <div className="text-xs/none">per serving</div>
            </div>
            <div className={"mx-1 w-[1px] bg-black"} />
            <div className={"flex flex-col"}>
              <div className="bottom-0 right-0 text-3xl/none">
                {getTotalNutrients(product, "calories", false)}
              </div>
              <div className="text-xs/none">per container</div>
            </div>
          </div>
        </div>
      </div>
      <div className={"flex flex-grow flex-col"}>
        <div className={"flex w-full flex-grow"}>
          <div className={"flex w-1/2 flex-col"}>
            <div className={"flex items-stretch gap-2"}>
              <div className={"w-1/3 border-b-8 border-black"} />
              <div
                className={
                  "flex w-1/3 flex-col items-end border-b-8 border-black pb-1 text-xs/none font-bold"
                }
              >
                <span>Per serving</span>
                <span>% DV*</span>
              </div>
              <div
                className={
                  "flex w-1/3 flex-col items-end border-b-8 border-black pb-1 text-xs/none font-bold"
                }
              >
                <span>Per container</span>
                <span>% DV*</span>
              </div>
            </div>

            {getRow("fat", 0)}
            {getRow("saturated-fat", 1, 0.5, false)}
            {getRow("trans-fat", 1, 0.5, false, false)}
            {optionalFats.map((item) => getRow(item.key, 1, 0.5, false, false))}
            {getRow("cholesterol", 1)}
            {getRow("sodium", 1)}
            {getRow("vitamin-d", 8, 0, false, true, false)}
            {getRow("calcium", 1, 0, false, true, false)}
            {optionalMineralsVitamins
              .slice(0, optionalMineralsVitamins.length / 2)
              .map((item) => getRow(item.key, 1, 0, false, true, false))}
          </div>

          <div className={"mx-2 my-1 w-[1px] bg-black"} />

          <div className={"flex w-1/2 flex-col"}>
            <div className={"flex items-stretch gap-2"}>
              <div className={"w-1/3 border-b-8 border-black"} />
              <div
                className={
                  "flex w-1/3 flex-col items-end border-b-8 border-black pb-1 text-xs/none font-bold"
                }
              >
                <span>Per serving</span>
                <span>% DV*</span>
              </div>
              <div
                className={
                  "flex w-1/3 flex-col items-end border-b-8 border-black pb-1 text-xs/none font-bold"
                }
              >
                <span>Per container</span>
                <span>% DV*</span>
              </div>
            </div>

            {getRow("carbohydrate", 0)}
            {getRow("dietary-fiber", 1, 0.5, false)}
            {getRow("sugar", 1, 0.5, false, false)}
            {getRow("added-sugar", 1, 1, false)}
            {labelState?.sugar_alcohol_enabled &&
              getRow("sugar-alcohol", 1, 0.5, false, false)}
            {getRow("protein", 1, 0, true, false)}
            {getRow("iron", 8, 0, false, true, false)}
            {getRow("potassium", 1, 0, false, true, false)}
            {optionalMineralsVitamins
              .slice(optionalMineralsVitamins.length / 2)
              .map((item) => getRow(item.key, 1, 0, false, true, false))}
          </div>
        </div>
        <div className={"border-t-[1px] border-black pt-1 text-xs/none"}>
          *The % Daily Value (DV) tells you how much a nutrient in a serving of
          food contributes to a daily diet. 2,000 calories a day is used for
          general nutrition advice.
        </div>
      </div>
    </div>
  );
}
