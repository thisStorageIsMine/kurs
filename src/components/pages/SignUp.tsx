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
import { useHandleLoginChange, useHandleSignup } from '../../hooks/'

const SignUp = () => {
    useTitle('Создать аккаунт')

    const [password, setPassword] = useState('')
    const [confurmPassword, setConfurmPassword] = useState('')
    const [isButtonAvalable, setIsButtonAvalable] = useState(false)

    const { login, showHelper, isCheckingLogin, handleLoginChange, isLoginExists } =
        useHandleLoginChange()

    const isPasswordExists = password.trim() !== ''
    const isPassEqConfurm = confurmPassword === password

    const handleSubmit: FormEventHandler<HTMLFormElement> = useHandleSignup({
        login,
        password,
    })

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
