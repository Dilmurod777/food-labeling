import { OptionalNutrient, Product, ProductLabelState } from "@/app/lib/models";
import {
  capitalize,
  convertNetWeightToOz,
  convertParamToTitle,
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

export default function VerticalDualColumn({
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

  const getRow = (
    param: string,
    leftPadding = 0,
    dvEnabled = true,
    borderTop = 1,
    borderBottom = 0,
    boldTitle = true,
    boldDV = true,
  ) => {
    return (
      <div
        className={`flex gap-[1px] text-xs`}
        key={`row-${param}`}
        style={{
          borderTop: `${borderTop}px solid black`,
          borderBottom: `${borderBottom}px solid black`,
        }}
      >
        <div className={"flex w-4/12 items-end justify-start text-left"}>
          <div
            className={`${boldTitle ? "font-bold" : "font-normal"} pl-${leftPadding}`}
            dangerouslySetInnerHTML={{ __html: convertParamToTitle(param) }}
          />
        </div>
        <div className={"mx-1 w-[1px] bg-black"} />
        <div className={"flex w-4/12 items-end justify-between text-right"}>
          <div>
            {getTotalNutrients(product, param)}
            {getUnitByName(param)}
          </div>
          {dvEnabled && (
            <div className={`${boldDV ? "font-bold" : "font-normal"}`}>
              {getDailyNutrients(product, param)}%
            </div>
          )}
        </div>
        <div className={"mx-1 w-[1px] bg-black"} />
        <div className={"flex w-4/12 items-end  justify-between text-right"}>
          <div>
            {getTotalNutrients(product, param, false)}
            {getUnitByName(param)}
          </div>
          {dvEnabled && (
            <div className={`${boldDV ? "font-bold" : "font-normal"}`}>
              {getDailyNutrients(product, param, false)}%
            </div>
          )}
        </div>
      </div>
    );
  };

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

      <div className={"flex w-full flex-col"}>
        <div className={"flex gap-[1px]"}>
          <div
            className={
              "flex w-4/12 items-end justify-start border-b-4 border-black pb-[1px] text-left font-bold *:leading-none"
            }
          >
            <div className="text-2xl">Calories</div>
          </div>
          <div className={"mx-1 w-[1px] bg-black"} />
          <div
            className={
              "flex w-4/12 flex-col justify-end border-b-4 border-black text-right font-bold *:leading-none"
            }
          >
            <div className={"text-sm"}>Per serving</div>
            <div className={"text-3xl"}>
              {getTotalNutrients(product, "calories")}
            </div>
          </div>
          <div className={"mx-1 w-[1px] bg-black"} />
          <div
            className={
              "flex w-4/12 flex-col justify-end border-b-4 border-black text-right font-bold *:leading-none"
            }
          >
            <div className={"text-sm"}>Per container</div>
            <div className={"text-3xl"}>
              {getTotalNutrients(product, "calories", false)}
            </div>
          </div>
        </div>

        <div className={"flex gap-[1px] *:py-1"}>
          <div
            className={
              "flex w-4/12 items-end justify-start text-left font-bold *:leading-none"
            }
          />
          <div className={"mx-1 w-[1px] bg-black"} />
          <div
            className={
              "flex w-4/12 flex-col justify-end text-right font-bold *:leading-none"
            }
          >
            <div className={"text-sm"}>% DV*</div>
          </div>
          <div className={"mx-1 w-[1px] bg-black"} />
          <div
            className={
              "flex w-4/12 flex-col justify-end text-right font-bold *:leading-none"
            }
          >
            <div className={"text-sm"}>% DV*</div>
          </div>
        </div>
        {getRow("fat", 0)}
        {getRow("saturated-fat", 2, true, 1, 0, false, true)}
        {getRow("trans-fat", 2, false, 1, 0, false, true)}
        {optionalFats.map((item) =>
          getRow(item.key, 2, false, 1, 0, false, false),
        )}
        {getRow("cholesterol", 0)}
        {getRow("sodium", 0)}
        {getRow("carbohydrate", 0)}
        {getRow("dietary-fiber", 2, true, 1, 0, false, true)}
        {getRow("sugar", 2, false, 1, 0, false, false)}
        {getRow("added-sugar", 4, true, 1, 0, false, true)}
        {labelState?.sugar_alcohol_enabled &&
          getRow("sugar-alcohol", 2, false, 1, 0, false, true)}
        {getRow("protein", 0, false, 1, 8)}
        {getRow("vitamin-d", 0, true, 1, 0, false, false)}
        {getRow("calcium", 0, true, 1, 0, false, false)}
        {getRow("iron", 0, true, 1, 0, false, false)}
        {getRow("potassium", 0, true, 1, 0, false, false)}
        {optionalMineralsVitamins.map((item) =>
          getRow(item.key, 0, true, 1, 0, false, false),
        )}
        <div className={"mt-0.5 h-1 bg-black"} />
        <div
          className={"flex border-t-4 border-black pt-1 text-xs leading-none"}
        >
          <div className="pr-1">*</div>
          <div>
            The % Daily Value (DV) tells you how much a nutrient in a serving of
            food contributes to a daily diet. 2,000 calories a day is used for
            general nutrition advice.
          </div>
        </div>
      </div>
    </div>
  );
}
