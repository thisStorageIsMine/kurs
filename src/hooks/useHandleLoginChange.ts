import { ChangeEventHandler, useCallback, useEffect, useRef, useState } from 'react'
import { useCheckLogin, useDebounce } from '.'
import { useErrorNotification } from '../components'

export const useHandleLoginChange = () => {
    const [login, setLogin] = useState(''),
        [isLoginExists, setIsLoginExists] = useState(false),
        [showHelper, setShowHelper] = useState(false),
        [isCheckingLogin, setIsCheckingLogin] = useState(false)

    const [defferedLogin, setDefferedLogin] = useState(login),
        helperTimeoutRef = useRef<undefined | NodeJS.Timeout>(undefined)

    const setDebouncedLogin = useDebounce((login) => {
        if (typeof login !== 'string') return
        setDefferedLogin(login)
    }, 1000)

    const handleLoginChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const text = e.target.value.trim()
        setLogin(text)
        setDebouncedLogin(text)
    }

    const createErrorNotify = useErrorNotification()

    const checkLogin = useCheckLogin(defferedLogin)

    const bootstrapHelper = useCallback(() => {
        setShowHelper(true)
        clearTimeout(helperTimeoutRef.current)
        setTimeout(() => setShowHelper(false), 5000)
    }, [])
    const clearHelper = useCallback(() => {
        clearTimeout(helperTimeoutRef.current)
        setShowHelper(false)
    }, [])

    useEffect(() => {
        if (defferedLogin.trim() === '') return

        bootstrapHelper()

        const asyncWrap = async () => {
            setIsCheckingLogin(true)
            const { data: isLoginExists, isError } = await checkLogin({
                cancelRefetch: true,
            })

            setIsCheckingLogin(false)

            if (isError) {
                clearHelper()
                createErrorNotify('Ошибка', 'Не удалось проверить логин', `${new Date()}`)
            } else {
                const isExists = isLoginExists !== undefined ? isLoginExists : true
                setIsLoginExists(isExists)
            }
        }

        asyncWrap()
    }, [defferedLogin])

    return { login, handleLoginChange, showHelper, isCheckingLogin, isLoginExists }
}
