import { useMutation } from '@tanstack/react-query'
import { supabase } from '../../supabase'
import { TNote } from '../../types'
import { SupabaseMapper } from '../../supabase/mapper'
import { useUser } from '../../store'

export const useInsertNote = () => {
    const userId = useUser((state) => state.user?.id)
    const mutate = useMutation({
        mutationKey: ['note', 'insert'],
        mutationFn: async (note: TNote) => {
            const mappedNote = SupabaseMapper.getBackendNote({
                ...note,
                userId: userId || -1,
            })

            const { data, error } = await supabase.from('notes').insert(mappedNote)
        },
    })
}
