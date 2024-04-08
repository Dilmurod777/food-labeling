import { type NextRequest } from "next/server";
import { Metadata } from "@google-cloud/common";

const { Translate } = require("@google-cloud/translate").v2;

const translate = new Translate({
  key: process.env.GOOGLE_CLOUD_TRANSLATION_API_KEY,
});

export async function POST(req: NextRequest) {
  const { text, target, source } = await req.json();

  let result = "";

  let promises: Promise<[string, Metadata]>[] = (text as string)
    .split("###")
    .map((w) =>
      translate.translate(w, {
        to: target,
        from: source || "ko",
      }),
    );

  let translations = await Promise.all(promises);

  return Response.json(translations.map((w) => w[0]).join("###"));
}
