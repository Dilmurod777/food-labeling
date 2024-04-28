import { NET_WEIGHT_UNIT } from "@/app/lib/constants/product";

export enum UserRole {
  Admin,
  Professional,
  Normal,
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
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

export interface ProductLabelState {
  [key: string]: boolean | number;
}

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

export interface Company {
  id: string;
  name: string;
  email: string;
}

export interface CompanyProductList {
  company_id: string;
  date: string;
  list: CompanyProduct[];
}

export interface CompanyProduct {
  id: string;
  category: string;
  name: string;
  type_flavor: string;
  supply_type: string;
  unit_price: string;
  moq: string;
  units_per_box: string;
  shipping_storage: string;
  shelf_life: string;
  certificate: string;
  brand: string;
  note: string;
}
