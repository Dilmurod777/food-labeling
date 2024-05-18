import { type NextRequest } from "next/server";
import { PapagoOCRResponse, Word } from "@/app/lib/ocr";
import { ConvertBase64ToFile } from "@/app/lib/utilities";

export async function POST(req: NextRequest) {
  const requestFormData = await req.formData();

  const url = process.env.PAPAGO_OCR_URL;
  const clientID = process.env.PAPAGO_OCR_CLIENT_ID;
  const clientSecret = process.env.PAPAGO_OCR_CLIENT_SECRET;
  const image = requestFormData.get("image");

  if (!url || !clientID || !clientSecret || !image) return Response.json([]);

  const formData = new FormData();
  formData.append("source", "ko");
  formData.append("target", "en");
  formData.append("image", image);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "X-NCP-APIGW-API-KEY-ID": clientID,
      "X-NCP-APIGW-API-KEY": clientSecret,
    },
    body: formData,
  });

  const data: PapagoOCRResponse = await response.json();
  // console.dir(data, { depth: null });

  // const formData2 = new FormData();
  // formData2.append("source", "ko");
  // formData2.append("target", "en");
  // formData2.append("image", ConvertBase64ToFile(data.data.renderedImage));
  //
  // const response2 = await fetch(url, {
  //   method: "POST",
  //   headers: {
  //     "X-NCP-APIGW-API-KEY-ID": clientID,
  //     "X-NCP-APIGW-API-KEY": clientSecret,
  //   },
  //   body: formData2,
  // });

  // const data2: PapagoOCRResponse = await response2.json();

  const words: Word[] = data.data.blocks.reduce<Word[]>((result, b) => {
    return result.concat(
      b.lines.reduce<Word[]>((result, l) => {
        return result.concat(
          l.words.map<Word>((w) => {
            return {
              text: w.sourceText,
              box: [w.LT, w.RB],
              confidence: 0,
            };
          }),
        );
      }, []),
    );
  }, []);

  return Response.json({
    words: words,
    image: data.data.renderedImage,
  });
}

// export async function POST2(req: NextRequest) {
//   const { image, format } = await req.json();
//
//   // https://backend.scandocflow.com/v1/api/documents/extract?access_token=${process.env.OCR_API_KEY}
//   const url = process.env.NAVER_OCR_URL;
//   const secret = process.env.NAVER_OCR_SECRET;
//
//   if (!url || !secret) return Response.json([]);
//
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "X-OCR-SECRET": secret,
//     },
//     body: JSON.stringify({
//       images: [
//         {
//           format: format || "png",
//           name: "medium",
//           data: image,
//         },
//       ],
//       lang: "ko",
//       requestId: "string",
//       resultType: "string",
//       timestamp: Date.now().toString(),
//       version: "V2",
//       enableTableDetection: false,
//     }),
//   });
//
//   const data = await response.json();
//   const words: Word[] = (data?.images[0]?.fields || []).map((item: any) => ({
//     text: item?.inferText || "",
//     box: item?.boundingPoly?.vertices || [],
//     confidence: item?.inferConfidence || 0,
//   }));
//
//   console.dir(data, { depth: null });
//
//   return Response.json(words || []);
// }
