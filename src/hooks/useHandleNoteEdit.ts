import { supabase } from '../supabase'
import { useDebounce } from '.'
import { TNote } from '../types'
import { useMutation } from '@tanstack/react-query'

type TMutateArg = Pick<TNote, 'name' | 'payload'>

export const useHandleNoteEdit = (id: number | undefined) => {
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
    })

    const handleEdit = useDebounce(mutation.mutate, 1000)

    return { handleEdit, mutation }
}
