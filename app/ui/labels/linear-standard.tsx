import { OptionalNutrient, Product, ProductLabelState } from "@/app/lib/models";
import {
  convertNetWeightToOz,
  getDailyNutrients,
  getTotalNutrients,
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

export default function LinearStandard({
  product,
  labelState,
  optionalFats,
  optionalMineralsVitamins,
}: Props) {
  const net_weight = Math.round(
    product.net_weight / product.serving_per_package,
  );
  const serving_size = labelState?.show_in_ounce
    ? product.serving_size
      ? `${product.serving_size} (${convertNetWeightToOz(product)}oz)`
      : `${convertNetWeightToOz(product)}oz`
    : product.serving_size
      ? `${product.serving_size} (${net_weight}${product.net_weight_unit || NET_WEIGHT_UNIT.G})`
      : `${net_weight}${product.net_weight_unit || NET_WEIGHT_UNIT.G}`;

  const shortenText = (text: string) => {
    return text
      .replace("Polyunsaturated", "Polyunsat.")
      .replace("Monounsaturated", "Monounsat.");
  };

  return (
    <div
      className={`h-full w-full border-[1px] border-black p-1 text-xs normal-case leading-[1.1] tracking-normal`}
    >
      <strong className={"text-lg/none"}>Nutrition Facts</strong>
      &nbsp;Servings: {product.serving_size}
      {product.serving_per_package},
      <strong>&nbsp;Serv. Size: {serving_size},</strong>
      &nbsp;Amount per serving:
      <strong className={"text-base/none"}>
        &nbsp;Calories&nbsp;
        <span className={"text-xl/none"}>
          {getTotalNutrients(product, "calories")},
        </span>
      </strong>
      <strong>&nbsp;Total Fat</strong> {getTotalNutrients(product, "fat")}
      {getUnitByName("fat")}
      &nbsp;({getDailyNutrients(product, "fat")}% DV), Sat. Fat{" "}
      {getTotalNutrients(product, "saturated-fat")}
      {getUnitByName("saturated-fat")}
      &nbsp;({getDailyNutrients(product, "saturated-fat")}% DV),&nbsp;
      <i>Trans</i> Fat {getTotalNutrients(product, "trans-fat")}
      {getUnitByName("trans-fat")},&nbsp;
      {optionalFats.map((item, i) => (
        <Fragment key={`optional-fat-${i}`}>
          {shortenText(item.text)} {item.dvText && `(${item.dvText})`},&nbsp;
        </Fragment>
      ))}
      <strong>Cholest.</strong> {getTotalNutrients(product, "cholesterol")}
      {getUnitByName("cholesterol")}
      &nbsp;({getDailyNutrients(product, "cholesterol")}% DV),&nbsp;
      <strong>Sodium</strong> {getTotalNutrients(product, "sodium")}
      {getUnitByName("sodium")}
      &nbsp;({getDailyNutrients(product, "sodium")}% DV),&nbsp;
      <strong>Total Carb.</strong> {getTotalNutrients(product, "carbohydrate")}
      {getUnitByName("carbohydrate")}
      &nbsp;({getDailyNutrients(product, "carbohydrate")}% DV), Fiber&nbsp;
      {getTotalNutrients(product, "dietary-fiber")}
      {getUnitByName("dietary-fiber")}
      &nbsp;({getDailyNutrients(product, "dietary-fiber")}% DV), Total
      Sugars&nbsp;
      {getTotalNutrients(product, "sugar")}
      {getUnitByName("sugar")}
      &nbsp;(Incl. {getTotalNutrients(product, "added-sugar")}
      {getUnitByName("added-sugar")} Added Sugars,&nbsp;
      {getDailyNutrients(product, "sugar")}% DV),&nbsp;
      {labelState?.sugar_alcohol_enabled &&
        `Sugar Alcohol ${getTotalNutrients(product, "sugar-alcohol")}${getUnitByName("sugar-alcohol")}, `}
      <strong>Protein</strong> {getTotalNutrients(product, "protein")}
      {getUnitByName("protein")}, Vit. D (
      {getDailyNutrients(product, "vitamin-d")}% DV), Calcium (
      {getDailyNutrients(product, "calcium")}% DV), Iron (
      {getDailyNutrients(product, "iron")}% DV), Potas. (
      {getDailyNutrients(product, "potassium")}% DV)
      {optionalMineralsVitamins.map((item, i) => (
        <span
          key={`optional-fat-${i}`}
          dangerouslySetInnerHTML={{
            __html: `,&nbsp;${item.text} ${item.dvText && `(${item.dvText})`}`,
          }}
        />
      ))}
      .
    </div>
  );
}
