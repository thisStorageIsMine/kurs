// import { supabase } from '..'
// import { Database, PostgrestError, TTables } from '../types'

// class SupabaseService {
//   static async getRow(
//     table: TTables,
//     columns: string[],
//     eq: [string, string][]
//   ): Promise<
//     [
//       (
//         | {
//             id: number
//             login: string
//             password: string
//           }[]
//         | null
//       ),
//       null | PostgrestError
//     ]
//   > {
//     let query = supabase.from(table).select(columns.join(','))

//     for (const [key, value] of eq) {
//       query = query.eq(key, value)
//     }

//     const { data, error } = await query.select()
//     return [data, error]
//   }

//   static async insertRows<T extends TTables>(
//     table: T,
//     rows: Array<Database['public']['Tables'][T]['Insert']>
//   ) {
//     const { data, error } = await supabase
//       .from(table as keyof Database['public']['Tables'])
//       .insert(rows)
//       .select()

//     return [data, error]
//   }

//   static async updateRows<T extends TTables>(
//     table: T,
//     eq: [string, string],
//     row: Database['public']['Tables'][T]['Update']
//   ) {
//     const { data, error } = await supabase
//       .from(table as keyof Database['public']['Tables'])
//       .update(row)
//       .eq(eq[0], eq[1])
//       .select()

//     return [data, error]
//   }
// }

// export { SupabaseService }
