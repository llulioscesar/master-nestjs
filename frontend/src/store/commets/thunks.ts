import { AppThunk } from '../configureStore'
import {
  actionCommentsSetComments,
  actionCommentsSetError,
  actionCommentsSetLoading,
  actionCommentsSetOperationError,
  actionCommentsSetOperationFinished,
  actionCommentsSetOperationLoading,
} from './slice'
import {createCommentApi, deleteCommentApi, getCommentsApi} from '../../api/publications'
import { convertKeysToCamelCase } from '../../util'
import { getUsersnamesIdsApi } from '../../api'

export const getCommentsThunk =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    const { accounts } = getState()
    dispatch(actionCommentsSetLoading(true))
    dispatch(actionCommentsSetError(null))
    try {
      const comments = await getCommentsApi(id, accounts.token || '')

      let usersIds = comments.map((comment) => comment.user_id)
      usersIds = usersIds.filter(
        (id, index) => usersIds.findIndex((t) => t === id) === index
      )

      const users = await getUsersnamesIdsApi(usersIds, accounts.token || '')

      const dtos = convertKeysToCamelCase(comments)
      const setDtos = (arr: any[]) => {
        arr.forEach((dto) => {
          dto.username = (
            users.find((user) => user.id === dto.userId) || { username: '' }
          ).username
          if (dto.children.length > 0) {
            setDtos(dto.children)
          }
        })
      }

      setDtos(dtos)

      dispatch(actionCommentsSetComments(dtos))
    } catch (error: any) {
      dispatch(actionCommentsSetError(error))
    } finally {
      dispatch(actionCommentsSetLoading(false))
    }
  }

export const createCommentThunk =
  (data: {
    user_id: string
    content: string
    publication_id: string
    parent_id?: string
  }): AppThunk =>
  async (dispatch, getState) => {
    const { accounts } = getState()
    dispatch(actionCommentsSetOperationLoading(true))
    dispatch(actionCommentsSetOperationError(null))
    dispatch(actionCommentsSetOperationFinished(false))
    try {
      await createCommentApi(data, accounts.token || '')
      dispatch(actionCommentsSetOperationFinished(true))
    } catch (error: any) {
      dispatch(actionCommentsSetOperationError(error))
    } finally {
      dispatch(actionCommentsSetOperationLoading(false))
    }
  }

export const deleteCommentThunk =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    const { accounts } = getState()
    dispatch(actionCommentsSetOperationLoading(true))
    dispatch(actionCommentsSetOperationError(null))
    dispatch(actionCommentsSetOperationFinished(false))
    try {
      await deleteCommentApi(id, accounts.token || '')
      dispatch(actionCommentsSetOperationFinished(true))
    } catch (error: any) {
      dispatch(actionCommentsSetOperationError(error))
    } finally {
      dispatch(actionCommentsSetOperationLoading(false))
    }
  }
