type RegisterData = {
  username: string
  email: string
  password: string
  first_name: string
  last_name: string
  role: string
}

type LoginData = {
  email: string
  password: string
}

type User = {
  id: string
  username: string
  email: string
  role: string
}

type LoginResponse = {
  token: string
  user: User
  expire_token: string
}
