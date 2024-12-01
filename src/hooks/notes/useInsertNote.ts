import { useMutation } from '@tanstack/react-query'
import { supabase } from '../../supabase'
import { SupabaseMapper } from '../../supabase/mapper'
import { useUser } from '../../store'
import { queryClient } from '../../App'
import { useNotesQueryOptions } from '.'
import { useMemo } from 'react'
import { TNote } from '../../types'
import { useNavigate } from 'react-router-dom'
import {
    useDeleteNotification,
    useErrorNotification,
    useLoadNotification,
} from '../../components'

export const useInsertNote = () => {
    const userId = useUser((state) => state.user?.id)
    const navigate = useNavigate()

    const queryOptions = useNotesQueryOptions()
    const queryKey = useMemo(() => queryOptions().queryKey, [queryOptions])

    const createErrorNotification = useErrorNotification()
    const createLoadNotification = useLoadNotification()
    const deleteNotification = useDeleteNotification()

    const mutation = useMutation({
        mutationKey: ['note', 'insert'],
        mutationFn: async (note: Omit<TNote, 'id'>) => {
            console.log('start')
            const mappedNote = SupabaseMapper.getBackendNote({
                ...note,
                userId: userId || -1,
            })

            const { data, error } = await supabase
                .from('notes')
                .insert(mappedNote)
                .select('id, name, payload, user_id, created_at, last_edit')

            if (error) {
                throw new Error('Failed to create new note')
            }

            return data.map((n) => SupabaseMapper.getClientNotes(n))
        },
        onMutate: () => {
            createLoadNotification('Создаём заметку', 'create')
        },
        async onSuccess(data) {
            deleteNotification('create')

            await queryClient.invalidateQueries({
                queryKey,
                refetchType: 'all',
            })
            navigate(`/${userId}/${data[0].id}`, {})
        },
        onError() {
            deleteNotification('create')

            createErrorNotification(
                'Не получилсоь создать заметку',
                'Попробуйте ещё раз.',
                `${Date.now}`
            )
        },
    })

    return mutation
}
