type Publication = {
  id: string
  content: string
  user_id: string
  created_at: string
  updated_at: string
}

type ListPublications = {
  publications: Publication[]
  last_page: number
  total: number
  page: number
}

type Comment = {
  id: string
  content: string
  user_id: string
  publication_id: string
  created_at: string
  updated_at: string
  children: Comment[]
}

export const getPublications = async (
  page = 1,
  token: string
): Promise<ListPublications> => {
  const response = await fetch(
    `${process.env.REACT_APP_URL_API_PUBLICATIONS}/publications?page=${page}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    const error = (await response.json()).message
    return Promise.reject(new Error(error))
  }

  return await response.json()
}

export const countCommentsForPublicationsIdsApi = async (
  ids: string[],
  token: string
): Promise<{ publication_id: string; count: number }[]> => {
  const response = await fetch(
    `${process.env.REACT_APP_URL_API_PUBLICATIONS}/comments/publication/count`,
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

export const createPublicationApi = async (
  data: { content: string; user_id: string },
  token: string
) => {
  const response = await fetch(
    `${process.env.REACT_APP_URL_API_PUBLICATIONS}/publications`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  )

  if (!response.ok) {
    const error = (await response.json()).message
    return Promise.reject(new Error(error))
  }

  return await response.json()
}

export const updatePublicationApi = async (
  data: { id: string; content: string; user_id: string },
  token: string
) => {
  const response = await fetch(
    `${process.env.REACT_APP_URL_API_PUBLICATIONS}/publications`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  )

  if (!response.ok) {
    const error = (await response.json()).message
    return Promise.reject(new Error(error))
  }

  return await response.json()
}

export const deletePublicationApi = async (id: string, token: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_URL_API_PUBLICATIONS}/publications/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

export const getPublicationByIdApi = async (
  id: string,
  token: string
): Promise<Publication> => {
  const response = await fetch(
    `${process.env.REACT_APP_URL_API_PUBLICATIONS}/publications/${id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    const error = (await response.json()).message
    return Promise.reject(new Error(error))
  }

  return await response.json()
}

export const getCommentsApi = async (
  id: string,
  token: string
): Promise<Comment[]> => {
  const response = await fetch(
    `${process.env.REACT_APP_URL_API_PUBLICATIONS}/comments/publication/${id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    const error = (await response.json()).message
    return Promise.reject(new Error(error))
  }

  return await response.json()
}

export const createCommentApi = async (
  data: {
    user_id: string
    content: string
    publication_id: string
    parent_id?: string
  },
  token: string
) => {
  const response = await fetch(
    `${process.env.REACT_APP_URL_API_PUBLICATIONS}/comments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  )

  if (!response.ok) {
    const error = (await response.json()).message
    return Promise.reject(new Error(error))
  }

  return await response.json()
}

export const deleteCommentApi = async (id: string, token: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_URL_API_PUBLICATIONS}/comments/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (!response.ok) {
    const error = (await response.json()).message
    return Promise.reject(new Error(error))
  }
  return await response.json()
}
