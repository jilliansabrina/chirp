import { getAllUsers } from "@/shared/datasource"
import { PostsPage } from "@/components/PostsPage"

export default async function Home() {
    const users = await getAllUsers()
    const userMap = new Map<string, string>()
    users.forEach((u) => {
        userMap.set(u.id, u.email!)
    })
    return <PostsPage userMap={userMap} />
}
