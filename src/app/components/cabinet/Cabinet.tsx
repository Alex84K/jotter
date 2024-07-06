import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks"
import {
  deleteNote,
  getNote,
  selectNote,
} from "../../../features/note/noteSlice"
import remove from "/assets/remove.svg"
import styles from "./Cabinet.module.css"

const Cabinet = () => {
  const { noteId } = useParams()
  const navigate = useNavigate()
  const note = useAppSelector(selectNote)
  const dispatch = useAppDispatch()

  const delte = () => {
    dispatch(deleteNote(Number(note?.noteId)))
    navigate("/list")
  }

  useEffect(() => {
    dispatch(getNote(Number(noteId)))
  }, [])

  return (
    <div className="container">
      <div className="row col-sm-12 col-lg-6 mx-auto">
      <h3>Notely</h3>
      <h5>{note?.title}</h5>
      <p>{note?.content}</p>
      <p>{note?.date}</p>
      <div className="d-flex justify-content-between ">
        <button type="submit" className={`${styles.btn_edit} `} onClick={() => navigate(`/edit-note/${note?.noteId}`)}>
          Edit
        </button>
        <img src={remove} className={styles.btn_remove} onClick={delte} />
      </div>
      </div>
      
    </div>
  )
}

export default Cabinet
