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

  optionalFats.forEach(
    (item) => (keywords[item.key] = convertParamToTitle(item.key)),
  );
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
      <div
        className={
          "flex w-full items-center pb-1 text-2xl font-black leading-none text-black *:w-fit"
        }
      >
        <div>{capitalize(keywords.nutrition_facts, " ")}</div>
        <div>/</div>
        <div
          contentEditable={"plaintext-only"}
          suppressContentEditableWarning={true}
          className={"outline-none"}
        >
          {capitalize(translations.nutrition_facts, " ")}
        </div>
      </div>
      <div className={"h-[0.5px] w-full bg-gray-500"} />
      <div
        className={"flex items-center pb-[3px] pt-[2px] text-sm leading-none"}
      >
        <div>{capitalize(keywords.serving_per_package)}</div>
        <div>/</div>
        <div
          contentEditable={"plaintext-only"}
          suppressContentEditableWarning={true}
          className={"outline-none"}
        >
          {capitalize(translations.serving_per_package)}
        </div>
      </div>
      <div
        className={
          "mb-1 flex justify-between border-b-8 border-black pb-1 font-bold"
        }
      >
        <div className={"flex items-center"}>
          <div>{capitalize(keywords.serving_size)}</div>
          <div>/</div>
          <div
            className={"outline-none"}
            contentEditable={"plaintext-only"}
            suppressContentEditableWarning={true}
          >
            {capitalize(translations.serving_size)}
          </div>
        </div>
        <p>{serving_size}</p>
      </div>
      <div
        className={
          "relative flex w-full items-end justify-between font-extrabold"
        }
      >
        <div>
          <div className="flex items-center text-sm font-bold leading-none">
            <div>{capitalize(keywords.amount_per_serving)}</div>
            <div>/</div>
            <div
              className={"outline-none"}
              contentEditable={"plaintext-only"}
              suppressContentEditableWarning={true}
            >
              {capitalize(translations.amount_per_serving)}
            </div>
          </div>
          <div className="flex items-center text-2xl">
            <div>{capitalize(keywords.calories)}</div>
            <div>/</div>
            <div
              contentEditable={"plaintext-only"}
              suppressContentEditableWarning={true}
              className={"outline-none"}
            >
              {capitalize(translations.calories)}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 text-3xl">
          {getTotalNutrients(product, "calories")}
        </div>
      </div>
      <div className={"border-t-4 border-black py-[1px] text-sm"}>
        <div
          className={
            "flex items-center justify-end pb-[1px] text-right text-sm font-bold"
          }
        >
          <div>% {capitalize(keywords.daily_value, " ")}*</div>
          <div>/</div>
          <div
            className={"outline-none"}
            contentEditable={"plaintext-only"}
            suppressContentEditableWarning={true}
          >
            % {capitalize(translations.daily_value, " ")}*
          </div>
        </div>
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <p>
            <div className={"flex items-center font-bold"}>
              <div>{capitalize(keywords.total_fat, " ")}</div>
              <div>/</div>
              <div
                contentEditable={"plaintext-only"}
                className={"outline-none"}
                suppressContentEditableWarning={true}
              >
                {capitalize(translations.total_fat, " ")}
              </div>
              <div>
                &nbsp;{getTotalNutrients(product, "fat", true)}
                {getUnitByName("fat")}
              </div>
            </div>
          </p>
          <strong>{getDailyNutrients(product, "fat", true)}%</strong>
        </div>
        <hr className="border-gray-500" />
        <div className={"ml-4 flex items-center justify-between text-xs"}>
          <div className={"flex items-center"}>
            <div>{capitalize(keywords.saturated_fat, " ")}</div>
            <div>/</div>
            <div
              contentEditable={"plaintext-only"}
              className={"outline-none"}
              suppressContentEditableWarning={true}
            >
              {capitalize(translations.saturated_fat, " ")}
            </div>
            <div>
              &nbsp;{getTotalNutrients(product, "saturated-fat", true)}
              {getUnitByName("saturated-fat")}
            </div>
          </div>
          <strong>{getDailyNutrients(product, "saturated-fat", true)}%</strong>
        </div>
        <hr className="border-gray-500" />
        <div className={"ml-4 flex items-center justify-between text-xs"}>
          <div className={"flex items-center"}>
            <div
              className={"capitalize"}
              dangerouslySetInnerHTML={{
                __html: `${keywords.trans_fat}/`,
              }}
            />{" "}
            <div
              dangerouslySetInnerHTML={{ __html: `${translations.trans_fat}` }}
              className={"capitalize outline-none"}
              contentEditable={"plaintext-only"}
              suppressContentEditableWarning={true}
            />
            <div>
              {getTotalNutrients(product, "trans-fat", true)}
              {getUnitByName("trans-fat")}
            </div>
          </div>
        </div>
        {optionalFats.map((item, i) => {
          if (!item.enabled) return <Fragment />;
          return (
            <Fragment key={`optional-fat-${i}`}>
              <hr className="border-gray-500" />
              <div className={"ml-4 flex items-center justify-between text-xs"}>
                <div className={"flex items-center"}>
                  <div>{keywords[item.key]}</div>
                  <div>/</div>
                  <div
                    className={"outline-none"}
                    contentEditable={"plaintext-only"}
                    suppressContentEditableWarning={true}
                  >
                    {translations[item.key]}
                  </div>
                  <div>
                    &nbsp;{getTotalNutrients(product, item.key, true)}
                    {getUnitByName(item.key)}
                  </div>
                </div>
                {item.dvText && <strong>{item.dvText}</strong>}
              </div>
            </Fragment>
          );
        })}
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <p>
            <div className={"flex items-center font-bold"}>
              <div>{capitalize(keywords.cholesterol)}</div>
              <div>/</div>
              <div
                contentEditable={"plaintext-only"}
                suppressContentEditableWarning={true}
                className={"outline-none"}
              >
                {capitalize(translations.cholesterol)}
              </div>
              <div>
                &nbsp;{getTotalNutrients(product, "cholesterol", true)}
                {getUnitByName("cholesterol")}
              </div>
            </div>
          </p>
          <strong>{getDailyNutrients(product, "cholesterol", true)}%</strong>
        </div>
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <p>
            <div className={"flex items-center font-bold"}>
              <div>{capitalize(keywords.sodium)}</div>
              <div>/</div>
              <div
                contentEditable={"plaintext-only"}
                suppressContentEditableWarning={true}
                className={"outline-none"}
              >
                {capitalize(translations.sodium)}
              </div>
              <div>
                &nbsp;{getTotalNutrients(product, "sodium", true)}
                {getUnitByName("sodium")}
              </div>
            </div>
          </p>
          <strong>{getDailyNutrients(product, "sodium", true)}%</strong>
        </div>
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <p>
            <div className={"flex items-center font-bold"}>
              <div>{capitalize(keywords.carbohydrate, " ")}</div>
              <div>/</div>
              <div
                contentEditable={"plaintext-only"}
                suppressContentEditableWarning={true}
                className={"outline-none"}
              >
                {capitalize(translations.carbohydrate, " ")}
              </div>
              <div>
                &nbsp;{getTotalNutrients(product, "carbohydrate", true)}
                {getUnitByName("carbohydrate")}
              </div>
            </div>
          </p>
          <strong>{getDailyNutrients(product, "carbohydrate", true)}%</strong>
        </div>
        <hr className="border-gray-500" />
        <div className={"ml-4 flex items-center justify-between text-xs"}>
          <div className={"flex items-center"}>
            <div>{capitalize(keywords.dietary_fiber)}</div>
            <div>/</div>
            <div
              contentEditable={"plaintext-only"}
              suppressContentEditableWarning={true}
              className={"outline-none"}
            >
              {capitalize(translations.dietary_fiber)}
            </div>
            <div>
              &nbsp;{getTotalNutrients(product, "dietary-fiber", true)}
              {getUnitByName("dietary-fiber")}
            </div>
          </div>
          <strong>{getDailyNutrients(product, "dietary-fiber", true)}%</strong>
        </div>
        <hr className="border-gray-500" />
        <div className={"ml-4 flex items-center justify-between text-xs"}>
          <div className={"flex items-center"}>
            <div>{capitalize(keywords.sugar, " ")}</div>
            <div>/</div>
            <div
              contentEditable={"plaintext-only"}
              suppressContentEditableWarning={true}
              className={"outline-none"}
            >
              {capitalize(translations.sugar, " ")}
            </div>
            <div>
              {getTotalNutrients(product, "sugar", true)}
              {getUnitByName("sugar")}
            </div>
          </div>
        </div>
        <hr className="border-gray-500" />
        <div className={"ml-8 flex items-center justify-between text-xs"}>
          <div className={"flex items-center"}>
            <div>
              {capitalize(
                keywords.added_sugar
                  .replace("<num/>", getTotalNutrients(product, "added-sugar"))
                  .replace("<unit/>", getUnitByName("added-sugar")),
                " ",
              )}
            </div>
            <div>/</div>
            <div
              contentEditable={"plaintext-only"}
              suppressContentEditableWarning={true}
              className={"outline-none"}
            >
              {capitalize(
                translations.added_sugar
                  .replace("<num/>", getTotalNutrients(product, "added-sugar"))
                  .replace("<unit/>", getUnitByName("added-sugar")),
                " ",
              )}
            </div>
          </div>
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
          <div className={"flex items-center font-bold"}>
            <div>{capitalize(keywords.protein)}</div>
            <div>/</div>
            <div
              contentEditable={"plaintext-only"}
              suppressContentEditableWarning={true}
              className={"outline-none"}
            >
              {capitalize(translations.protein)}
            </div>
            <div>
              &nbsp;{getTotalNutrients(product, "protein", true)}
              {getUnitByName("protein")}
            </div>
          </div>
        </div>
      </div>

      <div className={"border-t-8 border-black py-[1px] text-sm"}>
        <div className={"flex items-center justify-between text-xs"}>
          <div className={"flex items-center"}>
            <div>{capitalize(keywords.vitamin_d, " ")}</div>
            <div>/</div>
            <div
              contentEditable={"plaintext-only"}
              suppressContentEditableWarning={true}
              className={"outline-none"}
            >
              {capitalize(translations.vitamin_d, " ")}
            </div>
            <div>
              &nbsp;{getTotalNutrients(product, "vitamin-d", true)}
              {getUnitByName("vitamin-d")}
            </div>
          </div>
          <p>{getDailyNutrients(product, "vitamin-d", true)}%</p>
        </div>
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <div className={"flex items-center"}>
            <div>{capitalize(keywords.calcium)}</div>
            <div>/</div>
            <div
              contentEditable={"plaintext-only"}
              suppressContentEditableWarning={true}
              className={"outline-none"}
            >
              {capitalize(translations.calcium)}
            </div>
            <div>
              &nbsp;{getTotalNutrients(product, "calcium", true)}
              {getUnitByName("calcium")}
            </div>
          </div>
          <p>{getDailyNutrients(product, "calcium", true)}%</p>
        </div>
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <div className={"flex items-center"}>
            <div>{capitalize(keywords.iron)}</div>
            <div>/</div>
            <div
              contentEditable={"plaintext-only"}
              suppressContentEditableWarning={true}
              className={"outline-none"}
            >
              {capitalize(translations.iron)}
            </div>
            <div>
              &nbsp;{getTotalNutrients(product, "iron", true)}
              {getUnitByName("iron")}
            </div>
          </div>
          <p>{getDailyNutrients(product, "iron", true)}%</p>
        </div>
        <hr className="border-gray-500" />
        <div className={"flex items-center justify-between text-xs"}>
          <div className={"flex items-center"}>
            <div>{capitalize(keywords.potassium)}</div>
            <div>/</div>
            <div
              contentEditable={"plaintext-only"}
              suppressContentEditableWarning={true}
              className={"outline-none"}
            >
              {capitalize(translations.potassium)}
            </div>
            <div>
              &nbsp;{getTotalNutrients(product, "potassium", true)}
              {getUnitByName("potassium")}
            </div>
          </div>
          <p>{getDailyNutrients(product, "potassium", true)}%</p>
        </div>
        {optionalMineralsVitamins.map((item, i) => {
          if (!item.enabled) return <Fragment />;

          return (
            <Fragment key={`optional-mineral-vitamin-${i}`}>
              <hr className="border-gray-500" />
              <div className={"flex items-center justify-between text-xs"}>
                <div className={"flex items-center"}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${capitalize(convertParamToTitle(item.key), " ")}`,
                    }}
                  />
                  <div>/</div>
                  <div
                    contentEditable={"plaintext-only"}
                    suppressContentEditableWarning={true}
                    className={"outline-none"}
                    dangerouslySetInnerHTML={{
                      __html: `${capitalize(translations[item.key], " ")}`,
                    }}
                  />
                  <div>
                    &nbsp;{getTotalNutrients(product, item.key)}
                    {getUnitByName(item.key)}
                  </div>
                </div>
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
            <div
              contentEditable={"plaintext-only"}
              suppressContentEditableWarning={true}
              className={"outline-none"}
            >
              {capitalize(translations.bottom_text)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
