import { type NextRequest } from "next/server";
import { Word } from "@/app/lib/constants/label";

const { ImageAnnotatorClient } = require("@google-cloud/vision").v1;

const client = new ImageAnnotatorClient({
  // key: process.env.GOOGLE_CLOUD_VISION_API_KEY,
});

export async function POST(req: NextRequest) {
  const { image, format } = await req.json();

  // https://backend.scandocflow.com/v1/api/documents/extract?access_token=${process.env.OCR_API_KEY}
  let url = process.env.NAVER_OCR_URL;
  let secret = process.env.NAVER_OCR_SECRET;

  if (!url || !secret) return Response.json([]);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-OCR-SECRET": secret,
    },
    body: JSON.stringify({
      images: [
        {
          format: format || "png",
          name: "medium",
          data: image,
        },
      ],
      lang: "ko",
      requestId: "string",
      resultType: "string",
      timestamp: Date.now().toString(),
      version: "V2",
      enableTableDetection: false,
    }),
  });

  const data = await response.json();
  const words: Word[] = (data?.images[0]?.fields || []).map((item: any) => ({
    text: item?.inferText || "",
    box: item?.boundingPoly?.vertices || [],
    confidence: item?.inferConfidence || 0,
  }));

  console.dir(data, { depth: null });

  return Response.json(words || []);
}
