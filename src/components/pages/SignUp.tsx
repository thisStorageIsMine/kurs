import { Link } from 'react-router-dom'
import { FetchButton, Input } from '../ui'
import { useTitle } from '../../hooks/utilsHooks'
import {
    ChangeEvent,
    Dispatch,
    FormEventHandler,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from 'react'
import { supabase } from '../../supabase'
import { useErrorNotification } from '../ui/Notifications/hooks'
import { useHandleLoginChange, useNavigateToNotes } from '../../hooks/'
import { useUser } from '../../store'

import { useShallow } from 'zustand/react/shallow'

const SignUp = () => {
    useTitle('Создать аккаунт')

    const navigateToNotes = useNavigateToNotes()

    const [password, setPassword] = useState('')
    const [confurmPassword, setConfurmPassword] = useState('')
    const [isButtonAvalable, setIsButtonAvalable] = useState(false)

    const [setUser, setAuth] = useUser(
        useShallow((state) => [state.setUser, state.setAuth])
    )

    const createErrorNotification = useErrorNotification()

    const { login, showHelper, isCheckingLogin, handleLoginChange, isLoginExists } =
        useHandleLoginChange()

    const isPasswordExists = password.trim() !== ''
    const isPassEqConfurm = confurmPassword === password

    const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
        async (e) => {
            e.preventDefault()

            const { data, error } = await supabase
                .from('users')
                .insert({ login, password }).select(`
            id,
            login,
            notes (
              id,
              name,
              payload,
              created_at,
              last_edit
            )
          `)

            if (!data || error) {
                createErrorNotification(
                    'Не удалось создать пользователя',
                    'Поробуйте ещё раз. Или обновите страницу',
                    `${Date.now()}`
                )
                return
            }

            const userId = data[0].id

            const availableNotesId = data[0].notes.map((note) => note.id)

            setAuth(true)
            setUser(data[0].login, userId)

            navigateToNotes(userId, availableNotesId)
        },
        [login, password]
    )

    const handleChange = useCallback(
        (
            e: ChangeEvent<HTMLInputElement>,
            dispatch: Dispatch<SetStateAction<string>>
        ) => {
            dispatch(e.target.value.trim())
        },
        []
    )

    const helper = showHelper ? (
        isCheckingLogin ? (
            <span>Проверяем свободен ли логин...</span>
        ) : (
            <span>
                {!isLoginExists ? (
                    <p className="text-emerald-400">Логин свободен</p>
                ) : (
                    <p className="text-red-400">Логин занят!</p>
                )}
            </span>
        )
    ) : (
        <></>
    )

    useEffect(() => {
        setIsButtonAvalable(
            !isLoginExists && isPasswordExists && isPassEqConfurm && !isCheckingLogin
        )
    }, [isLoginExists, isPasswordExists, isPassEqConfurm, isCheckingLogin])

    return (
        <>
            <form
                className="flex flex-col w-full max-w-[425px] min-h-[500px] items-center p-10 gap-4"
                onSubmit={handleSubmit}
            >
                <h1>Регистрация</h1>
                <div className="relative flex flex-col mt-6 w-full">
                    <Input
                        onFocus={(e) => (e.currentTarget.type = 'text')}
                        placeholder="Логин"
                        className={``}
                        onChange={(e) => handleLoginChange(e)}
                        required
                    ></Input>
                    <div className="text-sm self-end mt-1">{helper}</div>
                </div>
                <Input
                    onFocus={(e) => (e.currentTarget.type = 'password')}
                    placeholder="Пароль"
                    className="w-full"
                    onChange={(e) => handleChange(e, setPassword)}
                    required
                ></Input>
                <Input
                    onFocus={(e) => (e.currentTarget.type = 'password')}
                    placeholder="Подтвердите пароль"
                    className="w-full"
                    onChange={(e) => handleChange(e, setConfurmPassword)}
                    required
                ></Input>

                <FetchButton
                    type="submit"
                    disabled={!isButtonAvalable}
                    isFetching={isCheckingLogin}
                >
                    Зарегистрироваться
                </FetchButton>

                <p className=" mt-2">
                    Уже есть аккаунт? <Link to="/">Войдите</Link>
                </p>
            </form>
        </>
    )
}

export { SignUp }
