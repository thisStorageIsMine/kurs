import { useMutation } from '@tanstack/react-query'
import { asyncWrap } from '../helpers'
import { TAuthnResponse, fetchAuth } from '../api/fetchs'

type TUser = {
    login: string
    password: string
}

export type TUseLoginConfig = {
    onError: () => void
    onSettled: (data: TAuthnResponse | undefined) => void
}

export const useLogin = ({ onError, onSettled }: TUseLoginConfig) => {
    const { mutate } = useMutation({
        mutationKey: ['login'],
        mutationFn: async (body: TUser) => {
            const [data, error] = await asyncWrap(fetchAuth(body, 'login'))

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
