import { useLogin, useNavigateToNotes } from '.'
import { TAuthnResponse } from '../api/fetchs'
import { useErrorNotification } from '../components'
import { setTokens } from '../helpers'
import { useUser } from '../store'

export const useHandleLogin = () => {
    const showErrorNotification = useErrorNotification()
    const navigateToNotes = useNavigateToNotes()
    const { setAuth } = useUser()
    const { setUser } = useUser()

    const onLoginError = () =>
            showErrorNotification(
                'Не удалось войти',
                'Неправильный логин или пароль',
                `${Date.now()}`
            ),
        onLoginSettled = (data: TAuthnResponse | undefined) => {
            if (!data) return

            const userId = data.id
            setTokens(data.tokens)

            setAuth(true)
            // @ts-expect-error: Cannot find name
            _tmr.push({ type: 'reachGoal', id: 3582359, goal: 'login' })
            setUser(data.login, userId)
            navigateToNotes(userId)
        }

    const handleLogin = useLogin({
        onError: onLoginError,
        onSettled: onLoginSettled,
    })

    return handleLogin
}
