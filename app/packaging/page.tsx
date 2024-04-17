import { getCurrentUser } from "@/app/lib/actions-user";
import { redirect } from "next/navigation";
import View3D from "@/app/ui/packaging/view-3d";

export default async function Packaging() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return <View3D />;
}
