export type TNote = {
    id: number
    userId: number
    name: string
    payload: string
    createdAt: string
    lastEdit: string
}

export type TDatabaseNote = {
    id: number
    user_id: number
    name: string
    payload: string
    created_at: string
    last_edit: string
}
