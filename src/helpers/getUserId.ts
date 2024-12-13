import { JwtPayload } from 'jwt-decode'
import { decodeToken, getTokens } from '.'

export const getUserId = () => {
    const { refresh } = getTokens()
    if (!refresh) throw new Error('No refresh token')

    const payload = decodeToken(refresh) as JwtPayload & { id: number; login: string }
    if (!payload || !payload.id) throw new Error('Failed to decode token')

    const userId = payload.id
    if (!userId) throw new Error('No userId')
    return userId as number
}
