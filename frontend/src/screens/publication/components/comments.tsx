import React, { FC, useEffect } from 'react'
import { Comment } from './comment'
import { useAppDispatch, useAppSelector } from '../../../store'
import {
  actionCommentsSetError,
  getCommentsThunk,
  selectComments,
} from '../../../store/commets'
import { message, Skeleton, Space } from 'antd'

type Props = {
  publicationId: string
  userId: string
}

export const Comments: FC<Props> = (props) => {
  const { publicationId, userId } = props

  const [messageApi, contextHolder] = message.useMessage()

  const { comments, loading, error, operation } = useAppSelector(selectComments)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (operation.finished && operation.error === null) {
      dispatch(getCommentsThunk(publicationId))
    }
    if (operation.error) {
      messageApi.error(error, 20, () => {
        dispatch(actionCommentsSetError(null))
      })
    }
  }, [
    dispatch,
    error,
    messageApi,
    operation.error,
    operation.finished,
    publicationId,
  ])

  useEffect(() => {
    dispatch(getCommentsThunk(publicationId))
  }, [dispatch, publicationId])

  return (
    <>
      {contextHolder}
      {loading && (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      )}
      {!loading && (
        <>
          <Space direction="vertical" style={{ width: '100%' }} size={24}>
            {comments.map((comment, index) => (
              <Comment key={index} comment={comment} userId={userId} />
            ))}
          </Space>
        </>
      )}
    </>
  )
}
