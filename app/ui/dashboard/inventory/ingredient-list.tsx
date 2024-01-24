"use client";

import {FaPlus} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {Ingredient, User} from "@/app/lib/models";

interface Props {
    ingredients: Ingredient[],
    user: User | undefined
}

export default function IngredientList({ingredients, user}: Props) {
    const router = useRouter();

    return <div className={"flex flex-col gap-4 py-12"}>
        <div className={"flex gap-4"}>
            <h2 className={"text-2xl font-bold text-black"}>
                Ingredients {user?.email &&
							<span>for&nbsp;
								<span className={"font-thin"}>{user.email}</span>
                            </span>}
            </h2>
            <div
                onClick={() => router.push("/ingredients/new")}
                className={"flex gap-2 items-center justify-center text-sm text-white font-normal px-4 py-2 rounded-md bg-main-green hover:bg-hover-main-green cursor-pointer"}
            >
                <FaPlus className={"text-lg"}/>
                <span>New ingredient</span>
            </div>
        </div>
        <div className={"flex flex-col mt-4"}>
            <table>
                <thead className={"text-left border-b-[1px] border-main-gray"}>
                <tr className={"*:py-1 *:px-2"}>
                    <th>Name</th>
                    <th>Modified at</th>
                    <th></th>
                </tr>
                </thead>
                <tbody className={"text-left"}>
                {ingredients.map((item, i) => {
                    return <tr
                        key={`ingredient-row-${i}`}
                        className={"*:py-2 *:px-2 *:text-sm even:bg-main-gray"}
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
                            <MdDelete className={"text-red-500 text-lg"}/>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
            {/*{ingredients.map((item, i) => (*/}
            {/*    <div*/}
            {/*        key={`recipe-${i}`}*/}
            {/*        className={"flex gap-2"}*/}
            {/*    >*/}
            {/*        <Link*/}
            {/*            href={`/ingredients/${item.id}/edit`}*/}
            {/*            className={"text-lg text-main-blue hover:text-hover-main-blue"}*/}
            {/*        >*/}
            {/*            {item.id} : {item.name}*/}
            {/*        </Link>*/}
            {/*    </div>*/}
            {/*))}*/}
        </div>
    </div>
}