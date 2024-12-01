import { supabase } from '../supabase'
import { SupabaseMapper } from '../supabase/mapper'

export const fetchNotes = async (userId: number) => {
    if (!userId) {
        throw new Error('User id was not provided')
    }

    const { data, error } = await supabase
        .from('notes')
        .select('created_at, name, payload, id, user_id, last_edit')
        .eq('user_id', userId)

    if (error) {
        throw new Error(error.message)
    }

    const notes = data.map((note) => SupabaseMapper.getClientNotes(note))

    return notes.sort((a, b) => (a.lastEdit > b.lastEdit ? 1 : -1))
}
