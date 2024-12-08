import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { fethcNotesFromDeepkit } from '../../api/fetchs'

export const useNavigateToNotes = () => {
    const navigate = useNavigate()
    const { mutateAsync: fetchNotes } = useMutation({
        mutationFn: async (userId: number) => {
            return await fethcNotesFromDeepkit(userId)
        },
    })

    return async (userId: number) => {
        const notes = await fetchNotes(userId)

        if (notes.length === 0) {
            navigate(`/${userId}/`)
            return
        }

        navigate(`/${userId}/${notes[0].id}`)
    }
}
