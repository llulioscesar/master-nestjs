import React, { FC, useCallback, useEffect } from 'react'
import { Button, Divider, Form, Input, message, Space } from 'antd'
import { Rule } from 'antd/lib/form'
import { useAppDispatch, useAppSelector } from '../../../store'
import {
  actionPublicationsCreateSetError,
  actionPublicationsCreateSetFinished,
  createPublicationThunk,
  selectPublications,
  updatePublicationThunk,
} from '../../../store/publications'
import { selectAccount } from '../../../store/accounts'

type FormValues = {
  content: string
  user_id: string
}

type Props = {
  publication?: {
    id: string
    content: string
    user_id: string
  }
  onSave?: () => void
  onCancel?: () => void
}

export const EditPost: FC<Props> = (props) => {
  const { publication, onSave, onCancel = () => {} } = props

  const { user } = useAppSelector(selectAccount)

  const { create } = useAppSelector(selectPublications)

  const [form] = Form.useForm<FormValues>()

  const dispatch = useAppDispatch()

  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    if (publication) {
      if (form) {
        form.setFieldsValue({
          content: publication.content,
        })
      }
    }
  }, [form, publication])

  const handleSave = useCallback(() => {
    if (onSave) {
      onSave()
    }
    dispatch(actionPublicationsCreateSetFinished(false))
    form.resetFields()
  }, [dispatch, form, onSave])

  useEffect(() => {
    if (create.error) {
      messageApi.error(create.error, 25, () => {
        dispatch(actionPublicationsCreateSetError(null))
      })
    }
    if (!create.loading && create.finished && create.error === null) {
      handleSave()
    }
  }, [create, dispatch, handleSave, messageApi])

  const onFinish = (values: FormValues) => {
    if (publication) {
      dispatch(
        updatePublicationThunk({
          ...values,
          id: publication.id,
          user_id: publication.user_id,
        })
      )
    } else {
      dispatch(
        createPublicationThunk({
          content: values.content,
          user_id: user ? user.id : '',
        })
      )
    }
    handleSave()
  }

  const validatePublications = (
    _: Rule,
    value: string,
    callback: (error?: string) => void
  ) => {
    if (!value || !value.trim()) {
      callback('No puede estar vacio')
    } else {
      callback()
    }
  }

  return (
    <>
      {contextHolder}
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="content"
          rules={[{ required: true, validator: validatePublications }]}
        >
          <Input.TextArea rows={4} placeholder="Que estas pensando?" />
        </Form.Item>
        <Form.Item>
          <Space direction="horizontal" size={8}>
            {publication && (
              <Button onClick={() => onCancel()}>Cancelar</Button>
            )}
            <Button
              type="primary"
              htmlType={'submit'}
              disabled={create.loading}
              loading={create.loading}
            >
              {publication ? 'Actualizar' : 'Publicar'}
            </Button>
          </Space>
        </Form.Item>
      </Form>
      {!publication && <Divider />}
    </>
  )
}
