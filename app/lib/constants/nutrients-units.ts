export const UNIT_CALORIES = "cal";
export const UNIT_IU = "IU";
export const UNIT_VITAMIN_D = "mcg";
export const UNIT_CALCIUM = "mg";
export const UNIT_IRON = "mg";
export const UNIT_POTASSIUM = "mg";
export const UNIT_VITAMIN_A = "mcg";
export const UNIT_VITAMIN_C = "mg";
export const UNIT_VITAMIN_E = "mg";
export const UNIT_VITAMIN_K = "mcg";
export const UNIT_THIAMIN = "mg";
export const UNIT_RIBOFLAVIN = "mg";
export const UNIT_NIACIN = "mg";
export const UNIT_VITAMIN_B6 = "mg";
export const UNIT_FOLATE = "mcg";
export const UNIT_VITAMIN_B12 = "mcg";
export const UNIT_BIOTIN = "mcg";
export const UNIT_PANTOTHENIC_ACID = "mg";
export const UNIT_PHOSPHORUS = "mg";
export const UNIT_IODINE = "mcg";
export const UNIT_MAGNESIUM = "mg";
export const UNIT_ZINC = "mg";
export const UNIT_SELENIUM = "mcg";
export const UNIT_COPPER = "mg";
export const UNIT_MANGANESE = "mg";
export const UNIT_CHROMIUM = "mcg";
export const UNIT_MOLYBDENUM = "mcg";
export const UNIT_CHLORIDE = "mg";
export const UNIT_CHOLINE = "mg";
export const UNIT_FAT = "g";
export const UNIT_MONOUNSATURATED_FAT = "g";
export const UNIT_POLYUNSATURATED_FAT = "g";
export const UNIT_SATURATED_FAT = "g";
export const UNIT_TRANS_FAT = "g";
export const UNIT_CHOLESTEROL = "mg";
export const UNIT_CARBOHYDRATE = "g";
export const UNIT_SODIUM = "mg";
export const UNIT_DIETARY_FIBER = "g";
export const UNIT_PROTEIN = "g";
export const UNIT_SUGAR = "g";
export const UNIT_ADDED_SUGAR = "g";
export const UNIT_SUGAR_ALCOHOL = "g";

export function getUnitByName(name: string): string {
  name = name.replace("-", "_").toUpperCase();
  try {
    return eval(`UNIT_${name}`) || "";
  } catch (e) {
    return "";
  }
}
