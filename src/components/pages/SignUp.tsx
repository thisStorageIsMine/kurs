import { Link } from "react-router-dom"
import { FetchButton, Input } from "../ui"
import { useDebounce, useTitle } from "../../hooks/utilsHooks"
import { ChangeEvent, Dispatch, FormEventHandler, SetStateAction, useCallback, useEffect, useRef, useState } from "react"
import { SupabaseService } from "../../supabase"
import { useErrorNotification, useSuccessNotification } from "../ui/Notifications/hooks"
import { useCheckLogin } from "../../hooks/"

const SignUp = () => {
    useTitle('Создать аккаунт')

    const [login, setLogin] = useState('');
    const [defferedLogin, serDefferedLogin] = useState(login)
    const [password, setPassword] = useState('')
    const [confurmPassword, setConfurmPassword] = useState('')
    const [showHelper, setShowHelper] = useState(false);
    const [isButtonAvalable, setIsButtonAvalable] = useState(false)

    const createSuccessNotification = useSuccessNotification()
    const createErrorNotification = useErrorNotification()

    const showHelperTiomeoutId = useRef<NodeJS.Timeout | undefined>(undefined)
    const onQueryStart = () => {
        setShowHelper(defferedLogin !== '')
    };
    const onQuerySettled = () => {
        clearTimeout(showHelperTiomeoutId.current)
        showHelperTiomeoutId.current = setTimeout(() => setShowHelper(false), 5000)
    }

    const { isLoginExist, isFetching: isLoginFetching } = useCheckLogin(defferedLogin, onQueryStart, onQuerySettled)
    const setDebouncedLogin = useDebounce((login: string) => {
        serDefferedLogin(login)
    }, 1000)

    const isPasswordExists = password.trim() !== ''
    const isPassEqConfurm = confurmPassword === password

    const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(async (e) => {
        e.preventDefault()

        const error = (await SupabaseService.insertRows('users', [{ login, password }]))[1]

        if (error) {
            createErrorNotification('Не удалось создать пользователя', 'Поробуйте ещё раз. Или обновите страницу')
            return
        }

        createSuccessNotification(
            'Пользователь создан',
            'Можете войти в аккаунт',
        )
    }, [])

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>, dispatch: Dispatch<SetStateAction<string>>) => {
        dispatch(e.target.value.trim())
    }, [])

    const hangleLoginChange = useCallback((e: ChangeEvent<HTMLInputElement>, dispatch: Dispatch<SetStateAction<string>>) => {
        setShowHelper(false)
        setIsButtonAvalable(false)
        dispatch(e.target.value.trim())
        setDebouncedLogin(e.target.value.trim())

        if (e.target.value.trim().length < 1) {
            return null;
        }
    }, [])

    const helper = showHelper
        ? isLoginFetching ?
            <span>Проверяем свободен ли логин...</span>
            :
            <span>
                {!isLoginExist ? <p className="text-emerald-400">Логин свободен</p> : <p className="text-red-400">Логин занят!</p>}
            </span>
        : <></>

    useEffect(() => {
        setIsButtonAvalable(!isLoginExist && isPasswordExists && isPassEqConfurm && !isLoginFetching)
    }, [isLoginExist, isPasswordExists, isPassEqConfurm, isLoginFetching])

    return (
        <>
            <form className="flex flex-col w-full max-w-[425px] min-h-[500px] items-center p-10 gap-4" onSubmit={handleSubmit}>
                <h1>Регистрация</h1>
                <div className="relative flex flex-col mt-6 w-full">
                    <Input onFocus={(e) => e.currentTarget.type = 'text'} placeholder="Логин" className={``} onChange={e => hangleLoginChange(e, setLogin)} required></Input>
                    <div className="text-sm self-end mt-1">
                        {helper}
                    </div>
                </div>
                <Input onFocus={(e) => e.currentTarget.type = 'password'} placeholder="Пароль" className="w-full" onChange={e => handleChange(e, setPassword)} required></Input>
                <Input onFocus={(e) => e.currentTarget.type = 'password'} placeholder="Подтвердите пароль" className="w-full" onChange={e => handleChange(e, setConfurmPassword)} required></Input>

                <FetchButton type="submit" disabled={!isButtonAvalable} isFetching={isLoginFetching}>
                    Зарегистрироваться
                </FetchButton>

                <p className=" mt-2">
                    Уже есть аккаунт? <Link to="/login">Войдите</Link>
                </p>

            </form>
        </>
    )
}


export { SignUp }