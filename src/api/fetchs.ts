import { getTokens } from '../helpers'
import { NotesMapper } from '../helpers/noteMapper'
import { supabase } from '../supabase'
import { TDatabaseNote } from '../types'
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
    tokens: {
        accessJwt: string
        refreshJwt: string
    }
}

export type TReq = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body?: Record<string, unknown> | string | number | boolean
    headers?: Record<string, string>
    endpoint: string
    param?: Record<string, string>
}

export const req = async ({ method, body, headers, endpoint, param = {} }: TReq) => {
    const sershParams = new URLSearchParams(param)

    const url = `${endpoint}?${sershParams.toString()}`
    const response = await fetch(url, {
        method,
        headers: { 'Content-type': 'application/json', ...headers },
        body: JSON.stringify(body),
    })

    if (response.status < 200 || response.status >= 400) {
        throw new Error(`${response.status} server Response`)
    }

    return await response.json()
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

export const fethcNotesFromDeepkit = async (userId: number) => {
    const { access, refresh } = getTokens()
    if (!access || !refresh) {
        throw new Error('expired tokens')
    }

    const response = await fetch(`${API.getNotes}?user_id=${userId}`, {
        method: 'POST',
        headers: [['Content-type', 'application/json']],
        body: JSON.stringify({
            tokens: {
                access: access,
                refresh: refresh,
            },
        }),
    })

    if (response.status < 200 || response.status >= 400) {
        throw new Error(`${response.status} server response`)
    }

    const notes: TDatabaseNote[] = await response.json()
    return notes.map(NotesMapper.getClientNote)
}

export const insertNote = async ({
    name,
    payload,
    noteId,
}: {
    name: string | null
    payload: string | null
    noteId: number
}) => {
    const { data, error } = await supabase
        .from('notes')
        .update({ name: name, payload: payload })
        .eq('id', noteId)
        .select()

    if (error) {
        throw new Error('Failed to insert note')
    }

    return data[0]
}

export const fetchLoginViaToken = async (token: string) => {
    const response = await fetch(`${API.loginViaToken}?refresh=${token}`)

    if (response.status < 200 || response.status >= 400) {
        throw new Error(`${response.status} server error`)
    }

    const newTokens = (await response.json()) as TTokenLoginPayload
    return newTokens
}

export type TTokenLoginPayload = {
    tokens: {
        accessJwt: string
        refreshJwt: string
    }
}
