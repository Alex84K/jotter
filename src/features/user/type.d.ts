export interface User {
  id?: number
  username: string
  firstName: string
  lastName: string
  email: string
  roles: string[]
}

export interface UserRegister {
  username: string
  password: string
  firstName: string
  lastName: string
  email: string
}

export interface UserState {
  users?: User[]
  user?: User | undefined
  errorMessage?: string
  role?: string
  status?: "idle" | "loading" | "success" | "error"
}

export interface UserLog {
  username: string
  password: string
}

export interface UserLog {
  username: string
  password: string
}

export interface UserEddit {
  userId: number
  firstName: string
  lastName: string
  email: string
}

export interface ChangePwd {
  userId: number
  password2: string
}

export interface RegistrationError {
  message?: string
  errors?: {
    [key: string]: string
  }
}
