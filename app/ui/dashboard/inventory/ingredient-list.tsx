"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";
import {DefaultIngredient, Ingredient, User} from "@/app/lib/models";
import {useFormState} from "react-dom";
import {deleteById} from "@/app/lib/actions-ingredients";
import DeleteButton from "@/app/ui/ingredients/delete-button";
import {IoMdRefreshCircle} from "react-icons/io";
import DashboardCreateBtn from "@/app/ui/dashboard-create-btn";

interface Props {
    ingredients: Ingredient[],
    user: User
}

export default function IngredientList({ingredients, user}: Props) {
    const router = useRouter();
    const [_, dispatch] = useFormState(deleteById, undefined);

    return <div className={"flex flex-col gap-4 py-12"}>
        <div className={"flex gap-4"}>
            <h2 className={"text-2xl font-bold text-black"}>
                Ingredients {user?.email &&
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
                api_route={"/api/ingredients"}
                success_redirect_url={"/ingredients/<id>/view"}
                error_redirect_url={"/dashboard/ingredients"}
                text={"Create an Ingredient"}
                loading_text={"Creating..."}
                data={{
                    ...DefaultIngredient,
                    user_id: user.id
                }}
            />
        </div>
        <div className={"flex flex-col mt-4"}>
            <table>
                <thead className={"text-left border-b-[1px] border-main-gray"}>
                <tr className={"*:py-1 *:px-2"}>
                    <th>Name</th>
                    <th className={"w-2/12"}>Modified at</th>
                    <th className={"w-1/12"}></th>
                </tr>
                </thead>
                <tbody className={"text-left"}>
                {ingredients.map((item, i) => {
                    return <tr
                        key={`ingredient-row-${i}`}
                        className={"*:align-middle *:px-2 *:text-sm even:bg-main-gray *:h-[40px]"}
                    >
                        <td>
                            <Link
                                href={`/ingredients/${item.id}/view`}
                                className={"text-main-blue hover:text-hover-main-blue"}
                            >
                                {item.name}
                            </Link>
                        </td>
                        <td>
                            {new Date(parseInt(item.updated_at)).toDateString()}
                        </td>
                        <td>
                            <form action={dispatch}>
                                <input type="hidden" name={"ingredient-id"} value={item.id}/>
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