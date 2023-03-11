import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { accountsSlice } from './accounts'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants'
import { publicationsSlice } from './publications'
import {commentsSlice} from "./commets";

const persistConfig = {
  key: 'root',
  storage,
}

export const rootReducer = combineReducers({
  accounts: accountsSlice.reducer,
  publications: publicationsSlice.reducer,
  comments: commentsSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppThunk = ThunkAction<void, RootState, unknown, Action>

export { persistor, store }
