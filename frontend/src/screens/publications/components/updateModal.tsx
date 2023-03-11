import React, { FC } from 'react'
import { EditPost } from './editPost'
import { Modal } from 'antd'

type Props = {
  open: boolean
  onSave: () => void
  publication?: { id: string; content: string; user_id: string }
}

export const UpdateModal: FC<Props> = (props) => {
  const { onSave, publication, open } = props

  return (
    <>
      <Modal
        title="Actualizar publicacion"
        closable={false}
        open={open}
        footer={null}
      >
        <EditPost
          publication={publication}
          onSave={onSave}
          onCancel={() => onSave()}
        />
      </Modal>
    </>
  )
}
