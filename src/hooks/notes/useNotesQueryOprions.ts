import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import { useUser } from '../../store'
import { fetchNotes } from '../../helpers'

export type TUseNotesQueryOptions = {
    onStart?: () => void
    onSettled?: () => void
}

export const useNotesQueryOptions = (options: TUseNotesQueryOptions = {}) => {
    const userId = useUser((state) => state.user?.id)
    const { onStart, onSettled } = options

    return () =>
        queryOptions({
            queryKey: ['user', `${userId}`],
            queryFn: async ({ queryKey }) => {
                if (onStart) {
                    onStart()
                }

                const userId = queryKey[1]

                if (!userId) {
                    throw new Error('No userID')
                }

                const data = await fetchNotes(Number(userId))

                if (onSettled) {
                    onSettled()
                }

                return data
            },
            placeholderData: keepPreviousData,
            refetchOnWindowFocus: false,
        })
}
