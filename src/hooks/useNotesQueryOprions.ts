import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import { useUser } from '../store'
import { fetchNotes } from '../helpers'

export const useNotesQueryOptions = () => {
    const userId = useUser((state) => state.user?.id)

    return () =>
        queryOptions({
            queryKey: ['user', `${userId}`],
            queryFn: async ({ queryKey }) => {
                const userId = queryKey[1]

                if (!userId) {
                    throw new Error('No userID')
                }

                return await fetchNotes(Number(userId))
            },
            placeholderData: keepPreviousData,
            refetchOnWindowFocus: false,
        })
}
