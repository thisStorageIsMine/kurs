import { SupabaseMapper } from '../supabase/mapper'

export type TNote = ReturnType<typeof SupabaseMapper.getClientNotes>
