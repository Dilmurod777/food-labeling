import { type NextRequest } from "next/server";
const { Translate } = require("@google-cloud/translate").v2;

const translate = new Translate({
  key: process.env.GOOGLE_CLOUD_TRANSLATION_API_KEY,
});

export async function POST(req: NextRequest) {
  const { text, target } = await req.json();
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  return Response.json(translations[0]);
}
