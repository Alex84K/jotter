export interface NewNote {
  userId?: number
  username?: string
  title: string
  content: string
}

export interface Note {
  noteId: number
  username: string
  title: string
  content: string
  date: string
}

export interface NoteState {
  notes?: Note[]
  note?: Note | undefined
  errorMessage?: string
  status?: "idle" | "loading" | "success" | "error"
}

export interface EditNoteDto {
  noteId?: number
  userId?: number
  username?: string
  title: string
  content: string
}
