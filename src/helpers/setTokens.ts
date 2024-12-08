export const setTokens = (tokens: { accessJwt: string; refreshJwt: string }) => {
    const { accessJwt, refreshJwt } = tokens
    const expiresPlaceholder = new Date()
    expiresPlaceholder.setDate(expiresPlaceholder.getDate() + 7)

    const accessExpIn = decodeToken(accessJwt)
            ? new Date(decodeToken(accessJwt).exp * 1000)
            : expiresPlaceholder,
        refreshExpIn = decodeToken(refreshJwt)
            ? new Date(decodeToken(refreshJwt).exp * 1000)
            : expiresPlaceholder

    const accessExp = accessExpIn.toUTCString(),
        refreshExp = refreshExpIn.toUTCString()

    document.cookie = `Authorization=${accessJwt}; expires=${accessExp};`
    document.cookie = `refreshToken=${refreshJwt}; expires=${refreshExp};`
}

export const decodeToken = (token: string) => {
    try {
        return JSON.parse(atob(token.split('.')[1]))
    } catch {
        console.warn('Failed to parse JSON')
        return null
    }
}

export const getTokens = () => {
    const access = document.cookie
            .split('; ')
            .map((c) => c.split('='))
            .find(([key]) => key === 'Authorization'),
        refresh = document.cookie
            .split('; ')
            .map((c) => c.split('='))
            .find(([key]) => key === 'refreshToken')

    return {
        access,
        refresh,
    }
}
