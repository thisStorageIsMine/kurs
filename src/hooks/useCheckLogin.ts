import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchIsLoginExists } from '../api/fetchs'

const useCheckLogin = (
    login: string
    // onStart: () => void,
    // onSettled: () => void,
    // onError: () => void
) => {
    const { refetch } = useQuery({
        queryKey: ['checkLogin', login],
        queryFn: async () => {
            // if (onStart) {
            //     onStart()
            // }

            const { is_exists: isExists } = await fetchIsLoginExists(login)
            return isExists
        },
        enabled: false,
    })

    return useMemo(() => refetch, [refetch])
}

export { useCheckLogin }
