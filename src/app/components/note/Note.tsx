import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { Button } from "@mui/material"
import styles from "./Note.module.css"
import { fechNewNote } from "../../../features/note/noteApi"
import { NewNote } from "../../../features/note/type"
import { createNote } from "../../../features/note/noteSlice"
import { useNavigate } from "react-router-dom"
import remove from "/assets/remove.svg"

const Note = () => {
  const navigate = useNavigate()
  const user = useAppSelector(state => state.user)
  const [title, setTile] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const dispatch = useAppDispatch()

  async function handleNote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const note: NewNote = {
      userId: Number(user.user?.id),
      username: user.user?.username,
      title: title,
      content: content,
    }
    dispatch(createNote(note))

    setTile("")
    setContent("")
    navigate('/list')
  }

  return (
    <div>
      <div className="form-container">
        <div className="row col-sm-12 col-lg-2 mx-auto">
          <h2 className="mt-2">Create your note</h2>
          <form onSubmit={handleNote} className="mb-1 p-2" id="form">
            <input
              type="text"
              value={title}
              onChange={e => setTile(e.target.value)}
              placeholder="Title"
              className={`${styles.form_my} mt-4 mb-1`}
              id="tile"
            />
            <textarea
              rows={10}
              value={content}
              onChange={e => setContent(e.target.value)}
              className={`${styles.form_my} mt-4 mb-1 `}
              id="content"
              placeholder="Content"
            />
            <button type="submit" className={`${styles.btnForm} w-100 mt-4`}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Note
