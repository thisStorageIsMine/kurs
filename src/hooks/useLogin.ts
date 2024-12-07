import { useMutation } from '@tanstack/react-query'
import { asyncWrap } from '../helpers'
import { fetchLogin } from '../api/fetchs'

type TUser = {
    login: string
    password: string
}

export type TUseLoginConfig = {
    onError: () => void
    onSettled: () => void
}

export const useLogin = ({ onError, onSettled }: TUseLoginConfig) => {
    const { mutate } = useMutation({
        mutationKey: ['login'],
        mutationFn: async (body: TUser) => {
            const [data, error] = await asyncWrap(fetchLogin(body))

            if (error !== null) {
                throw error
            }

            return data
        },
        onError,
        onSettled,
    })

    return mutate
}
