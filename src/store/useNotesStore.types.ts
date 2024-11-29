import { TNote } from '../types'

export type TNotesStore = {
  notes: TNote[]
}

export type TNotesStoreActions = {
  addNote: (note: TNote) => void
  deleteNote: (id: number) => void
  setNotes: (notes: TNote[]) => void
}
