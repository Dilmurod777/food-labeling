"use client";

import Link from "next/link";
import { DefaultProduct, Product, User } from "@/app/lib/models";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { deleteById, copyById } from "@/app/lib/actions-products";
import { TAG_COLORS } from "@/app/lib/constants/colors";
import ProductCreateBtn from "@/app/ui/product-create-btn";
import { IoMdRefreshCircle } from "react-icons/io";
import { useState } from "react";
import Pagination from "@/app/ui/pagination";
import FormDeleteButton from "@/app/ui/products/form-delete-button";
import FormCopyButton from "@/app/ui/products/form-copy-button";

interface Props {
  items: Product[];
  user: User;
}

export default function RecipeList({ items, user }: Props) {
  const router = useRouter();
  const [, deleteDispatch] = useFormState(deleteById, undefined);
  const [, copyDispatch] = useFormState(copyById, undefined);
  const [page, setPage] = useState(0);
  const perPage = 10;
  const totalPages = Math.ceil(items.length / perPage);

  return (
    <div className={"flex flex-col gap-4 py-12"}>
      <div className={"flex items-center gap-4"}>
        <h2 className={"text-2xl font-bold text-black"}>
          Products{" "}
          {user?.email && (
            <span>
              for&nbsp;
              <span className={"font-thin"}>{user.email}</span>
            </span>
          )}
        </h2>
        <IoMdRefreshCircle
          className={
            "cursor-pointer text-4xl font-bold text-main-orange hover:text-hover-main-orange"
          }
          onClick={() => router.refresh()}
        />
        <ProductCreateBtn
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
      <div className={"mt-4 flex flex-col"}>
        <table className={"w-full border-2 border-main-gray text-left text-sm"}>
          <thead
            className={"border-b-2 border-main-gray bg-main-orange text-white"}
          >
            <tr
              className={
                "border-main-gray *:h-[45px] *:border-l-2 *:px-2 *:py-2 last:*:border-none"
              }
            >
              <th>Name</th>
              <th className={"w-3/12"}>Tags</th>
              <th className={"w-2/12"}>Modified at</th>
              <th className={"w-2/12"}></th>
            </tr>
          </thead>
          <tbody className={"text-left"}>
            {items
              .slice(page * perPage, (page + 1) * perPage)
              .map((item, i) => {
                const tags: string[] = JSON.parse(item.tags);

                return (
                  <tr
                    key={`ingredient-row-${i}`}
                    className={
                      "border-main-gray *:h-[45px] *:border-l-2 *:px-2 *:py-2 *:align-middle *:text-sm even:bg-main-gray"
                    }
                  >
                    <td>
                      <Link
                        href={`/products/${item.id}/edit`}
                        className={"text-main-blue hover:text-hover-main-blue"}
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td>
                      <div className={"flex h-full gap-1"}>
                        {tags.length == 0 && <span>-</span>}
                        {tags.map((tag, i) => (
                          <div
                            key={`tag-${i}`}
                            className={`flex h-[25px] items-center justify-center gap-1 rounded-lg px-1 py-1`}
                            style={{
                              backgroundColor:
                                TAG_COLORS[i % TAG_COLORS.length],
                            }}
                          >
                            <span className={"text-xs font-thin text-white"}>
                              {tag}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>
                      {new Date(parseInt(item.updated_at)).toDateString()}
                    </td>
                    <td className={"flex gap-4"}>
                      <form action={deleteDispatch}>
                        <input type="hidden" name={"id"} value={item.id} />
                        <FormDeleteButton />
                      </form>
                      <form action={copyDispatch}>
                        <input type="hidden" name={"id"} value={item.id} />
                        <FormCopyButton />
                      </form>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {items.length > perPage && (
          <Pagination
            perPage={perPage}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
}
