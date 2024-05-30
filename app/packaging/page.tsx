import { getCurrentUser } from "@/app/lib/actions-user";
import { redirect } from "next/navigation";
import View from "@/app/ui/packaging/editor-3d/view";
import Content from "@/app/ui/packaging/content";

export default async function Packaging() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return <Content />;
}
