import { ChangePwd, RegistrationError, User, UserEddit, UserLog, UserRegister } from "./type"
import axios, { AxiosError } from "axios"


export const registerUser = async (user: UserRegister): Promise<User> => {
    try {
      const res = await axios.post(
        `/api/v1/auth/registration`,
        {
          username: user.username,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        { headers: { "Content-Type": "application/json" } },
      )
      return res.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        const responseData = axiosError.response?.data as RegistrationError
        if (responseData && responseData.errors) {
          const firstErrorKey = Object.keys(responseData.errors)[0]
          throw new Error(
            "Registration failed! " + responseData.errors[firstErrorKey],
          )
        } else {
          throw new Error("Registration failed! Reason unknown")
        }
      } else {
        throw error
      }
    }
  }

  export async function loginUser(login: UserLog): Promise<User> {
    try {
      const res = await axios.post(
        `api/v1/auth/login`,
        {
          username: login.username,
          password: login.password,
        },
        {
          headers: { "content-type": "application/json" },
        },
      )
      return res.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        throw axiosError.response?.data
      } else {
        throw error
      }
    }
  }

  export async function userLogout() {
    const res = await axios.get(`/api/v1/auth/logout`, {})
    return res.data
  }
  
  export async function fechUserAuth(): Promise<User> {
    const res = await axios.get(`/api/v1/users/me`, {})
    return res.data
  }
  
  export async function updateUser(user: UserEddit): Promise<User> {
    const res = await axios.put(
      `/api/v1/users/${user.userId}`,
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      { headers: { "Content-Type": "application/json" } },
    )
    return res.data
  }
  
  export async function fechNewPwd(obj: ChangePwd) {
    const headers = {
      "Content-Type": "application/json",
      "x-password": `${obj.password2}`,
    }
    const res = await axios.put(
      `/api/v1/users/${obj.userId}/password`,
      {},
      { headers },
    )
    return res.data
  }