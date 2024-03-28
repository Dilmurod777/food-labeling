import { NET_WEIGHT_UNIT } from "@/app/lib/constants/product";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export interface IProduct {
  [key: string]: string | number;
}

export interface IIngredient {
  [key: string]: string | number | boolean;
}

export interface Product extends IProduct {
  id: string;
  user_id: string;
  name: string;
  tags: string;
  label: string;
  updated_at: string;
  items: string;
  waste: number;
  net_weight: number;
  net_weight_unit: string;
  packages: number;
  serving_size: string;
  serving_per_package: number;

  calories: number;
  fat: number;
  saturated_fat: number;
  trans_fat: number;
  cholesterol: number;
  sodium: number;
  carbohydrate: number;
  dietary_fiber: number;
  sugar: number;
  added_sugar: number;
  protein: number;
  vitamin_d: number;
  calcium: number;
  iron: number;
  potassium: number;
  vitamin_a: number;
  vitamin_c: number;
  magnesium: number;
  phosphorus: number;
  zinc: number;
  copper: number;
  manganese: number;
  selenium: number;
  thiamin: number;
  riboflavin: number;
  niacin: number;
  pantothenic_acid: number;
  vitamin_b6: number;
  folate: number;
  vitamin_b12: number;
  vitamin_e: number;
  vitamin_k: number;
  uncounted_fiber: number;
  sugar_alcohol: number;
  monounsaturated_fat: number;
  polyunsaturated_fat: number;
}

export type Label = {
  type: string;
  language: string;
  allergens: Allergens[];
  facilityAllergens: Allergens[];
  otherAllergens: string;
  otherFacilityAllergens: string;
  brand: string;
  best_before: string;
  prepare_instructions: string;
  storage_instructions: string;
  address: string;
  company: string;
  manufacturer: string;
  country: string;
  comments: string;
  options: ProductLabelState;
};

export interface Ingredient extends IIngredient {
  name: string;
  label_name: string;
  label_name_kr: string;
  weight: number;
}

export interface Allergens {
  name: string;
  value: boolean;
  children: Allergens[];
  other: string;
}

export const DefaultProduct: Product = {
  id: "",
  items: "[]",
  label: "{}",
  added_sugar: 0,
  calcium: 0,
  calories: 0,
  carbohydrate: 0,
  cholesterol: 0,
  copper: 0,
  dietary_fiber: 0,
  fat: 0,
  folate: 0,
  iron: 0,
  magnesium: 0,
  manganese: 0,
  monounsaturated_fat: 0,
  name: "",
  net_weight: 0,
  net_weight_unit: NET_WEIGHT_UNIT.G.toString(),
  niacin: 0,
  packages: 1,
  pantothenic_acid: 0,
  phosphorus: 0,
  polyunsaturated_fat: 0,
  potassium: 0,
  protein: 0,
  riboflavin: 0,
  saturated_fat: 0,
  selenium: 0,
  serving_per_package: 1,
  serving_size: "",
  sodium: 0,
  sugar: 0,
  sugar_alcohol: 0,
  tags: "[]",
  thiamin: 0,
  trans_fat: 0,
  uncounted_fiber: 0,
  updated_at: Date.now().toString(),
  user_id: "",
  vitamin_a: 0,
  vitamin_b12: 0,
  vitamin_b6: 0,
  vitamin_c: 0,
  vitamin_d: 0,
  vitamin_e: 0,
  vitamin_k: 0,
  waste: 0,
  zinc: 0,
};

export const DefaultIngredient: Ingredient = {
  label_name: "",
  label_name_kr: "",
  name: "",
  weight: 0,
};

export interface ProductLabelState {
  [key: string]: boolean | number;
}

export const DefaultAllergens: Allergens[] = [
  {
    name: "milk",
    value: false,
    children: [],
    other: "",
  },
  {
    name: "egg",
    value: false,
    children: [],
    other: "",
  },
  {
    name: "fish",
    value: false,
    other: "",
    children: [
      {
        name: "tuna",
        value: false,
        children: [],
        other: "",
      },
      {
        name: "cod",
        value: false,
        children: [],
        other: "",
      },
      {
        name: "salmon",
        value: false,
        children: [],
        other: "",
      },
      {
        name: "bass",
        value: false,
        children: [],
        other: "",
      },
    ],
  },
  {
    name: "shellfish",
    value: false,
    other: "",
    children: [
      {
        name: "crab",
        value: false,
        children: [],
        other: "",
      },
      {
        name: "lobster",
        value: false,
        children: [],
        other: "",
      },
      {
        name: "shrimp",
        value: false,
        children: [],
        other: "",
      },
    ],
  },
  {
    name: "tree nuts",
    value: false,
    other: "",
    children: [
      {
        name: "almond",
        value: false,
        children: [],
        other: "",
      },
      {
        name: "cashew",
        value: false,
        children: [],
        other: "",
      },
      {
        name: "walnut",
        value: false,
        children: [],
        other: "",
      },
      {
        name: "pecan",
        value: false,
        children: [],
        other: "",
      },
      {
        name: "coconut",
        value: false,
        children: [],
        other: "",
      },
    ],
  },
  {
    name: "wheat",
    value: false,
    children: [],
    other: "",
  },
  {
    name: "peanuts",
    value: false,
    children: [],
    other: "",
  },
  {
    name: "soybeans",
    value: false,
    children: [],
    other: "",
  },
  {
    name: "sesame",
    value: false,
    children: [],
    other: "",
  },
];

export interface LabelOption {
  name: string;
  type: "wrapper";
  visible: boolean;
  children: LabelSubOption[];
}

export interface LabelSubOption {
  key: string;
  type: "switch" | "checkbox" | "slider" | "color-picker";
  value: number | boolean;
}

export interface OptionalNutrient {
  enabled: boolean;
  text: string;
  dvText: string;
  key: string;
}
