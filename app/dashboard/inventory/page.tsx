import { getCurrentUser } from "@/app/lib/actions-user";
import { redirect } from "next/navigation";

export default async function Inventory() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div
      className={
        "flex h-full w-full items-center justify-center text-lg font-bold text-black"
      }
    >
      Inventory empty.
    </div>
  );
}
