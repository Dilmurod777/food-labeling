const SKIM_MILK = "skim milk";
const NONFAT_MILK = "nonfat milk";
const BUTTERMILK = "buttermilk";
const WHEY = "whey";
const CREAM = "cream";
const BUTTERFAT = "butterfat";
const EGGS = "eggs";
const EGG_WHITES = "egg whites";
const EGG_YOLKS = "egg yolks";

export const WordReplacements: { [key: string]: string[] } = {
  "condensed milk": [SKIM_MILK, NONFAT_MILK],
  "skim milk": [SKIM_MILK, NONFAT_MILK],
  "reconstituted skim milk": [SKIM_MILK, NONFAT_MILK],
  "nonfat dry milk": [SKIM_MILK, NONFAT_MILK],
  "sweetcream buttermilk": [BUTTERMILK],
  "concentrated sweetcream buttermilk": [BUTTERMILK],
  "reconstituted sweetcream buttermilk": [BUTTERMILK],
  "dried sweetcream buttermilk": [BUTTERMILK],
  whey: [WHEY],
  "concentrated whey": [WHEY],
  "reconstituted whey": [WHEY],
  "dried whey": [WHEY],
  cream: [CREAM],
  "reconstituted cream": [CREAM],
  "dried cream": [CREAM],
  "plastic cream": [CREAM],
  "concentrated milk fat": [CREAM],
  butteroil: [BUTTERFAT],
  "anhydrous butterfat": [BUTTERFAT],
  "dried whole eggs": [EGGS],
  "frozen whole eggs": [EGGS],
  "liquid whole eggs": [EGGS],
  "dried egg whites": [EGG_WHITES],
  "frozen egg whites": [EGG_WHITES],
  "liquid egg whites": [EGG_WHITES],
  "dried egg yolks": [EGG_YOLKS],
  "frozen egg yolks": [EGG_YOLKS],
  "liquid egg yolks": [EGG_YOLKS],
};

export const CommonWords: string[] = [
  // "red meat",
  // "poultry",
  // "beef",
  // "andouille",
  // "ham",
  // "bacon",
  // "beef bacon",
  // "",
];
