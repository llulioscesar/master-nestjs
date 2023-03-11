import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../configureStore'

type User = {
  id: string
  username: string
  email: string
  role: string
}

type State = {
  loading: boolean
  user: User | null
  error: string | null
  token: string | null
  expireToken: Date | null
  register: {
    loading: boolean
    error: string | null
    finish: boolean
  }
}

const initialState: State = {
  loading: false,
  user: null,
  error: null,
  token: null,
  expireToken: null,
  register: {
    loading: false,
    error: null,
    finish: false,
  },
}

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    actionAccountSetLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload
    },
    actionAccountSetUser: (state, { payload }: PayloadAction<User | null>) => {
      state.user = payload
    },
    actionAccountSetError: (
      state,
      { payload }: PayloadAction<string | null>
    ) => {
      state.error = payload
    },
    actionAccountSetToken: (
      state,
      { payload }: PayloadAction<string | null>
    ) => {
      state.token = payload
    },
    actionAccountSetExpireToken: (
      state,
      { payload }: PayloadAction<Date | null>
    ) => {
      state.expireToken = payload
    },
    actionAccountSetRegisterLoading: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.register.loading = payload
    },
    actionAccountSetRegisterError: (
      state,
      { payload }: PayloadAction<string | null>
    ) => {
      state.register.error = payload
    },
    actionAccountSetRegisterFinish: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.register.finish = payload
    },
  },
})

export const reducer = accountsSlice.reducer

export const {
  actionAccountSetLoading,
  actionAccountSetExpireToken,
  actionAccountSetError,
  actionAccountSetUser,
  actionAccountSetToken,
  actionAccountSetRegisterLoading,
  actionAccountSetRegisterError,
  actionAccountSetRegisterFinish,
} = accountsSlice.actions

export const selectAccount = (state: RootState) => state.accounts
