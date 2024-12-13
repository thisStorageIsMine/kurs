export type TNote = {
    createdAt: string
    id: number
    name: string | null
    payload: string | null
    userId: number
}

export type TDatabaseNote = {
    id: number
    user_id: number
    name: string
    payload: string
    created_at: string
    last_edit: string
}
