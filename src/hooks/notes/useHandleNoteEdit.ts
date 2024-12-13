import { useUniqueDebounce } from '..'
import { TNote } from '../../types'
import { useMutation } from '@tanstack/react-query'
import { insertNote } from '../../api/fetchs'
import {
    useDeleteNotification,
    useErrorNotification,
    useLoadNotification,
} from '../../components'
import { useInvalidate } from '../useInvalidate'

type TMutateArg = Pick<TNote, 'name' | 'payload' | 'id'>

export const useHandleNoteEdit = (id: number | undefined) => {
    const createErrorNotify = useErrorNotification()
    const loadNot = useLoadNotification()
    const deleteNot = useDeleteNotification()

    const invalidateQuery = useInvalidate()
    const mutation = useMutation({
        mutationKey: ['handleNoteEdit', `${id?.toString()}`],
        mutationFn: async (note: TMutateArg | null) => {
            loadNot('Сохраняем заметки...', 'save')
            if (!id || !note) return

            const newNote = await insertNote({
                name: note.name,
                payload: note.payload,
                noteId: note.id,
            })
            return newNote
        },
        onSuccess: () => {
            invalidateQuery()
            deleteNot('save')
        },
        onError: () => {
            deleteNot('save')
            createErrorNotify(
                'Не удалось сохранить заметку',
                'Проверьте подключение к интернету',
                'failedToSave'
            )
        },
    })

    const handleEdit = useUniqueDebounce(
        (note: TMutateArg | null) => mutation.mutate(note),
        5000
    )

    return { handleEdit, mutation }
}
