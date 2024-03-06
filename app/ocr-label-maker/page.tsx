"use client";

import { useState } from "react";
import FormSubmitBtn from "@/app/ui/form-submit-btn";
import { getCurrentUser } from "@/app/lib/actions-user";
import SubmitForm from "@/app/ui/ocr-label-maker/submit-form";
import { redirect } from "next/navigation";

export default async function OCRLabelMaker() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return <SubmitForm user={user} />;
}
