import { Navigate, Route, Routes } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Baner from "./app/components/baner/Baner"
import Header from "./app/components/header/Header"
import logo from "./logo.svg"
import Login from "./app/components/login/Login"
import Registration from "./app/components/registration/Registration"
import { List } from "@mui/material"
import Note from "./app/components/note/Note"
import Lists from "./app/components/list/Lists"
import Cabinet from "./app/components/cabinet/Cabinet"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { authUser, selectUser } from "./features/user/userSlice"
import { getNotesByUsername } from "./features/note/noteSlice"
import { useEffect } from "react"
import { User } from "./features/user/type"
import Account from "./app/components/cabinet/Account"
import Settings from "./app/components/cabinet/Settings"
import EditNote from "./app/components/cabinet/EditNote"

const App = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)
  console.log(user.user)

  useEffect(() => {
    dispatch(authUser())
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="*" element={<Navigate to="/banner" />} />
        {user.status === "success" ? (
          <>
            <Route path="/" element={<Lists />} />
            <Route path="/list" element={<Lists />} />
            <Route path="/note" element={<Note />} />
            <Route path="/cabinet/:noteId" element={<Cabinet />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/list" element={<Login />} />
            <Route path="/note" element={<Login />} />
            <Route path="/cabinet/:noteId" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </>
        )}
        <Route path="/banner" element={<Baner />} />
        <Route path="/account" element={<Account />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/edit-note/:noteId" element={<EditNote />} />
      </Routes>
    </div>
  )
}

export default App
