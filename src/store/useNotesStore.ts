import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { TUseTempNote, TUseTempNoteActions } from '.'

export const useNotes = create<TUseTempNote & TUseTempNoteActions>()(
    immer((set) => ({
        notes: [],
        addNote: (note) =>
            set((state) => {
                state.notes.push(note)
            }),
        setNotes: (notes) =>
            set((state) => {
                console.log('PUSH')
                state.notes = notes
            }),
    }))
)
