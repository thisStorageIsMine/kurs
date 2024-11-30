import { supabase } from '../../supabase'
import { useDebounce, useNotesQueryOptions } from '..'
import { TNote } from '../../types'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../App'

type TMutateArg = Pick<TNote, 'name' | 'payload'>

export const useHandleNoteEdit = (id: number | undefined) => {
    const noteQueryOptions = useNotesQueryOptions()
    const queryKey = noteQueryOptions().queryKey

    const mutation = useMutation({
        mutationKey: ['handleNoteEdit', id?.toString()],
        mutationFn: async ({ name, payload }: TMutateArg) => {
            if (!id) return

            const { error } = await supabase
                .from('notes')
                .update({
                    name,
                    payload,
                })
                .eq('id', id)

            if (error) throw new Error(error.message)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: queryKey,
                refetchType: 'all',
            })
        },
    })

    const handleEdit = useDebounce(mutation.mutate, 1000)

    return { handleEdit, mutation }
}
