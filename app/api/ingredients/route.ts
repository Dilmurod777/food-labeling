import * as ingredientActions from "@/app/lib/actions-ingredients";
import {type NextRequest} from 'next/server'
import {Ingredient} from "@/app/lib/models";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get('query')

    let data: Ingredient[] = [];
    if (query && query.trim() != "") {
        data = await ingredientActions.getByQuery(query, [])
    }

    return Response.json(data)
}

export async function POST(request: NextRequest) {
    const id = await ingredientActions.create(await request.json())

    return Response.json({id: id})
}