"use client"

import { Button, Col } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useState } from "react"

type Props = {
    refreshPosts: () => void
}

export function CreatePostView({ refreshPosts }: Props) {
    const [text, setText] = useState("")

    return (
        <Col>
            <TextArea
                rows={4}
                placeholder="Start chirping..."
                style={{
                    width: 300,
                }}
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
            />
            <br />
            <Button
                type="primary"
                disabled={text === ""}
                onClick={async (e) => {
                    await fetch("/api/posts", {
                        method: "POST",
                        body: JSON.stringify({
                            text,
                            user_id: "36046d1f-87b9-4b4d-a439-ff859feff447",
                        }),
                    })
                    setText("")
                    refreshPosts()
                }}
            >
                chirp
            </Button>
        </Col>
    )
}
