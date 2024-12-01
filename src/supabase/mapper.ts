import { TNote } from '../types'
import { Tables } from './types'

export class SupabaseMapper {
    public static getClientNotes(note: Tables<'notes'>) {
        return {
            id: note.id,
            name: note.name,
            payload: note.payload,
            lastEdit: note.last_edit,
        }
    }

    public static getBackendNote(note: Omit<TNote, 'id'> & { userId: number }) {
        return {
            name: note.name,
            payload: note.payload,
            created_at: new Date().toISOString(),
            last_edit: note.lastEdit,
            user_id: note.userId,
        }
    }
}
