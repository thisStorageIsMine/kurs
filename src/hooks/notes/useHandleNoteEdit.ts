import { supabase } from '../../supabase'
import { useDebounce, useNotesQueryOptions } from '..'
import { TNote } from '../../types'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../App'
import { useCallback, useMemo } from 'react'

type TMutateArg = Pick<TNote, 'name' | 'payload' | 'lastEdit'>

export const useHandleNoteEdit = (id: number | undefined) => {
    const noteQueryOptions = useNotesQueryOptions()
    const queryKey = useMemo(() => noteQueryOptions().queryKey, [])

    const invalidateQuery = useCallback(async () => {
        await queryClient.invalidateQueries({
            queryKey: queryKey,
            refetchType: 'all',
        })
    }, [queryKey])

    const mutation = useMutation({
        mutationKey: ['handleNoteEdit', id?.toString()],
        mutationFn: async (note: TMutateArg | null) => {
            if (!id || !note) return

            const { error } = await supabase
                .from('notes')
                .update({
                    name: note.name,
                    payload: note.payload,
                    last_edit: note.lastEdit,
                })
                .eq('id', id)

            if (error) throw new Error(error.message)
        },
        onSuccess: invalidateQuery,
    })

    const handleEdit = useDebounce(mutation.mutate, 1000)

    return { handleEdit, mutation }
}
