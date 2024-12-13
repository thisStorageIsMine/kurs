import { useMutation } from '@tanstack/react-query'
import { SupabaseMapper } from '../../supabase/mapper'
import { useNavigate } from 'react-router-dom'
import {
    useDeleteNotification,
    useErrorNotification,
    useLoadNotification,
} from '../../components'
import { getUserId } from '../../helpers/getUserId'
import { supabase } from '../../supabase'
import { useInvalidate } from '../useInvalidate'

export const useInsertNote = () => {
    const navigate = useNavigate()
    const userId = getUserId()
    const invalidate = useInvalidate()

    const createErrorNotification = useErrorNotification()
    const createLoadNotification = useLoadNotification()
    const deleteNotification = useDeleteNotification()

    const { mutateAsync: fetchInsertNote } = useMutation({
        mutationKey: ['note', 'insert'],
        mutationFn: async (note: { name: string; payload: string }) => {
            const mappedNote = SupabaseMapper.getBackendNote({
                ...note,
                userId: Number(userId),
                createdAt: new Date().toISOString(),
            })

            const { data, error } = await supabase
                .from('notes')
                .insert(mappedNote)
                .select('id, name, payload, user_id, created_at')

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

            await invalidate()
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

    return fetchInsertNote
}
