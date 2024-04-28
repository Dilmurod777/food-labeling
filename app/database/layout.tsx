import { ReactNode } from "react";
import { getCurrentUser } from "@/app/lib/actions-user";
import { UserRole } from "@/app/lib/models";
import { redirect } from "next/navigation";

interface Props {
  children: ReactNode;
}

export default async function RootLayout({ children }: Props) {
  const user = await getCurrentUser();

  if (!user || user.role > UserRole.Professional) {
    redirect("/");
  }

  return <div className={"h-full w-full flex-grow"}>{children}</div>;
}
