"use client";

import { User } from "@/app/lib/models";
import FormSubmitBtn from "@/app/ui/form-submit-btn";
import { DefaultProduct } from "@/app/lib/defaults";

interface Props {
  user: User;
}

export default function ProductsEmpty({ user }: Props) {
  return (
    <div
      className={
        "flex h-full w-full flex-col items-center justify-center py-12"
      }
    >
      <h2 className={"text-xl font-bold text-black"}>Welcome to Foodplanet!</h2>

      <div className={"mt-8 flex gap-4"}>
        <FormSubmitBtn
          user={user}
          api_route={"/api/products"}
          success_redirect_url={"/products/<id>/edit"}
          error_redirect_url={"/dashboard"}
          text={"Create a Product"}
          loading_text={"Creating..."}
          data={{
            ...DefaultProduct,
            user_id: user.id,
          }}
        />
      </div>
    </div>
  );
}
