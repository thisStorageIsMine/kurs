import { useParams } from 'react-router-dom'
import { Editor } from '..'
import { useDeleteNote, useHandleNoteEdit } from '../../hooks'
import { useNotes } from '../../store'

export const Note = () => {
    const { noteId: stringNoteId } = useParams()
    const noteId = Number(stringNoteId)
    const deleteNote = useDeleteNote()

    const notes = useNotes((state) => state.notes)
    const note = notes.find((n) => n.id === noteId)
    const { handleEdit } = useHandleNoteEdit(note?.id)
    if (!note) {
        return
        throw new Error(`There is no ${noteId} note`)
    }

    const optimisticHeader = note.name
    const optimisticPayload = note.payload

    const handleNameEdit = (name: string) => {
        handleEdit(
            {
                name,
                payload: note.payload,
                id: note.id,
            },
            note.id
        )
    }

    const handlePayloadEdit = async (payload: string) => {
        handleEdit(
            {
                payload,
                name: note.name,
                id: note.id,
            },
            note.id
        )
    }

    return (
        <div className="w-full h-full">
            <Editor
                payload={optimisticPayload}
                name={optimisticHeader}
                onEdit={handlePayloadEdit}
                onHeaderEdit={handleNameEdit}
                onDelete={() => deleteNote(note.id)}
            />
        </div>
    )
}
