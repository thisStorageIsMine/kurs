import { TDatabaseNote, TNote } from '../types'

export class NotesMapper {
    public static getClientNote(note: TDatabaseNote): TNote {
        return {
            id: note.id,
            createdAt: note.created_at,
            lastEdit: note.last_edit,
            name: note.name,
            payload: note.payload,
            userId: note.user_id,
        }
    }
}
