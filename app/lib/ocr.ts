export interface SearchKeyword {
  dbKey: string;
  value: number;
  searchWords: string | string[];
  searchPosition: "before" | "after";
}

export const searchWords: SearchKeyword[] = [
  {
    dbKey: "serving_per_package",
    value: 1,
    searchPosition: "before",
    searchWords: ["servings per container"],
  },
  {
    dbKey: "calories",
    searchWords: "calories",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "fat",
    searchWords: "total fat",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "saturated_fat",
    searchWords: "saturated fat",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "trans_fat",
    searchWords: "trans fat",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "polyunsaturated_fat",
    searchWords: "polyunsaturated fat",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "monounsaturated_fat",
    searchWords: "monounsaturated fat",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "cholesterol",
    searchWords: "cholesterol",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "sodium",
    searchWords: "sodium",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "carbohydrate",
    searchWords: "total carbohydrate",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "dietary_fiber",
    searchWords: "dietary fiber",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "sugar",
    searchWords: ["total sugars", "sugars"],
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "added_sugar",
    searchWords: "added sugars",
    searchPosition: "before",
    value: 0,
  },
  {
    dbKey: "sugar_alcohol",
    searchWords: "sugar alcohol",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "protein",
    searchWords: "protein",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "vitamin_d",
    searchWords: "vitamin d",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "calcium",
    searchWords: "calcium",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "iron",
    searchWords: "iron",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "potassium",
    searchWords: "potassium",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "vitamin_a",
    searchWords: "vitamin a",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "vitamin_c",
    searchWords: "vitamin c",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "thiamin",
    searchWords: "thiamin",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "riboflavin",
    searchWords: "riboflavin",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "niacin",
    searchWords: "niacin",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "vitamin_b6",
    searchWords: "vitamin b6",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "folate",
    searchWords: "folate",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "vitamin_b12",
    searchWords: "vitamin b12",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "vitamin_e",
    searchWords: "vitamin e",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "vitamin_k",
    searchWords: "vitamin k",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "phosphorus",
    searchWords: "phosphorus",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "magnesium",
    searchWords: "magnesium",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "zinc",
    searchWords: "zinc",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "selenium",
    searchWords: "selenium",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "manganese",
    searchWords: "manganese",
    searchPosition: "after",
    value: 0,
  },
  {
    dbKey: "copper",
    searchWords: "copper",
    searchPosition: "after",
    value: 0,
  },
];
