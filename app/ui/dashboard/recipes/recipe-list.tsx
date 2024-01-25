import {FaPlus} from "react-icons/fa";
import Link from "next/link";
import {Recipe, User} from "@/app/lib/models";
import {useRouter} from "next/navigation";

interface Props {
    recipes: Recipe[],
    user: User | undefined
}

export default function RecipeList({recipes, user}: Props) {
    const router = useRouter();

    return <div className={"flex flex-col gap-4"}>
        <div className={"flex gap-4"}>
            <h2 className={"text-2xl font-bold text-black"}>
                Recipes {user?.email &&
							<span>for&nbsp;
								<span className={"font-thin"}>{user.email}</span>
                            </span>}
            </h2>
            <div
                onClick={() => router.push("/recipes/create")}
                className={"flex gap-2 items-center justify-center text-sm text-white font-normal px-4 py-2 rounded-md bg-main-green hover:bg-hover-main-green cursor-pointer"}
            >
                <FaPlus className={"text-lg"}/>
                <span>Create a recipe</span>
            </div>
        </div>
        <div className={"flex flex-col"}>
            {recipes.map((recipe, i) => <div
                key={`recipe-${i}`}
                className={"flex gap-2"}
            >
                <Link
                    href={`/recipes/${recipe.id}/edit`}
                    className={"text-lg text-main-blue hover:text-hover-main-blue"}
                >{recipe.id} : {recipe.name}</Link>
            </div>)}
        </div>
    </div>
}