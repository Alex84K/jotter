import { RegistrationError } from "../user/type"
import {  EditNoteDto, NewNote, Note } from "./type"
import axios, { AxiosError } from "axios"

export const fechNewNote = async (note: NewNote): Promise<Note> => {
  const res = await axios.post(
    `/api/v1/notes`,
    {
      userId: note.userId,
      username: note.username,
      title: note.title,
      content: note.content,
    },
    { headers: { "Content-Type": "application/json" } },
  )
  return res.data
}

export async function fechNote(id: number): Promise<Note> {
  const res = await axios.get(`/api/v1/notes/${id}`)
  return res.data
}

export async function fechDeleteNote(id: number): Promise<Note> {
  const res = await axios.delete(`/api/v1/notes/${id}`)
  return res.data
}

export async function fechEditNote(note: EditNoteDto): Promise<Note> {
  const res = await axios.put(
    `/api/v1/notes/${note.noteId}`,
    {
      userId: note.userId,
      username: note.username,
      title: note.title,
      content: note.content
    },
    { headers: { "Content-Type": "application/json" } },
  )
  return res.data
}

export async function fechNotesUserName(name: string): Promise<Note[]> {
  const res = await axios.get(`/api/v1/notes/users/${name}`)
  return res.data
}
