"use client"

import { useEffect, useState } from "react"
import { CreatePostView } from "./CreatePostView"
import { PostsObject } from "@/shared/datasource"
import { Card, Space, Spin, Button } from "antd"
import { CreateCommentModal } from "./CreateCommentModal"
import { CommentsList } from "./CommentsList"

type Props = {
    userMap: Map<string, string>
}

export function PostsPage({ userMap }: Props) {
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState<PostsObject[]>([])

    const fetchPosts = async () => {
        setLoading(true)
        const resp = await fetch("/api/posts")
        const json = await resp.json()
        setPosts(json)
        setLoading(false)
    }
    useEffect(() => {
        fetchPosts()
    }, [])
    return (
        <main>
            <CreatePostView refreshPosts={fetchPosts} />
            <div className="list">
                {loading ? (
                    <Spin />
                ) : (
                    posts.map((post) => (
                        <div key={post.id}>
                            <Space direction="vertical" size={16}>
                                <Card title={userMap.get(post.user_id)}>
                                    <p>{post.text}</p>
                                    <p>Chirped on {post.created_at}</p>
                                    <CreateCommentModal postId={post.id} />
                                    <CommentsList
                                        postId={post.id}
                                        userMap={userMap}
                                    />
                                </Card>
                            </Space>
                        </div>
                    ))
                )}
            </div>
        </main>
    )
}
