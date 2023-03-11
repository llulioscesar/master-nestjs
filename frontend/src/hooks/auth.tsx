import { useEffect } from 'react'
import { useAppSelector } from '../store'
import { selectAccount } from '../store/accounts'
import { useNavigate, useLocation } from 'react-router-dom'

export const useAuth = () => {
  const { user, expireToken } = useAppSelector(selectAccount)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (
      !user &&
      location.pathname !== '/login' &&
      location.pathname !== '/register'
    ) {
      navigate('/login')
    }

    let idTimer: string | number | NodeJS.Timer | null | undefined = null

    if (expireToken) {
      idTimer = setInterval(() => {
        if (new Date() > expireToken) {
          navigate('/login')
        }
      }, 1000)
    }
    return () => {
      if (idTimer) {
        clearInterval(idTimer)
      }
    }
  }, [expireToken, navigate, user])

  useEffect(() => {
    const path = location.pathname
    if ((path === '/login' || path === '/register') && user) {
      navigate('/')
    }
  }, [location.pathname, navigate, user])
}
