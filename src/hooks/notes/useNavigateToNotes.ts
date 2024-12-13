import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { fetchNotes } from '../../helpers'
import { useUser } from '../../store'
import { useDeleteNotification, useLoadNotification } from '../../components'

export const useNavigateToNotes = () => {
    const navigate = useNavigate()
    const showNotify = useLoadNotification()
    const deleteNotify = useDeleteNotification()
    const setIsAuth = useUser((state) => state.setAuth)
    const { mutateAsync: getNotes } = useMutation({
        mutationFn: async () => {
            return await fetchNotes()
        },
    })

    return async (userId: number) => {
        showNotify('Загружаем ваши заметки', 'load')
        const notes = await getNotes()
        let dst: string
        setIsAuth(true)

        if (notes.length === 0) {
            dst = `/${userId}/`
        } else {
            dst = `/${userId}/${notes[0].id}`
        }

        deleteNotify('load')
        navigate(dst)
    }
}
