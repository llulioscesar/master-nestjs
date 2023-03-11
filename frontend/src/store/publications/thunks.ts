import { AppThunk } from '../configureStore'
import {
  countCommentsForPublicationsIdsApi,
  createPublicationApi,
  deletePublicationApi,
  getPublicationByIdApi,
  getPublications,
  updatePublicationApi,
} from '../../api/publications'
import {
  actionPublicationsCreateSetError,
  actionPublicationsCreateSetFinished,
  actionPublicationsCreateSetLoading,
  actionPublicationSetPublication,
  actionPublicationsSetError,
  actionPublicationsSetLoading,
  actionPublicationsSetPage,
  actionPublicationsSetPublications,
  actionPublicationsSetTotalPages,
  actionPublicationsSetTotalPublications,
} from './slice'
import { getUsersnamesIdsApi } from '../../api'

export const getPublicationsThunk =
  (page = 1): AppThunk =>
  async (dispatch, getState) => {
    const { accounts } = getState()

    dispatch(actionPublicationsSetLoading(true))
    dispatch(actionPublicationsSetError(null))

    try {
      const response = await getPublications(page, accounts.token || '')

      let userIds = response.publications.map(
        (publication) => publication.user_id
      )
      userIds = userIds.filter(
        (id, index) => userIds.findIndex((t) => t === id) === index
      )

      let postIds = response.publications.map((publication) => publication.id)
      postIds = postIds.filter(
        (id, index) => postIds.findIndex((t) => t === id) === index
      )

      const countsComments = await countCommentsForPublicationsIdsApi(
        postIds,
        accounts.token || ''
      )

      const getUsersnames = await getUsersnamesIdsApi(
        userIds,
        accounts.token || ''
      )

      const publications = response.publications.map((publication) => {
        return {
          id: publication.id,
          content: publication.content,
          createdAt: publication.created_at,
          updatedAt: publication.updated_at,
          userId: publication.user_id,
          countComments: (
            countsComments.find(
              (comment) => comment.publication_id === publication.id
            ) || { count: 0 }
          ).count,
          username: (
            getUsersnames.find((user) => user.id === publication.user_id) || {
              username: '',
            }
          ).username,
        }
      })

      dispatch(actionPublicationsSetPublications(publications as any))
      dispatch(actionPublicationsSetTotalPages(response.last_page))
      dispatch(actionPublicationsSetTotalPublications(response.total))
      dispatch(actionPublicationsSetPage(response.page))
    } catch (error: any) {
      dispatch(actionPublicationsSetError(error.message))
    } finally {
      dispatch(actionPublicationsSetLoading(false))
    }
  }

export const createPublicationThunk =
  (data: { content: string; user_id: string }): AppThunk =>
  async (dispatch, getState) => {
    const { accounts } = getState()

    dispatch(actionPublicationsCreateSetLoading(true))
    dispatch(actionPublicationsCreateSetError(null))
    dispatch(actionPublicationsCreateSetFinished(false))
    try {
      await createPublicationApi(data, accounts.token || '')
      dispatch(actionPublicationsCreateSetFinished(true))
    } catch (error: any) {
      dispatch(actionPublicationsCreateSetError(error.message))
    } finally {
      dispatch(actionPublicationsCreateSetLoading(false))
    }
  }

export const updatePublicationThunk =
  (data: { id: string; content: string; user_id: string }): AppThunk =>
  async (dispatch, getState) => {
    const { accounts } = getState()

    dispatch(actionPublicationsCreateSetLoading(true))
    dispatch(actionPublicationsCreateSetError(null))
    dispatch(actionPublicationsCreateSetFinished(false))
    try {
      await updatePublicationApi(data, accounts.token || '')
      dispatch(actionPublicationsCreateSetFinished(true))
    } catch (error: any) {
      dispatch(actionPublicationsCreateSetError(error.message))
    } finally {
      dispatch(actionPublicationsCreateSetLoading(false))
    }
  }

export const deletePublicationThunk =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    const { accounts } = getState()

    dispatch(actionPublicationsCreateSetLoading(true))
    dispatch(actionPublicationsCreateSetError(null))
    dispatch(actionPublicationsCreateSetFinished(false))
    try {
      await deletePublicationApi(id, accounts.token || '')
      dispatch(actionPublicationsCreateSetFinished(true))
    } catch (error: any) {
      dispatch(actionPublicationsCreateSetError(error.message))
    } finally {
      dispatch(actionPublicationsCreateSetLoading(false))
    }
  }

export const getPublicationByIdThunk =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    const { accounts } = getState()
    dispatch(actionPublicationsSetLoading(true))
    dispatch(actionPublicationsSetError(null))
    try {
      const response = await getPublicationByIdApi(id, accounts.token || '')
      const getUsersnames = await getUsersnamesIdsApi(
        [response.user_id],
        accounts.token || ''
      )

      dispatch(
        actionPublicationSetPublication({
          id: response.id,
          content: response.content,
          createdAt: response.created_at,
          updatedAt: response.updated_at,
          userId: response.user_id,
          countComments: 0,
          username: getUsersnames[0].username,
        })
      )
    } catch (error: any) {
      dispatch(actionPublicationsSetError(error.message))
    } finally {
      dispatch(actionPublicationsSetLoading(false))
    }
  }
