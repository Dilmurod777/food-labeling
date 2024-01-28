import {randomUUID, randomBytes} from "crypto";
import {Recipe, RecipeGetProperty, RecipeItem, Tag} from "@/app/lib/models";
import Form from "@/app/ui/recipes/form";
import {getCurrentUser} from "@/app/lib/actions-user";
import {redirect} from "next/navigation";
import {Suspense} from "react";
import Loading from "@/app/ui/loading";

export default async function Page() {
    const user = await getCurrentUser();
    if (!user) redirect("/login");

    const recipe: Recipe = {
        id: randomUUID(),
        name: `Recipe ${randomBytes(10).toString("hex")}`,
        user_id: user.id,
        updated_at: Date.now().toString(),
        tag_ids: "[]",
        tags: [],
        ingredient_list: "",
        recipe_items: [],
        label_id: "0",
        description_ddf: "",
        preparation_instructions: "",
        sku: "",
        unit_packaging_cost: 0,
        batch_labor_cost: 0,
        batch_overhead_cost: 0,
        margin: 0,
        retailer_margin: 0,
        broker_margin: 0,
        distributor_margin: 0,
        serving_per_package: 1,
        waste: 0,
        net_weight: 0,
        packages: 1,
        net_weight_unit: 0
    };

    return <Suspense fallback={<Loading/>}>
        <Form recipe={recipe} user={user}/>
    </Suspense>
}