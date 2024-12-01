import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../../supabase'
import {
    useDeleteNotification,
    useErrorNotification,
    useLoadNotification,
} from '../../components'
import { useNotesQueryOptions } from '.'
import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { useUser } from '../../store'

export const useDeleteNote = () => {
    const createErrorNotification = useErrorNotification()
    const queryClient = useQueryClient()
    const noteQueryOptions = useNotesQueryOptions()
    const navigate = useNavigate()

    const userId = useUser((state) => state.user?.id)

    const queryKey = useMemo(() => noteQueryOptions().queryKey, [noteQueryOptions])

    const createLoadNotification = useLoadNotification()
    const deleteNotification = useDeleteNotification()

    const { mutate } = useMutation({
        mutationKey: ['delete'],
        mutationFn: async (id: number | undefined) => {
            if (!id) return

            const { error } = await supabase.from('notes').delete().eq('id', id)

            if (error) {
                throw new Error('Failed to delete')
            }
        },
        onMutate: () => {
            createLoadNotification('Удаляем заметку', 'delete')
        },
        onError: () => {
            deleteNotification('delete')

            createErrorNotification(
                'Ошибка',
                'Не удалось удалить заметку',
                `${Date.now()}`
            )
        },
        onSuccess: async () => {
            deleteNotification('delete')
            if (!userId) return

            await queryClient.invalidateQueries({
                queryKey,
                refetchType: 'all',
            })

            const availableNotes = queryClient.getQueryData(queryKey)

            const nextNote =
                availableNotes && availableNotes.length > 0 ? availableNotes[0].id : ''
            navigate(`/${userId}/${nextNote}`)
        },
    })

    return mutate
}
