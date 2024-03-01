import { OptionalNutrient, Product, ProductLabelState } from "@/app/lib/models";
import {
  capitalize,
  convertNetWeightToOz,
  convertParamToTitle,
  getDailyNutrients,
  getTotalNutrients,
  roundByRule,
} from "@/app/lib/utilities";
import { getUnitByName } from "@/app/lib/constants/nutrients-units";
import { Fragment, useEffect, useState } from "react";
import { NET_WEIGHT_UNIT } from "@/app/lib/constants/product";

interface Props {
  product: Product;
  labelState?: ProductLabelState;
  labelLanguage: string;
  optionalFats: OptionalNutrient[];
  optionalMineralsVitamins: OptionalNutrient[];
}

interface Translation {
  [key: string]: string;
}

export default function VerticalDualLanguage({
  product,
  labelState,
  optionalFats,
  optionalMineralsVitamins,
  labelLanguage,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [translations, setTranslations] = useState<Translation>({});

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

  const keywords: Translation = {
    nutrition_facts: "Nutrition Facts",
    serving_per_package:
      (labelState?.varied_servings
        ? "Varied"
        : (product.serving_per_package !=
          Math.floor(product.serving_per_package)
            ? "About "
            : "") +
          roundByRule(product.serving_per_package, "serving_per_package")) +
      (product.serving_per_package > 1 ? " servings" : " serving") +
      " per container",
    serving_size: "serving size",
    amount_per_serving: "amount per serving",
    calories: "calories",
    daily_value: "daily value",
    total_fat: "total fat",
    saturated_fat: "Saturated Fat",
    trans_fat: "<i>Trans</i> Fat",
    cholesterol: "Cholesterol",
    sodium: "Sodium",
    carbohydrate: "Total Carbohydrate",
    dietary_fiber: "Dietary Fiber",
    sugar: "total sugars",
    sugar_alcohol: "Sugar Alcohol",
    protein: "protein",
    added_sugar: `Includes <num/><unit/> Added Sugars`,
    vitamin_d: "Vitamin D",
    calcium: "Calcium",
    iron: "Iron",
    potassium: "Potassium",
    bottom_text:
      "The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.",
  };

  optionalFats.forEach((item) => (keywords[item.key] = item.text));
  optionalMineralsVitamins.forEach(
    (item) => (keywords[item.key] = convertParamToTitle(item.key)),
  );

  useEffect(() => {
    setLoading(true);
    setTranslations(
      Object.keys(keywords).reduce<Translation>((obj, item) => {
        obj[item] = "";
        return obj;
      }, {}),
    );

    fetch("/api/translate", {
      method: "POST",
      body: JSON.stringify({
        text: Object.values(keywords).join("; "),
        target: labelLanguage,
      }),
    })
      .then((response) => response.json())
      .then((data: string) => {
        const items = data.split(";");
        setTranslations(
          Object.keys(keywords).reduce<Translation>((obj, item, i) => {
            obj[item] = items[i]?.trim() || keywords[item];
            return obj;
          }, {}),
        );
        setLoading(false);
      });
  }, [labelLanguage]);

  if (loading) {
    return <div className={"py-2 text-sm text-black"}>Loading...</div>;
  }

  return (
    <div
      className={`h-full w-full flex-grow border-[1px] border-black p-2 text-left normal-case leading-none tracking-wide`}
    >
      <p className={"pb-1 text-2xl font-black leading-none text-black"}>
        {capitalize(keywords.nutrition_facts, " ")}/
        {capitalize(translations.nutrition_facts, " ")}
      </p>
      <div className={"h-[0.5px] w-full bg-gray-500"} />
      <p className={"pb-[3px] pt-[2px] text-sm leading-none"}>
        {capitalize(keywords.serving_per_package)}/
        {capitalize(translations.serving_per_package)}
      </p>
      <div
        className={
          "mb-1 flex justify-between border-b-8 border-black pb-1 font-bold"
        }
      >
        <p>
          {capitalize(keywords.serving_size)}/
          {capitalize(translations.serving_size)}
        </p>
        <p>{serving_size}</p>
      </div>
      <div
        className={
          "relative flex w-full items-end justify-between font-extrabold"
        }
      >
        <div>
          <div className="text-sm font-bold leading-none">
            {capitalize(keywords.amount_per_serving)}/
            {capitalize(translations.amount_per_serving)}
          </div>
          <div className="text-2xl">
            {capitalize(keywords.calories)}/{capitalize(translations.calories)}
          </div>
        </div>
        <div className="absolute bottom-0 right-0 text-3xl">
          {getTotalNutrients(product, "calories")}
        </div>
      </div>
      <div className={"border-t-4 border-black py-[1px] text-sm"}>
        <p className={"pb-[1px] text-right text-sm font-bold"}>
          % {capitalize(keywords.daily_value, " ")}*/%{" "}
          {capitalize(translations.daily_value, " ")}*
        </p>
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <p>
            <span className={"font-bold"}>
              {capitalize(keywords.total_fat, " ")}/
              {capitalize(translations.total_fat, " ")}{" "}
            </span>
            {getTotalNutrients(product, "fat", true)}
            {getUnitByName("fat")}
          </p>
          <strong>{getDailyNutrients(product, "fat", true)}%</strong>
        </div>
        <hr className="border-gray-500" />
        <div className={"ml-4 flex items-center justify-between text-xs"}>
          <p>
            {capitalize(keywords.saturated_fat, " ")}/
            {capitalize(translations.saturated_fat, " ")}{" "}
            {getTotalNutrients(product, "saturated-fat", true)}
            {getUnitByName("saturated-fat")}
          </p>
          <strong>{getDailyNutrients(product, "saturated-fat", true)}%</strong>
        </div>
        <hr className="border-gray-500" />
        <div className={"ml-4 flex items-center justify-between text-xs"}>
          <p>
            <span
              className={"capitalize"}
              dangerouslySetInnerHTML={{
                __html: `${keywords.trans_fat}/${translations.trans_fat}`,
              }}
            />{" "}
            {getTotalNutrients(product, "trans-fat", true)}
            {getUnitByName("trans-fat")}
          </p>
        </div>
        {optionalFats.map((item, i) => {
          if (!item.enabled) return <Fragment />;
          return (
            <Fragment key={`optional-fat-${i}`}>
              <hr className="border-gray-500" />
              <div className={"ml-4 flex items-center justify-between text-xs"}>
                <p>
                  {keywords[item.key]}/{translations[item.key]}
                </p>
                {item.dvText && <strong>{item.dvText}</strong>}
              </div>
            </Fragment>
          );
        })}
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <p>
            <strong>
              {capitalize(keywords.cholesterol)}/
              {capitalize(translations.cholesterol)}
            </strong>{" "}
            {getTotalNutrients(product, "cholesterol", true)}
            {getUnitByName("cholesterol")}
          </p>
          <strong>{getDailyNutrients(product, "cholesterol", true)}%</strong>
        </div>
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <p>
            <strong>
              {capitalize(keywords.sodium)}/{capitalize(translations.sodium)}
            </strong>{" "}
            {getTotalNutrients(product, "sodium", true)}
            {getUnitByName("sodium")}
          </p>
          <strong>{getDailyNutrients(product, "sodium", true)}%</strong>
        </div>
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <p>
            <strong>
              {capitalize(keywords.carbohydrate, " ")}/
              {capitalize(translations.carbohydrate, " ")}
            </strong>{" "}
            {getTotalNutrients(product, "carbohydrate", true)}
            {getUnitByName("carbohydrate")}
          </p>
          <strong>{getDailyNutrients(product, "carbohydrate", true)}%</strong>
        </div>
        <hr className="border-gray-500" />
        <div className={"ml-4 flex items-center justify-between text-xs"}>
          <p>
            {capitalize(keywords.dietary_fiber)}/
            {capitalize(translations.dietary_fiber)}{" "}
            {getTotalNutrients(product, "dietary-fiber", true)}
            {getUnitByName("dietary-fiber")}
          </p>
          <strong>{getDailyNutrients(product, "dietary-fiber", true)}%</strong>
        </div>
        <hr className="border-gray-500" />
        <div className={"ml-4 flex items-center justify-between text-xs"}>
          <p>
            {capitalize(keywords.sugar, " ")}/
            {capitalize(translations.sugar, " ")}{" "}
            {getTotalNutrients(product, "sugar", true)}
            {getUnitByName("sugar")}
          </p>
        </div>
        <hr className="border-gray-500" />
        <div className={"ml-8 flex items-center justify-between text-xs"}>
          <p>
            {capitalize(
              keywords.added_sugar
                .replace("<num/>", getTotalNutrients(product, "added-sugar"))
                .replace("<unit/>", getUnitByName("added-sugar")),
              " ",
            )}
            /
            {capitalize(
              translations.added_sugar
                .replace("<num/>", getTotalNutrients(product, "added-sugar"))
                .replace("<unit/>", getUnitByName("added-sugar")),
              " ",
            )}
          </p>
          <strong>{getDailyNutrients(product, "added-sugar", true)}%</strong>
        </div>
        {labelState?.sugar_alcohol_enabled && (
          <Fragment>
            <hr className="border-gray-500" />
            <div className={"ml-4 flex items-center justify-between text-xs"}>
              <p>
                {capitalize(keywords.sugar_alcohol)}/
                {capitalize(translations.sugar_alcohol)}{" "}
                {getTotalNutrients(product, "sugar-alcohol", true)}
                {getUnitByName("sugar-alcohol")}
              </p>
            </div>
          </Fragment>
        )}
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <p>
            <strong>
              {capitalize(keywords.protein)}/{capitalize(translations.protein)}
            </strong>{" "}
            {getTotalNutrients(product, "protein", true)}
            {getUnitByName("protein")}
          </p>
        </div>
      </div>

      <div className={"border-t-8 border-black py-[1px] text-sm"}>
        <div className={"flex items-center justify-between text-xs"}>
          <p>
            {capitalize(keywords.vitamin_d, " ")}/
            {capitalize(translations.vitamin_d, " ")}{" "}
            {getTotalNutrients(product, "vitamin-d", true)}
            {getUnitByName("vitamin-d")}
          </p>
          <p>{getDailyNutrients(product, "vitamin-d", true)}%</p>
        </div>
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <p>
            {capitalize(keywords.calcium)}/{capitalize(translations.calcium)}{" "}
            {getTotalNutrients(product, "calcium", true)}
            {getUnitByName("calcium")}
          </p>
          <p>{getDailyNutrients(product, "calcium", true)}%</p>
        </div>
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <p>
            {capitalize(keywords.iron)}/{capitalize(translations.iron)}{" "}
            {getTotalNutrients(product, "iron", true)}
            {getUnitByName("iron")}
          </p>
          <p>{getDailyNutrients(product, "iron", true)}%</p>
        </div>
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <p>
            {capitalize(keywords.potassium)}/
            {capitalize(translations.potassium)}{" "}
            {getTotalNutrients(product, "potassium", true)}
            {getUnitByName("potassium")}
          </p>
          <p>{getDailyNutrients(product, "potassium", true)}%</p>
        </div>
        {optionalMineralsVitamins.map((item, i) => {
          if (!item.enabled) return <Fragment />;

          return (
            <Fragment key={`optional-mineral-vitamin-${i}`}>
              <hr className="border-gray-500" />
              <div className={"flex items-center justify-between text-xs"}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: `${capitalize(convertParamToTitle(item.key), " ")}/${capitalize(translations[item.key], " ")} ${getTotalNutrients(product, item.key)}${getUnitByName(item.key)}`,
                  }}
                />
                {item.dvText && <p>{item.dvText}</p>}
              </div>
            </Fragment>
          );
        })}
        <div
          className={
            "flex flex-col gap-1 border-t-4 border-black pt-1 text-xs leading-none"
          }
        >
          <div className={"flex"}>
            <div className="pr-1">*</div>
            <div>{capitalize(keywords.bottom_text)}</div>
          </div>
          <div className={"flex"}>
            <div className="pr-1">*</div>
            <div>{capitalize(translations.bottom_text)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
