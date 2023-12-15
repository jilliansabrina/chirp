import { supabase } from "@/client"
import { getAllPosts } from "@/shared/datasource"

export const dynamic = "force-dynamic"

export async function GET() {
    const posts = await getAllPosts()
    return Response.json(posts)
}

export async function POST(request: Request) {
    const params = await request.json()
    const result = await supabase
        .from("posts")
        .insert([
            {
                user_id: params.user_id,
                text: params.text,
            },
        ])
        .select("*")
    return Response.json(result)
}
