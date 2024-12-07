import { API } from './endpoints'

export type TUser = {
    login: string
    password: string
}

export type TTokens = {
    accessJwt: string
    refreshJwt: string
}

export type TLoginExists = {
    is_exists: boolean
}

export type TAuthnResponse = {
    login: string
    id: number
    role: 'user' | 'admin'
    token: {
        accessJwt: string
        refreshJwt: string
    }
}

export const fetchAuth = async (candidate: TUser, type: 'login' | 'signup') => {
    const endpoint = type === 'login' ? API.login : API.signup

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: [['Content-type', 'application/json']],
        body: JSON.stringify(candidate),
    })

    if (response.status < 200 || response.status >= 400) {
        throw new Error(`${response.status} server response`)
    }

    const data = await response.json()

    return data as TAuthnResponse
}

export const fetchTokens = async (candidate: TUser) => {
    const response = await fetch(API.refresh, {
        method: 'POST',
        headers: [['Content-type', 'application/json']],
        body: JSON.stringify(candidate),
    })

    if (response.status < 200 || response.status >= 400) {
        throw new Error(`${response.status} server response`)
    }

    const data = await response.json()

    return data as TTokens
}

export const fetchIsLoginExists = async (login: string) => {
    const response = await fetch(`${API.checkLogin}?login=${login}`)

    if (response.status < 200 || response.status >= 400) {
        throw new Error(`${response.status} server response`)
    }

    const isLoginExists = await response.json()
    return isLoginExists as TLoginExists
}
