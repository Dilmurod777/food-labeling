"use client";

import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  router.replace("/");

  return (
    <div className={"flex h-full w-full flex-grow items-center justify-center"}>
      Not found
    </div>
  );
}
