import React, { FC, useCallback, useEffect } from 'react'
import { Button, Form, Input, message } from 'antd'
import { Rule } from 'antd/lib/form'
import { useAppDispatch, useAppSelector } from '../../../store'
import {
  actionCommentsSetOperationFinished,
  createCommentThunk,
  selectComments,
} from '../../../store/commets'
import { actionPublicationsCreateSetError } from '../../../store/publications'

type FormValues = {
  content: string
}

type Props = {
  parentId?: string
  publicationId: string
  userId: string
  onSave?: () => void
}

export const EditComment: FC<Props> = (props) => {
  const [messageApi, contextHolder] = message.useMessage()

  const [form] = Form.useForm<FormValues>()

  const { onSave, publicationId, userId, parentId } = props

  const { operation } = useAppSelector(selectComments)
  const dispatch = useAppDispatch()

  const validateComment = (
    _: Rule,
    value: string,
    callback: (error?: string) => void
  ) => {
    if (!value || !value.trim()) {
      callback('El comentario no puede estar vacío')
    }
    callback()
  }

  const handleSave = useCallback(() => {
    if (onSave) {
      onSave()
    }
    dispatch(actionCommentsSetOperationFinished(false))
    form.resetFields()
  }, [dispatch, form, onSave])

  useEffect(() => {
    if (operation.error) {
      messageApi.error(operation.error, 25, () => {
        dispatch(actionPublicationsCreateSetError(null))
      })
    }
    if (!operation.loading && operation.finished && operation.error === null) {
      handleSave()
    }
  }, [dispatch, handleSave, messageApi, operation])

  const handleSubmit = (values: FormValues) => {
    const data = {
      publication_id: publicationId,
      user_id: userId,
      content: values.content,
      parent_id: parentId,
    }

    dispatch(createCommentThunk(data))
  }

  return (
    <>
      {contextHolder}
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="content"
          rules={[{ required: true, validator: validateComment }]}
        >
          <Input.TextArea placeholder="Comentar" rows={2} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={operation.loading}
            loading={operation.loading}
          >
            Comentar
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
