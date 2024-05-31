"use server";

import { Suspense } from "react";
import { DefaultModelItems, Model } from "@/app/lib/3d";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaInfo } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { overflowText } from "@/app/lib/utilities";
import { Badge } from "@/components/ui/badge";
import { GetTagColor, TAG_COLORS } from "@/app/lib/constants/colors";

export default async function Page() {
  const models = await new Promise<Model[]>((resolve) => {
    setTimeout(function () {
      return resolve([...DefaultModelItems]);
    }, 2000);
  });

  const renderModelCard = (model: Model) => {
    return (
      <div
        key={`model-${model.modelPath}-${model.imgPath}`}
        className={
          "relative flex h-64 w-36 flex-col items-center overflow-hidden rounded-md border border-main-orange"
        }
      >
        <div className={"relative h-[80%] w-[90%]"}>
          <Image
            className={"transition-all group-hover:scale-110"}
            src={`/preview/${model.imgPath}`}
            alt={model.text}
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <Button className={"bg-main-orange hover:bg-hover-main-orange"}>
          Select
        </Button>

        {model.badges.length > 0 && (
          <div className={"absolute left-1 top-1 flex w-20 flex-wrap gap-1"}>
            {model.badges.slice(0, 3).map((badge, i) => (
              <Badge
                key={`${model.modelPath}-${model.imgPath}-badge-${badge}`}
                className={`cursor-default px-1 text-[8px]/none`}
                style={{
                  backgroundColor: GetTagColor(i),
                }}
              >
                {badge}
              </Badge>
            ))}
          </div>
        )}

        {model.description != "" && (
          <>
            <CiCircleInfo
              className={
                "peer absolute bottom-0 right-1 top-1 cursor-pointer text-xl text-main-orange"
              }
            />
            <div
              className={
                "absolute -bottom-full left-0 right-0 h-fit max-h-[75%] rounded-t-md bg-black/70 p-2 text-xs/4 font-light text-white transition-all peer-hover:bottom-0"
              }
            >
              {overflowText(model.description, 200)}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <Suspense>
      <div className={"flex h-full w-full flex-grow flex-col gap-6 px-12 py-6"}>
        <h1 className={"text-2xl/none font-bold"}>Select package type</h1>
        <div className={"flex flex-wrap gap-4"}>
          {models.map(renderModelCard)}
        </div>
      </div>
    </Suspense>
  );
}
