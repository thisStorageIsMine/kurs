import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import { fetchNotes } from '../../helpers'

export type TUseNotesQueryOptions = {
    onStart?: () => void
    onSettled?: () => void
}

export const useNotesQueryOptions = (options: TUseNotesQueryOptions = {}) => {
    const { onStart, onSettled } = options

    return () =>
        queryOptions({
            queryKey: ['user'],
            queryFn: async () => {
                if (onStart) {
                    onStart()
                }

                const notes = await fetchNotes()

                if (onSettled) {
                    onSettled()
                }

                return notes
            },
            placeholderData: keepPreviousData,
            refetchOnWindowFocus: false,
        })
}
