"use client"

import React, { useEffect, useState } from "react"
import { Divider, List } from "antd"
import { CommentsObject } from "@/shared/datasource"

type Props = {
    postId: number
    userMap: Map<string, string>
}

export function CommentsList({ postId, userMap }: Props) {
    const [loading, setLoading] = useState(false)
    const [comments, setComments] = useState<CommentsObject[]>([])

    const fetchComments = async () => {
        setLoading(true)
        const resp = await fetch(`/api/posts/${postId}/comments`)
        const json = await resp.json()
        setComments(json)
        setLoading(false)
    }
    useEffect(() => {
        fetchComments()
    }, [postId])

    if (comments.length === 0) {
        return null
    }

    return (
        <div>
            {comments.length !== 0 ? (
                <>
                    <Divider orientation="left">replies</Divider>
                    <List
                        size="small"
                        bordered
                        dataSource={comments}
                        renderItem={(item) => (
                            <List.Item>
                                <strong>{userMap.get(item.user_id)}: </strong>
                                {item.text}
                            </List.Item>
                        )}
                    />
                </>
            ) : null}
        </div>
    )
}
