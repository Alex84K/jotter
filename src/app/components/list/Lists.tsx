import { useNavigate } from "react-router-dom"
import plus from "/assets/plus.svg"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { useEffect, useState } from "react"
import {
  getNotesByUsername,
  selectNotes,
} from "../../../features/note/noteSlice"
import { authUser, selectUser } from "../../../features/user/userSlice"
import styles from "./List.module.css"

const Lists = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const notes = useAppSelector(selectNotes)
  

  useEffect(() => {
    dispatch(getNotesByUsername(String(user?.username)))
  }, [user])

  return (
    <div className="container mt-4">
      <div className="mx-auto col-sm-12 col-lg-3">
        <h3 className="mb-3">Notation</h3>
        {notes?.map(n => (
          <div key={n.noteId} className={styles.noteBox} onClick={() => navigate(`/cabinet/${n.noteId}`)}>
            {n.title}
          </div>
        ))}
        <img src={plus} className={styles.plus} onClick={() => navigate("/note")} />
        
      </div>
    </div>
  )
}

export default Lists
