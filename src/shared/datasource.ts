import { supabase } from "@/client"
import { User } from "@supabase/supabase-js"

export type CommentsObject = {
    id: number
    created_at: string
    post_id: number
    user_id: string
    text: string
}

export async function getAllComments(post_id: number) {
    const comments = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", post_id)
        .order("created_at", { ascending: false })
    return comments.data as CommentsObject[]
}

export type PostsObject = {
    id: number
    created_at: string
    user_id: string
    text: string
}

export async function getAllPosts() {
    const posts = await supabase
        .from("posts")
        .select("*")
        .limit(1_000)
        .order("created_at", { ascending: false })
    return posts.data as PostsObject[]
}

export type UserObject = User & {
    username: string
}

export async function getAllUsers() {
    const results = await supabase.auth.admin.listUsers()
    return results.data.users as UserObject[]
}
