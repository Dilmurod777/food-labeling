"use client";

import Link from "next/link";
import {DefaultRecipe, Recipe, User} from "@/app/lib/models";
import {redirect, useRouter} from "next/navigation";
import DeleteButton from "@/app/ui/ingredients/delete-button";
import {useFormState} from "react-dom";
import {deleteById} from "@/app/lib/actions-recipes";
import {TAG_COLORS} from "@/app/lib/constants";
import DashboardCreateBtn from "@/app/ui/dashboard-create-btn";
import {IoMdRefreshCircle} from "react-icons/io";
import {revalidatePath} from "next/cache";

interface Props {
    recipes: Recipe[],
    user: User
}

export default function RecipeList({recipes, user}: Props) {
    const router = useRouter();
    const [_, dispatch] = useFormState(deleteById, undefined);

    return <div className={"flex flex-col gap-4 py-12"}>
        <div className={"flex gap-4 items-center"}>
            <h2 className={"text-2xl font-bold text-black"}>
                Recipes {user?.email &&
                <span>for&nbsp;
                    <span className={"font-thin"}>{user.email}</span>
                            </span>}
            </h2>
            <IoMdRefreshCircle
                className={"text-4xl font-bold text-main-orange cursor-pointer hover:text-hover-main-orange"}
                onClick={() => router.refresh()}
            />
            <DashboardCreateBtn
                user={user}
                api_route={"/api/recipes"}
                success_redirect_url={"/recipes/<id>/edit"}
                error_redirect_url={"/dashboard"}
                text={"Create a Recipe"}
                loading_text={"Creating..."}
                data={{
                    ...DefaultRecipe,
                    user_id: user.id
                }}
            />
        </div>
        <div className={"flex flex-col mt-4"}>
            <table>
                <thead className={"text-left border-b-[1px] border-main-gray"}>
                <tr className={"*:py-1 *:px-2"}>
                    <th>Name</th>
                    <th className={"w-4/12"}>Tags</th>
                    <th className={"w-2/12"}>Modified at</th>
                    <th className={"w-1/12"}></th>
                </tr>
                </thead>
                <tbody className={"text-left"}>
                {recipes.map((item, i) => {
                    const tags: string[] = JSON.parse(item.tags);

                    return <tr
                        key={`ingredient-row-${i}`}
                        className={"*:align-middle *:px-2 *:text-sm even:bg-main-gray *:h-[40px]"}
                    >
                        <td>
                            <Link
                                href={`/recipes/${item.id}/edit`}
                                className={"text-main-blue hover:text-hover-main-blue"}
                            >
                                {item.name}
                            </Link>
                        </td>
                        <td>
                            <div className={"flex gap-1"}>
                                {tags.length == 0 && <span>-</span>}
                                {tags.map((tag, i) => <div
                                    key={`tag-${i}`}
                                    className={`rounded-lg py-1 px-1 flex gap-1 h-[25px] items-center justify-center`}
                                    style={{backgroundColor: TAG_COLORS[i % TAG_COLORS.length]}}
                                >
                                    <span className={"text-white text-xs font-thin"}>{tag}</span>
                                </div>)}
                            </div>
                        </td>
                        <td>
                            {new Date(parseInt(item.updated_at)).toDateString()}
                        </td>
                        <td>
                            <form action={dispatch}>
                                <input type="hidden" name={"recipe-id"} value={item.id}/>
                                <DeleteButton/>
                            </form>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    </div>
}