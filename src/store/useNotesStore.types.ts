import { TNote } from '../types'

export type TUseTempNote = {
    notes: TNote[]
}

export type TUseTempNoteActions = {
    addNote: (note: TNote) => void
    setNotes: (notes: TNote[]) => void
}
