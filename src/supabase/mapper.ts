import { TNote } from '../types'
import { Tables } from './types'

export class SupabaseMapper {
    public static getClientNotes(note: Tables<'notes'>) {
        return {
            id: note.id,
            name: note.name,
            payload: note.payload,
            createdAt: note.created_at,
            userId: note.user_id,
        }
    }

    public static getBackendNote(note: Omit<TNote, 'id'> & { userId: number }) {
        return {
            name: note.name,
            payload: note.payload,
            created_at: new Date().toISOString(),
            user_id: note.userId,
        }
    }
}
