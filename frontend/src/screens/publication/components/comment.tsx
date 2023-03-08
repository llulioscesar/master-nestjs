import { Avatar, Button, Card, Modal, Space } from 'antd'
import React, { useState } from 'react'
import {
  ClockCircleOutlined,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
} from '@ant-design/icons'
import moment from 'moment/moment'
import { ResponseComment } from './response'
import { useAppDispatch } from '../../../store'
import {deleteCommentThunk} from "../../../store/commets";

type CommentDto = {
  id: string
  content: string
  createdAt: string
  updatedAt: string
  publicationId: string
  username?: string
  userId: string
  children: CommentDto[]
}

type CommentProps = {
  comment: CommentDto
  userId: string
}
export const Comment = ({ comment, userId }: CommentProps) => {
  const [openResponse, setOpenResponse] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const dispatch = useAppDispatch()

  const onOpenResponse = () => {
    setOpenResponse(true)
  }

  const openModalDelete = () => {
    setOpenDelete(true)
  }

  const deleteComment = () => {
    dispatch(deleteCommentThunk(comment.id))
  }

  return (
    <>
      <Modal
        cancelText="Cancelar"
        okText="Eliminar"
        title="Desea eliminar el comentario"
        onOk={deleteComment}
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
      >
        {comment.content}
      </Modal>

      <ResponseComment
        open={openResponse}
        userId={userId}
        publicationId={comment.publicationId}
        parentId={comment.id}
        content={comment.content}
        onClose={() => setOpenResponse(false)}
      />
      <Space size={8} direction="vertical" style={{ width: '100%' }}>
        <Card
          title={
            <>
              <Avatar icon={<UserOutlined />} size={24} /> {comment.username}
            </>
          }
          extra={
            <>
              {comment.updatedAt !== comment.createdAt ? (
                <EditOutlined />
              ) : (
                <ClockCircleOutlined />
              )}{' '}
              {moment(
                comment.createdAt !== comment.updatedAt
                  ? comment.updatedAt
                  : comment.createdAt
              ).fromNow()}
              <Button
                type="text"
                icon={<CommentOutlined />}
                onClick={onOpenResponse}
              >
                Responder
              </Button>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={openModalDelete}
              >
                Eliminar
              </Button>
            </>
          }
        >
          {comment.content}
        </Card>
        <Space size={5} direction="vertical" style={{ width: '100%' }}>
          {comment.children.length > 0 && (
            <>
              <div style={{ marginLeft: '50px' }}>
                {comment.children.map((child) => (
                  <Comment key={child.id} comment={child} userId={userId} />
                ))}
              </div>
            </>
          )}
        </Space>
      </Space>
    </>
  )
}
