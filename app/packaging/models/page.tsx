"use client";

import { useEffect, useState } from "react";
import { DefaultModelItems, Model, ModelCategory } from "@/app/lib/3d";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CiCircleInfo } from "react-icons/ci";
import { convertModelCategoryToTitle, overflowText } from "@/app/lib/utilities";
import { Badge } from "@/components/ui/badge";
import { GetTagColor, TAG_COLORS } from "@/app/lib/constants/colors";
import { useRouter } from "next/navigation";
import { AiOutlineSelect } from "react-icons/ai";

export default function Page() {
  const [fetching, setFetching] = useState(true);
  const [models, setModels] = useState<Model[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setFetching(true);

    const models = await new Promise<Model[]>((resolve) => {
      setTimeout(function () {
        return resolve([...DefaultModelItems]);
      }, 2000);
    });

    setModels(models);
    setFetching(false);
  };

  const renderModelCard = (model: Model) => {
    return (
      <div
        key={`model-${model.category}-${model.id}`}
        className={
          "relative flex h-64 w-40 flex-col items-center overflow-hidden rounded-md border border-main-orange"
        }
      >
        <div className={"relative mt-10 h-[70%] w-[90%]"}>
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
        <div
          className={"flex h-[20%] w-full items-center justify-center gap-1"}
        >
          <p className={"text-center text-sm/none"}>{model.text}</p>
          <AiOutlineSelect
            className={
              "cursor-pointer text-main-orange hover:text-hover-main-orange"
            }
            onClick={() => router.push(`/packaging/editor?model=${model.id}`)}
          />
          {/*<Button*/}
          {/*  className={"bg-main-orange hover:bg-hover-main-orange"}*/}
          {/*  onClick={() => {*/}
          {/*    router.push(`/packaging/editor?model=${model.id}`);*/}
          {/*  }}*/}
          {/*>*/}
          {/*  Select*/}
          {/*</Button>*/}
        </div>

        {model.badges.length > 0 && (
          <div className={"absolute left-1 top-1 flex w-20 flex-wrap gap-1"}>
            {model.badges.slice(0, 3).map((badge, i) => (
              <Badge
                key={`${model.category}-${model.id}-badge-${badge}`}
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
    <div
      className={
        "relative flex h-full w-full flex-grow flex-col gap-6 px-12 py-6"
      }
    >
      <div className={"flex flex-col gap-2"}>
        <h1 className={"text-3xl/none font-bold"}>Select package:</h1>
        <hr />
      </div>
      <div className={"flex flex-col gap-4"}>
        {fetching && <div>Loading...</div>}
        {[ModelCategory.Box, ModelCategory.Sachet, ModelCategory.Pouch].map(
          (category) => {
            const filteredModels = models.filter((m) => m.category == category);

            if (filteredModels.length == 0)
              return <div key={`model-category-${category}`} />;

            return (
              <div
                key={`model-category-${category}`}
                className={"flex w-full flex-col flex-wrap gap-2"}
              >
                <h1 className={"text-2xl/none font-bold"}>
                  {convertModelCategoryToTitle(category)}:
                </h1>
                <hr />
                <div className={"flex w-full flex-wrap gap-2"}>
                  {filteredModels.map(renderModelCard)}
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}
