import ProductsEmpty from "@/app/ui/dashboard/products/products-empty";
import ProductsList from "@/app/ui/dashboard/products/products-list";
import * as productsActions from "@/app/lib/actions-products";
import { getCurrentUser } from "@/app/lib/actions-user";
import { redirect } from "next/navigation";

export default async function Page() {
  const products = await productsActions.getAll();

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className={"flex h-full w-full flex-col"}>
      {products.length === 0 && <ProductsEmpty user={user} />}
      {products.length !== 0 && <ProductsList items={products} user={user} />}
    </div>
  );
}
