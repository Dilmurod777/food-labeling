export enum LabelType {
  VerticalStandard = "vertical-standard",
  VerticalSideBySideMicronutrients = "vertical-side-by-side-micronutrients",
  VerticalDualColumn = "vertical-dual-column",
  VerticalSimplified = "vertical-simplified",
  VerticalDualLanguage = "vertical-dual-language",
  VerticalInfant = "vertical-infant",
  VerticalChildren = "vertical-children",
  VerticalPregnant = "vertical-pregnant",
  TabularStandard = "tabular-standard",
  TabularDualColumn = "tabular-dual-column",
  TabularSimplified = "tabular-simplified",
  LinearStandard = "linear-standard",
}

export enum Language {
  Korean = "ko",
  // Spanish = "es",
  // Portuguese = "pt",
  // French = "fr",
  // Italian = "it",
  // Japanese = "ja",
  // Hindi = "hi",
  // Russian = "ru",
  English = "en",
}

export enum OCRLanguage {
  English = "eng",
  Korean = "kor",
  Spanish = "spa",
  French = "fra",
  Russian = "rus",
}

export function GetOCRLanguage(text: string) {
  if (text == "eng") return OCRLanguage.English;
  if (text == "kor") return OCRLanguage.Korean;
  if (text == "spa") return OCRLanguage.Spanish;
  if (text == "fra") return OCRLanguage.French;
  if (text == "rus") return OCRLanguage.Russian;

  return OCRLanguage.English;
}
