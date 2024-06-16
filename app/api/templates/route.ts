import * as fs from "fs";
import * as path from "path";
import { TemplateGroup } from "@/app/lib/3d";

export async function GET() {
  const images: TemplateGroup[] = [];

  const BASE_FOLDER = "templates";
  const folders = [
    "basic-shapes",
    "nature",
    "leaves",
    "trees",
    "fitness-and-health",
    "food",
    "yummy-food",
    "sweet-and-drinks",
    "gifts",
    "environment",
    "animals",
    "transport",
    "social-and-company",
  ];

  folders.forEach((FOLDER_NAME) => {
    const FULL_PATH = path.join(
      process.cwd(),
      "public",
      BASE_FOLDER,
      FOLDER_NAME,
    );

    images.push({
      name: FOLDER_NAME,
      images: fs
        .readdirSync(FULL_PATH)
        .map((file) => path.join("/", BASE_FOLDER, FOLDER_NAME, file)),
    });
  });

  return Response.json(images);
}
