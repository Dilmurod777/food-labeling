import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const blob = await req.blob();

  return Response.json("hello");
}
