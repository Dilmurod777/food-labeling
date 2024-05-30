"use server";

import { Suspense } from "react";

export default async function Page() {
  const models = await new Promise<string[]>((resolve) => {
    setTimeout(function () {
      return resolve(["default package", "chips package"]);
    }, 2000);
  });

  return <Suspense>Models: {models.join(", ")}</Suspense>;
}
