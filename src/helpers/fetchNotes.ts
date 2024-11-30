import { supabase } from '../supabase'

export const fetchNotes = async (userId: number) => {
    if (!userId) {
        throw new Error('User id was not provided')
    }

    const { data, error } = await supabase
        .from('notes')
        .select('created_at, name, payload, id, slug')
        .eq('user_id', userId)

    if (error) {
        throw new Error(error.message)
    }

    return data
}