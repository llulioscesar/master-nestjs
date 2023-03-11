import { login, register } from '../../api'
import { type AppThunk } from '../configureStore'
import {
  actionAccountSetError,
  actionAccountSetExpireToken,
  actionAccountSetLoading,
  actionAccountSetRegisterError,
  actionAccountSetRegisterFinish,
  actionAccountSetRegisterLoading,
  actionAccountSetToken,
  actionAccountSetUser,
} from './slice'

export const registerUserThunk =
  (data: RegisterData): AppThunk =>
  async (dispatch) => {
    dispatch(actionAccountSetRegisterFinish(false))
    dispatch(actionAccountSetRegisterLoading(true))
    dispatch(actionAccountSetRegisterError(null))
    try {
      await register(data)
    } catch (err: any) {
      dispatch(actionAccountSetRegisterError(err.message))
    } finally {
      dispatch(actionAccountSetRegisterFinish(true))
      dispatch(actionAccountSetRegisterLoading(false))
    }
  }

export const loginThunk =
  (data: LoginData): AppThunk =>
  async (dispatch) => {
    dispatch(actionAccountSetError(null))
    dispatch(actionAccountSetLoading(true))
    try {
      const response = await login(data)
      dispatch(
        actionAccountSetUser({
          id: response.user.id,
          username: response.user.username,
          email: response.user.email,
          role: response.user.role,
        })
      )
      dispatch(actionAccountSetToken(response.token))
      dispatch(actionAccountSetExpireToken(new Date(response.expire_token)))
    } catch (err: any) {
      dispatch(actionAccountSetError(err.message))
    } finally {
      dispatch(actionAccountSetLoading(false))
    }
  }
