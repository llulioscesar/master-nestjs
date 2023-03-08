export const register = async (data: RegisterData): Promise<void> => {
  const response = await fetch(
    `${process.env.REACT_APP_URL_API_ACCOUNTS}/users`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )

  if (!response.ok) {
    const error = (await response.json()).message
    return Promise.reject(new Error(error))
  }

  return Promise.resolve()
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await fetch(
    `${process.env.REACT_APP_URL_API_ACCOUNTS}/users/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )

  if (!response.ok) {
    const error = (await response.json()).message
    return Promise.reject(new Error(error))
  }

  return response.json()
}

export const getUsersnamesIdsApi = async (
  ids: string[],
  token: string
): Promise<{ id: string; username: string }[]> => {
  const response = await fetch(
    `${process.env.REACT_APP_URL_API_ACCOUNTS}/users/byIds`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ids),
    }
  )

  if (!response.ok) {
    const error = (await response.json()).message
    return Promise.reject(new Error(error))
  }

  return await response.json()
}
