import { useParams } from 'react-router-dom'
import { Editor } from '..'
import { useHandleNoteEdit, useNotesQueryOptions } from '../../hooks'
import { queryClient } from '../../App'

export const Note = () => {
    const { note: noteSlug } = useParams()
    const notesQueryOptions = useNotesQueryOptions()

    const note = queryClient
        .getQueryData(notesQueryOptions().queryKey)
        ?.find((n) => n.slug === noteSlug)

    const { handleEdit, mutation } = useHandleNoteEdit(note?.id)

    if (!note) {
        throw new Error(`There is no "${noteSlug}" notes`)
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
        <div className="w-full h-full border-l border-slate-300">
            <Editor
                payload={optimisticPayload}
                name={optimisticHeader}
                onEdit={handlePayloadEdit}
                onHeaderEdit={handleNameEdit}
            />
        </div>
    )
}
