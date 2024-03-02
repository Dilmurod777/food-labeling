import ProductEditPage from "@/app/ui/products/product-edit-page";
import * as productActions from "@/app/lib/actions-products";
import { getCurrentUser } from "@/app/lib/actions-user";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/app/ui/loading";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const product = await productActions.getById(params.id);
  if (!product) {
    return (
      <div
        className={
          "flex h-full w-full items-center justify-center text-lg font-bold text-black"
        }
      >
        No such recipe was found.
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <ProductEditPage product={product} user={user} />
    </Suspense>
  );
}
