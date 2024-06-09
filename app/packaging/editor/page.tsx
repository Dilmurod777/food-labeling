"use client";

import View from "@/app/ui/packaging/editor-3d/view";
import { useParams, useSearchParams } from "next/navigation";
import { DefaultModelItems, Model } from "@/app/lib/3d";
import TelescopeBoxLayout from "@/app/ui/packaging/layouts/telescope-box-layout";
import Editor3D from "@/app/ui/packaging/editor3d";

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

  return <Editor3D model={model} />;
}
