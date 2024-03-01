import Link from "next/link";
import {
  convertParamToTitle,
  getDailyNutrients,
  getTotalNutrients,
} from "@/app/lib/utilities";
import { Product } from "@/app/lib/models";
import {
  DV_ADDED_SUGAR,
  DV_CARBOHYDRATE,
  DV_CHOLESTEROL,
  DV_DIETARY_FIBER,
  DV_FAT,
  DV_SATURATED_FAT,
  DV_SODIUM,
  DV_SUGAR,
  DV_VITAMIN_D,
  getDVByName,
} from "@/app/lib/constants/daily-value";
import { getUnitByName } from "@/app/lib/constants/nutrients-units";

interface Props {
  product: Product;
}

export default function RoundingRulesBlock({ product }: Props) {
  return (
    <div className={"flex flex-col gap-2"}>
      <h2 className={"text-center text-sm/none font-bold"}>
        Rounding rules for adults and children above 4 based on&nbsp;
        <Link
          href={
            "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfcfr/cfrsearch.cfm?fr=101.9"
          }
          target={"_blank"}
          className={"text-main-blue hover:text-hover-main-blue"}
        >
          FDA
        </Link>
        &nbsp;regulations
      </h2>

      <div
        className={
          "flex max-h-[500px] w-full flex-col gap-2 overflow-y-scroll border-[1px] border-main-gray p-1 py-2 text-xs/none"
        }
      >
        <div>
          <span className={"font-bold underline"}>%Daily Value</span>:&nbsp;
          <span>
            The percentages for vitamins and minerals shall be expressed to the
            nearest 2-percent increment up to and including the 10-percent
            level, the nearest 5-percent increment above 10 percent and up to
            and including the 50-percent level, and the nearest 10-percent
            increment above the 50-percent level.
          </span>
        </div>

        <hr className={"border-main-gray"} />

        <div>
          <span className={"font-bold underline"}>Serving size</span>:&nbsp;
          <span>
            The number of servings shall be rounded to the nearest whole number
            except for the number of servings between 2 and 5 servings and
            random weight products. The number of servings between 2 and 5
            servings shall be rounded to the nearest 0.5 serving. Rounding
            should be indicated by the use of the term about (e.g., about 2
            servings, about 3.5 servings).
          </span>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Quantitative amount: </span>
            {product.serving_per_package} <i>-&gt;</i>&nbsp;
            {product.serving_per_package !=
            Math.floor(product.serving_per_package)
              ? "about "
              : ""}
            {getTotalNutrients(product, "serving_per_package")}
          </div>
        </div>

        <hr className={"border-main-gray"} />

        <div>
          <span className={"font-bold underline"}>Calories</span>:&nbsp;
          <span>
            A statement of the caloric content per serving, expressed to the
            nearest 5-calorie increment up to and including 50 calories, and
            10-calorie increment above 50 calories, except that amounts less
            than 5 calories may be expressed as zero. Energy content per serving
            may also be expressed in kilojoule units, added in parentheses
            immediately following the statement of the caloric content.
          </span>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Quantitative amount: </span>
            {product.calories}
            {getUnitByName("calories")} <i>-&gt;</i>&nbsp;
            {getTotalNutrients(product, "calories")}
            {getUnitByName("calories")}
          </div>
        </div>

        <hr className={"border-main-gray"} />

        <div>
          <span className={"font-bold underline"}>Fat</span>:&nbsp;
          <span>
            Amounts shall be expressed to the nearest 0.5 (1/2) gram increment
            below 5 grams and to the nearest gram increment above 5 grams. If
            the serving contains less than 0.5 gram, the content shall be
            expressed as zero.
          </span>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Quantitative amount: </span>
            {product.fat}
            {getUnitByName("fat")} <i>-&gt;</i>&nbsp;
            {getTotalNutrients(product, "fat")}
            {getUnitByName("fat")}
          </div>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Daily Value (RDI): </span>
            <span>
              {DV_FAT}
              {getUnitByName("fat")}
            </span>
          </div>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Rounded: </span>
            100% * {product.fat}
            {getUnitByName("fat")} / {DV_FAT}
            {getUnitByName("fat")} <i>=</i>&nbsp;
            {((100 * product.fat) / DV_FAT).toFixed(1)}% <i>-&gt;</i>&nbsp;
            {getDailyNutrients(product, "fat")}%
          </div>
        </div>

        <hr className={"border-main-gray"} />

        <div>
          <span className={"font-bold underline"}>Saturated Fat</span>:&nbsp;
          <span>
            Saturated fat content shall be indented and expressed as grams per
            serving to the nearest 0.5 gram (1/2) gram increment below 5 grams
            and to the nearest gram increment above 5 grams. If the serving
            contains less than 0.5 gram, the content shall be expressed as zero.
          </span>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Quantitative amount: </span>
            {product.saturated_fat}
            {getUnitByName("saturated_fat")} <i>-&gt;</i>&nbsp;
            {getTotalNutrients(product, "saturated_fat")}
            {getUnitByName("saturated_fat")}
          </div>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Daily Value (RDI): </span>
            <span>
              {DV_SATURATED_FAT}
              {getUnitByName("saturated_fat")}
            </span>
          </div>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Rounded: </span>
            100% * {product.saturated_fat}
            {getUnitByName("saturated_fat")} / {DV_SATURATED_FAT}
            {getUnitByName("saturated_fat")} <i>=</i>&nbsp;
            {((100 * product.saturated_fat) / DV_SATURATED_FAT).toFixed(1)}
            %&nbsp;
            <i>-&gt;</i> {getDailyNutrients(product, "saturated_fat")}%
          </div>
        </div>

        <hr className={"border-main-gray"} />

        <div>
          <span className={"font-bold underline"}>Trans Fat</span>:&nbsp;
          <span>
            Trans fat content shall be indented and expressed as grams per
            serving to the nearest 0.5 (1/2)-gram increment below 5 grams and to
            the nearest gram increment above 5 grams. If the serving contains
            less than 0.5 gram, the content, when declared, shall be expressed
            as zero.
          </span>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Quantitative amount: </span>
            {product.trans_fat}
            {getUnitByName("trans_fat")} <i>-&gt;</i>&nbsp;
            {getTotalNutrients(product, "trans_fat")}
            {getUnitByName("trans_fat")}
          </div>
        </div>

        <hr className={"border-main-gray"} />

        <div>
          <span className={"font-bold underline"}>Polyunsaturated Fat</span>
          :&nbsp;
          <span>
            Polyunsaturated fat content shall be indented and expressed as grams
            per serving to the nearest 0.5 (1/2) gram increment below 5 grams
            and to the nearest gram increment above 5 grams. If the serving
            contains less than 0.5 gram, the content shall be expressed as zero.
          </span>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Quantitative amount: </span>
            {product.polyunsaturated_fat}
            {getUnitByName("polyunsaturated_fat")} <i>-&gt;</i>&nbsp;
            {getTotalNutrients(product, "polyunsaturated_fat")}
            {getUnitByName("polyunsaturated_fat")}
          </div>
        </div>

        <hr className={"border-main-gray"} />

        <div>
          <span className={"font-bold underline"}>Monounsaturated Fat</span>
          :&nbsp;
          <span>
            Monounsaturated fat content shall be indented and expressed as grams
            per serving to the nearest 0.5 (1/2) gram increment below 5 grams
            and to the nearest gram increment above 5 grams. If the serving
            contains less than 0.5 gram, the content shall be expressed as zero.
          </span>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Quantitative amount: </span>
            {product.monounsaturated_fat}
            {getUnitByName("monounsaturated_fat")} <i>-&gt;</i>&nbsp;
            {getTotalNutrients(product, "monounsaturated_fat")}
            {getUnitByName("monounsaturated_fat")}
          </div>
        </div>

        <hr className={"border-main-gray"} />

        <div>
          <span className={"font-bold underline"}>Cholesterol</span>:&nbsp;
          <span>
            A statement of the cholesterol content in a serving expressed in
            milligrams to the nearest 5-milligram increment. If the food
            contains 2 to 5 milligrams of cholesterol per serving, the content
            may be stated as &quot;less than 5&quot; milligrams.
          </span>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Quantitative amount: </span>
            {product.cholesterol}
            {getUnitByName("cholesterol")} <i>-&gt;</i>&nbsp;
            {getTotalNutrients(product, "cholesterol")}
            {getUnitByName("cholesterol")}
          </div>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Daily Value (RDI): </span>
            <span>
              {DV_CHOLESTEROL}
              {getUnitByName("cholesterol")}
            </span>
          </div>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Rounded: </span>
            100% * {product.cholesterol}
            {getUnitByName("cholesterol")} / {DV_CHOLESTEROL}
            {getUnitByName("cholesterol")} <i>=</i>&nbsp;
            {((100 * product.cholesterol) / DV_CHOLESTEROL).toFixed(1)}%&nbsp;
            <i>-&gt;</i> {getDailyNutrients(product, "cholesterol")}%
          </div>
        </div>

        <hr className={"border-main-gray"} />

        <div>
          <span className={"font-bold underline"}>Sodium</span>:&nbsp;
          <span>
            A statement of the number of milligrams of sodium in a specified
            serving of food expressed as zero when the serving contains less
            than 5 milligrams of sodium, to the nearest 5-milligram increment
            when the serving contains 5 to 140 milligrams of sodium, and to the
            nearest 10-milligram increment when the serving contains greater
            than 140 milligrams.
          </span>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Quantitative amount: </span>
            {product.sodium}
            {getUnitByName("sodium")} <i>-&gt;</i>&nbsp;
            {getTotalNutrients(product, "sodium")}
            {getUnitByName("sodium")}
          </div>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Daily Value (RDI): </span>
            <span>
              {DV_SODIUM}
              {getUnitByName("sodium")}
            </span>
          </div>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Rounded: </span>
            100% * {product.sodium}
            {getUnitByName("sodium")} / {DV_SODIUM}
            {getUnitByName("sodium")} <i>=</i>&nbsp;
            {((100 * product.sodium) / DV_SODIUM).toFixed(1)}% <i>-&gt;</i>
            &nbsp;
            {getDailyNutrients(product, "sodium")}%
          </div>
        </div>

        <hr className={"border-main-gray"} />

        <div>
          <span className={"font-bold underline"}>Carbohydrate</span>:&nbsp;
          <span>
            A statement of the number of grams of total carbohydrate in a
            serving expressed to the nearest gram, except that if a serving
            contains less than 1 gram, the statement &quot;Contains less than 1
            gram&quot; or &quot;less than 1 gram&quot; may be used as an
            alternative, or if the serving contains less than 0.5 gram, the
            content may be expressed as zero.
          </span>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Quantitative amount: </span>
            {product.carbohydrate}
            {getUnitByName("carbohydrate")} <i>-&gt;</i>&nbsp;
            {getTotalNutrients(product, "carbohydrate")}
            {getUnitByName("carbohydrate")}
          </div>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Daily Value (RDI): </span>
            <span>
              {DV_CARBOHYDRATE}
              {getUnitByName("carbohydrate")}
            </span>
          </div>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Rounded: </span>
            100% * {product.carbohydrate}
            {getUnitByName("carbohydrate")} / {DV_CARBOHYDRATE}
            {getUnitByName("carbohydrate")} <i>=</i>&nbsp;
            {((100 * product.carbohydrate) / DV_CARBOHYDRATE).toFixed(1)}%&nbsp;
            <i>-&gt;</i> {getDailyNutrients(product, "carbohydrate")}%
          </div>
        </div>

        <hr className={"border-main-gray"} />

        <div>
          <span className={"font-bold underline"}>Dietary Fiber</span>:&nbsp;
          <span>
            A statement of the number of grams of total dietary fiber in a
            serving, indented and expressed to the nearest gram, except that if
            a serving contains less than 1 gram, declaration of dietary fiber is
            not required or, alternatively, the statement &quot;Contains less
            than 1 gram&quot; or &quot;less than 1 gram&quot; may be used, and
            if the serving contains less than 0.5 gram, the content may be
            expressed as zero.
          </span>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Quantitative amount: </span>
            {product.dietary_fiber}
            {getUnitByName("dietary_fiber")} <i>-&gt;</i>&nbsp;
            {getTotalNutrients(product, "dietary_fiber")}
            {getUnitByName("dietary_fiber")}
          </div>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Daily Value (RDI): </span>
            <span>
              {DV_DIETARY_FIBER}
              {getUnitByName("dietary_fiber")}
            </span>
          </div>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Rounded: </span>
            100% * {product.dietary_fiber}
            {getUnitByName("dietary_fiber")} / {DV_DIETARY_FIBER}
            {getUnitByName("dietary_fiber")} <i>=</i>&nbsp;
            {((100 * product.dietary_fiber) / DV_DIETARY_FIBER).toFixed(1)}
            %&nbsp;
            <i>-&gt;</i> {getDailyNutrients(product, "dietary_fiber")}%
          </div>
        </div>

        <hr className={"border-main-gray"} />

        <div>
          <span className={"font-bold underline"}>Total Sugars</span>:&nbsp;
          <span>
            Total sugars content shall be indented and expressed to the nearest
            gram, except that if a serving contains less than 1 gram, the
            statement &quot;Contains less than 1 gram&quot; or &quot;less than 1
            gram&quot; may be used as an alternative, and if the serving
            contains less than 0.5 gram, the content may be expressed as zero.
          </span>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Quantitative amount: </span>
            {product.sugar}
            {getUnitByName("sugar")} <i>-&gt;</i>&nbsp;
            {getTotalNutrients(product, "sugar")}
            {getUnitByName("sugar")}
          </div>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Daily Value (RDI): </span>
            <span>
              {DV_SUGAR}
              {getUnitByName("sugar")}
            </span>
          </div>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Rounded: </span>
            100% * {product.sugar}
            {getUnitByName("sugar")} / {DV_SUGAR}
            {getUnitByName("sugar")} <i>=</i>&nbsp;
            {((100 * product.sugar) / DV_SUGAR).toFixed(1)}% <i>-&gt;</i>&nbsp;
            {getDailyNutrients(product, "sugar")}%
          </div>
        </div>

        <hr className={"border-main-gray"} />

        <div>
          <span className={"font-bold underline"}>Added Sugars</span>:&nbsp;
          <span>
            It shall be expressed to the nearest gram, except that if a serving
            contains less than 1 gram, the statement &quot;Contains less than 1
            gram&quot; or &quot;less than 1 gram&quot; may be used as an
            alternative, and if the serving contains less than 0.5 gram, the
            content may be expressed as zero.
          </span>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Quantitative amount: </span>
            {product.added_sugar}
            {getUnitByName("added_sugar")} <i>-&gt;</i>&nbsp;
            {getTotalNutrients(product, "added_sugar")}
            {getUnitByName("added_sugar")}
          </div>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Daily Value (RDI): </span>
            <span>
              {DV_ADDED_SUGAR}
              {getUnitByName("added_sugar")}
            </span>
          </div>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Rounded: </span>
            100% * {product.added_sugar}
            {getUnitByName("added_sugar")} / {DV_ADDED_SUGAR}
            {getUnitByName("added_sugar")} <i>=</i>&nbsp;
            {((100 * product.added_sugar) / DV_ADDED_SUGAR).toFixed(1)}%&nbsp;
            <i>-&gt;</i> {getDailyNutrients(product, "added_sugar")}%
          </div>
        </div>

        <hr className={"border-main-gray"} />

        <div>
          <span className={"font-bold underline"}>Sugar Alcohol</span>:&nbsp;
          <span>
            Sugar alcohol content shall be indented and expressed to the nearest
            gram, except that if a serving contains less than 1 gram, the
            statement &quot;Contains less than 1 gram&quot; or &quot;less than 1
            gram&quot; may be used as an alternative, and if the serving
            contains less than 0.5 gram, the content may be expressed as zero.
          </span>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Quantitative amount: </span>
            {product.sugar_alcohol} <i>-&gt;</i>&nbsp;
            {getTotalNutrients(product, "sugar_alcohol")}
          </div>
        </div>

        <hr className={"border-main-gray"} />

        <div>
          <span className={"font-bold underline"}>Protein</span>:&nbsp;
          <span>
            A statement of the number of grams of protein in a serving,
            expressed to the nearest gram, except that if a serving contains
            less than 1 gram, the statement &quot;Contains less than 1
            gram&quot; or &quot;less than 1 gram&quot; may be used as an
            alternative, and if the serving contains less than 0.5 gram, the
            content may be expressed as zero.
          </span>
          <div className={"mt-1"}>
            <span className={"font-bold"}>Quantitative amount: </span>
            {product.protein} <i>-&gt;</i>&nbsp;
            {getTotalNutrients(product, "protein")}
          </div>
        </div>

        <hr className={"border-main-gray"} />

        <div>
          <div className={"text-center font-normal"}>Vitamins & Minerals</div>
          {[
            "vitamin_d",
            "calcium",
            "iron",
            "potassium",
            "vitamin_a",
            "vitamin_c",
            "magnesium",
            "phosphorus",
            "zinc",
            "copper",
            "manganese",
            "selenium",
            "thiamin",
            "riboflavin",
            "niacin",
            "pantothenic_acid",
            "vitamin_b6",
            "folate",
            "vitamin_b12",
            "vitamin_e",
            "vitamin_k",
          ].map((item, i) => {
            const dv = parseFloat(getDVByName(item, "default"));
            const value = product[item] as number;

            return (
              <>
                <hr className={"my-1 border-main-gray"} />
                <div key={`vitamin-mineral-block-${i}`}>
                  <span
                    className={"font-bold underline"}
                    dangerouslySetInnerHTML={{
                      __html: convertParamToTitle(item),
                    }}
                  />
                  :&nbsp;
                  <div className={"mt-1"}>
                    <span className={"font-bold"}>Quantitative amount: </span>
                    {value}
                    {getUnitByName(item)} <i>-&gt;</i>&nbsp;
                    {getTotalNutrients(product, item)}
                    {getUnitByName(item)}
                  </div>
                  <div className={"mt-1"}>
                    <span className={"font-bold"}>Daily Value (RDI): </span>
                    <span>
                      {dv}
                      {getUnitByName(item)}
                    </span>
                  </div>
                  <div className={"mt-1"}>
                    <span className={"font-bold"}>Rounded: </span>
                    100% * {value}
                    {getUnitByName(item)} / {dv}
                    {getUnitByName(item)} <i>=</i>&nbsp;
                    {((100 * value) / dv).toFixed(1)}% <i>-&gt;</i>&nbsp;
                    {getDailyNutrients(product, item)}%
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
