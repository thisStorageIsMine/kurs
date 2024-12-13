import { memo, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { fetchLoginViaToken } from '../api/fetchs'
import { decodeToken, getTokens, setTokens } from '../helpers'
import { useNavigateToNotes } from '../hooks'
import { Outlet } from 'react-router-dom'
import { JwtPayload } from 'jwt-decode'
import { Loader } from '.'

export const JWTWrapper = memo(() => {
    const navigateToNotes = useNavigateToNotes()
    const [showLoader, setShowLoader] = useState(true)

    const { mutate: loginViaTokens } = useMutation({
        mutationFn: async (token: string) => {
            const tokens = await fetchLoginViaToken(token)

            setTokens(tokens.tokens)

            return tokens.tokens
        },
        onError: () => setShowLoader(false),
        onSuccess: async (data) => {
            const user = decodeToken(data.refreshJwt) as JwtPayload & {
                id: number
                login: string
            }
            if (typeof user.id !== 'number') {
                setShowLoader(false)
                return
            }

            try {
                await navigateToNotes(user.id)
                setShowLoader(false)
            } catch {
                setShowLoader(false)
                return
            }
        },
    })

    useEffect(() => {
        const { access, refresh } = getTokens()

        if (!access || !refresh) {
            setShowLoader(false)
            return
        }

        loginViaTokens(refresh)
    }, [])

    if (showLoader) {
        return <Loader className="size-80" />
    }

    return <Outlet />
})
