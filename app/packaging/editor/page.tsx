"use client";

import View from "@/app/ui/packaging/editor-3d/view";
import { useParams, useSearchParams } from "next/navigation";
import { DefaultModelItems, Model } from "@/app/lib/3d";
import BoxTelescopeLayout from "@/app/ui/packaging/layouts/box-telescope-layout";
import Editor3D from "@/app/ui/packaging/editor3d";

export default function Page() {
  const params = useSearchParams();
  const modelId = params.get("model");

  const model = DefaultModelItems.find((item) => item.id === modelId);

  if (!model)
    return (
      <div
        className={"flex h-full w-full flex-grow items-center justify-center"}
      >
        No such model.
      </div>
    );

  return <Editor3D model={model} />;
}
