import { createAppSlice } from "../../app/createAppSlice"
import {
  ChangePwd,
  User,
  UserEddit,
  UserLog,
  UserRegister,
  UserState,
} from "./type"
import {
  fechNewPwd,
  fechUserAuth,
  loginUser,
  registerUser,
  updateUser,
  userLogout,
} from "./userApi"

const initialState: UserState = {
  user: {} as User,
  errorMessage: "",
  status: "idle",
}

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: create => ({
    login: create.asyncThunk(
      async (userLog: UserLog) => {
        const response = await loginUser(userLog)
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.user = action.payload
          state.status = "success"
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message
          state.status = "error"
        },
      },
    ),
    resetError: create.reducer(state => {
      state.errorMessage = ""
    }),
    logout: create.asyncThunk(
      async () => {
        const response = await userLogout()
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: state => {
          state.user = initialState.user
          state.status = "idle"
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message
          state.status = "idle"
        },
      },
    ),
    authUser: create.asyncThunk(
      async () => {
        const response = await fechUserAuth()
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.user = action.payload
          state.status = "success"
        },
        rejected: state => {
          state.status = "error"
        },
      },
    ),
    registrationUserAsync: create.asyncThunk(
      async (userReg: UserRegister) => {
        const response = await registerUser(userReg)
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.user = action.payload
          state.status = "success"
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message
          state.status = "error"
        },
      },
    ),
    userOut: create.reducer(() => {}),
    edditUserAsync: create.asyncThunk(
      async (userEddit: UserEddit) => {
        const response = await updateUser(userEddit)
        return response
      },
      {
        pending: () => {},
        fulfilled: (state, action) => {
          state.user = action.payload
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message
        },
      },
    ),
    changePwdAsync: create.asyncThunk(
      async (obj: ChangePwd) => {
        const response = await fechNewPwd(obj)
        return response
      },
      {
        pending: () => {},
        fulfilled: state => {
          state.user = state.user
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message
        },
      },
    ),
  }),
  selectors: {
    selectUser: state => state.user,
    selectError: state => state.errorMessage,
    selectUserStatus: state => state.status,
  },
})

export const {
  login,
  userOut,
  edditUserAsync,
  registrationUserAsync,
  logout,
  authUser,
  changePwdAsync,
  resetError,
} = userSlice.actions

export const { selectUser, selectError, selectUserStatus } = userSlice.selectors