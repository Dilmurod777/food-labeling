import {
  Allergens,
  Ingredient,
  Label,
  OptionalNutrient,
  Product,
  ProductLabelState,
} from "@/app/lib/models";
import { LabelType } from "@/app/lib/constants/label";
import Vertical from "@/app/ui/labels/vertical";
import Tabular from "@/app/ui/labels/tabular";
import LinearStandard from "@/app/ui/labels/linear-standard";
import { Helvetica } from "@/app/lib/local_fonts";
import {
  capitalize,
  convertNetWeightToOz,
  convertStringToNetWeight,
  getDailyNutrients,
  getTotalNutrients,
} from "@/app/lib/utilities";
import { getUnitByName } from "@/app/lib/constants/nutrients-units";
import VerticalDualColumn from "@/app/ui/labels/vertical-dual-column";
import VerticalSimplified from "@/app/ui/labels/vertical-simplified";
import TabularDualColumn from "@/app/ui/labels/tabular-dual-column";
import { NET_WEIGHT_UNIT } from "@/app/lib/constants/product";
import VerticalDualLanguage from "@/app/ui/labels/vertical-dual-language";
import { useMemo } from "react";

interface Props {
  product: Product;
  labelState?: ProductLabelState;
  labelType: string;
  labelLanguage: string;
  allergens: Allergens[];
  facilityAllergens: Allergens[];
  otherAllergens: string;
  otherFacilityAllergens: string;
  brand: string;
  best_before: string;
  address: string;
  company: string;
  manufacturer: string;
  country: string;
  prepareInstructions: string;
  storageInstructions: string;
  comments: string;
  items: Ingredient[];
}

export default function ProductLabel({
  product,
  labelState,
  labelType,
  labelLanguage,
  allergens,
  facilityAllergens,
  otherAllergens,
  otherFacilityAllergens,
  items,
  brand,
  best_before,
  prepareInstructions,
  storageInstructions,
  address,
  company,
  comments,
  manufacturer,
  country,
}: Props) {
  const textAlign = labelState?.justify_center ? "text-center" : "text-left";
  let textDecoration = labelState?.make_lowercase ? "lowercase" : "normal-case";
  textDecoration = labelState?.make_titlecase ? "capitalize" : textDecoration;

  const width = useMemo(() => {
    if (
      [
        LabelType.VerticalStandard.toString(),
        LabelType.VerticalSideBySideMicronutrients.toString(),
        LabelType.VerticalSimplified.toString(),
        LabelType.VerticalInfant.toString(),
        LabelType.VerticalChildren.toString(),
        LabelType.VerticalPregnant.toString(),
      ].includes(labelType)
    ) {
      return "w-[280px]";
    } else if ([LabelType.TabularStandard.toString()].includes(labelType)) {
      return "w-fit";
    } else if ([LabelType.LinearStandard.toString()].includes(labelType)) {
      return "w-[400px]";
    } else if ([LabelType.VerticalDualColumn.toString()].includes(labelType)) {
      return "w-[480px]";
    } else if (
      [LabelType.VerticalDualLanguage.toString()].includes(labelType)
    ) {
      return "w-[500px]";
    } else if ([LabelType.TabularDualColumn.toString()].includes(labelType)) {
      return "w-[960px]";
    } else {
      return "w-fit";
    }
  }, [labelType]);

  const showFront =
    labelState?.show_product_name ||
    labelState?.show_brand ||
    labelState?.show_best_before ||
    labelState?.show_net_weight;
  const showBack =
    labelState?.show_ingredient_list ||
    labelState?.show_allergens ||
    labelState?.show_country ||
    labelState?.show_company ||
    labelState?.show_address ||
    labelState?.show_cross_contamination ||
    labelState?.show_prepare_instructions ||
    labelState?.show_storage_instructions;

  const optionalFats: OptionalNutrient[] = useMemo(
    () =>
      [
        {
          enabled: !!labelState?.polyunsaturated_fat_enabled,
          text: `Polyunsaturated Fat ${getTotalNutrients(product, "polyunsaturated_fat")}${getUnitByName("polyunsaturated_fat")}`,
          dvText: "",
          key: "polyunsaturated-fat",
        },
        {
          enabled: !!labelState?.monounsaturated_fat_enabled,
          text: `Monounsaturated Fat ${getTotalNutrients(product, "monounsaturated_fat")}${getUnitByName("monounsaturated_fat")}`,
          dvText: "",
          key: "monounsaturated-fat",
        },
      ].filter((item) => item.enabled),
    [
      product.monounsaturated_fat,
      product.polyunsaturated_fat,
      labelState?.polyunsaturated_fat_enabled,
      labelState?.monounsaturated_fat_enabled,
    ],
  );
  const optionalMineralsVitamins: OptionalNutrient[] = useMemo(
    () =>
      [
        {
          enabled: !!labelState?.vitamin_a_enabled,
          text: `Vitamin A ${getTotalNutrients(product, "vitamin-a")}${getUnitByName("vitamin-a")}`,
          dvText: `${getDailyNutrients(product, "vitamin-a")}%`,
          key: "vitamin-a",
        },
        {
          enabled: !!labelState?.vitamin_c_enabled,
          text: `Vitamin C ${getTotalNutrients(product, "vitamin-c")}${getUnitByName("vitamin-c")}`,
          dvText: `${getDailyNutrients(product, "vitamin-c")}%`,
          key: "vitamin-c",
        },
        {
          enabled: !!labelState?.thiamin_enabled,
          text: `Thiamin ${getTotalNutrients(product, "thiamin")}${getUnitByName("thiamin")}`,
          dvText: `${getDailyNutrients(product, "thiamin")}%`,
          key: "thiamin",
        },
        {
          enabled: !!labelState?.riboflavin_enabled,
          text: `Riboflavin ${getTotalNutrients(product, "riboflavin")}${getUnitByName("riboflavin")}`,
          dvText: `${getDailyNutrients(product, "riboflavin")}%`,
          key: "riboflavin",
        },
        {
          enabled: !!labelState?.niacin_enabled,
          text: `Niacin ${getTotalNutrients(product, "niacin")}${getUnitByName("niacin")}`,
          dvText: `${getDailyNutrients(product, "niacin")}%`,
          key: "niacin",
        },
        {
          enabled: !!labelState?.vitamin_b6_enabled,
          text: `Vitamin B<sub>6</sub> ${getTotalNutrients(product, "vitamin_b6")}${getUnitByName("vitamin_b6")}`,
          dvText: `${getDailyNutrients(product, "vitamin_b6")}%`,
          key: "vitamin-b6",
        },
        {
          enabled: !!labelState?.folate_enabled,
          text: `Folate ${getTotalNutrients(product, "folate")}${getUnitByName("folate")}`,
          dvText: `${getDailyNutrients(product, "folate")}%`,
          key: "folate",
        },
        {
          enabled: !!labelState?.vitamin_b12_enabled,
          text: `Vitamin B<sub>12</sub> ${getTotalNutrients(product, "vitamin_b12")}${getUnitByName("vitamin_b12")}`,
          dvText: `${getDailyNutrients(product, "vitamin_b12")}%`,
          key: "vitamin-b12",
        },
        {
          enabled: !!labelState?.vitamin_e_enabled,
          text: `Vitamin E ${getTotalNutrients(product, "vitamin_e")}${getUnitByName("vitamin_e")}`,
          dvText: `${getDailyNutrients(product, "vitamin_e")}%`,
          key: "vitamin-e",
        },
        {
          enabled: !!labelState?.vitamin_k_enabled,
          text: `Vitamin K ${getTotalNutrients(product, "vitamin_k")}${getUnitByName("vitamin_k")}`,
          dvText: `${getDailyNutrients(product, "vitamin_k")}%`,
          key: "vitamin-k",
        },
        {
          enabled: !!labelState?.phosphorus_enabled,
          text: `Phosphorus ${getTotalNutrients(product, "phosphorus")}${getUnitByName("phosphorus")}`,
          dvText: `${getDailyNutrients(product, "phosphorus")}%`,
          key: "phosphorus",
        },
        {
          enabled: !!labelState?.magnesium_enabled,
          text: `Magnesium ${getTotalNutrients(product, "magnesium")}${getUnitByName("magnesium")}`,
          dvText: `${getDailyNutrients(product, "magnesium")}%`,
          key: "magnesium",
        },
        {
          enabled: !!labelState?.zinc_enabled,
          text: `Zinc ${getTotalNutrients(product, "zinc")}${getUnitByName("zinc")}`,
          dvText: `${getDailyNutrients(product, "zinc")}%`,
          key: "zinc",
        },
        {
          enabled: !!labelState?.selenium_enabled,
          text: `Selenium ${getTotalNutrients(product, "selenium")}${getUnitByName("selenium")}`,
          dvText: `${getDailyNutrients(product, "selenium")}%`,
          key: "selenium",
        },
        {
          enabled: !!labelState?.manganese_enabled,
          text: `Manganese ${getTotalNutrients(product, "manganese")}${getUnitByName("manganese")}`,
          dvText: `${getDailyNutrients(product, "manganese")}%`,
          key: "manganese",
        },
        {
          enabled: !!labelState?.copper_enabled,
          text: `Copper ${getTotalNutrients(product, "copper")}${getUnitByName("copper")}`,
          dvText: `${getDailyNutrients(product, "copper")}%`,
          key: "copper",
        },
        {
          enabled: !!labelState?.pantothenic_acid,
          text: `Pantothenic Acid ${getTotalNutrients(product, "pantothenic_acid")}${getUnitByName("pantothenic_acid")}`,
          dvText: `${getDailyNutrients(product, "pantothenic_acid")}%`,
          key: "pantothenic-acid",
        },
      ].filter((item) => item.enabled),
    [
      product.vitamin_a,
      product.vitamin_c,
      product.thiamin,
      product.riboflavin,
      product.niacin,
      product.vitamin_b6,
      product.vitamin_e,
      product.vitamin_k,
      product.phosphorus,
      product.magnesium,
      product.zinc,
      product.selenium,
      product.manganese,
      product.copper,
      product.pantothenic_acid,
      labelState?.vitamin_a_enabled,
      labelState?.vitamin_c_enabled,
      labelState?.thiamin_enabled,
      labelState?.riboflavin_enabled,
      labelState?.niacin_enabled,
      labelState?.vitamin_b6_enabled,
      labelState?.folate_enabled,
      labelState?.vitamin_b12_enabled,
      labelState?.vitamin_e_enabled,
      labelState?.vitamin_k_enabled,
      labelState?.phosphorus_enabled,
      labelState?.magnesium_enabled,
      labelState?.zinc_enabled,
      labelState?.selenium_enabled,
      labelState?.manganese_enabled,
      labelState?.copper_enabled,
      labelState?.pantothenic_acid_enabled,
    ],
  );

  return (
    <div className={`flex items-start gap-8 ${Helvetica.className}`}>
      <div className={"flex flex-col gap-2"}>
        <div
          id={"product-label"}
          className={`${width} flex flex-col gap-2 border-[1px] border-main-gray p-1`}
        >
          {labelType == LabelType.VerticalStandard.toString() && (
            <Vertical
              product={product}
              labelState={labelState}
              type={"standard"}
              optionalFats={optionalFats}
              optionalMineralsVitamins={optionalMineralsVitamins}
            />
          )}

          {labelType ==
            LabelType.VerticalSideBySideMicronutrients.toString() && (
            <Vertical
              product={product}
              labelState={labelState}
              type={"side-by-side-micronutrients"}
              optionalFats={optionalFats}
              optionalMineralsVitamins={optionalMineralsVitamins}
            />
          )}

          {labelType == LabelType.VerticalDualColumn.toString() && (
            <VerticalDualColumn
              product={product}
              labelState={labelState}
              optionalFats={optionalFats}
              optionalMineralsVitamins={optionalMineralsVitamins}
            />
          )}

          {labelType == LabelType.VerticalSimplified.toString() && (
            <VerticalSimplified
              product={product}
              labelState={labelState}
              optionalFats={optionalFats}
              optionalMineralsVitamins={optionalMineralsVitamins}
            />
          )}

          {labelType == LabelType.VerticalDualLanguage.toString() && (
            <VerticalDualLanguage
              product={product}
              labelState={labelState}
              labelLanguage={labelLanguage}
              optionalFats={optionalFats}
              optionalMineralsVitamins={optionalMineralsVitamins}
            />
          )}

          {labelType == LabelType.VerticalInfant.toString() && (
            <Vertical
              product={product}
              type={"standard"}
              subtype={"infant"}
              labelState={labelState}
              optionalFats={optionalFats}
              optionalMineralsVitamins={optionalMineralsVitamins}
            />
          )}

          {labelType == LabelType.VerticalChildren.toString() && (
            <Vertical
              product={product}
              type={"standard"}
              subtype={"children"}
              labelState={labelState}
              optionalFats={optionalFats}
              optionalMineralsVitamins={optionalMineralsVitamins}
            />
          )}

          {labelType == LabelType.VerticalPregnant.toString() && (
            <Vertical
              product={product}
              type={"standard"}
              subtype={"pregnant"}
              labelState={labelState}
              optionalFats={optionalFats}
              optionalMineralsVitamins={optionalMineralsVitamins}
            />
          )}

          {labelType == LabelType.TabularStandard.toString() && (
            <Tabular
              product={product}
              type={"standard"}
              labelState={labelState}
              optionalFats={optionalFats}
              optionalMineralsVitamins={optionalMineralsVitamins}
            />
          )}

          {labelType == LabelType.TabularDualColumn.toString() && (
            <TabularDualColumn
              product={product}
              labelState={labelState}
              optionalFats={optionalFats}
              optionalMineralsVitamins={optionalMineralsVitamins}
            />
          )}

          {labelType == LabelType.TabularSimplified.toString() && (
            <Tabular
              product={product}
              type={"simplified"}
              labelState={labelState}
              optionalFats={optionalFats}
              optionalMineralsVitamins={optionalMineralsVitamins}
            />
          )}

          {labelType == LabelType.LinearStandard.toString() && (
            <LinearStandard
              product={product}
              labelState={labelState}
              optionalFats={optionalFats}
              optionalMineralsVitamins={optionalMineralsVitamins}
            />
          )}
        </div>

        {comments.length > 0 && (
          <div
            id={"product-comments"}
            className={`${width} border-[1px] border-main-gray p-2 text-base/none font-normal text-black`}
            dangerouslySetInnerHTML={{
              __html: comments,
            }}
          />
        )}
      </div>

      <div
        className={
          `flex w-[525px] flex-col gap-2 *:flex *:flex-col *:gap-2 *:border-[1px] *:border-main-gray *:p-2 ` +
          `*:text-base/none *:font-normal *:text-black`
        }
      >
        {showFront && (
          <div
            id={"product-info-front"}
            className={`${textAlign} ${textDecoration} leading-[1.1]`}
          >
            {labelState?.show_brand && (
              <p>
                <strong>Brand Name: </strong>
                {brand || "None"}
              </p>
            )}
            {labelState?.show_product_name && (
              <p>
                <strong>Product Name: </strong>
                {product.name || "None"}
              </p>
            )}
            {labelState?.show_net_weight && (
              <p>
                <strong>Net Weight: </strong>
                {product.net_weight}
                {product.net_weight_unit || NET_WEIGHT_UNIT.G}&nbsp;
                {labelState?.show_in_ounce
                  ? `(${convertNetWeightToOz(product, false)}oz)`
                  : ""}
              </p>
            )}
            {labelState?.show_best_before && (
              <p>
                <strong>Best Before: </strong>
                {best_before || "None"}
              </p>
            )}
          </div>
        )}

        {showBack && (
          <div
            id={"product-info-back"}
            className={`${textAlign} ${textDecoration} leading-[1.1]`}
          >
            {labelState?.show_ingredient_list && (
              <p>
                <strong>Ingredients: </strong>
                {items
                  .sort((a, b) => b.weight - a.weight)
                  .map((item) => capitalize(item.label_name || item.name || ""))
                  .filter((item) => item.length)
                  .join(", ")}
                {items.length == 0 && "None"}.
              </p>
            )}

            {labelState?.show_allergens && (
              <p>
                <strong>Contains: </strong>
                {allergens
                  .map((item) => {
                    if (item.children) {
                      const children = item.children
                        .filter((item) => item.value)
                        .map((item) => item.name)
                        .concat([item.other || ""])
                        .filter((item) => item.length)
                        .join(", ");

                      if (children != "") {
                        return capitalize(item.name + `(${children})`, "-");
                      }
                    }

                    return capitalize(item.name);
                  })
                  .concat([otherAllergens])
                  .filter((item) => item.length)
                  .join(", ") || "None"}
                .
              </p>
            )}

            {labelState?.show_cross_contamination && (
              <p className={"normal-case"}>
                <span>Manufactured in the facility that also processes </span>
                {facilityAllergens
                  .map((item) => {
                    if (item.children) {
                      const children = item.children
                        .filter((item) => item.value)
                        .map((item) => item.name)
                        .concat([item.other || ""])
                        .filter((item) => item.length)
                        .join(", ");

                      if (children != "") {
                        return item.name + `(${children})`;
                      }
                    }

                    return item.name;
                  })
                  .concat([otherFacilityAllergens])
                  .filter((item) => item.length)
                  .join(", ") || "None"}
                .
              </p>
            )}

            {labelState?.show_prepare_instructions && (
              <p className={"normal-case"}>
                {prepareInstructions
                  ? prepareInstructions[0].toUpperCase() +
                    prepareInstructions.slice(1).toLowerCase()
                  : "No prepare instructions."}
              </p>
            )}

            {labelState?.show_storage_instructions && (
              <p className={"normal-case"}>
                {storageInstructions
                  ? storageInstructions[0].toUpperCase() +
                    storageInstructions.slice(1).toLowerCase()
                  : "No storage instructions."}
              </p>
            )}

            {labelState?.show_company && (
              <p className={"normal-case"}>
                <span>Manufactured for </span>
                {company
                  ? company[0].toUpperCase() + company.slice(1).toLowerCase()
                  : "unknown"}
                &nbsp;by{" "}
                {manufacturer
                  ? manufacturer[0].toUpperCase() +
                    manufacturer.slice(1).toLowerCase()
                  : "unknown"}
              </p>
            )}

            {labelState?.show_country && (
              <p className={"normal-case"}>
                Product of {country ? country.toLowerCase() : "unknown"}
              </p>
            )}

            {labelState?.show_address && (
              <p className={"normal-case"}>
                {address
                  ? address[0].toUpperCase() + address.slice(1).toLowerCase()
                  : "No address"}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
