import { Fragment, useState } from "react";
import { Ingredient, Product, User } from "@/app/lib/models";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

interface Props {
  user: User;
  api_route: string;
  success_redirect_url: string;
  error_redirect_url: string;
  text: string;
  loading_text: string;
  data: Product | File;
}

export default function FormSubmitBtn({
  user,
  api_route,
  success_redirect_url,
  error_redirect_url,
  text,
  loading_text,
  data,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onClickHandler = () => {
    if (!user) return;

    setLoading(true);

    fetch(api_route, {
      body: JSON.stringify(data),
      method: "POST",
    })
      .then((result) => result.json())
      .then((data) => {
        const id: string = data.id;

        if (id && id != "-1") {
          router.push(success_redirect_url.replace("<id>", id));
        } else {
          router.push(error_redirect_url);
        }
      });
  };

  return (
    <div
      onClick={() => {
        if (loading) return;
        onClickHandler();
      }}
      className={
        "flex cursor-pointer items-center justify-center gap-2 rounded-md bg-main px-4 py-2 text-sm font-normal text-white hover:bg-hover-main"
      }
    >
      {loading ? (
        <span>{loading_text}</span>
      ) : (
        <Fragment>
          <FaPlus className={"text-lg"} />
          <span>{text}</span>
        </Fragment>
      )}
    </div>
  );
}
