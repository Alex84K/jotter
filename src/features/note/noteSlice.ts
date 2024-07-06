import { createAppSlice } from "../../app/createAppSlice"
import { fechDeleteNote, fechEditNote, fechNewNote, fechNote, fechNotesUserName } from "./noteApi"
import {  EditNoteDto, NewNote, Note, NoteState } from "./type"

const initialState: NoteState = {
  note: {} as Note,
  notes: [] as Note[],
  errorMessage: "",
  status: "idle",
}

export const noteSlice = createAppSlice({
  name: "notes",
  initialState,
  reducers: create => ({
    createNote: create.asyncThunk(
        async (newNote: NewNote) => {
          const response = await fechNewNote(newNote)
          return response
        },
        {
          pending: state => {
            state.status = "loading"
          },
          fulfilled: (state, action) => {
            state.notes?.push(action.payload)
            state.status = "success"
          },
          rejected: (state, action) => {
            state.errorMessage = action.error.message
            state.status = "error"
          },
        },
      ),
      getNote: create.asyncThunk(
        async (id: number) => {
          const response = await fechNote(id)
          return response
        },
        {
          pending: state => {
            state.status = "loading"
          },
          fulfilled: (state, action) => {
            state.note = action.payload
            state.status = "success"
          },
          rejected: (state, action) => {
            state.errorMessage = action.error.message
            state.status = "error"
          },
        },
      ),
      deleteNote: create.asyncThunk(
        async (id: number) => {
          const response = await fechDeleteNote(id)
          return response
        },
        {
          pending: state => {
            state.status = "loading"
          },
          fulfilled: (state, action) => {
            state.note = {} as Note
            state.status = "success"
          },
          rejected: (state, action) => {
            state.errorMessage = action.error.message
            state.status = "error"
          },
        },
      ),
      editNote: create.asyncThunk(
        async (note: EditNoteDto) => {
          const response = await fechEditNote(note)
          return response
        },
        {
          pending: state => {
            state.status = "loading"
          },
          fulfilled: (state, action) => {
            state.note = action.payload
            state.status = "success"
          },
          rejected: (state, action) => {
            state.errorMessage = action.error.message
            state.status = "error"
          },
        },
      ),
      getNotesByUsername: create.asyncThunk(
        async (name: string) => {
          const response = await fechNotesUserName(name)
          return response
        },
        {
          pending: state => {
            state.status = "loading"
          },
          fulfilled: (state, action) => {
            state.notes = action.payload
            state.status = "success"
          },
          rejected: (state, action) => {
            state.errorMessage = action.error.message
            state.status = "error"
          },
        },
      ),
  }),
  selectors: {
    selectNotes: state => state.notes,
    selectNote: note => note.note,
    selectNoteStatus: state => state.status,
    selectError: state => state.errorMessage,
  },
})
export const {createNote, getNotesByUsername, getNote, deleteNote, editNote} = noteSlice.actions
export const { selectNotes, selectError, selectNote, selectNoteStatus } = noteSlice.selectors
