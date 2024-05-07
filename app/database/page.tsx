import { Suspense } from "react";
import Loading from "@/app/ui/loading";
import * as databaseActions from "@/app/lib/actions-database";
import Content from "@/app/ui/database/content";

export default async function Page() {
  const productsHistory = await databaseActions.getAllCompanyProducts();

  return (
    <Suspense fallback={<Loading />}>
      <Content productsHistory={productsHistory} />
    </Suspense>
  );
}
