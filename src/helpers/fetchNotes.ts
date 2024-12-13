import { getUser } from '.'
import { supabase } from '../supabase'
import { SupabaseMapper } from '../supabase/mapper'

export const fetchNotes = async () => {
    const user = getUser()

    if (user?.id === undefined) {
        throw new Error('User id was not provided')
    }

    const { data, error } = await supabase
        .from('notes')
        .select('created_at, name, payload, id, user_id')
        .eq('user_id', user.id)

    if (error) {
        throw new Error(error.message)
    }

    const notes = data.map((note) => SupabaseMapper.getClientNotes(note))

    return notes.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
}
