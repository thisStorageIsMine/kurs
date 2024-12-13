import { JwtPayload, jwtDecode } from 'jwt-decode'

export const setTokens = (tokens: { accessJwt: string; refreshJwt: string }) => {
    const { accessJwt, refreshJwt } = tokens
    const expiresPlaceholder = new Date()
    expiresPlaceholder.setDate(expiresPlaceholder.getDate() + 7)

    // const accessExpIn = decodeToken(accessJwt)
    //         ? new Date(decodeToken(accessJwt).exp * 1000)
    //         : expiresPlaceholder,
    //     refreshExpIn = decodeToken(refreshJwt)
    //         ? new Date(decodeToken(refreshJwt).exp * 1000)
    //         : expiresPlaceholder

    // const accessExp = accessExpIn.toUTCString(),
    //     refreshExp = refreshExpIn.toUTCString()

    // URL-кодирование JWT
    const encodedAccessJwt = encodeURIComponent(accessJwt)
    const encodedRefreshJwt = encodeURIComponent(refreshJwt)

    sessionStorage.setItem('Authorization', encodedAccessJwt)
    sessionStorage.setItem('refreshToken', encodedRefreshJwt)
}

export const decodeToken = (token: string) => {
    try {
        const payload = jwtDecode(token)
        return payload
    } catch {
        console.warn('Failed to parse JSON')
        return null
    }
}

export const getTokens = () => {
    const access = sessionStorage.getItem('Authorization')
    const refresh = sessionStorage.getItem('refreshToken')

    const decodedAccess = access ? decodeURIComponent(access) : null
    const decodedRefresh = refresh ? decodeURIComponent(refresh) : null

    return {
        access: decodedAccess,
        refresh: decodedRefresh,
    }
}

export const getUser = () => {
    const { refresh } = getTokens()

    if (!refresh) return null

    const user = decodeToken(refresh) as JwtPayload & { id: number; login: string }

    return user
}
