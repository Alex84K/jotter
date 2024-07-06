import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { editNote, selectNote } from "../../../features/note/noteSlice"
import styles from "../note/Note.module.css"
import { selectUser } from "../../../features/user/userSlice"
import { EditNoteDto } from "../../../features/note/type"

const EditNote = () => {
  const { noteId } = useParams()
  const navigate = useNavigate()
  const note = useAppSelector(selectNote)
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const [title, setTile] = useState<string>("")
  const [content, setContent] = useState<string>("")

  async function handleNote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const edNote: EditNoteDto = {
      noteId: Number(note?.noteId),
      userId: Number(user?.id),
      username: user?.username,
      title: title,
      content: content,
    }
    dispatch(editNote(edNote))

    setTile("")
    setContent("")
    navigate("/list")
  }

  useEffect(() => {
    if(note) {
        setTile(note?.title)
        setContent(note?.content)
    }
    
  }, [])

  return (
    <div>
      <div className="form-container">
        <div className="row col-sm-12 col-lg-6 mx-auto">
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

export default EditNote
