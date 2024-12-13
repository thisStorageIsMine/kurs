import { useCallback } from 'react'
import { useNotes } from '../store'
import { asyncWrap, fetchNotes } from '../helpers'

export const useInvalidate = () => {
    const setNotes = useNotes((state) => state.setNotes)

    return useCallback(async () => {
        const [notes] = await asyncWrap(fetchNotes())

        setNotes(notes ?? [])
    }, [])
}
