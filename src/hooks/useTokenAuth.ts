// import { useEffect } from 'react'
// import { useMutation } from '@tanstack/react-query'
// import { useNavigateToNotes } from '.'
// import { fetchLoginViaToken } from '../api/fetchs'
// import { decodeToken, getTokens, setTokens } from '../helpers'

// export const useTokenAuth = () => {
//     const navigateToNotes = useNavigateToNotes()

//     const mutation = useMutation({
//         mutationFn: async (token: string) => {
//             const tokens = await fetchLoginViaToken(token)
//             debugger

//             setTokens(tokens.tokens)

//             return tokens.tokens
//         },
//         onError: () => {},
//         onSuccess: async (data) => {
//             const userId = decodeToken(data.refreshJwt)

//             if (typeof userId !== 'string') {
//                 return
//             }

//             try {
//                 await navigateToNotes(Number(userId))
//             } catch {
//                 return
//             }
//         },
//     })

//     useEffect(() => {
//         const auth = async () => {
//             const { refresh } = getTokens()

//             if (!refresh) return
//             await mutation.mutate(refresh)
//         }

//         auth()
//     }, [])
// }
