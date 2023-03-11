import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../configureStore'

type Comment = {
  id: string
  content: string
  publicationId: string
  userId: string
  createdAt: string
  updatedAt: string
  children: Comment[]
  username: string
}

type State = {
  comments: Comment[]
  loading: boolean
  error: string | null
  operation: {
    loading: boolean
    error: string | null
    finished: boolean
  }
}

const initialState: State = {
  comments: [],
  loading: false,
  error: null,
  operation: {
    loading: false,
    error: null,
    finished: false,
  },
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    actionCommentsSetComments: (
      state,
      { payload }: PayloadAction<Comment[]>
    ) => {
      state.comments = payload
    },
    actionCommentsSetLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload
    },
    actionCommentsSetError: (
      state,
      { payload }: PayloadAction<string | null>
    ) => {
      state.error = payload
    },
    actionCommentsSetOperationLoading: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.operation = { ...state.operation, loading: payload }
    },
    actionCommentsSetOperationError: (
      state,
      { payload }: PayloadAction<string | null>
    ) => {
      state.operation = { ...state.operation, error: payload }
    },
    actionCommentsSetOperationFinished: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.operation = { ...state.operation, finished: payload }
    },
  },
})

export const {
  actionCommentsSetComments,
  actionCommentsSetLoading,
  actionCommentsSetError,
  actionCommentsSetOperationLoading,
  actionCommentsSetOperationError,
  actionCommentsSetOperationFinished,
} = commentsSlice.actions

export const selectComments = (state: RootState) => state.comments
