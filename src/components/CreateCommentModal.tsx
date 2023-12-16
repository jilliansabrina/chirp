import { Button, Modal } from "antd"
import TextArea from "antd/es/input/TextArea"
import React, { useState } from "react"

type Props = {
    postId: number
}

export function CreateCommentModal({ postId }: Props) {
    const [text, setText] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = async (e: React.MouseEvent<HTMLElement>) => {
        await fetch(`api/posts/${postId}/comments`, {
            method: "POST",
            body: JSON.stringify({
                text,
                user_id: "8d92c60e-cfcf-4f43-a9ed-cc138bc9c621",
                post_id: postId,
            }),
        })
        setText("")
        // refreshComments()

        console.log(text)
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                reply
            </Button>
            <Modal
                title="replying to @"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="pío"
                cancelText="cancel"
            >
                <TextArea
                    rows={4}
                    placeholder="chirp back..."
                    style={{
                        width: 300,
                    }}
                    value={text}
                    onChange={(e) => setText(e.currentTarget.value)}
                />
            </Modal>
        </div>
    )
}
