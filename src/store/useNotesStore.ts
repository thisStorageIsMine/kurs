import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { TNotesStore, TNotesStoreActions } from '.'

export const useNotesStore = create<TNotesStore & TNotesStoreActions>()(
  immer((set) => ({
    notes: [],
    addNote: (note) => set((state) => {
      state.notes.push(note)
    }),
    deleteNote: (id) => set((state) => {
      state.notes = state.notes.filter(n => n.id !== id)
    }),
    setNotes: (notes) =>
      set((state) => {
        state.notes = notes
      }),
  }))
)
