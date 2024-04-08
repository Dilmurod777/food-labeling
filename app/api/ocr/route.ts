import { type NextRequest } from "next/server";
import { Word } from "@/app/lib/constants/label";

const { ImageAnnotatorClient } = require("@google-cloud/vision").v1;

const client = new ImageAnnotatorClient({
  // key: process.env.GOOGLE_CLOUD_VISION_API_KEY,
});

export async function POST(req: NextRequest) {
  const { image } = await req.json();

  const response = await fetch(
    `https://backend.scandocflow.com/v1/api/documents/extract?access_token=${process.env.OCR_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "ocr",
        lang: "kor",
        files: [
          {
            title: "test.png",
            src: image,
          },
        ],
      }),
    },
  );

  const data = await response.json();
  const words: Word[] = data?.documents[0]?.textAnnotation?.Pages[0]?.Words;

  return Response.json(words);
}
