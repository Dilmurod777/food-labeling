import {Fragment, useState} from "react";
import {DefaultRecipe, User} from "@/app/lib/models";
import {useRouter} from "next/navigation";
import {FaPlus} from "react-icons/fa";
import {revalidatePath} from "next/cache";

interface Props {
    user: User
}

export default function CreateRecipesBtn({user}: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const createRecipe = () => {
        if (!user) return;

        setLoading(true);
        const data = DefaultRecipe;
        data.user_id = user.id;

        fetch("/api/recipes", {
            body: JSON.stringify(data),
            method: "POST"
        })
            .then(result => result.json())
            .then(data => {
                const id: string = data.id;

                if (id) {
                    router.push(`/recipes/${id}/edit`);
                } else {
                    router.push('/dashboard');
                }
            });
    }

    return <div
        onClick={() => {
            if (loading) return;
            createRecipe();
        }}
        className={"flex gap-2 items-center justify-center text-sm text-white font-normal px-4 py-2 rounded-md bg-main-green hover:bg-hover-main-green cursor-pointer"}
    >
        {loading
            ? <span>Creating...</span>
            : <Fragment>
                <FaPlus className={"text-lg"}/>
                <span>Create a recipe</span>
            </Fragment>}
    </div>
}