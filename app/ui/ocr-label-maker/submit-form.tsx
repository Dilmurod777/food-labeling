"use client";

import { useState } from "react";
import { DefaultProduct, Product, User } from "@/app/lib/models";
import Image from "next/image";
import { createWorker, Lang } from "tesseract.js";
import levenshtein from "js-levenshtein";
import { getUnitByName } from "@/app/lib/constants/nutrients-units";
import { getDVByName } from "@/app/lib/constants/daily-value";
import { GetOCRLanguage, OCRLanguage } from "@/app/lib/constants/label";
import * as actionsProducts from "@/app/lib/actions-products";
import { useRouter } from "next/navigation";
import { convertOCRLangToLabelLang } from "@/app/lib/utilities";
import OcrIngredientsForm from "@/app/ui/ocr-label-maker/ocr-ingredients-form";
import OcrNutrientsForm from "@/app/ui/ocr-label-maker/ocr-nutrients-form";
import OCRLanguageSelect from "@/app/ui/ocr-label-maker/ocr-language-select";

interface Props {
  user: User;
}

export default function SubmitForm({ user }: Props) {
  const [extracting, setExtracting] = useState(false);
  const router = useRouter();
  const [language, setLanguage] = useState(OCRLanguage.English);

  return (
    <div
      className={
        "flex flex-grow flex-col items-start justify-start gap-3 px-24 py-12"
      }
    >
      <OCRLanguageSelect defaultLanguage={language} onChange={setLanguage} />
      <hr className={"w-full border border-main-orange"} />
      <OcrIngredientsForm language={language} />
      <hr className={"w-full border border-main-orange"} />
      <OcrNutrientsForm language={language} user={user} />
    </div>
  );
}
