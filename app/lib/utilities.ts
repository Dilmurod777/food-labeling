import { Product } from "@/app/lib/models";
import { getDVByName } from "@/app/lib/constants/daily-value";
import { NET_WEIGHT_UNIT } from "@/app/lib/constants/product";
import { Language, OCRLanguage } from "@/app/lib/constants/label";
import {
  CommonWords,
  WordReplacements,
} from "@/app/lib/constants/common-ingredients";

export function overflowText(text: string, max_length = 30): string {
  if (text.length <= max_length) return text;

  return text.substring(0, max_length) + "...";
}

export function convertToHumanReadableTime(time: number): string {
  let unit = "seconds";

  time = time / 1000;

  if (time > 60) {
    time = time / 60;
    unit = "minute(s)";
  }

  if (time > 60) {
    time = time / 60;
    unit = "hour(s)";
  }

  if (time > 24) {
    time = time / 24;
    unit = "day(s)";
  }

  if (time > 30) {
    time = time / 30;
    unit = "month(s)";
  }

  if (time > 12) {
    time = time / 12;
    unit = "year(s)";
  }

  time = Math.round(time);
  if (time == 0) return "now";

  return `${time} ${unit} ago`;
}

export function getTotalGrams(
  quantity: number,
  unit: number,
  waste: number,
  recipe: Product,
) {
  return parseFloat(
    (
      (((quantity * unit * (100 - waste)) / 100) *
        (100 - (recipe.waste || 0))) /
      100
    ).toFixed(1),
  );
}

export function getTotalNutrients(
  product: Product,
  param: string,
  perServing = true,
  type: string = "",
  alwaysReturnValue = false,
  round = true,
): string {
  param = param.replace("-", "_");

  const value =
    typeof product[param] == "number"
      ? (product[param] as number)
      : parseFloat(product[param].toString());
  const packages = product.serving_per_package;
  return round
    ? roundByRule(
        perServing ? value : value * packages,
        param,
        type,
        alwaysReturnValue,
      )
    : (perServing ? value : value * packages).toString();
}

export function getDailyNutrients(
  product: Product,
  param: string,
  perServing = true,
  type: string = "",
) {
  param = param.replaceAll("_", "-");
  const totalValue = parseFloat(
    getTotalNutrients(product, param, perServing, type, true, false),
  );
  let dailyValue = parseFloat(getDVByName(param, type));
  let value = (100 * totalValue) / dailyValue;

  if (
    [
      "calories",
      "fat",
      "saturated-fat",
      "trans-fat",
      "polyunsaturated-fat",
      "monounsaturated-fat",
      "cholesterol",
      "sodium",
      "carbohydrate",
      "dietary-fiber",
      "sugar",
      "added-sugar",
      "sugar-alcohol",
      "protein",
    ].includes(param)
  ) {
    value = getRoundedValue(value, 1);
  } else {
    if (value <= 10) {
      value = getRoundedValue(value, 2);
    } else if (value <= 50) {
      value = getRoundedValue(value, 5);
    } else {
      value = getRoundedValue(value, 10);
    }
  }

  return value;
}

export function getRoundedValue(value: number, increment: number): number {
  const y = Math.floor(value / increment);
  const z = value - y * increment;
  return z < increment / 2 ? y * increment : (y + 1) * increment;
}

export function roundByRule(
  v: number,
  param: string,
  type: string = "default",
  alwaysReturnValue = false,
): string {
  let value: number | string = v;

  if (typeof value == "string") {
    value = parseFloat(value);
  }

  if (param == "serving_per_package") {
    if (value < 2) {
      value = 1;
    } else if (value >= 2 && value < 5) {
      value = getRoundedValue(value, 0.5);
    } else if (value >= 5) {
      value = getRoundedValue(value, 1);
    }
  } else if (param == "calories") {
    if (value < 5) {
      value = 0;
    } else if (value <= 50) {
      value = getRoundedValue(value, 5);
    } else if (value > 50) {
      value = getRoundedValue(value, 10);
    }
  } else if (
    param == "fat" ||
    param == "saturated_fat" ||
    param == "trans_fat" ||
    param == "polyunsaturated_fat" ||
    param == "monounsaturated_fat"
  ) {
    if (value < 0.5) {
      value = 0;
    } else if (value < 5) {
      value = getRoundedValue(value, 0.5);
    } else {
      value = getRoundedValue(value, 1);
    }
  } else if (param == "cholesterol") {
    if (value < 2) {
      value = 0;
    } else if (value < 5) {
      value = alwaysReturnValue ? value : "less than 5";
    } else {
      value = getRoundedValue(value, 5);
    }
  } else if (param == "sodium") {
    if (value < 5) {
      value = 0;
    } else if (value <= 140) {
      value = getRoundedValue(value, 5);
    } else {
      value = getRoundedValue(value, 10);
    }
  } else if (param == "potassium") {
    if (value < 5) {
      value = 0;
    }
  } else if (
    param == "carbohydrate" ||
    param == "dietary_fiber" ||
    param == "sugars" ||
    param == "added_sugar" ||
    param == "sugar_alcohol"
  ) {
    if (value < 0.5) {
      value = 0;
    } else if (value < 1) {
      value = alwaysReturnValue ? value : "less than 1";
    } else {
      value = getRoundedValue(value, 1);
    }
  } else if (param == "protein") {
    if (value < 0.5) {
      value = 0;
    } else if (value < 1) {
      value = alwaysReturnValue ? value : "less than 1";
    } else {
      value = getRoundedValue(value, 1);
    }
  } else if (param == "calcium") {
    // value = getRoundedValue(value, 10);
  } else if (param == "iron") {
    // value = getRoundedValue(value, 0.1);
  } else if (param == "vitamin-d") {
    // value = getRoundedValue(value, 0.1);
  } else if (param == "potassium") {
    // value = getRoundedValue(value, 10);
  } else if (
    [
      "thiamin",
      "riboflavin",
      "vitamin-b6",
      "vitamin-b12",
      "copper",
      "manganese",
    ].includes(param)
  ) {
    // value = getRoundedValue(value, 0.01);
  } else if (
    [
      "vitamin-e",
      "niacin",
      "biotin",
      "pantothenic-acid",
      "zinc",
      "copper",
      "chromium",
      "molybdenum",
    ].includes(param)
  ) {
    // value = getRoundedValue(value, 0.1);
  } else if (["vitamin-c", "vitamin-k", "iodine", "selenium"].includes(param)) {
    // value = getRoundedValue(value, 1);
  } else if (["folate", "magnesium"].includes(param)) {
    // value = getRoundedValue(value, 5);
  } else if (
    ["vitamin-a", "phosphorus", "chloride", "choline"].includes(param)
  ) {
    // value = getRoundedValue(value, 10);
  }

  if (typeof value == "number") {
    return parseFloat(value.toFixed(2)).toString();
  } else {
    return value.toString();
  }
}

export function capitalize(value: string, separator = ",") {
  if (!value) return "";
  return value
    .split(separator)
    .map((item) => item.trim().toLowerCase())
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(separator.trim() + " ");
}

export function convertNetWeightToOz(product: Product, perServing = true) {
  let delta = 1;
  let unit = convertStringToNetWeight(product.net_weight_unit);
  switch (unit) {
    case NET_WEIGHT_UNIT.G:
      delta = 0.035274;
      break;
    case NET_WEIGHT_UNIT.ML:
      delta = 0.033814;
      break;
    case NET_WEIGHT_UNIT.KG:
      delta = 35.274;
      break;
    case NET_WEIGHT_UNIT.L:
      delta = 33.814;
      break;
  }

  const value = product.net_weight * delta;

  return parseFloat(
    (perServing ? value / product.serving_per_package : value).toFixed(2),
  );
}

export function getFormattedFormInputTitle(
  text: string,
  capitalize_all: boolean = false,
) {
  return text
    .replace("_", " ")
    .split(" ")
    .map((word, i) => {
      if (capitalize_all) {
        return word[0].toUpperCase() + word.slice(1);
      }

      return i == 0 ? word[0].toUpperCase() + word.slice(1) : word;
    })
    .join(" ");
}

export function convertParamToTitle(param: string, short = false) {
  let title = param;
  param = param.replaceAll("_", "-");
  if (param == "fat") {
    title = "Total Fat";
  } else if (param == "saturated-fat") {
    title = short ? "Sat. Fat" : "Saturated Fat";
  } else if (param == "trans-fat") {
    title = "<i>Trans</i> Fat";
  } else if (param == "monounsaturated-fat") {
    title = short ? "Monounsat. Fat" : "Monounsaturated Fat";
  } else if (param == "polyunsaturated-fat") {
    title = short ? "Polyunsat. Fat" : "Polyunsaturated Fat";
  } else if (param == "cholesterol") {
    title = "Cholesterol";
  } else if (param == "sodium") {
    title = "Sodium";
  } else if (param == "carbohydrate") {
    title = "Total Carb.";
  } else if (param == "dietary-fiber") {
    title = "Dietary Fiber";
  } else if (param == "sugar") {
    title = "Total Sugars";
  } else if (param == "added-sugar") {
    title = "Incl. Added Sugars";
  } else if (param == "protein") {
    title = "Protein";
  } else if (param == "vitamin-d") {
    title = "Vitamin D";
  } else if (param == "calcium") {
    title = "Calcium";
  } else if (param == "iron") {
    title = "Iron";
  } else if (param == "potassium") {
    title = "Potassium";
  } else if (param == "vitamin-b6") {
    title = "Vitamin B<sub>6</sub>";
  } else if (param == "vitamin-b12") {
    title = "Vitamin B<sub>12</sub>";
  } else {
    title = capitalize(param.replace("-", " "), " ");
  }

  return title;
}

export function convertStringToNetWeight(value: string): NET_WEIGHT_UNIT {
  switch (value.toLowerCase()) {
    case "g":
      return NET_WEIGHT_UNIT.G;
    case "ml":
      return NET_WEIGHT_UNIT.ML;
    case "kg":
      return NET_WEIGHT_UNIT.KG;
    case "l":
      return NET_WEIGHT_UNIT.L;
    default:
      return NET_WEIGHT_UNIT.G;
  }
}

export function calculateHammingDistance(str1: string, str2: string) {
  if (str1.length !== str2.length) {
    throw new Error("Strings must be of the same length");
  }
  let distance = 0;
  for (let i = 0; i < str1.length; i += 1) {
    if (str1[i] !== str2[i]) distance += 1;
  }
  return distance;
}

export function levenshteinDistance(word1: string, word2: string) {
  if (word1.length < word2.length) {
    return levenshteinDistance(word2, word1);
  }

  if (word2.length === 0) {
    return word1.length;
  }

  let previousRow = Array.from({ length: word2.length + 1 }, (_, i) => i);

  for (let i = 0; i < word1.length; i++) {
    let currentRow = [i + 1];

    for (let j = 0; j < word2.length; j++) {
      let insertions = previousRow[j + 1] + 1;
      let deletions = currentRow[j] + 1;
      let substitutions = previousRow[j] + (word1[i] !== word2[j] ? 1 : 0);
      currentRow.push(Math.min(insertions, deletions, substitutions));
    }

    previousRow = currentRow;
  }

  return previousRow[word2.length];
}

export function damerauLevenshteinDistance(str1: string, str2: string) {
  const matrix = Array.from({ length: str1.length + 1 }, (_, i) =>
    Array.from({ length: str2.length + 1 }, (_, j) => 0),
  );

  for (let i = 0; i <= str1.length; i++) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= str2.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost, // substitution
      );

      if (
        i > 1 &&
        j > 1 &&
        str1[i - 1] === str2[j - 2] &&
        str1[i - 2] === str2[j - 1]
      ) {
        matrix[i][j] = Math.min(matrix[i][j], matrix[i - 2][j - 2] + cost); // transposition
      }
    }
  }

  return matrix[str1.length][str2.length];
}

export function jaroWinklerDistance(str1: string, str2: string) {
  // Jaro Distance
  const matchingDistance =
    Math.floor(Math.max(str1.length, str2.length) / 2) - 1;
  let matches = 0;
  let transpositions = 0;
  let matched1 = new Array(str1.length).fill(false);
  let matched2 = new Array(str2.length).fill(false);

  for (let i = 0; i < str1.length; i++) {
    const start = Math.max(0, i - matchingDistance);
    const end = Math.min(i + matchingDistance + 1, str2.length);

    for (let j = start; j < end; j++) {
      if (!matched2[j] && str1[i] === str2[j]) {
        matches++;
        matched1[i] = true;
        matched2[j] = true;
        break;
      }
    }
  }

  if (matches === 0) {
    return 0;
  }

  // Transpositions
  let k = 0;
  for (let i = 0; i < str1.length; i++) {
    if (matched1[i]) {
      while (!matched2[k]) k++;
      if (str1[i] !== str2[k++]) {
        transpositions++;
      }
    }
  }

  // Jaro Similarity
  const jaroSimilarity =
    (matches / str1.length +
      matches / str2.length +
      (matches - transpositions / 2) / matches) /
    3;

  // Jaro-Winkler Distance
  const prefixLength = Math.min(4, Math.min(str1.length, str2.length));
  let commonPrefix = 0;
  while (
    commonPrefix < prefixLength &&
    str1[commonPrefix] === str2[commonPrefix]
  ) {
    commonPrefix++;
  }

  const jaroWinklerDistance =
    jaroSimilarity + commonPrefix * 0.1 * (1 - jaroSimilarity);

  return jaroWinklerDistance;
}

export function getSuggestions(word: string, threshold = 2) {
  const suggestions: string[] = [];

  for (const dictWord of Object.keys(WordReplacements)) {
    const distance = levenshteinDistance(word, dictWord);
    if (distance <= threshold) {
      suggestions.push(...WordReplacements[dictWord]);
    }
  }

  for (const commonWord of CommonWords) {
    const distance = levenshteinDistance(word, commonWord);
    if (distance <= threshold) {
      suggestions.push(commonWord);
    }
  }

  return suggestions;
}

export function convertOCRLangToLabelLang(from: OCRLanguage) {
  switch (from) {
    case OCRLanguage.Korean:
      return Language.Korean;
    // case OCRLanguage.French:
    //   return Language.French;
    case OCRLanguage.English:
      return Language.English;
    // case OCRLanguage.Russian:
    //   return Language.Russian;
    // case OCRLanguage.Spanish:
    //   return Language.Spanish;
    default:
      return Language.English;
  }
}

export function ConvertBase64ToFile(
  base64String: string,
  filename: string = "text.png",
) {
  // Decode the base64 string into binary data
  const binaryString = atob(base64String);

  // Create a Uint8Array to hold the binary data
  const binaryData = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    binaryData[i] = binaryString.charCodeAt(i);
  }

  // Create a Blob from the binary data
  const blob = new Blob([binaryData], { type: "image/png" }); // Change the type accordingly if it's not a PNG image

  // Create a File from the Blob with the given filename
  return new File([blob], filename, { type: blob.type });
}
