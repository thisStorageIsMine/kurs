import { useCallback } from 'react'
import { useDebounce } from '.'
import { supabase } from '../supabase'

export const useHandleEdit = (id: number | undefined, slug: string | undefined) => {
    const updateNoteText = useCallback(async (payload: string) => {
        if (!id) return

        const { error, data } = await supabase
            .from('notes')
            .update({
                payload,
            })
            .eq('id', id)

        if (error) {
            throw new Error('Failed to update note')
        }

        return data
    }, [])

    const debouncedUpdateFn = useDebounce(updateNoteText, 1000)
    const saveToSeccionStorage = (payload: string) => {
        if (!slug) return

        sessionStorage.setItem(slug, payload)
    }

    return async (payload: string) => {
        saveToSeccionStorage(payload)
        debouncedUpdateFn(payload)
    }
}
