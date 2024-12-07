import { Link } from 'react-router-dom'
import { FetchButton, Input } from '../ui'
import { useTitle } from '../../hooks/utilsHooks'

import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { useErrorNotification } from '../ui/Notifications/hooks'
import { useUser } from '../../store'
import { useLogin } from '../../hooks/'
import { TAuthnResponse } from '../../api/fetchs'

const Login = () => {
    useTitle('Войти в заметочную')
    const { setAuth } = useUser()
    const { setUser } = useUser()

    // const navigate
    // const navigateToNotes = useNavigateToNotes()

    const showErrorNotification = useErrorNotification()

    const onLoginError = () =>
            showErrorNotification(
                'Не удалось войти',
                'Неправильный логин или пароль',
                `${Date.now()}`
            ),
        onLoginSettled = (data: TAuthnResponse | undefined) => {
            if (!data) return

            const userId = data.id

            setAuth(true)
            // @ts-expect-error: Cannot find name
            _tmr.push({ type: 'reachGoal', id: 3582359, goal: 'login' })
            setUser(data.login, userId)
            // navigateToNotes(userId, availableIds)
        }

    const handleLogin = useLogin({
        onError: onLoginError,
        onSettled: onLoginSettled,
    })

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const isButtonAvalable = login.trim().length > 0 && password.trim().length > 0

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin({ login, password })

        // const { data, error } = await supabase
        //     .from('users')
        //     .select(
        //         `
        //   login,
        //   id,
        //   notes (
        //     id,
        //     name,
        //     payload,
        //     created_at
        //   )
        // `
        //     )
        //     .eq('login', login)

        // if (!data || error || data.length === 0) {
        //     return
        // }
    }

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>,
        dispatch: Dispatch<SetStateAction<string>>
    ) => {
        dispatch(e.target.value.trim())
    }

    return (
        <>
            <form
                className="flex flex-col w-full max-w-[375px] min-h-[500px] items-center p-10 gap-4"
                onSubmit={(e) => handleSubmit(e)}
            >
                <h1>Вход</h1>
                <Input
                    onFocus={(e) => (e.currentTarget.type = 'text')}
                    placeholder="Логин"
                    className="mt-6 w-full"
                    defaultValue={login}
                    onChange={(e) => handleChange(e, setLogin)}
                    required
                    autoComplete="off"
                />
                <Input
                    onFocus={(e) => (e.currentTarget.type = 'password')}
                    placeholder="Пароль"
                    className="w-full"
                    defaultValue={password}
                    onChange={(e) => handleChange(e, setPassword)}
                    required
                    autoComplete="off"
                />

                <FetchButton
                    disabled={!isButtonAvalable}
                    isFetching={false}
                    type="submit"
                >
                    Войти
                </FetchButton>

                <p className=" mt-2">
                    У вас нету аккаунта? <Link to="/signup">Создайте его!</Link>
                </p>
            </form>
        </>
    )
}

export { Login }
