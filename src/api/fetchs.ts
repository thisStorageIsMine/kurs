import { API } from './endpoints'

export type TFetchLogin = {
    login: string
    password: string
}

export type TLoginResponse = {
    login: string
    id: number
    role: 'user' | 'admin'
    token: {
        accessJwt: string
        refreshJwt: string
    }
}

export const fetchLogin = async (user: TFetchLogin) => {
    const response = await fetch(API.login, {
        method: 'POST',
        headers: [['Content-type', 'application/json']],
        body: JSON.stringify(user),
    })

    if (response.status < 200 || response.status >= 400) {
        throw new Error(`${response.status} server response`)
    }

    const data = await response.json()

    return data as TLoginResponse
}
