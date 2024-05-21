import * as databaseActions from "@/app/lib/actions-database";
import Content from "@/app/ui/companies/content";
import { Suspense } from "react";
import Loading from "@/app/ui/loading";

export default async function Page() {
  const companies = await databaseActions.getAllCompanies();

  return (
    <Suspense fallback={<Loading />}>
      <Content companies={companies} />
    </Suspense>
  );
}
