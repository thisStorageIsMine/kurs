import { useMutation } from '@tanstack/react-query'
import {
    useDeleteNotification,
    useErrorNotification,
    useLoadNotification,
} from '../components'
import { TAuthnResponse, TUser, fetchAuth } from '../api/fetchs'
import { FormEventHandler, useCallback } from 'react'
import { asyncWrap, setTokens } from '../helpers'
import { useUser } from '../store'
import { useShallow } from 'zustand/react/shallow'
import { useNavigateToNotes } from '.'

export const useHandleSignup = (candidate: TUser) => {
    const createErrorNotify = useErrorNotification()
    const navigateToNotes = useNavigateToNotes()
    const loadNotify = useLoadNotification()
    const deleteNotify = useDeleteNotification()

    const [setUser, setAuth] = useUser(
        useShallow((state) => [state.setUser, state.setAuth])
    )
    const { mutateAsync: fetchSignup } = useMutation({
        mutationKey: ['signup'],
        mutationFn: async (candidate: TUser): Promise<TAuthnResponse> => {
            loadNotify('Создаём аккаунт...', 'signup')
            const data = await fetchAuth(candidate, 'signup')

            return data
        },
    })

    const handleSignup: FormEventHandler<HTMLFormElement> = useCallback(
        async (e) => {
            e.preventDefault()

            const [user, error] = await asyncWrap(fetchSignup(candidate))
            if (error !== null) {
                console.error(error)
                deleteNotify('signup')
                createErrorNotify(
                    'Не удалось зарегистрироваться',
                    'Пожалуйста, попробуйте ещё раз',
                    `${new Date()}`
                )

                return
            }

            setTokens(user.tokens)
            setAuth(true)
            setUser(user.login, user.id)
            navigateToNotes(user.id)
            deleteNotify('signup')
        },
        [candidate, setAuth, setUser, navigateToNotes, fetchSignup]
    )

    return handleSignup
}
