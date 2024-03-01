import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");
  if (!query) return Response.json([]);

  try {
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${decodeURI(query)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
      },
    });
    const results: { documents: AddressSearchResult[] } = await response.json();

    return Response.json(results.documents?.slice(0, 5) || []);

    // const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${decodeURI(query)}&components=country:kr&language=en&types=administrative_area_level_1`
    //     + `&key=${process.env.GOOGLE_CLOUD_API_KEY}`
    //
    // const response = await fetch(url, {method: "GET"});
    // const results = await response.json();
    // console.dir(results, {depth: null});

    // return Response.json([]);
  } catch (e) {
    console.log(e);
    return Response.json([]);
  }
}
