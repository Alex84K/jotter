import logo from "/assets/logo.svg"
import out from "/assets/out.svg"
import setting from "/assets/setting.svg"
import account from "/assets/account.svg"
import home from "/assets/home.svg"

import menu from "/assets/menu.svg"
import { Modal } from "@mui/base/Modal"
import clsx from "clsx"
import { styled, css } from "@mui/system"

import { useAppDispatch, useAppSelector } from "../../hooks"
import { useNavigate } from "react-router-dom"
import styles from "./Header.module.css"
import React, { useState } from "react"
import { logout, selectUser } from "../../../features/user/userSlice"

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [flagAccount, setFlagAccount] = useState(false)

  const outAccount = () => {
    dispatch(logout())
    navigate("/banner")
    togle()
  }

  const goToAccount = (event: any) => {
    event.preventDefault()
    //navigate("/account")
    if (flagAccount) {
      setFlagAccount(false)
    } else {
      setFlagAccount(true)
    }
  }

  const goToSettings = (event: any) => {
    event.preventDefault()
    navigate("/settings")
    togle()
  }

  const goToHome = (event: any) => {
    event.preventDefault()
    navigate("/")
    togle()
  }

  const togle = () => {
    if (open) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }

  const Backdrop = React.forwardRef<
    HTMLDivElement,
    { open?: boolean; className: string }
  >((props, ref) => {
    const { open, className, ...other } = props
    return (
      <div
        className={clsx({ "base-Backdrop-open": open }, className)}
        ref={ref}
        {...other}
      />
    )
  })

  const StyledBackdrop = styled(Backdrop)`
    height: 100%;
    width: 250px;
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
  `

  return (
    <header className="mt-2 ">
      <div className="d-flex justify-content-around">
        <img src={logo} className="" onClick={handleOpen} />
        <h2 className={styles.h1Header}>SMARTY NOTE</h2>
        <img src={menu} className="" onClick={handleOpen} />
      </div>
      <div onClick={togle}>
        <Modal
          className={styles.modal}
          aria-labelledby="unstyled-modal-title"
          aria-describedby="unstyled-modal-description"
          open={open}
          slots={{ backdrop: StyledBackdrop }}
        >
          <div className="h-100">
            <div className={styles.box_icon} onClick={e => e.stopPropagation()}>
              <img
                src={home}
                className={styles.modal_icon}
                onClick={goToHome}
              />
              <p
                id="unstyled-modal-description"
                className="modal-description pt-1 ps-3"
              >
                Home
              </p>
            </div>
            <div className={styles.box_icon} onClick={e => e.stopPropagation()}>
              <img
                src={account}
                className={styles.modal_icon}
                onClick={event => goToAccount(event)}
              />
              <p
                id="unstyled-modal-description"
                className="modal-description pt-1 ps-3"
              >
                Account
              </p>
            </div>
            {flagAccount ? (
              <div className={styles.info_box}>
                <h6>{user?.username}</h6>
                <p>{user?.firstName}</p>
                <p>{user?.lastName}</p>
                <p>{user?.email}</p>
              </div>
            ) : (
              <></>
            )}

            <div className={styles.box_icon} onClick={e => e.stopPropagation()}>
              <img
                src={setting}
                className={styles.modal_icon}
                onClick={goToSettings}
              />
              <p
                id="unstyled-modal-description"
                className="modal-description pt-1 ps-3"
              >
                Settings
              </p>
            </div>
            <div className={styles.box_icon} onClick={e => e.stopPropagation()}>
              <img
                src={out}
                className={styles.modal_icon}
                onClick={outAccount}
              />
              <p
                id="unstyled-modal-description"
                className="modal-description pt-1 ps-3"
              >
                Logout
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </header>
  )
}

export default Header
