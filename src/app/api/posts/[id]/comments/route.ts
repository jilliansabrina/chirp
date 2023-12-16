import { supabase } from "@/client"
import { getAllComments } from "@/shared/datasource"

export const dynamic = "force-dynamic" // defaults to auto

export async function GET(
    _: Request,
    pageProps: { params: Record<string, string> },
) {
    const comments = await getAllComments(parseInt(pageProps.params.id))
    return Response.json(comments)
}

export async function POST(request: Request) {
    const params = await request.json()
    const result = await supabase
        .from("comments")
        .insert([
            {
                post_id: params.post_id,
                user_id: params.user_id,
                text: params.text,
            },
        ])
        .select("*")
    return Response.json(result)
}
