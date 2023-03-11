import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../configureStore'

type Publication = {
  content: string
  id: string
  createdAt: string
  updatedAt: string
  userId: string
  countComments: number
  username: string
}

type State = {
  publication: Publication | null
  publications: Publication[]
  page: number
  loading: boolean
  error: string | null
  totalPages: number
  totalPublications: number
  create: {
    loading: boolean
    error: string | null
    finished: boolean
  }
}

const initialState: State = {
  publication: null,
  publications: [],
  page: 1,
  loading: false,
  error: null,
  totalPages: 0,
  totalPublications: 0,
  create: {
    loading: false,
    error: null,
    finished: false,
  },
}

export const publicationsSlice = createSlice({
  name: 'publications',
  initialState,
  reducers: {
    actionPublicationsSetPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload
    },
    actionPublicationsSetLoading: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.loading = payload
    },
    actionPublicationsSetError: (
      state,
      { payload }: PayloadAction<string | null>
    ) => {
      state.error = payload
    },
    actionPublicationsSetPublications: (
      state,
      { payload }: PayloadAction<Publication[]>
    ) => {
      state.publications = payload
    },
    actionPublicationsSetTotalPages: (
      state,
      { payload }: PayloadAction<number>
    ) => {
      state.totalPages = payload
    },
    actionPublicationsSetTotalPublications: (
      state,
      { payload }: PayloadAction<number>
    ) => {
      state.totalPublications = payload
    },
    actionPublicationsCreateSetLoading: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.create = { ...state.create, loading: payload }
    },
    actionPublicationsCreateSetError: (
      state,
      { payload }: PayloadAction<string | null>
    ) => {
      state.create = { ...state.create, error: payload }
    },
    actionPublicationsCreateSetFinished: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.create = { ...state.create, finished: payload }
    },
    actionPublicationSetPublication: (
      state,
      { payload }: PayloadAction<Publication | null>
    ) => {
      state.publication = payload
    },
  },
})

export const {
  actionPublicationsSetPage,
  actionPublicationsSetLoading,
  actionPublicationsSetError,
  actionPublicationsSetPublications,
  actionPublicationsSetTotalPages,
  actionPublicationsSetTotalPublications,
  actionPublicationsCreateSetLoading,
  actionPublicationsCreateSetError,
  actionPublicationsCreateSetFinished,
  actionPublicationSetPublication,
} = publicationsSlice.actions

export const selectPublications = (state: RootState) => state.publications
