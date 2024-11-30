import { useNavigate } from 'react-router-dom'

export const useNavigateToNotes = () => {
    const navigate = useNavigate()

    return (userId: number, availableIds: number[]) => {
        if (availableIds.length === 0) {
            navigate(`/${userId}/`)
            return
        }

        navigate(`/${userId}/${availableIds[0]}`)
    }
}
