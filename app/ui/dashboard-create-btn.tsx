import {Fragment, useEffect, useState} from "react";
import {Ingredient, Recipe, User} from "@/app/lib/models";
import {useRouter} from "next/navigation";
import {FaPlus} from "react-icons/fa";

interface Props {
    user: User,
    api_route: string,
    success_redirect_url: string,
    error_redirect_url: string,
    text: string,
    loading_text: string,
    data: Ingredient | Recipe;
}

export default function DashboardCreateBtn({user, api_route, success_redirect_url, error_redirect_url, text, loading_text, data}: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onClickHandler = () => {
        if (!user) return;

        setLoading(true);

        fetch(api_route, {
            body: JSON.stringify(data),
            method: "POST"
        })
            .then(result => result.json())
            .then(data => {
                const id: string = data.id;

                if (id) {
                    router.push(success_redirect_url.replace("<id>", id));
                } else {
                    router.push(error_redirect_url);
                }
            });
    }

    return <div
        onClick={() => {
            if (loading) return;
            onClickHandler();
        }}
        className={"flex gap-2 items-center justify-center text-sm text-white font-normal px-4 py-2 rounded-md bg-main-green hover:bg-hover-main-green cursor-pointer"}
    >
        {loading
            ? <span>{loading_text}</span>
            : <Fragment>
                <FaPlus className={"text-lg"}/>
                <span>{text}</span>
            </Fragment>}
    </div>
}