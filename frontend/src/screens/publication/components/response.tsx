import React, { FC } from 'react'
import { Divider, Modal } from 'antd'
import { EditComment } from './editComment'

type Props = {
  parentId: string
  content: string
  publicationId: string
  userId: string
  open: boolean
  onClose: () => void
}
export const ResponseComment: FC<Props> = (props) => {
  const { parentId, userId, publicationId, content, open, onClose } = props
  return (
    <>
      <Modal
        open={open}
        title="Responder comentario"
        footer={null}
        closable={true}
        onCancel={onClose}
      >
        {content}

        <Divider>Responder</Divider>

        <EditComment
          publicationId={publicationId}
          userId={userId}
          parentId={parentId}
        />
      </Modal>
    </>
  )
}
