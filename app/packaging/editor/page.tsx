"use client";

import View from "@/app/ui/packaging/editor-3d/view";
import { useParams, useSearchParams } from "next/navigation";
import { DefaultModelItems } from "@/app/lib/3d";
import Image from "next/image";

export default function Page() {
  const params = useSearchParams();
  const initialModelId = params.get("model");

  const model = DefaultModelItems.find((item) => item.id === initialModelId);

  if (!model)
    return (
      <div
        className={"flex h-full w-full flex-grow items-center justify-center"}
      >
        No such model.
      </div>
    );

  return (
    <div className={"flex h-full w-full flex-grow"}>
      <div className={"relative m-12 w-1/2"}>
        {model && (
          <Image
            src={`/models-layout/${model.layoutPath}`}
            alt={"model layout"}
            fill
            style={{ objectFit: "contain" }}
          />
        )}
      </div>
      <div className={"relative w-1/2"}>
        <View initialModel={model} />
      </div>
    </div>
  );
}
