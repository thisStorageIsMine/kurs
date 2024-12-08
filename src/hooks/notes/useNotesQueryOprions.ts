import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import { useUser } from '../../store'
import { fethcNotesFromDeepkit } from '../../api/fetchs'

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

                const userId = Number(queryKey[1])

                if (!userId || typeof userId !== 'number') {
                    throw new Error("No userID or it's isn't number")
                }

                // const data = await fetchNotes(Number(userId))
                const notes = await fethcNotesFromDeepkit(userId)

                if (onSettled) {
                    onSettled()
                }

                return notes
            },
            placeholderData: keepPreviousData,
            refetchOnWindowFocus: false,
        })
}
