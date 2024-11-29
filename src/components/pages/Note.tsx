import { useParams } from 'react-router-dom'
import { Editor } from '..'
import { useNotesStore } from '../../store'

export const Note = () => {
  const { note: noteSlug } = useParams()
  const note = useNotesStore((state) => state.notes.find((n) => n.slug === noteSlug))

  if (!note) {
    throw new Error(`There is no "${noteSlug}" notes`)
  }

  return (
    <div className="w-full h-full border-l border-slate-300">
      <Editor payload={note.payload} name={note.name} />
    </div>
  )
}
