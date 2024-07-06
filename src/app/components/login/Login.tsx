import { useEffect, useState } from "react"
import styles from "./Login.module.css"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks"
import baner_img from "/assets/banner.svg"
import {
  login,
  selectError,
  selectUser,
  selectUserStatus,
} from "../../../features/user/userSlice"
import { Button } from "@mui/material"

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPwd, setshowPwd] = useState<string>("password")
  const dispatch = useAppDispatch()
  const error = useAppSelector(selectError)
  const userStatus = useAppSelector(selectUserStatus)
  const [usernameError, setUsernameError] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")

  const user = useAppSelector(selectUser)

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    //dispatch(resetError())
    e.preventDefault()
    const userLogin = {
      username: username,
      password: password,
    }
    const dispatchRes = await dispatch(login(userLogin))
    if (login.fulfilled.match(dispatchRes)) {
      navigate("/list")
    }
  }

  const pwdToggle = () => {
    if (showPwd === "text") {
      setshowPwd("password")
    } else {
      setshowPwd("text")
    }
  }

  const handleUsernameBlur = () => {
    if (username.trim() === "") {
      setUsernameError("Username cannot be empty")
    } else {
      setUsernameError("")
    }
  }

  const handlePasswordBlur = () => {
    if (password.trim() === "") {
      setPasswordError("Password cannot be empty")
    } else {
      setPasswordError("")
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //dispatch(resetError())
    const { name, value } = event.target
    if (name === "login") {
      setUsername(value)
      setUsernameError("")
    } else {
      setPassword(value)
      setPasswordError("")
    }
  }

  useEffect(() => {
    //dispatch(resetError())
  }, [dispatch])

  return (
    <div className={`${styles.bg} bg_greenWh`}>
      <div className={`${styles.container} d-flex justify-content-center`}>
        <div
          className={`${styles.loginPanel} ${styles.logincontainer} col-sm-12 col-lg-6 bg_light`}
        >
          <div className={styles.img_box}>
        <img src={baner_img} className={styles.banner_img} />
      </div>

          {error && <span className="text-danger">{error}</span>}

          <div className="form-container">
            {userStatus === "loading" && (
              <div className="form-overlay">
                <div className="loader">
                  <span
                    className="spinner-border spinner-border-2x me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </div>
              </div>
            )}
           <div className="p-3">
           <form onSubmit={handleLogin} className="mb-5" id="form">
              <input
                type="text"
                value={username}
                onChange={handleInputChange}
                placeholder="Enter username"
                className={`${styles.form_my} mt-4 mb-1 ${usernameError ? "error-shake" : ""}`}
                id="login"
                name="login"
              />
              {usernameError && (
                <span className="text-danger error-message ml-1">
                  {usernameError}
                </span>
              )}
              <input
                type={showPwd}
                value={password}
                onChange={handleInputChange}
                className={`${styles.form_my} mt-4 mb-1  ${passwordError ? "error-shake" : ""}`}
                id="pwd"
                placeholder="Enter password"
                name="pswd"
              />
              {passwordError && (
                <span className="text-danger error-message">
                  {passwordError}
                </span>
              )}
              <p className={`${styles.showpass} mt-2`}>
                    <input
                      type="checkbox"
                      className={styles.check}
                      onClick={pwdToggle}
                      id={styles.checkbox}
                    />{" "}
                    Show password
                  </p>
              <button type="submit" className={`${styles.btnForm} w-100 mt-4`}>
                Login
              </button>
            </form>
           </div>
          </div>
          <p className="ps-3 pe-3">Don’t have an account? <Link to="/registration" className={styles.forgot} id="forgot">
          Register here
          </Link></p>
          
        </div>
      </div>
    </div>
  )
}

export default Login
