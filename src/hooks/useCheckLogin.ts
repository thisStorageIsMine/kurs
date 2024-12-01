import { useState } from 'react'
import { supabase } from '../supabase'
import { useQuery } from '@tanstack/react-query'

const useCheckLogin = (login: string, onStart?: () => void, onSettled?: () => void) => {
    const [isLoginExist, setIsLoginExist] = useState(false)

    const { isFetching, isError } = useQuery({
        queryKey: ['getLogin', login],
        queryFn: async () => {
            if (onStart) {
                onStart()
            }

            const { data, error } = await supabase
                .from('users')
                .select('login, id')
                .eq('login', login)

            if (error || !data) {
                throw new Error('Failed to check login avalability')
            }

            setIsLoginExist(data.length !== 0)

            if (onSettled) {
                onSettled()
            }

            return data
        },
        refetchOnMount: false,
    })

    return { isLoginExist, isFetching, isError }
}

export { useCheckLogin }
