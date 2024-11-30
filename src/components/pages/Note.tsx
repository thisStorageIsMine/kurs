import { useParams } from 'react-router-dom'
import { Editor } from '..'
import { useHandleNoteEdit, useNotesQueryOptions } from '../../hooks'
import { queryClient } from '../../App'

export const Note = () => {
    const { noteId: stringNoteId } = useParams()
    const noteId = Number(stringNoteId)
    const notesQueryOptions = useNotesQueryOptions()

    const note = queryClient
        .getQueryData(notesQueryOptions().queryKey)
        ?.find((n) => n.id === (noteId || -1))

    const { handleEdit, mutation } = useHandleNoteEdit(note?.id)

    if (!note) {
        throw new Error(`There is no ${note} note`)
    }

    const optimisticHeader = mutation.variables?.name || note.name
    const optimisticPayload = mutation.variables?.payload || note.payload

    const handleNameEdit = (name: string) => {
        handleEdit({
            name,
            payload: note.payload,
        })
    }

    const handlePayloadEdit = (payload: string) => {
        handleEdit({
            payload,
            name: note.name,
        })
    }

    return (
        <div className="w-full h-full ">
            <Editor
                payload={optimisticPayload}
                name={optimisticHeader}
                onEdit={handlePayloadEdit}
                onHeaderEdit={handleNameEdit}
            />
        </div>
    )
}
